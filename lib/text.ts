export function clamp(text: string | null | undefined, max = 800) {
  if (!text) return ""
  const s = String(text)
  return s.length <= max ? s : s.slice(0, max) + "…"
}


