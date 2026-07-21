import Link from "next/link";

interface Props {
  href: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}

export function AffiliateButton({
  href,
  label = "Dùng thử miễn phí ngay",
  size = "md",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener nofollow sponsored"
      className={`${size === "lg" ? "btn-cta-lg" : "btn-cta"} ${className}`}
    >
      {label}
      <span aria-hidden>↗</span>
    </Link>
  );
}
