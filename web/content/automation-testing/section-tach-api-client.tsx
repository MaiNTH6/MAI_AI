import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 13.2 — Tách api_client.py. */
export function SectionTachApiClient() {
  return (
    <>
      <div className="badge">🏗️ Automation Testing · Chương 13 · Mục 13.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tách <code>api_client.py</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo thư mục <code>utils</code>, file <code>utils/api_client.py</code>:
      </p>

      <CodeBlock
        filename="utils/api_client.py"
        code={`"""Client goi API Restful-Booker - gom cac ham dung lai nhieu lan, thay vi lap code
request/header o tung file test. Tach ra sau khi Checkpoint 4-5 da viet du test va
thay ro cho lap lai o dau (dung Phuong an B: don gian truoc, nang cap sau khi co ly do)."""


class RestfulBookerClient:
    """Boc 1 lop mong quanh APIRequestContext cua Playwright.

    Tap trung duong dan endpoint va cach gan token vao header Cookie mot cho duy nhat,
    de sau nay API doi cach xac thuc thi chi phai sua o day, khong phai sua tung test.
    """

    def __init__(self, api_context, token=None):
        """Luu APIRequestContext dung chung va token (neu co) de gan vao header Cookie."""
        self._api = api_context
        self._token = token

    def _auth_headers(self):
        """Tra ve header Cookie chua token - rong neu client nay khong co token."""
        return {"Cookie": f"token={self._token}"} if self._token else {}  # ternary: co token thi tra dict Cookie, khong thi tra dict rong

    def dang_nhap(self, username, password):
        """POST /auth - tra nguyen response de test tu kiem tra status/body."""
        return self._api.post("/auth", data={"username": username, "password": password})

    def lay_danh_sach_booking(self, **bo_loc):
        """GET /booking, co the truyen filter vd firstname=.., lastname=.."""
        # **bo_loc: gom moi keyword argument goi ham (vd firstname="An") thanh 1 dict de truyen thang lam query params
        return self._api.get("/booking", params=bo_loc)

    def lay_chi_tiet_booking(self, bookingid):
        """GET /booking/{id}."""
        return self._api.get(f"/booking/{bookingid}")

    def tao_booking(self, du_lieu):
        """POST /booking - khong can token."""
        return self._api.post("/booking", data=du_lieu)

    def sua_toan_bo_booking(self, bookingid, du_lieu):
        """PUT /booking/{id} - can token, tu dong gan header Cookie."""
        return self._api.put(f"/booking/{bookingid}", data=du_lieu, headers=self._auth_headers())

    def sua_1_phan_booking(self, bookingid, du_lieu):
        """PATCH /booking/{id} - can token."""
        return self._api.patch(f"/booking/{bookingid}", data=du_lieu, headers=self._auth_headers())

    def xoa_booking(self, bookingid):
        """DELETE /booking/{id} - can token."""
        return self._api.delete(f"/booking/{bookingid}", headers=self._auth_headers())`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đây là 1 <strong className="text-[color:var(--ink)]">class</strong> —
        kiểu tổ chức code gói cả dữ liệu (<code>self._api</code>,{" "}
        <code>self._token</code>) và hành vi (các hàm{" "}
        <code>sua_toan_bo_booking</code>...) vào 1 chỗ. <code>_</code> đứng
        đầu tên hàm/biến (<code>_api</code>, <code>_auth_headers</code>) là
        quy ước Python báo &quot;hàm/biến nội bộ, không dùng từ bên ngoài
        class&quot;.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Thư mục <code>utils</code> cần có file rỗng <code>__init__.py</code>{" "}
        để Python nhận đây là 1 gói (package) import được.
      </p>
    </>
  );
}
