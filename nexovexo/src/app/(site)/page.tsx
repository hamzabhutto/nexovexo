import Hero from "@/components/sections/Hero";
import Specialty from "@/components/sections/Specialty";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";

// Content is DB-backed and may change via the admin panel, so render dynamically.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Specialty />
      <Services />
      <Work />
      <Process />
      <TechStack />
      <Contact />
    </>
  );
}
