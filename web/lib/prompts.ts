export interface PromptItem {
  title: string;
  prompt: string;
}

export interface PromptTopic {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  prompts: PromptItem[];
}

export const promptTopics: PromptTopic[] = [
  {
    slug: "qa-test",
    title: "Cho QA / Kiểm thử",
    emoji: "🧪",
    description:
      "Đọc requirement, viết test case, sinh test data, bug report.",
    prompts: [
      {
        title: "Sinh test case từ user story",
        prompt:
          "Bạn là QA giàu kinh nghiệm. Từ user story dưới đây, hãy viết bộ test case gồm: happy path, negative case, boundary/biên, và case bảo mật. Mỗi test case ghi: mã, tiền điều kiện, các bước, kết quả mong đợi. Chỉ dựa trên user story, đánh dấu chỗ nào cần làm rõ thêm.\n\n[DÁN USER STORY]",
      },
      {
        title: "Phân tích requirement tìm điểm mơ hồ",
        prompt:
          "Với vai trò QA, rà soát requirement dưới đây và liệt kê: (1) điểm MƠ HỒ thiếu định lượng; (2) điểm MÂU THUẪN; (3) trường hợp/biên THIẾU SÓT chưa mô tả. Mỗi mục kèm câu hỏi cụ thể để hỏi BA. Không bịa — nếu không chắc, ghi 'cần xác nhận'.\n\n[DÁN REQUIREMENT]",
      },
      {
        title: "Viết bug report chuẩn từ mô tả lỗi",
        prompt:
          "Chuyển mô tả lỗi sau thành một bug report chuẩn gồm: Tiêu đề ngắn gọn, Môi trường, Các bước tái hiện (đánh số), Kết quả thực tế, Kết quả mong đợi, Mức độ nghiêm trọng (đề xuất). Viết rõ ràng để dev tái hiện được ngay.\n\n[DÁN MÔ TẢ LỖI]",
      },
      {
        title: "Sinh test data đa dạng",
        prompt:
          "Sinh giúp tôi bộ test data cho trường [TÊN TRƯỜNG, vd: email / số điện thoại VN / ngày sinh]. Bao gồm: giá trị hợp lệ điển hình, giá trị biên, giá trị không hợp lệ (sai định dạng, rỗng, quá dài, ký tự đặc biệt). Trình bày dạng bảng kèm cột 'kết quả mong đợi'.",
      },
      {
        title: "Review test case tìm case còn thiếu",
        prompt:
          "Đây là bộ test case tôi đã viết cho chức năng [TÊN]. Hãy review với góc nhìn QA Lead: chỉ ra case nào bị trùng, case nào còn thiếu (đặc biệt negative/boundary/bảo mật), và đề xuất bổ sung. Không viết lại — chỉ nhận xét và liệt kê case thiếu.\n\n[DÁN BỘ TEST CASE]",
      },
      {
        title: "Tạo checklist kiểm thử nhanh (smoke test)",
        prompt:
          "Tạo checklist smoke test cho [TÊN CHỨC NĂNG/MÀN HÌNH] — những điểm bắt buộc phải chạy được trước khi nhận build để test sâu. Trình bày dạng checkbox, ưu tiên các luồng chính và điểm dễ vỡ nhất.",
      },
    ],
  },
  {
    slug: "van-phong",
    title: "Văn phòng chung",
    emoji: "💼",
    description: "Email, biên bản họp, thông báo, sắp xếp công việc.",
    prompts: [
      {
        title: "Viết email từ chối khéo",
        prompt:
          "Viết email từ chối [YÊU CẦU/LỜI MỜI] một cách lịch sự, giữ quan hệ tốt. Nêu lý do ngắn gọn, thể hiện thiện chí, và (nếu hợp lý) đề xuất phương án thay thế. Cho 2 phiên bản: trang trọng và thân thiện.",
      },
      {
        title: "Tóm tắt biên bản cuộc họp",
        prompt:
          "Tóm tắt nội dung cuộc họp dưới đây thành biên bản gọn: (1) Các quyết định chính; (2) Việc cần làm — ai làm, hạn nào; (3) Vấn đề còn treo. Bỏ phần lan man.\n\n[DÁN GHI CHÚ / TRANSCRIPT HỌP]",
      },
      {
        title: "Soạn thông báo nội bộ",
        prompt:
          "Soạn thông báo nội bộ về [NỘI DUNG]. Ngắn gọn, rõ ai cần làm gì, khi nào. Giọng chuyên nghiệp nhưng không cứng nhắc. Có tiêu đề và phần kêu gọi hành động rõ ràng.",
      },
      {
        title: "Lập to-do ưu tiên từ mớ công việc",
        prompt:
          "Đây là mớ công việc đang rối của tôi. Hãy sắp xếp thành danh sách ưu tiên theo ma trận khẩn cấp/quan trọng, đề xuất nên làm gì trước, gộp việc nào làm cùng nhau, và việc nào có thể hoãn/uỷ quyền.\n\n[LIỆT KÊ CÔNG VIỆC]",
      },
    ],
  },
];
