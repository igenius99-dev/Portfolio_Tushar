import { getVectorStore } from "@/lib/vectordb";
import { UpstashRedisCache } from "@langchain/community/caches/upstash_redis";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "@upstash/redis";
import { LangChainStream, Message, StreamingTextResponse } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const latestMessage = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    // store the same user questions
    const cache = new UpstashRedisCache({
      client: Redis.fromEnv(),
    });

    const chatModel = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [handlers],
      verbose: true, // logs to console
      cache,
    });

    const rephraseModel = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      verbose: true,
      cache,
    });

    const retriever = (await getVectorStore()).asRetriever();

    // get a customised prompt based on chat history
    const chatHistory = messages
      .slice(0, -1) // ignore latest message
      .map((msg: Message) =>
        msg.role === "user"
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content),
      );

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation history, generate a search query to look up information relevant to the current question. " +
          "Do not leave out any relevant keywords. " +
          "Only return the query and no other text. ",
      ],
    ]);

    const historyAwareRetrievalChain = await createHistoryAwareRetriever({
      llm: rephraseModel,
      retriever,
      rephrasePrompt,
    });

    // final prompt
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are Tushar's Spirit — a concise, friendly assistant for Tushar Sachan's developer portfolio. " +
          "Your goals: (1) help visitors learn about Tushar's skills, projects, and experience, (2) guide them to relevant pages, and (3) keep answers grounded in the provided context. " +
          "Personality: professional but warm; Tushar is a full‑stack developer, a hardcore gymbro, and a car enthusiast — you can reflect that tone when appropriate. " +
          "Rules: Only answer using the CONTEXT below. If the answer isn't in context, say so briefly and suggest visiting the contact page. " +
          "Always include links to any relevant pages (from the context) when helpful. Format output in clean markdown.\n\n" +
          "CONTEXT:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page content:\n{page_content}",
      ),
      documentSeparator: "\n------\n",
    });

    // 1. retrievalChain converts the {input} into a vector
    // 2. do a similarity search in the vector store and finds relevant documents
    // 3. pairs the documents to createStuffDocumentsChain and put into {context}
    // 4. send the updated prompt to chatgpt for a customised response

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrievalChain, // get the relevant documents based on chat history
    });

    retrievalChain.invoke({
      input: latestMessage,
      chat_history: chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
