"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tusharsachan06@gmail.com",
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    });

    if (!data || error) {
      console.error(error?.message);
      return { 
        error: { 
          message: error?.message || "Failed to send email!" 
        } 
      };
    }

    return { success: true };
  } catch (error) {
    const err = error as Error;
    return { 
      error: { 
        message: err.message || "Unknown error occurred" 
      } 
    };
  }
}
