import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MAI.tools — Ứng dụng AI vào công việc kiểm thử (QA)",
    template: "%s | MAI.tools",
  },
  description:
    "Hướng dẫn thực chiến ứng dụng AI cho dân QA/Kiểm thử: đọc requirement, đọc code, viết test case, sinh test data. Kèm template Excel + prompt copy-paste sẵn.",
  metadataBase: new URL("https://mai.tools"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "MAI.tools",
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
