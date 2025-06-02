import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create Stunning Short Videos with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transform your ideas into engaging short-form videos in minutes
                with our powerful AI video generation platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href={"/dashboard/create-video"}
                className="bg-emerald-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-600 transition-colors"
              >
                Create Your First Video
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              No credit card required. 14-day free trial.
            </div>
          </div>
          <Image
            src="/hero.jpg"
            width={550}
            height={550}
            alt="Hero Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
