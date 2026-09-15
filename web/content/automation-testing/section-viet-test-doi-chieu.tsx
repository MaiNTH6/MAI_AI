import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 15.2 — Viết test đối chiếu. */
export function SectionVietTestDoiChieu() {
  return (
    <>
      <div className="badge">🧵 Automation Testing · Chương 15 · Mục 15.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Viết test đối chiếu
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Trước khi xem code, nắm luồng lô-gíc bài test sẽ làm — 4 bước sau:
      </p>
      <ul className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">1.</span>
          <span>
            Gọi API <code>GET /api/room</code> để lấy danh sách phòng{" "}
            <strong className="text-[color:var(--ink)]">thật sự có
            trong hệ thống</strong> (dữ liệu gốc, đáng tin).
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">2.</span>
          <span>
            Mở trang chủ UI, tìm tất cả các thẻ phòng đang hiển thị.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">3.</span>
          <span>
            Với từng thẻ phòng trên UI, lấy ra <code>roomid</code> của nó
            (giấu trong đường dẫn link &quot;Book now&quot;), rồi tra ngược
            trong dữ liệu API để lấy đúng tên/giá của phòng đó.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">4.</span>
          <span>
            So sánh: tên và giá hiển thị trên UI có khớp với dữ liệu API
            không.
          </span>
        </li>
      </ul>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tạo file <code>tests/test_05_ket_hop_ui_api.py</code>:
      </p>

      <CodeBlock
        filename="tests/test_05_ket_hop_ui_api.py"
        code={`"""Demo ket hop UI + API tren Restful-Booker Platform (automationintesting.online).

Ky thuat: dung API lam "nguon su that" (ground truth) de kiem tra UI hien thi dung -
thay vi dang nhap qua UI de lay session (khong tim duoc mat khau admin cong khai dang
tin cay cho trang nay, da ghi lai o docs/test-cases-restful-booker.md).
"""
import re

from playwright.sync_api import Page, expect


def test_gia_va_ten_phong_tren_trang_chu_khop_voi_api(page: Page, rbp_api_context):
    """Goi GET /api/room lay du lieu phong that, roi doi chieu voi tung the phong
    hien thi tren trang chu - phat hien duoc ngay neu UI hien sai ten/gia phong."""
    response = rbp_api_context.get("/api/room")
    assert response.status == 200  # goi API lay du lieu goc thanh cong
    danh_sach_phong_api = {phong["roomid"]: phong for phong in response.json()["rooms"]}  # dict comprehension: tao dict tra cuu nhanh theo roomid

    page.goto("https://automationintesting.online/")

    the_phong = page.locator(".room-card")  # tim moi the phong tren trang
    expect(the_phong.first).to_be_visible()  # cho it nhat 1 the phong hien ra

    for i in range(the_phong.count()):  # duyet qua tung the phong dang hien thi
        the = the_phong.nth(i)  # lay the phong thu i
        href = the.get_by_role("link", name="Book now").get_attribute("href")  # lay link "Book now" cua the nay
        roomid = int(re.search(r"/reservation/(\\d+)", href).group(1))  # regex tach so id trong duong dan /reservation/{id}

        assert roomid in danh_sach_phong_api, f"UI hien phong roomid={roomid} nhung API khong co"
        phong_api = danh_sach_phong_api[roomid]  # tra cuu du lieu that cua phong nay qua dict

        expect(the.locator(".card-title")).to_have_text(phong_api["type"])  # doi chieu ten loai phong
        expect(the.locator(".card-footer")).to_contain_text(f"£{phong_api['roomPrice']}")  # doi chieu gia hien thi`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          [
            "def test_...(page: Page, rbp_api_context):",
            "Nhận CẢ 2 fixture — page để thao tác UI, rbp_api_context để gọi API, trong cùng 1 test",
          ],
          [
            'danh_sach_phong_api = {phong["roomid"]: phong for phong in ...}',
            "Dict comprehension — cách viết gọn tạo dict từ 1 list, ở đây tạo dict tra cứu nhanh theo roomid",
          ],
          ['page.locator(".room-card")', "Tìm mọi thẻ phòng trên trang (CSS class .room-card)"],
          ["the_phong.count()", "Đếm số phần tử locator tìm được"],
          [
            'the.get_by_role("link", name="Book now").get_attribute("href")',
            'Lấy giá trị thuộc tính href của link "Book now" trong từng thẻ phòng',
          ],
          [
            're.search(r"/reservation/(\\d+)", href)',
            'Dùng regex (biểu thức chính quy) tìm số trong đường dẫn dạng /reservation/3?... . r"..." là raw string (không xử lý ký tự đặc biệt). (\\d+) nghĩa là "1 nhóm gồm 1 hoặc nhiều chữ số"',
          ],
          [".group(1)", "Lấy đúng phần khớp trong ngoặc () đầu tiên — ở đây là số roomid"],
          ["assert roomid in danh_sach_phong_api", "Kiểm tra phòng UI hiện có tồn tại trong dữ liệu API"],
          [
            'expect(the.locator(".card-title")).to_have_text(...)',
            "Đối chiếu TÊN loại phòng hiển thị đúng với API",
          ],
          [
            'expect(the.locator(".card-footer")).to_contain_text(...)',
            "Đối chiếu GIÁ hiển thị đúng với API",
          ],
        ]}
      />
    </>
  );
}
