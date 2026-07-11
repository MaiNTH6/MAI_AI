# Sách #2 — (chủ đề: đang chờ chốt)

> Dự án sách thứ 2 của maiqai.com. **Độc lập hoàn toàn** với sách SQL cũ (`book/`) —
> không dùng chung nội dung, dữ liệu, hay script. Chỉ tái dùng bộ font Liberation
> (SIL OFL, license-clean) vì mọi sách PDF đều cần font nhúng sạch bản quyền.

## Cấu trúc thư mục

```
book2/
├─ README.md            ← file này
├─ scripts/             ← script sinh PDF + dữ liệu nội dung
│  └─ fonts/            ← Liberation Sans/Mono (SIL OFL) — nhúng vào PDF
├─ data/                ← nguồn dữ liệu mẫu (nếu sách cần)
├─ drafts/              ← bản nháp, ghi chú, phác thảo mục lục
└─ dist/                ← PDF xuất ra (không commit — gitignore)
```

## Trạng thái
- [ ] Chốt **chủ đề & đối tượng** cuốn sách
- [ ] Chốt **phạm vi (scope)** — chương/mục lớn
- [ ] Chốt **định dạng nội dung** (giống sách 1: tình huống → ví dụ → góc nhìn?)
- [ ] Dựng generator PDF + bìa
- [ ] Viết nội dung
- [ ] Review + verify

## Quy ước kế thừa từ sách 1 (áp dụng nếu phù hợp)
- Font nhúng license-clean (đã có sẵn ở `scripts/fonts/`).
- **Không dùng emoji trong PDF** (font ra ô vuông □).
- Nội dung **100% tự viết**, không copy nguồn khác.
- Trung thực: luôn có phần hạn chế/góc soi lỗi.
