import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "maiqai.com — Ứng dụng AI vào công việc kiểm thử (QA)",
    template: "%s | maiqai.com",
  },
  description:
    "Hướng dẫn thực chiến ứng dụng AI cho dân QA/Kiểm thử: đọc requirement, đọc code, viết test case, sinh test data. Kèm template Excel + prompt copy-paste sẵn.",
  metadataBase: new URL("https://maiqai.com"),
  alternates: { canonical: "/" },
  verification: { google: "vs4v9x4NqFPp2yCJ-9W30A7II6uUF9EX1vdIM0YowTo" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "maiqai.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
