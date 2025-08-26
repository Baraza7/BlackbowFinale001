import { ContentType, MediaRole } from "@prisma/client"
import type { SectionDTO } from "./contentService"

// Map existing static constants and public assets into a minimal static section registry
// Extend this as needed to mirror the current public site content without changing public components
const registry: Record<string, Record<string, Omit<SectionDTO, "source">>> = {
  home: {
    hero: {
      pageSlug: "home",
      sectionKey: "hero",
      title: "Hero",
      blocks: [
        {
          id: "static-home-hero-title",
          type: ContentType.RICH_TEXT,
          content:
            "Welcome to <span style='color: #FFBE00;'>Blackbow</span><br />Consult Limited.",
        },
        {
          id: "static-home-hero-subtitle",
          type: ContentType.RICH_TEXT,
          content:
            "Your Partner in Customized Trade Finance, Insurance & Investment Solutions Across Africa",
        },
      ],
      media: [
        {
          id: "static-home-hero-bg",
          filename: "Home2Hero.png",
          mimeType: "image/png",
          publicPath: "/Home2Hero.png",
          role: MediaRole.PRIMARY,
          order: 0,
        },
      ],
    },
  },
  about: {
    intro: {
      pageSlug: "about",
      sectionKey: "intro",
      title: "Team Intro",
      blocks: [
        {
          id: "static-about-intro-title",
          type: ContentType.RICH_TEXT,
          content: "Meet our team of friendly & experienced experts",
        },
        {
          id: "static-about-intro-body",
          type: ContentType.RICH_TEXT,
          content:
            "Our strength lies in our collective expertise and passion. Get to know the dedicated professionals at Blackbow Consult, committed to driving your success with innovative solutions and unwavering support.",
        },
      ],
      media: [],
    },
  },
}

export function getStaticSection(pageSlug: string, sectionKey: string): Omit<SectionDTO, "source"> | null {
  const page = registry[pageSlug]
  if (!page) return null
  return page[sectionKey] ?? null
}


