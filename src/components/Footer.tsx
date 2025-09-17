import Link from "next/link";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-3xl px-8">
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          {/* Left: Branding */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold tracking-wide">
              <Link href="/" className="link">
                Tushar&apos;s Portfolio
              </Link>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              &copy; {2025} • Built with Next.js & Tailwind
            </p>
          </div>

          {/* Middle: Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/projects" className="link">
              Projects
            </Link>
            <Link href="/contact" className="link">
              Contact
            </Link>
            <Link href="/privacy" className="link">
              Privacy
            </Link>
          </nav>

          {/* Right: Socials */}
          <div className="flex items-center">
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
}
