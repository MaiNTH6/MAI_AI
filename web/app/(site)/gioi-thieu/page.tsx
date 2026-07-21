import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Giới thiệu",
  description:
    "maiqai.com là dự án cá nhân — hướng dẫn ứng dụng AI vào công việc kiểm thử (QA) cho người Việt: bài viết, prompt và template miễn phí.",
};

export default function Page() {
  return (
    <LegalPage title="Giới thiệu" emoji="👋">
      <p>
        <strong>maiqai.com</strong> là một dự án cá nhân — nơi mình chia sẻ cách
        ứng dụng AI vào <strong>công việc kiểm thử (QA)</strong> cho người Việt.
        Bài hướng dẫn, prompt và template ở đây đều <strong>miễn phí</strong>;
        không quảng cáo trá hình, không affiliate.
      </p>

      <h2>Dành cho ai?</h2>
      <p>
        Dân QA / Kiểm thử, và những ai làm phần mềm muốn dùng AI vào việc thật:
        đọc &amp; phân tích requirement, đọc hiểu code, viết test case, sinh test
        data, lập checklist &amp; báo cáo. Kèm bộ template (Test Scenario, Test
        Case, Bug Report, RTM...) và prompt copy-paste sẵn.
      </p>

      <h2>Cách mình viết hướng dẫn</h2>
      <ul>
        <li>
          Prompt và quy trình đều được chạy thử trước khi đăng; ví dụ kết quả
          hiển thị là minh họa dựng từ đầu vào mẫu.
        </li>
        <li>
          Luôn chỉ rõ chỗ AI hay &quot;bịa&quot; / hạn chế — để bạn không bị bất
          ngờ khi dùng.
        </li>
        <li>Có prompt copy-paste sẵn + ví dụ kết quả minh họa (truy ngược được từ đầu vào).</li>
        <li>Tiếng Việt dễ hiểu, tránh thuật ngữ kỹ thuật.</li>
      </ul>

      <h2>Đóng góp & liên hệ</h2>
      <p>
        Bạn có góp ý, phát hiện thông tin sai, hoặc muốn đóng góp bài viết? Rất
        hoan nghênh — liên hệ qua email{" "}
        <a href="mailto:mnguyenthihoang99@gmail.com">
          mnguyenthihoang99@gmail.com
        </a>
        . Mình cập nhật nội dung thường xuyên khi các công cụ AI thay đổi.
      </p>

      <p className="text-sm text-slate-500">
        Xem thêm:{" "}
        <Link href="/dieu-khoan">Điều khoản &amp; Miễn trừ trách nhiệm</Link> ·{" "}
        <Link href="/quyen-rieng-tu">Chính sách quyền riêng tư</Link>.
      </p>
    </LegalPage>
  );
}
