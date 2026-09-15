import { NoteBox } from "@/components/BookBlocks";

/** Nội dung mục 1.1 — Cài Python. */
export function SectionCaiPython() {
  return (
    <>
      <div className="badge">🐍 Automation Testing · Chương 1 · Mục 1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Cài Python
      </h1>

      <div className="mt-6 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          Chọn bản ổn định mới nhất trên trang tải (tránh bản có chữ &quot;rc&quot;
          hoặc &quot;a&quot; — đó là bản thử nghiệm). Từ{" "}
          <strong className="text-[color:var(--ink)]">Python 3.10 trở lên</strong>{" "}
          đều dùng được.
        </p>
        <p className="m-0">
          Vào <strong className="text-[color:var(--ink)]">python.org/downloads</strong>{" "}
          — trang tự nhận diện bạn đang dùng Windows và hiện sẵn nút{" "}
          <strong className="text-[color:var(--ink)]">&quot;Download Python 3.x.x&quot;</strong>{" "}
          màu vàng, bấm vào đó để tải file cài đặt (<code>.exe</code>).
        </p>
      </div>

      <NoteBox>
        Không tải Python qua Microsoft Store — bản đó cài vào vị trí đặc biệt
        hay gây rắc rối với PATH. Luôn dùng bản <code>.exe</code> tải trực
        tiếp từ python.org.
      </NoteBox>

      <h2 className="mt-8 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các bước cài đặt
      </h2>
      <ol className="mt-4 space-y-2.5 text-[color:var(--muted)] leading-relaxed list-decimal pl-5">
        <li>
          Chạy file <code>.exe</code> vừa tải.
        </li>
        <li>
          Ở màn hình đầu tiên,{" "}
          <strong className="text-[color:var(--ink)]">
            tick vào ô &quot;Add python.exe to PATH&quot;
          </strong>{" "}
          ở cuối màn hình — đây là bước quan trọng nhất, bỏ qua thì Windows sẽ
          không nhận lệnh <code>python</code> (báo lỗi{" "}
          <code>&apos;python&apos; is not recognized</code>).
        </li>
        <li>
          Bấm <strong className="text-[color:var(--ink)]">&quot;Install Now&quot;</strong>.
        </li>
        <li>Đợi thanh tiến trình chạy xong.</li>
        <li>
          Ở màn hình cuối, nếu thấy dòng{" "}
          <strong className="text-[color:var(--ink)]">&quot;Disable path length limit&quot;</strong>
          , bấm vào đó (giúp tránh lỗi đường dẫn quá dài khi làm việc với
          nhiều thư viện sau này).
        </li>
        <li>
          Bấm <strong className="text-[color:var(--ink)]">Close</strong>.
        </li>
      </ol>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Nếu lỡ bỏ qua bước 2: gỡ cài đặt (Windows Settings → Apps) rồi cài
        lại, tick đúng ô đó.
      </p>
    </>
  );
}
