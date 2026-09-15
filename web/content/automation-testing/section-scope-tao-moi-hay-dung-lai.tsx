import { ExplainTable, NoteBox } from "@/components/BookBlocks";

/** Nội dung mục 9.2 — scope: tạo mới hay dùng lại. */
export function SectionScopeTaoMoiHayDungLai() {
  return (
    <>
      <div className="badge">🔁 Automation Testing · Chương 9 · Mục 9.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        <code>scope</code> — tạo mới hay dùng lại
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>scope</code> quyết định 1 fixture được tạo lại bao lâu 1 lần —
        có 2 mức hay dùng:
      </p>

      <ExplainTable
        headers={["scope", "Tạo lại khi nào", "Ví von"]}
        rows={[
          [
            '"function" (mặc định)',
            "MỚI HOÀN TOÀN cho MỖI hàm test",
            "Vào phòng thi được phát 1 tờ giấy nháp mới, dùng xong bỏ đi — không ai dùng chung",
          ],
          [
            '"session"',
            "1 LẦN DUY NHẤT cho cả phiên chạy test (1 lần gõ pytest)",
            "Đăng nhập 1 lần đầu ngày, dùng chung phiên đó cho mọi việc",
          ],
        ]}
      />

      <p className="mt-8 text-[color:var(--muted)] leading-relaxed">
        Chọn mức nào — 2 câu hỏi cần trả lời:
      </p>
      <ExplainTable
        headers={["Câu hỏi", "Trả lời"]}
        rows={[
          [
            'Chọn "session" khi nào?',
            "Tài nguyên KHÔNG bị thay đổi sau mỗi lần dùng, và tạo mới lại tốn thời gian. Vd api_context: giống như 1 cái thẻ ra vào công ty — quẹt qua quẹt lại nhiều lần trong ngày, thẻ không hề hao mòn hay đổi gì cả, nên hàng chục test cứ dùng chung 1 api_context cho nhanh, không cần tạo lại từng lần.",
          ],
          [
            'Để mặc định "function" khi nào?',
            "Mỗi test cần 1 bản RIÊNG, độc lập, tránh ảnh hưởng lẫn nhau — xem ví dụ lỗi thật bên dưới.",
          ],
        ]}
      />

      <NoteBox>
        Ví dụ lỗi thật nếu chọn sai: nếu <code>mot_booking_id_co_that</code>{" "}
        lỡ dùng <code>scope=&quot;session&quot;</code>, nó chỉ lấy 1 id DUY
        NHẤT ngay từ đầu rồi dùng chung cho mọi test cả phiên chạy. Tới
        Chương 12, khi có test XOÁ booking đó, các test chạy SAU cũng cố
        dùng đúng id đã bị xoá → lỗi 404 dây chuyền, dù bản thân các test đó
        chẳng viết sai gì. Để mặc định <code>function</code>{" "}
        giúp mỗi test tự lấy 1 id &quot;tươi mới&quot;, không phụ thuộc lẫn
        nhau.
      </NoteBox>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">Tóm lại</strong>: mặc
        định (<code>function</code>) là lựa chọn AN TOÀN — chỉ đổi sang{" "}
        <code>session</code> khi chắc chắn tài nguyên đó dùng chung được mà
        không gây rủi ro gì.
      </p>

      <p className="mt-4 text-sm text-[color:var(--faint)] leading-relaxed">
        pytest còn vài mức <code>scope</code> khác (<code>class</code>,{" "}
        <code>module</code>, <code>package</code>) — nằm giữa{" "}
        <code>function</code> và <code>session</code>. Sách chỉ cần 2 mức
        trên là đủ, không phải sách bỏ sót.
      </p>
    </>
  );
}
