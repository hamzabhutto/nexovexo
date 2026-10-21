import { getServices } from "@/lib/data";

const SITE_URL = "https://www.nexovexo.com";

/**
 * Structured data (JSON-LD) so search engines understand NexoVexo as an
 * organization / professional service and can show rich results.
 * Rendered server-side into a <script> tag.
 */
export default async function JsonLd() {
  const services = await getServices();

  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "NexoVexo",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-mark-transparent.png`,
      description:
        "A software house specializing in AI-aware DevSecOps, AI-assisted operations, secure AI-agent operations, MCP integrations and custom software.",
      slogan: "Cloud · AI · DevOps · Automation",
      email: "hello@nexovexo.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "NexoVexo",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "NexoVexo",
      url: SITE_URL,
      description:
        "Custom software development, AI-aware DevSecOps, cloud & DevOps, AI integration and automation.",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
          },
        })),
      },
    },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be injected as raw text.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
