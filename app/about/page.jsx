import Image from "next/image";
import { assets } from "@/public/frontend_assets/assets";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="about-heading"
        className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={assets.about_img}
            alt="A look at our collection"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Our story
          </p>
          <h1
            id="about-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          >
            About us
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            We believe getting dressed should feel effortless. Discover
            thoughtfully chosen styles for everyday life. We believe getting
            dressed should feel effortless. Discover thoughtfully chosen styles
            for everyday life. We believe getting dressed should feel
            effortless. Discover thoughtfully chosen styles for everyday life.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            We believe getting dressed should feel effortless. Discover
            thoughtfully chosen styles for everyday life. We believe getting
            dressed should feel effortless. Discover thoughtfully chosen styles
            for everyday life. We believe getting dressed should feel
            effortless. Discover thoughtfully chosen styles for everyday life.
          </p>
        </div>
      </section>
    </main>
  );
}
