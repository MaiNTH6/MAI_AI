import { ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 10.3 — Bảng test case hoàn chỉnh. */
export function SectionBangTestCaseHoanChinh() {
  return (
    <>
      <div className="badge">📋 Automation Testing · Chương 10 · Mục 10.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Bảng test case hoàn chỉnh
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Lập từ tài liệu + kết quả gọi thử thật cho mọi endpoint:
      </p>

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        POST /auth (đăng nhập, lấy token)
      </h3>
      <ExplainTable
        headers={["Mã TC", "Test case", "Step", "Kỳ vọng"]}
        rows={[
          [
            "AUTH-01",
            "Đúng username + password (admin / password123)",
            "Gửi POST /auth với body {username: admin, password: password123}",
            "HTTP 200, body có token",
          ],
          [
            "AUTH-02",
            "Sai password",
            "Gửi POST /auth với username=admin, password sai",
            'HTTP 200 (không phải 401), body {"reason":"Bad credentials"}',
          ],
          [
            "AUTH-03",
            "Sai username",
            "Gửi POST /auth với username sai, password=password123",
            'HTTP 200, body {"reason":"Bad credentials"}',
          ],
          [
            "AUTH-04",
            "Thiếu field password",
            "Gửi POST /auth chỉ có username=admin, không gửi password",
            'HTTP 200, body {"reason":"Bad credentials"}',
          ],
          [
            "AUTH-05",
            "Thiếu field username",
            "Gửi POST /auth chỉ có password=password123, không gửi username",
            'HTTP 200, body {"reason":"Bad credentials"}',
          ],
        ]}
      />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        GET /booking, GET /booking/{"{id}"}
      </h3>
      <ExplainTable
        headers={["Mã TC", "Test case", "Step", "Kỳ vọng"]}
        rows={[
          [
            "GET-01",
            "GET /booking (không tham số)",
            "Gửi GET /booking, không kèm tham số",
            "HTTP 200, trả mảng [{bookingid: ...}]",
          ],
          [
            "GET-02",
            "GET /booking?firstname=...&lastname=...",
            "Gửi GET /booking?firstname=...&lastname=... với tên 1 booking đã biết trước",
            "HTTP 200, chỉ trả id khớp bộ lọc",
          ],
          [
            "GET-03",
            "GET /booking/{id} với id có thật",
            "Gửi GET /booking/{id} với id lấy từ GET-01",
            "HTTP 200, đủ field: firstname, lastname, totalprice, depositpaid, bookingdates",
          ],
          [
            "GET-04",
            "GET /booking/{id} với id không tồn tại",
            "Gửi GET /booking/{id} với id chắc chắn không tồn tại (vd 999999999)",
            "HTTP 404",
          ],
        ]}
      />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        POST /booking (tạo booking mới)
      </h3>
      <ExplainTable
        headers={["Mã TC", "Test case", "Step", "Kỳ vọng"]}
        rows={[
          [
            "POST-01",
            "Đủ field hợp lệ, không cần token",
            "Gửi POST /booking với đủ field hợp lệ, không kèm token",
            "HTTP 200, trả bookingid mới + đúng dữ liệu đã gửi",
          ],
          [
            "POST-02",
            "Thiếu field bắt buộc",
            "Gửi POST /booking, cố tình bỏ field firstname",
            "HTTP 500 (Internal Server Error) — không validate rõ ràng",
          ],
          [
            "POST-03",
            "totalprice gửi sai kiểu dữ liệu",
            "Gửi POST /booking với totalprice là chuỗi thay vì số",
            "HTTP 200, nhưng totalprice bị lưu âm thầm thành null",
          ],
        ]}
      />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        PUT/PATCH /booking/{"{id}"} (sửa — cần token), DELETE /booking/{"{id}"} (xoá — cần token)
      </h3>
      <ExplainTable
        headers={["Mã TC", "Test case", "Step", "Kỳ vọng"]}
        rows={[
          [
            "PUT-01",
            "Có token hợp lệ",
            "Đăng nhập lấy token, gửi PUT /booking/{id} kèm header Cookie: token=..., đủ field mới",
            "HTTP 200, dữ liệu cập nhật đúng",
          ],
          [
            "PUT-02",
            "Không có token",
            "Gửi PUT /booking/{id} với đủ field, không kèm header Cookie",
            "HTTP 403",
          ],
          [
            "PATCH-01",
            "Chỉ gửi 1-2 field, có token",
            "Đăng nhập lấy token, gửi PATCH /booking/{id} kèm token, chỉ gửi field totalprice",
            "HTTP 200, chỉ field gửi lên đổi",
          ],
          [
            "DEL-01",
            "Có token hợp lệ",
            "Đăng nhập lấy token, gửi DELETE /booking/{id} kèm token, rồi GET lại đúng id đó",
            "HTTP 201, GET lại id đó phải 404",
          ],
          [
            "DEL-02",
            "Không có token",
            "Gửi DELETE /booking/{id} không kèm token, rồi GET lại đúng id đó",
            "HTTP 403",
          ],
        ]}
      />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        GET /ping
      </h3>
      <ExplainTable
        headers={["Mã TC", "Test case", "Step", "Kỳ vọng"]}
        rows={[["PING-01", "GET /ping", "Gửi GET /ping", "HTTP 201"]]}
      />

      <p className="mt-8 text-[color:var(--muted)] leading-relaxed">
        Ghi chú rút ra khi gọi thử — nhớ khi viết test:
      </p>
      <ul className="mt-3 space-y-2 text-[color:var(--muted)] leading-relaxed">
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <code>bookingid</code>{" "}
            <strong className="text-[color:var(--ink)]">
              không cố định
            </strong>{" "}
            — dữ liệu Restful-Booker tự reset định kỳ. Không hardcode 1 id,
            phải <code>GET /booking</code> lấy id thật trước (đã làm ở
            Chương 7 với fixture <code>mot_booking_id_co_that</code>).
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            Nhóm PUT/PATCH/DELETE cần token: gửi qua header{" "}
            <code>Cookie: token=&lt;token&gt;</code>.
          </span>
        </li>
      </ul>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương 11 triển khai nhóm AUTH-01 → AUTH-05. Chương 12 triển khai
        nhóm GET/POST/PUT/PATCH/DELETE Booking, dựa đúng hành vi thật đã
        xác nhận ở POST-02/POST-03.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chương sau: viết bộ test đầy đủ cho <code>POST /auth</code>.
      </p>
    </>
  );
}
