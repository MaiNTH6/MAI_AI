# -*- coding: utf-8 -*-
"""Thêm exampleInput (đầu vào ví dụ) cho mọi prompt để kết quả truy vết được.
Đồng thời chỉnh 2 bảng review cho khớp đầu vào hiển thị.
Chạy: python -X utf8 scripts/add-example-inputs.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))


def art(slug):
    return next(x for x in a if x["slug"] == slug)


# ============ INPUT cho từng prompt: (slug, index) -> exampleInput ============
INPUTS = {}

# ---- Bài REVIEW ----
INPUTS[("quy-trinh-review-test-case", 0)] = (
    "test-cases/dang-nhap.md (bộ test case cần soát):\n"
    "TC-01  Đăng nhập email + mật khẩu đúng → vào trang chủ\n"
    "TC-02  Mật khẩu sai → hiển thị thông báo lỗi\n"
    "TC-03  Email sai định dạng → \"hoạt động đúng\"\n"
    "TC-04  Bỏ trống mật khẩu → báo bắt buộc nhập\n"
    "TC-05  Mật khẩu sai → báo lỗi đăng nhập\n"
    "TC-06  Nhập sai mật khẩu 5 lần → (chưa ghi kết quả mong đợi)"
)
INPUTS[("quy-trinh-review-test-case", 1)] = (
    "requirement/dang-nhap.md (yêu cầu):\n"
    "REQ-01  Đăng nhập bằng email + mật khẩu\n"
    "REQ-02  Khóa tài khoản sau 5 lần sai\n"
    "REQ-03  Quên mật khẩu qua OTP\n"
    "REQ-04  Đăng nhập bằng Google\n\n"
    "test-cases/dang-nhap.md hiện có: TC-01..TC-06 (đều cho luồng email + mật khẩu)"
)

# ---- Bài GEN test case ----
INPUTS[("ai-viet-test-case-tu-user-story", 0)] = (
    "Màn hình: Đăng nhập\n"
    "User story: Là người dùng, tôi đăng nhập bằng email + mật khẩu để vào hệ thống.\n"
    "Tiêu chí nghiệm thu:\n"
    "- Màn hình có: ô Email, ô Mật khẩu, nút Đăng nhập, link \"Quên mật khẩu\".\n"
    "- Nút Đăng nhập chỉ bật khi đã nhập đủ email + mật khẩu.\n"
    "- Email phải đúng định dạng; bỏ trống thì báo lỗi.\n"
    "- Email + mật khẩu đúng → vào trang chủ.\n"
    "- Sai thông tin → báo \"sai thông tin đăng nhập\" (không nói rõ sai cái nào).\n"
    "- Sai 5 lần liên tiếp → khóa tài khoản."
)
INPUTS[("ai-viet-test-case-tu-user-story", 1)] = (
    "Luồng nghiệp vụ E2E: Đặt hàng trên website bán lẻ.\n"
    "Các bước: Chọn sản phẩm → Áp voucher → Thanh toán qua cổng (VNPay) → Trừ kho → Gửi mail xác nhận.\n"
    "Điểm tích hợp ngoài: cổng thanh toán, hệ thống kho, dịch vụ gửi mail (SMTP).\n"
    "Yêu cầu: dữ liệu nhất quán giữa các bước; lỗi giữa chừng không được trừ kho / trừ tiền sai."
)
INPUTS[("ai-viet-test-case-tu-user-story", 2)] = (
    "Bộ test case Đăng nhập đã có (từ Prompt 1):\n"
    "UI-01, UI-02, VAL-01..04, LOG-01..03, ST-01..02, SEC-01.\n"
    "Yêu cầu: tìm case CÒN THIẾU, không lặp lại case đã có."
)

# ---- Bài REQUIREMENT ----
INPUTS[("claude-code-doc-phan-tich-requirement-cho-qa", 0)] = (
    "SRS.md (trích):\n"
    "2.1  Đăng nhập bằng email + mật khẩu → tạo session, vào trang chủ.\n"
    "2.2  Đăng nhập bằng Google OAuth.\n"
    "2.3  Quên mật khẩu: gửi OTP qua email.\n"
    "2.5  Khóa tài khoản sau 5 lần đăng nhập sai.\n"
    "user-story-12.md: Admin mở khóa tài khoản bị khóa."
)
INPUTS[("claude-code-doc-phan-tich-requirement-cho-qa", 1)] = (
    "SRS.md (trích):\n"
    "- Tổng quan: \"khóa tài khoản sau một số lần đăng nhập sai\".\n"
    "- Mục 2.5: \"khóa sau 5 lần sai\".\n"
    "- Mục 2.3: \"OTP gửi qua email\" (không nêu thời gian hết hạn).\n"
    "- Mục 2.1: \"session kéo dài 24 giờ\".\n"
    "user-story-09.md: \"tự đăng xuất sau 30 phút không hoạt động\"."
)
INPUTS[("claude-code-doc-phan-tich-requirement-cho-qa", 2)] = (
    "SRS.md (trích): 2.1 đăng nhập email + mật khẩu; 2.3 quên mật khẩu qua OTP; "
    "2.5 khóa sau 5 lần sai.\n"
    "Ghi chú bảo mật: thông báo lỗi không tiết lộ email có tồn tại hay không."
)

# ---- Bài CODEBASE ----
INPUTS[("claude-code-doc-codebase-tu-git-hieu-he-thong", 0)] = (
    "Cấu trúc repo (rút gọn):\n"
    "src/server.js, src/routes/index.js\n"
    "src/modules/auth/  src/modules/order/  src/modules/payment/\n"
    "src/middleware/auth.js  src/utils/mailer.js\n"
    "client/src/main.jsx\n"
    "prisma/schema.prisma\n"
    "package.json: express, react, vite, @prisma/client"
)
INPUTS[("claude-code-doc-codebase-tu-git-hieu-he-thong", 1)] = (
    "src/routes/auth.routes.js:  router.post('/api/login', validate, authController.login)\n"
    "src/modules/auth/auth.controller.js:  login() → gọi authService.login()\n"
    "src/modules/auth/auth.service.js:\n"
    "  - tìm user theo email\n"
    "  - bcrypt.compare(password)\n"
    "  - nếu failedCount >= 5 → khóa (trả 423)\n"
    "  - sai → 401 'Sai thông tin'; đúng → trả JWT"
)
INPUTS[("claude-code-doc-codebase-tu-git-hieu-he-thong", 2)] = (
    "order.service.js:  tính phí ship theo vùng + khuyến mãi (nhiều if lồng nhau); "
    "lưu thời gian không set múi giờ\n"
    "profile.controller.js:  cập nhật tên — không kiểm độ dài\n"
    "payment.service.js:  cộng tiền bằng số thực (float)\n"
    "order.controller.js:  deleteOrder() chỉ kiểm đăng nhập, không kiểm chủ sở hữu\n"
    "Thư mục payment/: không có file *.test.js"
)
INPUTS[("claude-code-doc-codebase-tu-git-hieu-he-thong", 3)] = (
    "auth.service.js:55      if (failedCount >= 5) lockAccount()\n"
    "order.service.js:80     shippingFee = base[region] + surcharge - discount\n"
    "order.controller.js:95  deleteOrder(): chỉ requireLogin()\n"
    "cart.config.js:8        CART_TTL_DAYS = 30"
)

# ---- Bài CONFLUENCE ----
INPUTS[("claude-code-ket-noi-confluence-doc-tai-lieu-du-an", 0)] = (
    "Các trang Confluence (space Thanh toán):\n"
    "- 'Payment Overview': hỗ trợ VNPay, Momo, thẻ quốc tế; hoàn tiền 3-5 ngày làm việc.\n"
    "- 'Payment Rules': đơn hết hạn thanh toán sau 15 phút.\n"
    "- 'Order States': thanh toán thất bại → giữ đơn ở trạng thái 'Chờ' 24h.\n"
    "- 'Refund Policy': hoàn tiền xử lý trong 3-5 ngày làm việc."
)
INPUTS[("claude-code-ket-noi-confluence-doc-tai-lieu-du-an", 1)] = (
    "Câu hỏi: \"Khi đơn bị hủy thì quy trình hoàn tiền thế nào?\"\n"
    "Trang liên quan:\n"
    "- 'Refund Policy': hủy trong 24h → hoàn 100%; sau 24h (đã đóng gói) → trừ phí 10%; hoàn 3-5 ngày.\n"
    "- 'Payment Overview': hoàn qua cổng thanh toán gốc.\n"
    "- 'CSKH FAQ': phí xử lý hủy đơn 5%."
)
INPUTS[("claude-code-ket-noi-confluence-doc-tai-lieu-du-an", 2)] = (
    "Trang: 'Order States' (đơn hết hạn sau \"một thời gian\"), "
    "'Refund Policy' (phí hủy 10%), 'CSKH FAQ' (phí 5%).\n"
    "Không có trang nào mô tả: thanh toán thành công nhưng tạo đơn lỗi; hoàn tiền cho đơn trả góp."
)

# ============ Áp exampleInput ============
applied = 0
for (slug, idx), val in INPUTS.items():
    art(slug)["prompts"][idx]["exampleInput"] = val
    applied += 1

# ============ Chỉnh 2 bảng REVIEW cho khớp đầu vào ============
r = art("quy-trinh-review-test-case")
r["prompts"][0]["result"] = "AI trả về (soát file test-cases/dang-nhap.md ở trên):"
r["prompts"][0]["resultGroups"] = [{
    "group": "",
    "columns": ["Case ID", "Vấn đề", "Nhóm", "Mức độ", "Đề xuất sửa"],
    "rows": [
        ["TC-05", "Trùng nội dung với TC-02 (cùng kiểm mật khẩu sai)", "Không trùng", "Trung bình", "Gộp hoặc bỏ TC-05"],
        ["TC-03", "Kết quả mong đợi mơ hồ (\"hoạt động đúng\")", "Rõ ràng", "Cao", "Ghi rõ: hiện lỗi \"Email không hợp lệ\""],
        ["TC-06", "Thiếu kết quả mong đợi (hành vi sau 5 lần sai)", "Đúng đắn", "Cao", "Bổ sung: khóa tài khoản / hiện captcha"],
        ["(cả file)", "Không case nào gắn Req ID", "Truy vết", "Thấp", "Gắn requirement tương ứng"],
    ],
}]

r["prompts"][1]["result"] = "AI trả về (đối chiếu requirement/ với test-cases/ ở trên):"
r["prompts"][1]["resultGroups"] = [{
    "group": "",
    "columns": ["Req ID", "Mô tả ngắn", "Đã có case?", "File / Case liên quan"],
    "rows": [
        ["REQ-01", "Đăng nhập email + mật khẩu", "Có", "dang-nhap.md: TC-01..TC-05"],
        ["REQ-02", "Khóa sau 5 lần sai", "Một phần", "dang-nhap.md: TC-06 (thiếu kết quả mong đợi)"],
        ["REQ-03", "Quên mật khẩu qua OTP", "CHƯA", "— → thêm case: OTP đúng / sai / hết hạn"],
        ["REQ-04", "Đăng nhập Google", "CHƯA", "— → thêm case: thành công, hủy, tài khoản chưa đăng ký"],
    ],
}]

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã thêm exampleInput cho", applied, "prompt + chỉnh 2 bảng review.")

# Kiểm: prompt nào còn thiếu exampleInput?
missing = []
for x in a:
    for i, p in enumerate(x.get("prompts") or []):
        if not p.get("exampleInput"):
            missing.append("%s P%d" % (x["slug"], i + 1))
print("Prompt còn THIẾU exampleInput:", missing if missing else "KHÔNG")
