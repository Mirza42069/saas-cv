"use client";

import { Sparkles, Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Polar checkout URL
const POLAR_CHECKOUT_URL =
  "https://buy.polar.sh/polar_cl_3zmubZUeAqk4avhg1KldPpyqh1Q5p2Ny9hrqn3ihURx";

// Hero Section with Template Preview on right
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>ATS-Friendly CV Builder</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Create Professional CVs
              <br />
              <span className="text-primary">in Minutes</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-muted-foreground">
              Build ATS-optimized resumes that get noticed. Our minimalist
              templates help you land interviews at top companies.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={POLAR_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get Started for $5
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: CV Template Preview (Light Theme Only) */}
          <div className="relative">
            <Card className="overflow-hidden border-2 bg-white shadow-2xl">
              <div className="p-6 md:p-8">
                {/* CV Preview - Always Light */}
                <div className="space-y-5 text-gray-900">
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
                      John Doe
                    </h3>
                    <p className="mt-1 font-medium text-orange-600">
                      Software Engineer
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>johndoe@email.com</span>
                      <span>•</span>
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Summary
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-600">
                      Experienced software engineer with 5+ years building
                      scalable web applications.
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Experience
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              Senior Software Engineer
                            </p>
                            <p className="text-xs text-orange-600">
                              Tech Company Inc.
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            2021 - Present
                          </span>
                        </div>
                        <ul className="mt-1 space-y-0.5 text-xs text-gray-600">
                          <li>• Led development of core features</li>
                          <li>• Mentored junior developers</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["JavaScript", "React", "Node.js", "Python"].map(
                        (skill) => (
                          <span
                            key={skill}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// How It Works Section
const steps = [
  {
    step: "01",
    title: "Choose Template",
    description: "Select from our ATS-friendly professional templates",
  },
  {
    step: "02",
    title: "Fill Your Details",
    description: "Add your experience, education, and skills",
  },
  {
    step: "03",
    title: "Download & Apply",
    description: "Export your CV and start applying to jobs",
  },
];

function HowItWorksSection() {
  return (
    <section className="border-y bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Create your professional CV in three simple steps
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section - Matching reference design
function PricingSection() {
  const features = [
    { text: "All Professional Templates", included: true },
    { text: "AI-Powered Suggestions", included: true },
    { text: "Unlimited CV Downloads", included: true },
    { text: "ATS-Optimized Formatting", included: true },
    { text: "Lifetime Updates", included: true },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-md px-4">
        <Card className="border border-border p-6">
          {/* Title */}
          <h2 className="text-2xl font-light italic text-foreground">Pro</h2>

          {/* Price */}
          <div className="mt-2">
            <span className="text-4xl font-bold text-foreground">$5</span>
            <span className="text-lg text-muted-foreground">/lifetime</span>
          </div>

          {/* Subtitle */}
          <p className="mt-1 text-sm text-muted-foreground">
            One-time payment • Access forever
          </p>

          {/* Divider */}
          <div className="my-6 border-t border-border" />

          {/* Features header */}
          <p className="mb-4 text-sm text-muted-foreground">
            Everything you need:
          </p>

          {/* Features list */}
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature.text} className="flex items-center gap-3">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={POLAR_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Upgrade to Pro
          </a>
        </Card>
      </div>
    </section>
  );
}

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
    </main>
  );
}
