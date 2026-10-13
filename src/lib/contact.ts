import { site } from "../config/site.ts";
export function contactLink(
  subject = "Gostaria de consultar opções de flores.",
) {
  return /^\d{10,15}$/.test(site.whatsapp)
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá, Cida Flores! ${subject}`)}`
    : "#contato";
}
export function safeHttps(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
