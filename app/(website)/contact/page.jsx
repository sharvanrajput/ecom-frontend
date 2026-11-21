import Image from "next/image";
import { assets } from "@/public/frontend_assets/assets";

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="contact-heading"
        className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20"
      >
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Get in touch
          </p>
          <h1
            id="contact-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          >
            Contact us
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Need help with an order or finding the right fit? We’re happy to
            help. Need help with an order or finding the right fit? We’re happy
            to help. Need help with an order or finding the right fit? We’re
            happy to help.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Need help with an order or finding the right fit? We’re happy to
            help. Need help with an order or finding the right fit? We’re happy
            to help. Need help with an order or finding the right fit? We’re
            happy to help.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={assets.contact_img}
            alt="Our team is here to help"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
