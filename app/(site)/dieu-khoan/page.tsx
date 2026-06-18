import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Điều khoản & Miễn trừ trách nhiệm",
  description:
    "Điều khoản sử dụng, miễn trừ trách nhiệm nội dung và tuyên bố về thương hiệu của MAI.tools.",
};

export default function Page() {
  return (
    <LegalPage
      title="Điều khoản & Miễn trừ trách nhiệm"
      emoji="📜"
      lastUpdated="16/06/2026"
    >
      <h2>1. Tính chất nội dung</h2>
      <p>
        Toàn bộ nội dung trên MAI.tools mang tính <strong>tham khảo và giáo
        dục</strong>. Bạn tự chịu trách nhiệm khi áp dụng vào công việc của mình.
        Mình cố gắng kiểm chứng thông tin, nhưng công cụ AI thay đổi liên tục —
        kết quả thực tế có thể khác với mô tả.
      </p>

      <h2>2. Về các công cụ của bên thứ ba</h2>
      <p>
        Các công cụ AI được nhắc tới (NotebookLM, Gamma, Canva, ChatGPT, Claude,
        Claude Code...) là sản phẩm của các bên thứ ba. Khi sử dụng, bạn tuân
        theo điều khoản &amp; chính sách của chính hãng đó. MAI.tools không kiểm
        soát và không chịu trách nhiệm về hoạt động, giá cả, hay thay đổi của
        các công cụ này.
      </p>

      <h2>3. Tuyên bố về thương hiệu</h2>
      <p>
        Mọi tên thương hiệu, logo, nhãn hiệu được nhắc đến thuộc về chủ sở hữu
        tương ứng. MAI.tools <strong>không liên kết, không được tài trợ và không
        đại diện</strong> cho bất kỳ hãng nào. Việc nhắc tên chỉ nhằm mục đích
        hướng dẫn, đánh giá khách quan.
      </p>

      <h2>4. Lưu ý bảo mật khi dùng AI trong công việc</h2>
      <p>
        Một số hướng dẫn (đặc biệt cho QA/Kiểm thử) liên quan tới việc đưa tài
        liệu hoặc mã nguồn cho công cụ AI xử lý. Trước khi làm với dữ liệu của
        công ty/khách hàng, bạn <strong>phải tuân thủ thỏa thuận bảo mật (NDA)
        và chính sách nội bộ</strong> nơi bạn làm việc. MAI.tools không chịu
        trách nhiệm cho việc rò rỉ dữ liệu do người dùng tự gây ra.
      </p>

      <h2>5. Bản quyền</h2>
      <p>
        Nội dung hướng dẫn, prompt và template do MAI.tools biên soạn. Bạn được
        tự do sử dụng cho công việc cá nhân. Nếu chia sẻ lại, vui lòng ghi nguồn
        và không sao chép nguyên si cho mục đích thương mại.
      </p>

      <h2>6. Thay đổi điều khoản</h2>
      <p>
        Điều khoản này có thể được cập nhật. Phiên bản mới sẽ hiển thị ngày cập
        nhật ở đầu trang.
      </p>
    </LegalPage>
  );
}
