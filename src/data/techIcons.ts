import {
  siCss, siDart, siFigma, siFirebase, siFlutter, siGit, siGithub, siHtml5, siJavascript, siLaragon,
  siLaravel, siMysql, siNextdotjs, siPhp, siPython, siReact, siSupabase, siTailwindcss, siVercel, siVite,
  siFastify, siSqlite, siTypescript,
} from 'simple-icons'
import { Layers, Palette, Waves, Webhook, type LucideIcon } from 'lucide-react'

export type TechIconData = { path: string; hex: string } | { fallback: LucideIcon }

const b = (i: { path: string; hex: string }): TechIconData => ({ path: i.path, hex: i.hex })

// Kunci = nama skill di profile.skillGroups atau project.tech. Canva, REST API, Provider, dan Riverpod tidak punya logo merek di simple-icons.
export const techIcons: Record<string, TechIconData> = {
  Figma: b(siFigma),
  Canva: { fallback: Palette },
  React: b(siReact),
  'Next.js': b(siNextdotjs),
  Vite: b(siVite),
  JavaScript: b(siJavascript),
  HTML: b(siHtml5),
  CSS: b(siCss),
  'Tailwind CSS': b(siTailwindcss),
  Laravel: b(siLaravel),
  PHP: b(siPhp),
  MySQL: b(siMysql),
  Supabase: b(siSupabase),
  Firebase: b(siFirebase),
  'REST API': { fallback: Webhook },
  Python: b(siPython),
  Flutter: b(siFlutter),
  Dart: b(siDart),
  Provider: { fallback: Layers },
  Riverpod: { fallback: Waves },
  TypeScript: b(siTypescript),
  SQLite: b(siSqlite),
  Fastify: b(siFastify),
  Git: b(siGit),
  GitHub: b(siGithub),
  Vercel: b(siVercel),
  Laragon: b(siLaragon),
}
