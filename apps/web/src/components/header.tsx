"use client";
import Link from "next/link";
import { FileText } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { authClient } from "@/lib/auth-client";

const POLAR_CHECKOUT_URL =
  "https://buy.polar.sh/polar_cl_3zmubZUeAqk4avhg1KldPpyqh1Q5p2Ny9hrqn3ihURx";

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CVMaker</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {session?.user && (
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
          {!session?.user && (
            <a
              href={POLAR_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
            >
              Get Started
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
