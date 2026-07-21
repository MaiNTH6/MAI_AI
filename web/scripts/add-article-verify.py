# -*- coding: utf-8 -*-
"""Bài trụ: Kiểm chứng output AI cho QA (judgment layer).
Chạy: python -X utf8 scripts/add-article-verify.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))
SLUG = "kiem-chung-output-ai-cho-qa"

RESULT2 = """AI trả về (soi file test đăng nhập ở trên):

1) (Cao) Selector get_by_label("Mật khẩu") — nếu ô nhập không gắn <label> đúng chữ này, test sẽ đỏ ngay. Kiểm: mở trang xem nhãn thật của ô mật khẩu.
2) (Cao) Assertion TC-01 chỉ kiểm "thấy link Tài khoản" — chưa chắc đã thật sự vào trang chủ (link đó có thể hiện ở nơi khác). Kiểm: xác nhận thêm URL hoặc một nội dung đặc trưng của trang chủ.
3) (Trung bình) Mật khẩu mẫu "MatKhau@123" — có thể không thỏa policy thật của hệ thống. Kiểm: đối chiếu quy tắc mật khẩu trong requirement.

→ Tập trung kiểm 2 chỗ "Cao" trước; chỗ "Trung bình" xử lý sau."""

art = {
    "slug": SLUG,
    "title": "AI sinh test xong rồi — làm sao biết nó SAI? Sổ tay kiểm chứng output AI cho QA",
    "excerpt": (
        "AI giờ sinh test case, script, phân tích requirement chỉ trong vài giây — và output trông rất thuyết phục. "
        "Nhưng 'trông đúng' không phải 'đúng'. Bài này gom các kiểu AI hay sai khi làm việc QA và cách bắt từng loại, "
        "cùng 2 prompt nhờ chính AI soi lại — để bạn dùng AI mà vẫn giữ quyền kiểm soát."
    ),
    "category": "ai-qa",
    "readingTime": 10,
    "publishedAt": "2026-06-19",
    "cover": "🔍",
    "intro": {
        "problem": (
            "Năm 2026, AI làm gần như mọi việc bàn giấy của QA: sinh test case, viết script, bóc tách requirement, dựng dữ liệu. "
            "Vấn đề mới không còn là 'làm sao tạo ra', mà là 'làm sao biết cái nó tạo ra có đúng không'. Output của AI thường mượt, "
            "đầy đủ, đọc rất thuyết phục — nên dễ tin theo. Nguy hiểm nhất là test 'xanh' giả: bộ test chạy qua hết nhưng thật ra "
            "chẳng kiểm gì cả, tạo cảm giác an toàn trong khi lỗi vẫn lọt."
        ),
        "whatIs": (
            "Kiểm chứng output AI không phải là chống AI hay làm lại từ đầu — mà là soi kết quả AI một cách có hệ thống trước khi "
            "dùng: dữ kiện này lấy từ đâu, chỗ nào AI tự suy diễn, có sót dạng nào, assertion có thật sự kiểm đúng thứ cần kiểm. "
            "Nói ngắn: AI lo phần 'tạo ra', bạn lo phần 'có tin được không'."
        ),
        "whyThis": (
            "Đây mới là phần khó thay thế của nghề tester thời AI. Một prompt thì ai cũng xin được; nhưng biết output sai ở đâu, "
            "sai kiểu gì, và quyết định giữ/sửa/bỏ — cần kinh nghiệm và phán đoán mà AI không tự trao cho bạn. Kỹ năng kiểm chứng "
            "giờ quan trọng hơn kỹ năng 'biết nhiều prompt'."
        ),
    },
    "tldr": [
        "\"Trông đúng\" không phải \"đúng\": output AI mượt nên dễ tin theo, nhất là test \"xanh\" giả.",
        "AI hay sai theo vài kiểu cố định — biết trước thì bắt rất nhanh.",
        "Quy tắc số 1: mọi dữ kiện trong output phải truy được về đầu vào; không truy được = nghi bịa.",
        "Test xanh chưa đủ: thử làm hỏng app / đổi dữ liệu xem test có đỏ không.",
        "Có thể nhờ chính AI soi lại output, nhưng quyết định cuối vẫn là người.",
    ],
    "steps": [
        {
            "title": "Kiểu 1 — Bịa dữ kiện (số, ID, nguồn không có trong đầu vào)",
            "body": (
                "AI hay 'điền vào chỗ trống' bằng dữ kiện nghe hợp lý nhưng không có trong đầu vào: một con số ngưỡng, một mã lỗi, "
                "một trích dẫn tài liệu. Cách bắt: truy nguồn từng dữ kiện — mỗi số / ID / quy tắc trong output phải chỉ ra được nó "
                "lấy từ dòng nào của đầu vào. Không truy được = nghi bịa, đánh dấu 'cần xác nhận' rồi hỏi lại BA/dev."
            ),
        },
        {
            "title": "Kiểu 2 — Kết quả mong đợi mơ hồ hoặc sai",
            "body": (
                "Những câu kiểu 'hệ thống hoạt động đúng', 'hiển thị phù hợp' nghe xuôi tai nhưng không kiểm được. Cách bắt: với mỗi "
                "case, hỏi 'làm sao biết nó đúng?'. Nếu không trả lời được bằng một điều quan sát được (thấy chữ X, chuyển sang trang "
                "Y, trả về mã Z) thì kết quả mong đợi đó vô dụng. Luôn đối chiếu lại requirement gốc."
            ),
            "linkSlug": "ai-viet-test-case-tu-user-story",
            "linkLabel": "Xem cách viết kết quả mong đợi rõ ràng",
        },
        {
            "title": "Kiểu 3 — Sót tổ hợp, giá trị biên, nhánh âm tính",
            "body": (
                "AI liệt kê happy path rất tốt, nhưng hay sót: tổ hợp nhiều điều kiện cùng lúc, giá trị biên (ngay trên/dưới ngưỡng), "
                "trường hợp âm tính hiếm. Cách bắt: soi lại bằng checklist kỹ thuật thiết kế test (phân vùng tương đương, giá trị biên, "
                "bảng quyết định) và hỏi thẳng 'còn thiếu dạng nào'. Đừng coi danh sách AI đưa ra là đã đủ."
            ),
            "linkSlug": "quy-trinh-review-test-case",
            "linkLabel": "Checklist 7 nhóm soát không lọt case",
        },
        {
            "title": "Kiểu 4 — Test \"xanh\" giả (assertion yếu, luôn pass)",
            "body": (
                "Nguy hiểm nhất với automation: test chạy qua hết nhưng assertion quá lỏng (chỉ kiểm 'có phần tử nào đó', không kiểm "
                "đúng nội dung) nên không bao giờ đỏ — vô dụng mà tưởng an toàn. Cách bắt: cố tình làm sai rồi xem test có đỏ không — "
                "đổi một chữ trong app, bỏ một bước, cho dữ liệu sai. Test không đỏ khi đáng lẽ phải đỏ = test rởm, phải siết assertion."
            ),
        },
        {
            "title": "Kiểu 5 — Gộp nguồn cũ/mới thành câu trả lời mượt nhưng sai",
            "body": (
                "Khi đọc nhiều trang tài liệu hoặc nhiều file code, AI hay trộn thông tin từ phiên bản cũ và mới thành một câu trả lời "
                "trôi chảy nhưng lệch thực tế. Cách bắt: với mỗi kết luận quan trọng, hỏi 'lấy từ trang/file nào' rồi mở đúng nguồn đó "
                "đối chiếu. Ưu tiên nguồn có ghi ngày tháng / phiên bản."
            ),
            "linkSlug": "claude-code-ket-noi-confluence-doc-tai-lieu-du-an",
            "linkLabel": "Xem cách bắt mâu thuẫn giữa các trang tài liệu",
        },
        {
            "title": "Kiểu 6 — Tự tin sai ở vùng code phức tạp",
            "body": (
                "Với code bất đồng bộ, hàng đợi, race condition, múi giờ, AI hay trace sai nhưng vẫn trình bày chắc nịch. Cách bắt: ở "
                "những vùng rủi ro cao (thanh toán, xác thực, đồng bộ dữ liệu), không dùng output AI làm kết luận — coi nó là giả "
                "thuyết, tự đọc code và hỏi dev để xác nhận trước khi đưa vào test plan."
            ),
            "linkSlug": "claude-code-doc-codebase-tu-git-hieu-he-thong",
            "linkLabel": "Xem cách trace luồng nghiệp vụ qua code",
        },
    ],
    "prompts": [
        {
            "title": "Prompt 1 — Tách dữ kiện có căn cứ với dữ kiện AI tự thêm",
            "goal": "Nhờ AI tự soi lại output của nó: dữ kiện nào lấy từ đầu vào, cái nào nó tự suy diễn — để bạn biết chỗ nào cần xác minh.",
            "prompt": (
                "Dưới đây là đầu vào và một output bạn vừa tạo. Hãy rà lại chính output đó và lập bảng: "
                "Dữ kiện | Lấy từ đâu trong đầu vào (trích dòng) | Hay do bạn tự suy diễn/giả định. "
                "Đánh dấu rõ những dữ kiện KHÔNG có trong đầu vào để tôi xác minh. Không bào chữa, không thêm dữ kiện mới.\n\n"
                "[DÁN ĐẦU VÀO + OUTPUT CẦN SOI VÀO ĐÂY]"
            ),
            "exampleInput": (
                "Đầu vào (requirement): \"Khóa tài khoản sau 5 lần đăng nhập sai.\"\n"
                "Output AI cần soi (1 test case): \"Sai mật khẩu 5 lần → khóa tài khoản 30 phút, gửi email cảnh báo.\""
            ),
            "result": "AI trả về (soi đầu vào ở trên) — 2/3 dữ kiện là AI tự thêm, cần xác nhận với BA. Bảng truy nguồn:",
            "resultGroups": [{
                "group": "",
                "columns": ["Dữ kiện trong output", "Lấy từ đâu", "Ghi chú"],
                "rows": [
                    ["Khóa sau 5 lần sai", "requirement (có)", "OK"],
                    ["Khóa 30 phút", "KHÔNG có trong đầu vào", "⚠️ AI tự thêm — cần xác nhận"],
                    ["Gửi email cảnh báo", "KHÔNG có trong đầu vào", "⚠️ AI tự thêm — cần xác nhận"],
                ],
            }],
            "testerNote": (
                "Cách nhanh để lộ chỗ AI 'điền vào chỗ trống'. Nhưng AI tự soi cũng có thể bỏ sót hoặc bào chữa cho lỗi của chính "
                "nó — vẫn nên tự đối chiếu lại đầu vào, đừng phó thác hoàn toàn việc kiểm cho đúng cái cần kiểm."
            ),
        },
        {
            "title": "Prompt 2 — Bắt AI chỉ ra chỗ dễ sai nhất để tập trung kiểm",
            "goal": "Nhờ AI tự chỉ những chỗ trong output dễ sai/rủi ro nhất + vì sao, để bạn dồn sức kiểm đúng chỗ thay vì rà đều.",
            "prompt": (
                "Dưới đây là một output bạn vừa tạo. Giả sử bạn là một QA khó tính review lại nó: chỉ ra 3-5 chỗ dễ sai hoặc rủi ro "
                "nhất, mỗi chỗ nói rõ vì sao đáng nghi và tôi nên kiểm gì để xác nhận. Xếp theo mức rủi ro giảm dần.\n\n"
                "[DÁN OUTPUT CẦN SOI VÀO ĐÂY]"
            ),
            "exampleInput": (
                "Output cần soi: file test Playwright cho màn đăng nhập (Page Object + 3 test), dùng "
                "get_by_label(\"Mật khẩu\"), get_by_role(\"link\", name=\"Tài khoản\"), mật khẩu mẫu \"MatKhau@123\"."
            ),
            "result": RESULT2,
            "testerNote": (
                "Prompt này giúp khoanh vùng nhưng không thay việc kiểm — AI chỉ đoán chỗ rủi ro dựa trên văn bản, không chạy thật. "
                "Dùng nó để biết nên kiểm ĐÂU trước, rồi tự kiểm / chạy thật để biết ĐÚNG hay SAI."
            ),
        },
    ],
    "pros": [
        "Bắt lỗi trước khi đưa vào dùng — tránh test rởm tạo cảm giác an toàn giả.",
        "Biến việc dùng AI từ 'tin theo' thành 'tin có kiểm'.",
        "Áp được cho mọi output AI (test case, script, phân tích, bug report), không riêng một việc.",
        "Là kỹ năng AI khó thay — nâng giá trị của người tester.",
    ],
    "cons": [
        "Tốn thêm thời gian so với dùng thẳng output AI.",
        "Cần kiến thức nền để biết cái gì là sai — người mới phải vừa học vừa kiểm.",
        "Không có cách kiểm nào bắt được 100% lỗi.",
    ],
    "bugs": [
        "Nhờ AI tự soi: chính nó có thể bỏ sót hoặc bào chữa cho lỗi của mình — đừng coi đó là một lớp kiểm độc lập.",
        "Mẹo 'cố tình làm hỏng' (mutation) chỉ bắt được loại lỗi bạn nghĩ ra để thử, không phải mọi lỗi.",
        "Kiểm chứng làm qua loa thì cũng thành một dạng 'xanh giả' khác — kiểm cho có còn nguy hơn không kiểm.",
        "Kiến thức nghiệp vụ vẫn là gốc: không hiểu hệ thống thì không biết output sai chỗ nào, dù soi cách mấy.",
    ],
    "faq": [
        {
            "question": "Kiểm lại như vậy có chậm hơn tự làm tay không?",
            "answer": (
                "Vẫn nhanh hơn làm tay, vì AI lo phần nặng; kiểm chỉ là một lớp soi mỏng. Và nó cứu bạn khỏi những lỗi đắt giá phát "
                "hiện muộn — rẻ hơn nhiều so với để test rởm lọt vào bộ chạy chính."
            ),
        },
        {
            "question": "Người mới chưa có kinh nghiệm thì kiểm kiểu gì?",
            "answer": (
                "Bắt đầu từ hai quy tắc dễ nhất, không cần nhiều kinh nghiệm: (1) truy nguồn dữ kiện — cái này có trong đầu vào không; "
                "(2) đòi kết quả mong đợi quan sát được — 'làm sao biết nó đúng'. Hai cái này đã chặn phần lớn lỗi AI hay mắc."
            ),
        },
        {
            "question": "Nhờ AI tự kiểm output của nó có đáng tin không?",
            "answer": (
                "Đáng dùng để khoanh vùng, không đáng để kết luận. Luôn giữ một bước người xác nhận, nhất là ở chỗ rủi ro cao "
                "(tiền, bảo mật, đồng bộ dữ liệu). Coi AI tự soi là trợ lý nhắc việc, không phải người duyệt cuối."
            ),
        },
        {
            "question": "Áp dụng cho những output nào?",
            "answer": (
                "Mọi thứ AI sinh cho QA: test case, script automation, phân tích requirement, bug report, dữ liệu test. Quy trình soi "
                "gần như giống nhau — chỉ đổi 'đầu vào để đối chiếu' cho phù hợp từng việc."
            ),
        },
    ],
    "finalThought": (
        "Thời AI làm được hết, người tester giỏi không phải người biết nhiều prompt — mà là người biết khi nào output sai và đủ bản "
        "lĩnh không tin theo. AI tạo ra trong vài giây; còn 'có dùng được không' vẫn là chữ ký của bạn. Đó là phần việc không bàn "
        "giao cho máy được."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã thêm bài trụ:", SLUG)
print("Tổng số bài:", len(a), "| Steps:", len(art["steps"]), "| Prompts:", len(art["prompts"]), "| FAQ:", len(art["faq"]))
