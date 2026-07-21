import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Chính sách quyền riêng tư",
  description:
    "maiqai.com không thu thập email hay dữ liệu cá nhân, không dùng cookie theo dõi.",
};

export default function Page() {
  return (
    <LegalPage
      title="Chính sách quyền riêng tư"
      emoji="🔒"
      lastUpdated="16/06/2026"
    >
      <p>
        Tóm tắt một câu: <strong>maiqai.com không thu thập bất kỳ dữ liệu cá nhân
        nào của bạn.</strong>
      </p>

      <h2>1. Chúng tôi KHÔNG thu thập</h2>
      <ul>
        <li>Không yêu cầu email, không có form đăng ký, không tạo tài khoản.</li>
        <li>Không thu thập tên, số điện thoại hay thông tin cá nhân nào.</li>
        <li>Không dùng cookie theo dõi hay quảng cáo.</li>
      </ul>

      <h2>2. Các tính năng chạy ngay trên trình duyệt của bạn</h2>
      <ul>
        <li>
          <strong>Tìm kiếm</strong>: chạy nội bộ trên trang, không gửi từ khóa
          đi đâu.
        </li>
        <li>
          <strong>Nút Copy / Tải Excel</strong>: thực hiện hoàn toàn trên máy
          bạn, không qua máy chủ.
        </li>
      </ul>

      <h2>3. Liên kết tới công cụ bên ngoài</h2>
      <p>
        Một số bài có liên kết tới công cụ AI (NotebookLM, Gamma, Canva...). Khi
        bạn bấm sang trang của họ, chính sách quyền riêng tư của hãng đó sẽ áp
        dụng — maiqai.com không kiểm soát những trang này.
      </p>

      <h2>4. Nếu có thay đổi trong tương lai</h2>
      <p>
        Nếu sau này có thêm công cụ thống kê truy cập ẩn danh (ví dụ đếm lượt
        xem), trang này sẽ được cập nhật để thông báo rõ ràng trước khi áp dụng.
      </p>
    </LegalPage>
  );
}
