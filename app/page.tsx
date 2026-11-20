import Image from "next/image";
import Navbar from "./components/navBar";
import {
  Cog,
  Factory,
  Flame,
  Fuel,
  Gauge,
  HandHeart,
  Handshake,
  PackageOpen,
  Settings2,
  Store,
  Thermometer,
  Timer,
  Users,
  Weight,
} from "lucide-react";
import openMarket from "./assets/open_air_market.jpg";
import HeroImg from "./assets/cleanbean_image_1.png";
import productImage from "./assets/product_image2.png";
import { ImageZoom, ScrollReveal } from "./components/motionEffects";
import DotMatrix from "@/components/ui/dot-matrix";
import LogoCarousel from "./components/logoCarousel";
import CurrentYear from "@/components/CurrentYear";

/* ========================================================================
   CONTENT
   All copy, icons and images live here. Edit text in this block only.
   ======================================================================== */

const hero = {
  titleStart: "Clean",
  titleAccent: "Bean",
  image: HeroImg,
  imageAlt: "CleanBean locust bean dehuller",
};

const PROGRAMME = "TETFAIR 2026 ";
const PRODUCT_NAME = "CleanBean";
const PRODUCT_DESCRIPTOR =
  "a pressure boiler and wet mechanical dehuller for African locust bean seeds";

const about = {
  title: "Boil and dehull in one machine",
  paragraphs: [
    `The Locust Bean Dehuller Cum Boiler is a batch-processing machine that combines pressure boiling with wet mechanical dehulling of African locust bean seeds. It is built for women-led processing groups, cooperatives and small-scale commercial processors who make products such as iru and dawadawa. ${PRODUCT_NAME} is ${PRODUCT_DESCRIPTOR} developed under the ${PROGRAMME} programme.`,
    "Traditionally, locust bean seeds are boiled for long hours and the husks are then removed by hand. This machine softens the seeds under pressure and removes the husks mechanically, to cut boiling time and the physical effort of dehulling.",
  ],
  image: productImage,
  imageAlt: "Locust bean dehuller",
};

const howItWorks = {
  title: "How it works",
  subtitle: "One batch moves through three stages, all inside the same machine.",
  stepLabel: "Step",
  steps: [
    {
      icon: Flame,
      title: "Pressure boiling",
      body: "Locust bean seeds are loaded into the pressure boiling chamber. A heating source brings them to temperature under pressure, which softens the seeds and their husks.",
    },
    {
      icon: Cog,
      title: "Wet mechanical dehulling",
      body: "A gasoline engine drives the dehulling unit. While the seeds are still wet and soft, the unit strips the husks away mechanically.",
    },
    {
      icon: PackageOpen,
      title: "Discharge and collection",
      body: "The discharge system moves the dehulled seeds out of the machine and into a container, ready for the next stage of processing.",
    },
  ],
};

const features = {
  title: "Built to make the work lighter",
  intro:
    "Every part of the machine targets a slow or physically demanding step in locust bean processing.",
  image: productImage,
  imageAlt: "Locust bean dehuller",
  items: [
    {
      icon: Gauge,
      title: "Pressure boiling chamber",
      body: "Softens the seeds under pressure instead of relying on prolonged open-pot boiling.",
    },
    {
      icon: Timer,
      title: "Shorter boiling time",
      body: "Designed to reduce the long boiling hours of the traditional method.",
    },
    {
      icon: HandHeart,
      title: "Less manual effort",
      body: "Mechanical dehulling replaces much of the tiring hand work of removing husks.",
    },
    {
      icon: Fuel,
      title: "Engine-driven dehulling",
      body: "A gasoline engine powers the dehulling unit, so it can work where mains power is unreliable.",
    },
    {
      icon: Weight,
      title: "Batch sizes for small processors",
      body: "Handles 5–10 kg per batch, sized for groups, cooperatives and small commercial operations.",
    },
  ],
};

const specifications = {
  title: "Design specifications",
  items: [
    {
      icon: Factory,
      label: "Machine type",
      value: "Batch-processing pressure boiler and dehuller",
    },
    { icon: Weight, label: "Batch capacity", value: "5–10 kg" },
    { icon: Gauge, label: "Proposed pressure range", value: "0.7–2.0 bar" },
    { icon: Thermometer, label: "Cooking temperature range", value: "90–120 °C" },
    { icon: Flame, label: "Boiling heat source", value: "Heating source" },
    { icon: Fuel, label: "Dehulling drive", value: "Gasoline engine" },
    { icon: Settings2, label: "Dehulling method", value: "Wet mechanical dehulling" },
    {
      icon: PackageOpen,
      label: "Output",
      value: "Discharge system for collecting processed seeds",
    },
  ],
};

const audience = {
  title: "Designed for Modern Food Processing",
  image: openMarket,
  imageAlt: "Open-air market",
  groups: [
    {
      icon: Users,
      title: "Local community processing groups",
      body: "Take much of the heavy hand work out of dehulling, so more of the group’s time goes into producing and selling.",
    },
    {
      icon: Handshake,
      title: "Cooperatives",
      body: "Share one machine across members and process batches in a consistent, repeatable way.",
    },
    {
      icon: Store,
      title: "Small-scale commercial processors",
      body: "Process 5–10 kg batches of iru and dawadawa feedstock without a full-size industrial line.",
    },
  ],
};

