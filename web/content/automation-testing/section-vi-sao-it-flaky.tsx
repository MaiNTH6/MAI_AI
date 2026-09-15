/** Nội dung mục 5.2 — Vì sao Playwright ít bị "flaky". */
export function SectionViSaoItFlaky() {
  return (
    <>
      <div className="badge">🎯 Automation Testing · Chương 5 · Mục 5.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Vì sao Playwright ít bị &quot;flaky&quot;
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Các công cụ automation đời trước thường phải tự chờ bằng tay (
        <code>sleep(2)</code>) trước khi thao tác, vì phần tử có thể chưa kịp
        hiển thị. Chờ thiếu thì lỗi, chờ thừa thì test chạy chậm vô ích.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Playwright locator tự làm việc này: khi gọi <code>.fill()</code> hay{" "}
        <code>.click()</code>, nó tự chờ phần tử tồn tại, hiển thị, và có thể
        thao tác được — trong 1 khoảng thời gian giới hạn (mặc định 30 giây)
        — rồi mới thực hiện. Bạn không cần tự viết <code>sleep()</code>.
      </p>
    </>
  );
}
