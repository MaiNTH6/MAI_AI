/**
 * Auth tối giản cho admin MVP — dùng cookie + env var password.
 *
 * ⚠️ MVP only — đủ chặn truy cập tình cờ. Không phải xác thực bulletproof.
 * Production: thay bằng iron-session / next-auth / clerk.
 */

export const ADMIN_COOKIE = "mai_admin";
export const ADMIN_COOKIE_VALUE_PREFIX = "ok:";

export function getAdminPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) {
    // Default dev password để không chặn dev khi chưa set env.
    // Production PHẢI set ADMIN_PASSWORD.
    return "admin123";
  }
  return p;
}

/**
 * Token = "ok:" + base64(sha hex của password).
 * Đủ để chặn người random gõ cookie. KHÔNG bảo vệ trước XSS / sniffing.
 */
export async function makeAdminCookieValue(): Promise<string> {
  const p = getAdminPassword();
  const data = new TextEncoder().encode(p);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return ADMIN_COOKIE_VALUE_PREFIX + hex;
}

export async function isValidAdminCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const expected = await makeAdminCookieValue();
  return value === expected;
}
