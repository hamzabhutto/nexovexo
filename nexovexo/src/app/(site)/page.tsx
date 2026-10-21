import Hero from "@/components/sections/Hero";
import Specialty from "@/components/sections/Specialty";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";

// Cached (ISR): the page is served from cache and regenerated at most once per
// `revalidate` window, so visitors don't wait on a live DB query every load.
// The admin triggers an on-demand refresh (via /api/revalidate) when content
// changes, so edits still show up quickly.
export const revalidate = 300; // seconds (5 min safety net)

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
