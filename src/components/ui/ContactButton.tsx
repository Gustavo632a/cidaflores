import { contactLink } from "../../lib/contact";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
  className?: string;
  subject?: string;
}
export function ContactButton({
  children,
  className = "button",
  subject,
}: Props) {
  const href = contactLink(subject);
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith("https:") ? "_blank" : undefined}
      rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