const footer = {
  logoMark: "L",
  logoText: "Logo",
  description:
    "A pressure boiler and wet mechanical dehuller for African locust bean seeds, built for women-led groups, cooperatives and small-scale processors of iru and dawadawa.",
  navTitle: "Explore",
  navLabel: "Footer",
  links: [
    { label: "Home", href: "#home" },
    { label: "Overview", href: "#about" },
    { label: "Process", href: "#how-it-works" },
    { label: "Features", href: "#services" },
    { label: "Specifications", href: "#specifications" },
   
  ],
  legal: "Locust Bean Dehuller Cum Boiler. All rights reserved.",
  disclaimer: "Specifications are prototype design parameters, not validated settings.",
};

/* Sections are rendered inline in the single Home page component. */

export default function Home() {
  return (
    <main className="bg-brand-primary">
      <Navbar />

      {/* Hero */}
      <section id="home">
        <div className="relative w-full overflow-hidden bg-white h-[calc(100vh-4rem)] min-h-[560px]">
          <DotMatrix
            className="absolute inset-0"
            background="transparent"
            color="#86c9a1"
            activeColor="#16a34a"
            restOpacity={0.38}
          />
          <ScrollReveal className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 px-2 text-center sm:gap-8 sm:px-6 lg:gap-10 lg:px-8">
            <h1 className="font-hero text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {hero.titleStart}
              <span className="text-green-600">{hero.titleAccent}</span>
            </h1>
      
            <ImageZoom className="w-full max-w-4xl">
              <Image
                src={productImage}
                alt={hero.imageAlt}
                height={600}
                className="mx-auto block h-auto max-h-[68vh] w-full max-w-full object-contain"
              />
            </ImageZoom>
          </ScrollReveal>
        </div>
      </section>
      <LogoCarousel />

      {/* About */}
      <section id="about" className="bg-white py-16 sm:py-24">
        <ScrollReveal className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <ImageZoom className="w-full">
            <Image
              src={hero.image}
              alt={about.imageAlt}
              className="block h-auto w-full"
            />
          </ImageZoom>
      
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {about.title}
            </h2>
            <div className="mt-5 space-y-4">
              {about.paragraphs.map((text) => (
                <p
                  key={text}
                  className="text-base leading-relaxed text-gray-600 sm:text-lg"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* HowItWorks */}
        <section id="how-it-works" className="bg-primary/5 py-16 sm:py-24">
        <ScrollReveal className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {howItWorks.title}
        </h2>
        <p className="mt-4 text-base text-white/80 sm:text-lg">
          {howItWorks.subtitle}
        </p>
      </div>
      
      <ol className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
        {howItWorks.steps.map((step, i) => (
          <li key={step.title}>
            <ScrollReveal className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {howItWorks.stepLabel} {i + 1}
                  </span>
                </div>
      
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">{step.body}</p>
      
               
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section id="services" className="bg-white py-16 sm:py-24">
        <ScrollReveal className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {features.title}
            </h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {features.intro}
            </p>
      
            <ul className="mt-8 divide-y divide-gray-200">
              {features.items.map((f) => (
                <li key={f.title} className="flex gap-4 py-5 first:pt-0">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary/15 text-primary">
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <p className="mt-1 text-gray-600">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      
          <ImageZoom className="w-full">
            <Image
              src={features.image}
              alt={features.imageAlt}
              className="block h-auto w-full"
            />
          </ImageZoom>
        </ScrollReveal>
      </section>

      {/* Specifications */}
      <section
        id="specifications"
        className="relative overflow-hidden bg-secondary py-16 sm:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(19,113,6,0.12) 1px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      
        <ScrollReveal className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {specifications.title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-primary" />
      
          <dl className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {specifications.items.map((s, i) => (
              <div
                key={s.label}
                className="group flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-primary hover:shadow-lg hover:ring-brand-primary sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
                    <s.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold tracking-widest text-brand-primary/40 transition-colors duration-300 group-hover:text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
      
                <div>
                  <dt className="text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-white/80">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-base font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-white">
                    {s.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </section>

      {/* Audience */}
      <section id="who-its-for" className="bg-white py-16 sm:py-24">
        <ScrollReveal className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageZoom className="w-full">
              <Image
                src={audience.image}
                alt={audience.imageAlt}
                className="block h-auto w-full"
              />
            </ImageZoom>
      
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {audience.title}
              </h2>
              <ul className="mt-8 space-y-6">
                {audience.groups.map((g) => (
                  <li key={g.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <g.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{g.title}</h3>
                      <p className="mt-1 text-gray-600">{g.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary/5 text-white">
        <ScrollReveal className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:gap-16">
            {/* Brand */}
            <div>
              <a href="#home" className="inline-flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white font-bold text-primary">
                  {footer.logoMark}
                </span>
                <span className="text-lg font-semibold">{footer.logoText}</span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                {footer.description}
              </p>
            </div>
      
            {/* Links */}
            <nav aria-label={footer.navLabel}>
              <h3 className="font-semibold">{footer.navTitle}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
      
            {/* Project information */}
            <section aria-label="Project Information">
              <h3 className="font-semibold">Project Information</h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-xs text-white/50">Programme</dt>
                  <dd className="mt-1 text-sm text-white">{PROGRAMME}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">Technology</dt>
                  <dd className="mt-1 text-sm text-white">{PRODUCT_DESCRIPTOR}</dd>
                </div>
              </dl>
            </section>
          </div>
        </ScrollReveal>
      
        {/* Bottom bar */}
        <div>
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/15 pt-7 px-4 pb-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>
              © <CurrentYear /> {footer.legal}
            </p>
            <p>Developed under {PROGRAMME}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
