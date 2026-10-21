import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This seed populates PUBLIC content (services, projects, testimonials).
// The admin user is seeded by the separate nexovexo-admin app.
async function main() {
  // Services
  // Flagship = our AI-security/ops differentiator (shown first).
  // Then core delivery, then high-demand niches.
  const services = [
    // ---- Flagship: AI-security & operations ----
    {
      title: "AI-Aware DevSecOps",
      slug: "ai-aware-devsecops",
      summary:
        "Catch risks before release — dependencies, exposed secrets, container images and deploy configs.",
      description:
        "We help small software agencies and teams ship safely. Before every release we check code dependencies, scan for exposed secrets, audit container images and review deployment configurations, bringing AI-assisted analysis into your pipeline without slowing delivery.",
      icon: "shield-scan",
      features:
        "Dependency & vulnerability checks\nSecret & credential scanning\nContainer image auditing\nDeployment config review",
      order: 1,
    },
    {
      title: "AI-Assisted Operations",
      slug: "ai-assisted-operations",
      summary:
        "Understand deployment failures and investigate logs faster, with human review before consequential actions.",
      description:
        "We help teams make sense of what their systems are doing. AI assists in investigating logs, understanding deployment failures and surfacing the likely root cause faster, while a human stays in the loop before any consequential action is taken.",
      icon: "pulse",
      features:
        "Faster incident triage\nLog investigation\nRoot-cause analysis\nHuman-in-the-loop safeguards",
      order: 2,
    },
    {
      title: "Secure AI-Agent Operations",
      slug: "secure-ai-agent-operations",
      summary:
        "Control AI-agent permissions, protect credentials and track every action as you adopt AI.",
      description:
        "A future-focused specialty: as companies introduce AI agents into their workflows, we help them control agent permissions, protect credentials and keep a clear audit trail of every action an agent takes — so autonomy never comes at the cost of control.",
      icon: "agent",
      features:
        "Agent permission control\nCredential protection\nAction auditing & tracing\nGuardrails & policy",
      order: 3,
    },

    {
      title: "MCP Servers & Integrations",
      slug: "mcp-servers-integrations",
      summary:
        "Connect AI agents to your tools, data and systems with Model Context Protocol servers.",
      description:
        "MCP (Model Context Protocol) is the emerging standard for giving AI agents safe, structured access to tools, APIs and data. We design and build custom MCP servers and integrations so your assistants and agents can act on your real systems, with scoped permissions and clear boundaries.",
      icon: "plug",
      features:
        "Custom MCP servers\nTool & API connectors\nScoped, auditable access\nAgent-ready integrations",
      order: 4,
    },

    // ---- Core delivery ----
    {
      title: "Custom Software Development",
      slug: "custom-software-development",
      summary:
        "High-performance websites, web apps and platforms built on modern stacks.",
      description:
        "From marketing sites and web pages to complex platforms, we design and ship custom software that loads fast, scales well and is a pleasure to maintain, built on Next.js, React, TypeScript and battle-tested backends.",
      icon: "code",
      features:
        "Web pages & web apps\nNext.js, React & TypeScript\nSEO & Core Web Vitals\nCMS & admin panels",
      order: 5,
    },
    {
      title: "Microservices Architecture",
      slug: "microservices-architecture",
      summary:
        "Scalable, resilient service-based systems that grow with your product.",
      description:
        "We design and build microservice systems that stay maintainable as they scale, with clean service boundaries, APIs, event-driven messaging and observability built in from day one.",
      icon: "layers",
      features:
        "Service decomposition\nAPI & event-driven design\nContainerization\nObservability built in",
      order: 6,
    },
    {
      title: "Mobile App Development",
      slug: "mobile-app-development",
      summary:
        "Cross-platform mobile apps with native performance and a polished UX.",
      description:
        "We build cross-platform mobile applications that feel native on both iOS and Android, backed by robust APIs and real-time infrastructure.",
      icon: "mobile",
      features:
        "iOS & Android\nReact Native\nReal-time features\nApp Store delivery",
      order: 7,
    },
    {
      title: "UI/UX Design",
      slug: "ui-ux-design",
      summary:
        "Research-driven interface design that turns complex products into intuitive experiences.",
      description:
        "From wireframes to polished design systems, we craft interfaces that are beautiful, accessible and built to convert. We design with developers in mind so handoff is seamless.",
      icon: "design",
      features:
        "UX research\nDesign systems\nPrototyping\nAccessibility (WCAG)",
      order: 8,
    },
    {
      title: "AI Chatbots & Assistants",
      slug: "ai-chatbots-assistants",
      summary:
        "Conversational assistants that answer, support and automate on your data.",
      description:
        "We build chatbots and AI assistants grounded in your own content and systems, so they give accurate, useful answers for support, sales and internal workflows, with safeguards against hallucination.",
      icon: "chat",
      features:
        "Support & sales bots\nGrounded on your data\nMulti-channel\nHandoff to humans",
      order: 9,
    },

    // ---- High-demand niches ----
    {
      title: "AI Integration & RAG",
      slug: "ai-integration-rag",
      summary:
        "LLM copilots, RAG pipelines and AI features inside your existing product.",
      description:
        "We embed practical AI into products that already exist: retrieval-augmented generation over your knowledge base, LLM copilots, semantic search and vector databases, integrated cleanly so they add value without a rewrite.",
      icon: "brain",
      features:
        "RAG pipelines\nLLM copilots & features\nVector search\nEvaluation & guardrails",
      order: 10,
    },
    {
      title: "LLMOps & AI Observability",
      slug: "llmops-ai-observability",
      summary:
        "Deploy, monitor, evaluate and continuously improve AI apps in production.",
      description:
        "The operational layer for AI products: we help you deploy LLM applications reliably, monitor quality and cost, evaluate outputs, and iterate safely, the way DevOps does for traditional software.",
      icon: "pulse",
      features:
        "Prompt & model versioning\nQuality & cost monitoring\nEvaluation pipelines\nSafe rollout",
      order: 11,
    },
    {
      title: "Low-Code / No-Code Delivery",
      slug: "low-code-no-code",
      summary:
        "Ship internal tools, MVPs and automations fast on low-code and no-code platforms.",
      description:
        "When speed matters more than a custom build, we deliver on low-code and no-code platforms, internal tools, MVPs, dashboards and automations, then help you graduate to custom code if and when you outgrow them.",
      icon: "blocks",
      features:
        "Internal tools & MVPs\nWorkflow automation\nVisual AI-agent builders\nMigration path to custom",
      order: 12,
    },
    {
      title: "Platform Engineering & Cloud",
      slug: "platform-engineering-cloud",
      summary:
        "Scalable cloud infrastructure, CI/CD and self-service developer platforms.",
      description:
        "We architect and operate cloud infrastructure that scales, with CI/CD pipelines, infrastructure-as-code and internal developer platforms that reduce friction for your engineers across AWS, GCP and Azure.",
      icon: "server",
      features:
        "AWS / GCP / Azure\nCI/CD pipelines\nInfrastructure as code\nInternal developer platforms",
      order: 13,
    },
  ];

  // Replace the service set cleanly: remove any service no longer in the list,
  // then upsert the current set so the site always reflects this exact catalog.
  const slugs = services.map((s) => s.slug);
  await prisma.service.deleteMany({ where: { slug: { notIn: slugs } } });

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded ${services.length} services`);

  // Projects
  const projects = [
    {
      title: "FinTrack Dashboard",
      slug: "fintrack-dashboard",
      client: "FinTrack Inc.",
      category: "Web App",
      summary:
        "A real-time financial analytics dashboard processing millions of transactions.",
      description:
        "We built a real-time analytics platform that ingests and visualizes millions of financial transactions, with sub-second query performance and role-based access for enterprise teams.",
      coverColor: "blue",
      techStack: "Next.js, TypeScript, PostgreSQL, Redis, AWS",
      featured: true,
      order: 1,
    },
    {
      title: "MediConnect Platform",
      slug: "mediconnect-platform",
      client: "MediConnect",
      category: "Healthcare",
      summary:
        "A HIPAA-conscious telehealth platform connecting patients and providers.",
      description:
        "A telehealth platform with secure video, appointment scheduling, and e-prescriptions, designed with privacy and reliability as first-class requirements.",
      coverColor: "cyan",
      techStack: "React, Node.js, WebRTC, PostgreSQL",
      featured: true,
      order: 2,
    },
    {
      title: "ShopFlow Commerce",
      slug: "shopflow-commerce",
      client: "ShopFlow",
      category: "E-commerce",
      summary:
        "A headless e-commerce storefront with a 1.2s average load time.",
      description:
        "A blazing-fast headless storefront with a custom checkout, inventory sync, and a marketing-friendly CMS. Average load time cut to 1.2 seconds, lifting conversions significantly.",
      coverColor: "violet",
      techStack: "Next.js, Shopify, Tailwind, Vercel",
      featured: true,
      order: 3,
    },
    {
      title: "LogiRoute Automation",
      slug: "logiroute-automation",
      client: "LogiRoute",
      category: "Automation",
      summary:
        "An AI route-optimization engine that cut delivery costs by 23%.",
      description:
        "We designed an AI-powered route optimization engine for a logistics company, reducing fuel and delivery costs by 23% through smart scheduling and real-time traffic data.",
      coverColor: "blue",
      techStack: "Python, FastAPI, PostgreSQL, Docker",
      featured: false,
      order: 4,
    },
    {
      title: "EduSpark LMS",
      slug: "eduspark-lms",
      client: "EduSpark",
      category: "Education",
      summary:
        "A learning management system serving 50,000+ active students.",
      description:
        "A scalable LMS with live classes, assessments, and progress tracking, built to serve tens of thousands of concurrent learners.",
      coverColor: "cyan",
      techStack: "Next.js, NestJS, PostgreSQL, Redis",
      featured: false,
      order: 5,
      status: "in_progress",
      stage: "development",
      progress: 65,
    },
    {
      title: "CloudGuard Infra",
      slug: "cloudguard-infra",
      client: "CloudGuard",
      category: "DevOps",
      summary:
        "A full CI/CD and infrastructure overhaul reducing deploy time by 80%.",
      description:
        "We re-architected a client's cloud infrastructure with Kubernetes, infrastructure-as-code, and automated CI/CD pipelines, cutting deployment time from hours to minutes.",
      coverColor: "violet",
      techStack: "Kubernetes, Terraform, GitHub Actions, AWS",
      featured: false,
      order: 6,
      status: "pending",
      stage: "discovery",
      progress: 10,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Seeded ${projects.length} projects`);

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "FinTrack Inc.",
      quote:
        "NexoVexo delivered our analytics platform ahead of schedule and the performance is incredible. They felt like an extension of our own team.",
      rating: 5,
      order: 1,
    },
    {
      name: "Daniel Osei",
      role: "Founder",
      company: "ShopFlow",
      quote:
        "Our new storefront loads in just over a second and conversions jumped the week it went live. Easily the best engineering partner we've worked with.",
      rating: 5,
      order: 2,
    },
    {
      name: "Priya Nair",
      role: "Product Lead",
      company: "MediConnect",
      quote:
        "They understood the compliance and reliability demands of healthcare from day one. Communication was clear and the delivery was rock solid.",
      rating: 5,
      order: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name, company: t.company },
    });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`Seeded ${testimonials.length} testimonials`);

  // Site stats (editable from admin; shown in the footer bento + elsewhere).
  const stats = [
    { key: "projects_delivered", label: "Projects delivered", value: "40+", percent: 90, color: "cyan", order: 1 },
    { key: "uptime", label: "Uptime", value: "99.9%", percent: 99, color: "teal", order: 2 },
    { key: "avg_load", label: "Avg. load time", value: "1.2s", percent: 85, color: "blue", order: 3 },
    { key: "satisfaction", label: "Satisfaction", value: "96%", percent: 96, color: "violet", order: 4 },
    { key: "support", label: "Support", value: "24/7", percent: 100, color: "green", order: 5 },
  ];
  for (const s of stats) {
    await prisma.siteStat.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded ${stats.length} site stats`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
