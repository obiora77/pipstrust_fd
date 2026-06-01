"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { testimonials } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DollarSign, Users, TrendingUp, Handshake } from "lucide-react";
import Link from "next/link";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Olowo Investments has transformed my financial life. The returns are consistent, and the platform is so easy to use.",
      name: "Sarah L.",
      avatarId: "testimonial-avatar-1",
    },
    {
      quote:
        "The transparency and security are top-notch. I feel confident investing my money with Olowo. Highly recommended!",
      name: "John D.",
      avatarId: "testimonial-avatar-2",
    },
    {
      quote:
        "As a beginner in investments, I found the platform incredibly user-friendly. The support team is also very responsive.",
      name: "Emily R.",
      avatarId: "testimonial-avatar-3",
    },
  ];
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-emerald-300" />,
      value: "10,000+",
      label: "Happy Investors",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-300" />,
      value: "$50M+",
      label: "Total Invested",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-300" />,
      value: "99%",
      label: "Successful Payouts",
    },
    {
      icon: <Handshake className="h-8 w-8 text-emerald-300" />,
      label: "Years of Trust",
      value: "5+",
    },
  ];

  return (
    <>
      <section className="bg-muted py-16 sm:py-24">
        <div className="container mx-auto">
          <div className="mb-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 rounded-full bg-background p-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold font-headline">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-headline md:text-4xl">
              What Our Investors Say
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
              Real stories from our valued community of investors.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto w-full max-w-4xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const avatar = PlaceHolderImages.find(
                  (p) => p.id === testimonial.avatarId
                );
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col items-center p-6 text-center">
                          <Avatar className="mb-4 h-20 w-20">
                            {avatar && (
                              <AvatarImage
                                src={avatar.imageUrl}
                                alt={testimonial.name}
                                data-ai-hint={avatar.imageHint}
                              />
                            )}
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="mb-4 italic text-muted-foreground">
                            "{testimonial.quote}"
                          </p>
                          <p className="font-semibold">{testimonial.name}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="text-emerald-300 text-uppercase text-sm font-bold">PipsTrust</div>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">How Does it Work?</h2>
              <div className="h-1 w-16 bg-emerald-300 mx-auto"></div>
            </div>
            <div style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              <div className="mt-6 aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/x7msE3tx8QI"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-emerald-300 text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
              <Link href="/about">READ MORE</Link>
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-2 text-lg text-slate-600">Find answers to common questions about PipsTrust</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="border border-slate-200 rounded-lg p-6 cursor-pointer hover:border-slate-300 transition-colors">
              <summary className="font-semibold text-lg text-slate-900">What is the minimum deposit amount?</summary>
              <p className="mt-4 text-slate-700">The minimum deposit varies by plan: Starter plan requires $100, Gold plan requires $1,000, and VIP plan requires $5,000.</p>
            </details>

            <details className="border border-slate-200 rounded-lg p-6 cursor-pointer hover:border-slate-300 transition-colors">
              <summary className="font-semibold text-lg text-slate-900">How long does it take to receive returns?</summary>
              <p className="mt-4 text-slate-700">Returns are calculated based on your chosen plan duration. Starter plans last 7 days, Gold plans 14 days, and VIP plans 30 days. Returns are credited after the plan period ends.</p>
            </details>

            <details className="border border-slate-200 rounded-lg p-6 cursor-pointer hover:border-slate-300 transition-colors">
              <summary className="font-semibold text-lg text-slate-900">Is my investment secure?</summary>
              <p className="mt-4 text-slate-700">Yes, we employ industry-leading security measures including SSL encryption, two-factor authentication, and regular security audits to protect your investment.</p>
            </details>

            <details className="border border-slate-200 rounded-lg p-6 cursor-pointer hover:border-slate-300 transition-colors">
              <summary className="font-semibold text-lg text-slate-900">Can I withdraw my funds early?</summary>
              <p className="mt-4 text-slate-700">Early withdrawals are subject to applicable fees. Please contact our support team to discuss withdrawal options for your specific plan.</p>
            </details>

            <details className="border border-slate-200 rounded-lg p-6 cursor-pointer hover:border-slate-300 transition-colors">
              <summary className="font-semibold text-lg text-slate-900">What payment methods do you accept?</summary>
              <p className="mt-4 text-slate-700">We accept bank transfers, cryptocurrency payments, and digital wallets. Check your account dashboard for all available payment options.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
