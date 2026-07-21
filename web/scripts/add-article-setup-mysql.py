# -*- coding: utf-8 -*-
"""Bài setup: Dựng phòng Lab MySQL cho QA — vượt lỗi Permission Denied.
Chạy: python -X utf8 scripts/add-article-setup-mysql.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))
SLUG = "setup-mysql-lab-cho-qa"

art = {
    "slug": SLUG,
    "title": "Dựng phòng Lab MySQL cho QA: vượt lỗi Permission Denied ngay từ bước đầu",
    "category": "db-testing",
    "readingTime": 6,
    "publishedAt": "2026-06-23",
    "cover": "🔧",
    "tldr": [
        "Cài MySQL cần 2 thứ riêng biệt: Server (bộ lõi xử lý dữ liệu) + Workbench (giao diện). Chỉ cài Workbench là báo lỗi kết nối ngay.",
        "Dùng gói Zip Bundle: tìm file nặng nhất (~400–500MB) — đó mới là Server. Giải nén vào C:\\Program Files\\MySQL\\.",
        "CMD phải mở bằng Run as administrator — thiếu bước này sẽ gặp ngay lỗi Permission Denied hoặc Install of the Service Denied.",
        "Chạy 4 lệnh đúng thứ tự: cd → initialize-insecure → install → net start.",
    ],
    "tables": [
        {
            "title": "MySQL Server vs MySQL Workbench — khác nhau chỗ nào?",
            "intro": "Trước khi cài, cần phân biệt rõ hai thành phần này — cài thiếu một là lỗi ngay:",
            "columns": ["Thành phần", "Vai trò", "Nếu thiếu"],
            "rows": [
                ["MySQL Server", "Bộ lõi chạy ngầm: lưu trữ và xử lý dữ liệu thật", "Workbench không kết nối được — báo lỗi 127.0.0.1:3306"],
                ["MySQL Workbench", "Giao diện đồ họa: nơi gõ lệnh và xem kết quả", "Vẫn dùng được — thay bằng DBeaver hoặc dòng lệnh"],
            ],
            "note": "⚠️ Bẫy phổ biến: chỉ cài Workbench mà quên cài Server → nhận ngay lỗi 'Failed to Connect to MySQL at 127.0.0.1:3306'.",
        }
    ],
    "stepsTitle": "🔧 Dựng phòng Lab trong 3 bước",
    "stepsSubtitle": "Từ file zip đến kết nối thành công — làm đúng thứ tự sẽ tránh được phần lớn lỗi thường gặp.",
    "steps": [
        {
            "title": "Bước 1 — Tải MySQL Server và Workbench",
            "body": (
                "Cần tải 2 gói riêng biệt:\n\n"
                "① MySQL Server — truy cập: https://dev.mysql.com/downloads/mysql/\n"
                "Chọn hệ điều hành Windows, chọn loại gói ZIP Archive (không phải MSI Installer). "
                "File nặng khoảng 400–500MB.\n\n"
                "② MySQL Workbench — truy cập: https://dev.mysql.com/downloads/workbench/\n"
                "Chọn Windows, tải file MSI về cài bình thường như phần mềm thông thường."
            ),
            "tip": "💡 Cả hai trang đều yêu cầu đăng nhập Oracle — bấm 'No thanks, just start my download' ở dưới để bỏ qua đăng ký.",
        },
        {
            "title": "Bước 2 — Giải nén và đặt đúng thư mục",
            "body": (
                "Trong gói Bundle có nhiều file zip. Tìm file nặng nhất (khoảng 400–500MB) tên dạng "
                "mysql-commercial-[phiên_bản]-winx64.zip — đây mới là Server, các file còn lại là driver phụ.\n\n"
                "Giải nén ra, đổi tên thư mục thành 'MySQL Server 9.7' (theo đúng phiên bản của bạn), "
                "rồi di chuyển vào đường dẫn hệ thống:"
            ),
            "code": "C:\\Program Files\\MySQL\\MySQL Server 9.7\\",
            "tip": "✅ Kiểm tra: mở thư mục vừa di chuyển và đảm bảo thấy thư mục bin bên trong. Thấy bin là bước này đã đúng.",
        },
        {
            "title": "Bước 3 — Kích hoạt Server bằng CMD quyền Administrator",
            "body": (
                "Đây là bước 99% người dùng bị lỗi vì mở CMD thường thay vì mở bằng quyền Administrator.\n\n"
                "Cách mở đúng: nhấn phím Windows → gõ cmd → click chuột phải vào Command Prompt → chọn Run as administrator. "
                "Dòng đầu cửa sổ CMD phải là C:\\Windows\\system32> mới đúng.\n\n"
                "Sau đó chạy lần lượt 4 lệnh sau:"
            ),
            "code": (
                "REM 1. Di chuyển vào thư mục bin\n"
                "cd \"C:\\Program Files\\MySQL\\MySQL Server 9.7\\bin\"\n\n"
                "REM 2. Khởi tạo dữ liệu, xóa trắng mật khẩu root (tiện cho môi trường học)\n"
                "mysqld --initialize-insecure\n\n"
                "REM 3. Đăng ký dịch vụ vào Windows\n"
                "mysqld --install MySQL97\n\n"
                "REM 4. Khởi động dịch vụ\n"
                "net start MySQL97"
            ),
            "tip": "🎉 Nếu thấy 'The MySQL97 service was started successfully.' — bộ lõi đã chạy thành công.",
        },
        {
            "title": "Bước 4 — Kết nối Workbench vào Server",
            "body": (
                "Mở MySQL Workbench, bấm dấu cộng (+) cạnh chữ MySQL Connections để tạo kết nối mới. Điền thông tin:\n\n"
                "• Connection Name: Local_Test\n"
                "• Hostname: 127.0.0.1\n"
                "• Port: 3306\n"
                "• Username: root\n\n"
                "Bấm Test Connection. Khi hệ thống hỏi mật khẩu, để trống hoàn toàn và bấm OK "
                "— vì bước 2 dùng --initialize-insecure nên root chưa có mật khẩu."
            ),
            "tip": "💡 Sau khi vào được: đặt mật khẩu cho root ngay để bảo mật môi trường lab của bạn.",
        },
    ],
    "finalThought": (
        "Tự tay xử lý lỗi Permission và cấu hình dịch vụ Windows không chỉ giúp bạn có phòng Lab để học SQL — "
        "nó còn rèn tư duy xử lý sự cố (troubleshooting), kỹ năng sống còn khi điều tra lỗi hệ thống thực tế sau này."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã thêm:", SLUG)
print("Có steps?", "steps" in art, "| Có tables?", "tables" in art)
print("Giữ:", [k for k in ["tldr", "tables", "steps", "finalThought"] if k in art])
