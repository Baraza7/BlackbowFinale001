export async function requireAdmin() {
  const bypass = process.env.ADMIN_BYPASS === "true"
  const isProd = process.env.NODE_ENV === "production"

  if (!isProd && bypass) {
    return { ok: true, reason: "bypass-dev" }
  }

  // TODO: Integrate with real session/role once available
  // Placeholder policy: deny unless explicitly bypassed in dev
  const err: any = new Error("Forbidden")
  err.status = 403
  throw err
}




