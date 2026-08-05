// ISTQB Certified Tester AI Testing (CT-AI) v2.0 — Sample Exam Set A
// Source: ISTQB_CTAI_V2.0_SampleExam-Questions-v2.1.pdf + ISTQB_CTAI_v2.0_SampleExam-Answers-v2.1.pdf
// Transcribed verbatim from the official ISTQB sample exam documents (source-attributed reproduction).
// © International Software Testing Qualifications Board (ISTQB). Used here as source-attributed
// extracts for non-commercial study purposes, per the Copyright Notice in the source documents.

export interface ExamOption {
  key: string; // "a", "b", "c", "d", "e"
  text: string; // verbatim English option text
  rationale: string; // verbatim English rationale/explanation paragraph for this option from the Answers doc
  textVi: string; // Vietnamese translation of `text` (site's own translation, own words)
  rationaleVi: string; // Vietnamese translation of `rationale`
}

export interface ExamQuestion {
  id: string; // "1".."40", "A1".."A6" (matches the official numbering, no "Q" prefix)
  lo: string; // e.g. "AI-3.2.3" — exactly as in the Answer Key
  chapterNum: number; // 1-7, derived from the digit right after "AI-" in the LO code (e.g. AI-4.1.1 -> 4)
  kLevel: "K1" | "K2" | "K3";
  points: 1 | 2;
  selectCount: 1 | 2; // 1 if "Select ONE answer", 2 if "Select TWO answers"
  /** "choice" (default, plain a/b/c/d pick) | "matching" (each option paired with a category,
   *  correctKeys entries formatted "key:Category") | "ordering" (correctKeys is the full
   *  earliest-to-latest sequence of option keys). */
  type?: "choice" | "matching" | "ordering";
  stem: string; // the full question text/scenario, verbatim.
  stemVi: string; // Vietnamese translation of `stem` (site's own translation, own words), \n preserved
  options: ExamOption[];
  correctKeys: string[]; // e.g. ["a"] or ["c", "e"] — from the Answer Key, letters lowercase
}

export const examQuestions: ExamQuestion[] = [
  {
    id: "1",
    lo: "AI-1.1.1",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST highlights the difference between conventional and AI-based systems?`,
    stemVi: `Phát biểu nào sau đây mô tả TỐT NHẤT sự khác biệt giữa hệ thống truyền thống (conventional) và hệ thống dựa trên AI?`,
    options: [
      {
        key: "a",
        text: `AI-based systems tend to learn from patterns in data and can adapt to new scenarios, while conventional systems follow predefined rules and produce consistent outputs for the same inputs`,
        rationale: `Is correct. This correctly differentiates AI-based systems from conventional systems. AI-based/ML systems learn patterns in the data, and many can adapt through self-learning, while conventional systems use predefined logic and produce predictable outputs. Note: this does not apply to rule-based expert systems.`,
        textVi: `Hệ thống dựa trên AI có xu hướng học từ các mẫu (pattern) trong dữ liệu và có thể thích ứng với tình huống mới, trong khi hệ thống truyền thống tuân theo các quy tắc định trước và luôn cho ra kết quả nhất quán với cùng một đầu vào`,
        rationaleVi: `Đúng. Phát biểu này phân biệt chính xác hệ thống dựa trên AI với hệ thống truyền thống. Hệ thống AI/ML học các mẫu trong dữ liệu, và nhiều hệ có thể tự thích ứng qua cơ chế tự học (self-learning), trong khi hệ thống truyền thống dùng logic định trước và cho ra kết quả có thể dự đoán được. Lưu ý: điều này không áp dụng cho các hệ chuyên gia dựa trên luật (rule-based expert systems).`,
      },
      {
        key: "b",
        text: `AI-based systems tend to be faster than conventional systems because they do not rely on explicit programming, while conventional systems are slower due to rigid rule-based processing`,
        rationale: `Is not correct. While AI-based systems can sometimes process data faster, this is not always the case, and their advantage lies more in adaptability and handling complexity than in speed.`,
        textVi: `Hệ thống dựa trên AI thường nhanh hơn hệ thống truyền thống vì không phụ thuộc vào lập trình tường minh, trong khi hệ thống truyền thống chậm hơn do xử lý theo luật cứng nhắc`,
        rationaleVi: `Sai. Hệ thống dựa trên AI đôi khi xử lý dữ liệu nhanh hơn, nhưng không phải lúc nào cũng vậy; ưu thế thực sự của chúng nằm ở khả năng thích ứng và xử lý độ phức tạp, chứ không phải ở tốc độ.`,
      },
      {
        key: "c",
        text: `AI-based systems tend to be deterministic and explainable, while conventional systems are probabilistic and often difficult to interpret`,
        rationale: `Is not correct. This reverses the characteristics of the two types of systems. AI-based systems are probabilistic and less explainable, while conventional systems are deterministic and more straightforward to interpret.`,
        textVi: `Hệ thống dựa trên AI thường có tính xác định (deterministic) và có thể giải thích được, trong khi hệ thống truyền thống mang tính xác suất và thường khó diễn giải`,
        rationaleVi: `Sai. Phát biểu này đảo ngược đặc điểm của hai loại hệ thống. Hệ thống dựa trên AI mang tính xác suất và khó giải thích hơn, trong khi hệ thống truyền thống có tính xác định và dễ diễn giải hơn.`,
      },
      {
        key: "d",
        text: `AI-based systems tend to be more suitable for critical tasks where explainability is crucial, while conventional systems are better at handling complex tasks in unregulated areas`,
        rationale: `Is not correct. Conventional systems are more suitable for critical tasks where being able to explain results is important, AI-based systems typically have poor transparency and explainability and so are more appropriate for use in unregulated areas. Also, AI-based systems are often more appropriate for more complex problems.`,
        textVi: `Hệ thống dựa trên AI thường phù hợp hơn với các tác vụ trọng yếu (critical), nơi khả năng giải thích là bắt buộc, trong khi hệ thống truyền thống xử lý tốt hơn các tác vụ phức tạp ở những lĩnh vực chưa được quản lý chặt`,
        rationaleVi: `Sai. Hệ thống truyền thống mới phù hợp hơn với các tác vụ trọng yếu, nơi việc giải thích được kết quả là quan trọng; hệ thống dựa trên AI thường có tính minh bạch (transparency) và khả năng giải thích kém, nên phù hợp hơn ở những lĩnh vực chưa bị quản lý chặt. Ngoài ra, hệ thống dựa trên AI thường phù hợp hơn với các bài toán phức tạp hơn.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "2",
    lo: "AI-1.1.2",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 2,
    stem: `Which TWO of the following statements BEST distinguish between narrow AI, general AI, and super AI?`,
    stemVi: `HAI phát biểu nào sau đây phân biệt TỐT NHẤT giữa narrow AI, general AI và super AI?`,
    options: [
      {
        key: "a",
        text: `Narrow AI is self-learning, general AI focuses on solving specialized problems, and super AI is limited to tasks defined during its development`,
        rationale: `Is not correct. Narrow AI is not self-learning in all cases; it is task specific. General AI is not limited to specialized problems, and super AI is not limited to pre-defined tasks.`,
        textVi: `Narrow AI có khả năng tự học, general AI tập trung giải quyết các bài toán chuyên biệt, còn super AI bị giới hạn trong các tác vụ đã định nghĩa lúc phát triển`,
        rationaleVi: `Sai. Narrow AI không phải lúc nào cũng tự học; nó chỉ chuyên biệt cho một tác vụ cụ thể. General AI không giới hạn ở các bài toán chuyên biệt, và super AI không bị giới hạn trong các tác vụ định trước.`,
      },
      {
        key: "b",
        text: `Narrow AI operates independently of human input, general AI is used only in advanced robotics, and super AI improves human decision-making in specialized fields`,
        rationale: `Is not correct. Narrow AI does not operate independently of human input, general AI is not exclusive to robotics, and super AI does not merely enhance human decision-making but hypothetically surpasses human intelligence entirely.`,
        textVi: `Narrow AI hoạt động độc lập, không cần con người can thiệp; general AI chỉ được dùng trong robot tiên tiến; còn super AI giúp cải thiện việc ra quyết định của con người trong các lĩnh vực chuyên biệt`,
        rationaleVi: `Sai. Narrow AI không hoạt động độc lập với sự can thiệp của con người, general AI không chỉ giới hạn ở lĩnh vực robot, và super AI không chỉ đơn thuần cải thiện việc ra quyết định của con người mà về mặt giả thuyết còn vượt qua hoàn toàn trí tuệ con người.`,
      },
      {
        key: "c",
        text: `Narrow AI performs specific tasks efficiently, general AI can handle a wide range of intellectual tasks like a human, and super AI surpasses human intelligence`,
        rationale: `Is correct. This accurately differentiates the three types of AI, highlighting narrow AI's task-specific nature, general AI's human-like versatility, and super AI's hypothetical nature and superior capabilities.`,
        textVi: `Narrow AI thực hiện hiệu quả các tác vụ cụ thể, general AI có thể xử lý nhiều loại việc trí tuệ như con người, còn super AI vượt qua trí tuệ con người`,
        rationaleVi: `Đúng. Phát biểu này phân biệt chính xác ba loại AI, nêu bật tính chuyên biệt theo tác vụ của narrow AI, sự linh hoạt như con người của general AI, và bản chất giả thuyết cùng năng lực vượt trội của super AI.`,
      },
      {
        key: "d",
        text: `Narrow AI is task-specific, general AI is a concept with limited real-world applications, and super AI describes cutting-edge generative AI models`,
        rationale: `Is not correct. While narrow AI is correctly identified as task specific, general AI, if achieved, would have many real-world applications. Additionally, it is unclear what relationship super AI would have with generative AI models.`,
        textVi: `Narrow AI chuyên biệt theo tác vụ, general AI là một khái niệm có ứng dụng thực tế hạn chế, còn super AI mô tả các mô hình generative AI tiên tiến nhất`,
        rationaleVi: `Sai. Tuy narrow AI được xác định đúng là chuyên biệt theo tác vụ, nhưng nếu general AI đạt được thì nó sẽ có rất nhiều ứng dụng thực tế. Ngoài ra, mối liên hệ giữa super AI với các mô hình generative AI cũng không rõ ràng.`,
      },
      {
        key: "e",
        text: `Narrow AI is the current state of AI, achievement of general AI is uncertain, but once general AI is achieved, super AI is likely to happen`,
        rationale: `Is correct. All AI today is narrow AI. When general AI will be achieved is not clear. Once we have general AI then given the availability of knowledge on the internet, it is almost certain that super AI will be achieved.`,
        textVi: `Narrow AI là trạng thái hiện tại của AI, việc đạt được general AI vẫn chưa chắc chắn, nhưng một khi general AI đạt được thì super AI nhiều khả năng sẽ xảy ra`,
        rationaleVi: `Đúng. Mọi AI hiện nay đều là narrow AI. Chưa rõ khi nào general AI sẽ đạt được. Nhưng một khi đã có general AI, với lượng tri thức sẵn có trên Internet, gần như chắc chắn super AI sẽ đạt được.`,
      },
    ],
    correctKeys: ["c", "e"],
  },
  {
    id: "3",
    lo: "AI-1.1.3",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST describes the relationship between AI, ML, and DL?`,
    stemVi: `Phát biểu nào sau đây mô tả TỐT NHẤT mối quan hệ giữa AI, ML và DL?`,
    options: [
      {
        key: "a",
        text: `ML is a subset of AI, and DL is a further subset of ML, representing a hierarchy of specialized technologies`,
        rationale: `Is correct. AI is the broadest term. It refers to the general concept of creating machines that can perform tasks that typically require human intelligence. This includes a wide range of approaches and techniques, not just machine learning. ML is a subset of AI. It's a specific approach to achieving AI where machines are given the ability to learn from data without being explicitly programmed. Instead of writing specific rules for every situation, ML algorithms learn patterns and make predictions based on the data. DL is a subset of machine learning. It's a specialized type of ML that utilizes artificial neural networks with multiple layers (hence "deep").`,
        textVi: `ML là một tập con của AI, và DL là một tập con sâu hơn nữa của ML, thể hiện một hệ thống phân cấp các công nghệ chuyên biệt`,
        rationaleVi: `Đúng. AI là thuật ngữ rộng nhất, chỉ khái niệm chung về việc tạo ra các máy có thể thực hiện những tác vụ vốn đòi hỏi trí tuệ con người. Khái niệm này bao gồm nhiều cách tiếp cận và kỹ thuật khác nhau, không chỉ riêng machine learning. ML là một tập con của AI — đây là cách tiếp cận cụ thể để đạt được AI, trong đó máy được trao khả năng học từ dữ liệu mà không cần lập trình tường minh. Thay vì viết quy tắc riêng cho từng tình huống, thuật toán ML học các mẫu và đưa ra dự đoán dựa trên dữ liệu. DL là một tập con của machine learning — đây là dạng ML chuyên biệt sử dụng mạng nơ-ron nhân tạo với nhiều lớp (do đó gọi là "deep" - sâu).`,
      },
      {
        key: "b",
        text: `DL is the foundational technology, and both ML and AI are specialized applications built upon its principles.`,
        rationale: `Is not correct. AI and ML existed as concepts and fields of study long before deep learning became prominent. Deep learning is a relatively recent advancement within the broader fields of machine learning and AI.`,
        textVi: `DL là công nghệ nền tảng, còn ML và AI đều là các ứng dụng chuyên biệt được xây dựng dựa trên các nguyên lý của nó.`,
        rationaleVi: `Sai. AI và ML đã tồn tại như những khái niệm và lĩnh vực nghiên cứu từ rất lâu trước khi deep learning trở nên nổi bật. Deep learning là một bước tiến tương đối gần đây trong phạm vi rộng lớn hơn của machine learning và AI.`,
      },
      {
        key: "c",
        text: `DL and ML are essentially interchangeable terms, while AI represents a separate approach to problem-solving`,
        rationale: `Is not correct. DL and ML are not interchangeable. DL is a specific type of ML. Also, AI doesn't represent a "separate approach" - ML and DL are approaches to implementing AI.`,
        textVi: `DL và ML về cơ bản là các thuật ngữ có thể dùng thay thế cho nhau, còn AI đại diện cho một cách tiếp cận riêng biệt để giải quyết vấn đề`,
        rationaleVi: `Sai. DL và ML không thể dùng thay thế cho nhau. DL là một dạng cụ thể của ML. Ngoài ra, AI không phải là một "cách tiếp cận riêng biệt" — ML và DL chính là các cách tiếp cận để hiện thực hóa AI.`,
      },
      {
        key: "d",
        text: `AI encompasses both ML and DL as distinct but important methodologies, working in parallel to solve complex problems`,
        rationale: `Is not correct. While it's true AI encompasses ML and DL, "working in parallel" is not a valid way to describe their relationship. DL is a type of ML, not a parallel methodology at the same level that can run in parallel.`,
        textVi: `AI bao trùm cả ML và DL như hai phương pháp luận riêng biệt nhưng quan trọng, hoạt động song song để giải quyết các bài toán phức tạp`,
        rationaleVi: `Sai. Tuy AI đúng là bao trùm cả ML và DL, nhưng mô tả chúng "hoạt động song song" là không chính xác. DL là một dạng của ML, chứ không phải một phương pháp luận song song ở cùng cấp độ có thể chạy song song với ML.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "4",
    lo: "AI-1.1.4",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST explains generative AI?`,
    stemVi: `Phát biểu nào sau đây giải thích TỐT NHẤT về generative AI?`,
    options: [
      {
        key: "a",
        text: `It is designed to analyze and understand existing data, such as text or images, allowing machines to categorize information and extract key insights`,
        rationale: `Is not correct. It describes analysis and understanding, which are not capabilities of GenAI, and does not focus on the generative aspect of generative AI.`,
        textVi: `Nó được thiết kế để phân tích và hiểu dữ liệu sẵn có, như văn bản hoặc hình ảnh, giúp máy phân loại thông tin và trích xuất những thông tin quan trọng`,
        rationaleVi: `Sai. Phát biểu này mô tả khả năng phân tích và hiểu dữ liệu, vốn không phải là năng lực đặc trưng của GenAI, và không nêu bật được khía cạnh "tạo sinh" (generative) của generative AI.`,
      },
      {
        key: "b",
        text: `It creates new content, such as text, images, or audio, by learning patterns from training data and generating outputs similar in nature`,
        rationale: `Is correct. This accurately describes generative AI, highlighting its ability to create new content based on learned patterns in training data.`,
        textVi: `Nó tạo ra nội dung mới, như văn bản, hình ảnh hoặc âm thanh, bằng cách học các mẫu từ dữ liệu huấn luyện và sinh ra đầu ra có bản chất tương tự`,
        rationaleVi: `Đúng. Phát biểu này mô tả chính xác generative AI, nêu bật khả năng tạo ra nội dung mới dựa trên các mẫu đã học được từ dữ liệu huấn luyện.`,
      },
      {
        key: "c",
        text: `It focuses mainly on improving existing content, such as text, images, or audio, by optimizing it for classification or prediction tasks`,
        rationale: `Is not correct. Generative AI focuses on creating new content rather than improving existing content as a precursor to more traditional AI tasks, such as classification and prediction tasks.`,
        textVi: `Nó chủ yếu tập trung cải thiện nội dung sẵn có, như văn bản, hình ảnh hoặc âm thanh, bằng cách tối ưu hóa cho các tác vụ phân loại hoặc dự đoán`,
        rationaleVi: `Sai. Generative AI tập trung vào việc tạo ra nội dung mới, chứ không phải cải thiện nội dung sẵn có như một bước chuẩn bị cho các tác vụ AI truyền thống hơn, chẳng hạn phân loại và dự đoán.`,
      },
      {
        key: "d",
        text: `It creates models that are limited to generating text and images and cannot be used for creative tasks like drug discovery or data simulation`,
        rationale: `Is not correct. Generative AI is not limited to text and images; it has applications in healthcare, drug discovery, data simulation, and other fields.`,
        textVi: `Nó tạo ra các mô hình chỉ giới hạn ở việc sinh văn bản và hình ảnh, không thể dùng cho các tác vụ sáng tạo như khám phá thuốc (drug discovery) hay mô phỏng dữ liệu`,
        rationaleVi: `Sai. Generative AI không chỉ giới hạn ở văn bản và hình ảnh; nó còn có ứng dụng trong y tế, khám phá thuốc, mô phỏng dữ liệu và nhiều lĩnh vực khác.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "5",
    lo: "AI-1.1.5",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST compares the hardware options available for implementing machine learning systems?`,
    stemVi: `Phát biểu nào sau đây so sánh TỐT NHẤT các lựa chọn phần cứng để triển khai hệ thống machine learning?`,
    options: [
      {
        key: "a",
        text: `GPUs are well-suited for training and running ML models due to their ability to handle massively parallel processing, while CPUs are better for general-purpose computing`,
        rationale: `Is correct. This comparison accurately highlights the advantages of GPUs over CPUs for machine learning tasks, due to their parallel processing capabilities, while CPUs excel in general-purpose computing.`,
        textVi: `GPU phù hợp để huấn luyện và chạy mô hình ML nhờ khả năng xử lý song song quy mô lớn, trong khi CPU phù hợp hơn cho tính toán đa dụng (general-purpose)`,
        rationaleVi: `Đúng. So sánh này nêu đúng ưu thế của GPU so với CPU cho các tác vụ machine learning nhờ khả năng xử lý song song, trong khi CPU lại vượt trội ở các tác vụ tính toán đa dụng.`,
      },
      {
        key: "b",
        text: `CPUs are more efficient than GPUs for ML tasks because they have faster clock speeds and can handle complex operations`,
        rationale: `Is not correct. While CPUs have faster clock speeds, they are less efficient than GPUs for ML tasks because they lack the massive parallel processing capabilities required for data handling tasks such as matrix multiplication.`,
        textVi: `CPU hiệu quả hơn GPU cho các tác vụ ML vì có tốc độ xung nhịp cao hơn và có thể xử lý các phép toán phức tạp`,
        rationaleVi: `Sai. Tuy CPU có tốc độ xung nhịp cao hơn, nhưng lại kém hiệu quả hơn GPU cho các tác vụ ML vì thiếu khả năng xử lý song song quy mô lớn cần thiết cho các tác vụ xử lý dữ liệu như phép nhân ma trận.`,
      },
      {
        key: "c",
        text: `AI-specific hardware, such as ASICs, is primarily used for training ML models, while GPUs are better suited for edge computing`,
        rationale: `Is not correct. AI-specific hardware like ASICs is better suited for edge computing rather than training ML models, which is typically done in the cloud.`,
        textVi: `Phần cứng chuyên dụng cho AI, như ASIC, chủ yếu được dùng để huấn luyện mô hình ML, trong khi GPU phù hợp hơn cho edge computing`,
        rationaleVi: `Sai. Phần cứng chuyên dụng cho AI như ASIC phù hợp hơn với edge computing chứ không phải để huấn luyện mô hình ML, vốn thường được thực hiện trên cloud.`,
      },
      {
        key: "d",
        text: `Neuromorphic processors are a form of AI hardware specifically optimized for running on the von Neumann architecture`,
        rationale: `Is not correct. Neuromorphic processors are designed to mimic brain structure and do not rely on the von Neumann architecture; therefore, this statement is inaccurate.`,
        textVi: `Bộ xử lý neuromorphic là một dạng phần cứng AI được tối ưu hóa chuyên biệt để chạy trên kiến trúc von Neumann`,
        rationaleVi: `Sai. Bộ xử lý neuromorphic được thiết kế để mô phỏng cấu trúc não bộ và không dựa trên kiến trúc von Neumann; do đó phát biểu này không chính xác.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "6",
    lo: "AI-1.1.6",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Given the following statements about AI model development and hosting:
i. It achieves lower development costs by using public cloud resources, eliminating the need for local hardware investment
ii. It uses local development of data preparation components for sensitive data for increased security before moving to the cloud for training of the full system
iii. It results in lower costs because laptops are used for local development and there are low upfront hardware costs by hosting AI models on public clouds
iv. It simplifies development and hosting by standardizing processes on local servers, removing the need for complex cloud-based configurations
v. It guarantees the highest security by hosting AI models on private clouds, thereby avoiding the risks associated with local hardware vulnerabilities
Which of the following BEST reflects advantages of using a hybrid approach for this development and hosting?`,
    stemVi: `Cho các phát biểu sau đây về việc phát triển và hosting mô hình AI:
i. Đạt chi phí phát triển thấp hơn nhờ sử dụng tài nguyên public cloud, loại bỏ nhu cầu đầu tư phần cứng cục bộ
ii. Phát triển cục bộ các thành phần chuẩn bị dữ liệu đối với dữ liệu nhạy cảm để tăng tính bảo mật, trước khi chuyển sang cloud để huấn luyện toàn bộ hệ thống
iii. Giảm chi phí vì dùng laptop để phát triển cục bộ và chi phí phần cứng ban đầu thấp nhờ hosting mô hình AI trên public cloud
iv. Đơn giản hóa việc phát triển và hosting bằng cách chuẩn hóa quy trình trên máy chủ cục bộ, loại bỏ nhu cầu cấu hình phức tạp trên cloud
v. Đảm bảo mức bảo mật cao nhất bằng cách hosting mô hình AI trên private cloud, nhờ đó tránh được các rủi ro liên quan đến lỗ hổng phần cứng cục bộ
Phương án nào sau đây phản ánh TỐT NHẤT các lợi thế của việc dùng phương pháp lai (hybrid) cho việc phát triển và hosting này?`,
    options: [
      {
        key: "a",
        text: `i, ii and v`,
        rationale: `Considering each statement in turn: i. This is not a hybrid approach as it only talks about development on the cloud. ii. This is hybrid as we have local development for data preparation and training on the cloud. iii. This is hybrid as there is local development on laptops and hosting on public clouds. iv. This is not hybrid as everything is on local servers. v. This is not hybrid as everything is on private clouds. Hence, the correct option is b) ii and iii.`,
        textVi: `i, ii và v`,
        rationaleVi: `Xét lần lượt từng phát biểu: i. Đây không phải phương pháp hybrid vì chỉ nói đến việc phát triển trên cloud. ii. Đây là hybrid vì có phát triển cục bộ cho khâu chuẩn bị dữ liệu và huấn luyện trên cloud. iii. Đây là hybrid vì có phát triển cục bộ trên laptop và hosting trên public cloud. iv. Đây không phải hybrid vì mọi thứ đều nằm trên máy chủ cục bộ. v. Đây không phải hybrid vì mọi thứ đều nằm trên private cloud. Vậy phương án đúng là b) ii và iii.`,
      },
      {
        key: "b",
        text: `ii and iii`,
        rationale: `Considering each statement in turn: i. This is not a hybrid approach as it only talks about development on the cloud. ii. This is hybrid as we have local development for data preparation and training on the cloud. iii. This is hybrid as there is local development on laptops and hosting on public clouds. iv. This is not hybrid as everything is on local servers. v. This is not hybrid as everything is on private clouds. Hence, the correct option is b) ii and iii.`,
        textVi: `ii và iii`,
        rationaleVi: `Xét lần lượt từng phát biểu: i. Đây không phải phương pháp hybrid vì chỉ nói đến việc phát triển trên cloud. ii. Đây là hybrid vì có phát triển cục bộ cho khâu chuẩn bị dữ liệu và huấn luyện trên cloud. iii. Đây là hybrid vì có phát triển cục bộ trên laptop và hosting trên public cloud. iv. Đây không phải hybrid vì mọi thứ đều nằm trên máy chủ cục bộ. v. Đây không phải hybrid vì mọi thứ đều nằm trên private cloud. Vậy phương án đúng là b) ii và iii.`,
      },
      {
        key: "c",
        text: `iii and iv`,
        rationale: `Considering each statement in turn: i. This is not a hybrid approach as it only talks about development on the cloud. ii. This is hybrid as we have local development for data preparation and training on the cloud. iii. This is hybrid as there is local development on laptops and hosting on public clouds. iv. This is not hybrid as everything is on local servers. v. This is not hybrid as everything is on private clouds. Hence, the correct option is b) ii and iii.`,
        textVi: `iii và iv`,
        rationaleVi: `Xét lần lượt từng phát biểu: i. Đây không phải phương pháp hybrid vì chỉ nói đến việc phát triển trên cloud. ii. Đây là hybrid vì có phát triển cục bộ cho khâu chuẩn bị dữ liệu và huấn luyện trên cloud. iii. Đây là hybrid vì có phát triển cục bộ trên laptop và hosting trên public cloud. iv. Đây không phải hybrid vì mọi thứ đều nằm trên máy chủ cục bộ. v. Đây không phải hybrid vì mọi thứ đều nằm trên private cloud. Vậy phương án đúng là b) ii và iii.`,
      },
      {
        key: "d",
        text: `i, iv and v`,
        rationale: `Considering each statement in turn: i. This is not a hybrid approach as it only talks about development on the cloud. ii. This is hybrid as we have local development for data preparation and training on the cloud. iii. This is hybrid as there is local development on laptops and hosting on public clouds. iv. This is not hybrid as everything is on local servers. v. This is not hybrid as everything is on private clouds. Hence, the correct option is b) ii and iii.`,
        textVi: `i, iv và v`,
        rationaleVi: `Xét lần lượt từng phát biểu: i. Đây không phải phương pháp hybrid vì chỉ nói đến việc phát triển trên cloud. ii. Đây là hybrid vì có phát triển cục bộ cho khâu chuẩn bị dữ liệu và huấn luyện trên cloud. iii. Đây là hybrid vì có phát triển cục bộ trên laptop và hosting trên public cloud. iv. Đây không phải hybrid vì mọi thứ đều nằm trên máy chủ cục bộ. v. Đây không phải hybrid vì mọi thứ đều nằm trên private cloud. Vậy phương án đúng là b) ii và iii.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "7",
    lo: "AI-2.1.1",
    chapterNum: 2,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Given the following ISO/IEC 25059 quality characteristics:
1. AI Robustness
2. User controllability
3. Functional adaptability
4. Intervenability
And the following examples of quality characteristic measures:
A. The success rate of a remote operator in forcing a drone into the safe-landing protocol when its AI navigation system exhibits hazardous behavior
B. The average time required to successfully override a fraud management system's automated decision to block a customer's transaction
C. The F1-score of an object detection model in an autonomous car in heavy rain
D. The time required for an e-commerce recommendation engine to update its suggestions to reflect a new, rapidly emerging fashion trend
Which of the following BEST matches the quality characteristics with the example measures?`,
    stemVi: `Cho các đặc tính chất lượng theo ISO/IEC 25059 sau đây:
1. AI Robustness (độ bền vững của AI)
2. User controllability (khả năng người dùng kiểm soát)
3. Functional adaptability (khả năng thích ứng chức năng)
4. Intervenability (khả năng can thiệp)
Và các ví dụ đo lường đặc tính chất lượng sau đây:
A. Tỷ lệ thành công của người vận hành từ xa khi buộc một drone chuyển sang giao thức hạ cánh an toàn lúc hệ thống điều hướng AI của nó có hành vi nguy hiểm
B. Thời gian trung bình cần thiết để ghi đè (override) thành công quyết định tự động của hệ thống quản lý gian lận khi chặn giao dịch của khách hàng
C. Điểm F1 (F1-score) của mô hình phát hiện đối tượng trong xe tự lái khi trời mưa lớn
D. Thời gian cần thiết để một hệ thống gợi ý thương mại điện tử cập nhật đề xuất nhằm phản ánh một xu hướng thời trang mới đang nổi lên nhanh chóng
Phương án nào sau đây khớp TỐT NHẤT các đặc tính chất lượng với các ví dụ đo lường?`,
    options: [
      {
        key: "a",
        text: `1D – 2A – 3C – 4B`,
        rationale: `Considering each of the examples in turn: A. The success rate of a remote operator in forcing a drone into the safe-landing protocol when its AI navigation system exhibits hazardous behavior. This measure assesses the effectiveness of human intervention in the system's operation during hazardous AI behavior, aligning with the definition of intervenability: the ability to permit external intervention in automated processes. This matches with intervenability (4). B. The average time required to successfully override a fraud management system's automated decision to block a customer's transaction. This measure is concerned with how quickly a user can override an automated system's decision and the degree to which a user can control or influence the system's actions. This is a direct indicator of user controllability (2). C. The F1-score of an object detection model in an autonomous car in heavy rain. The F1-score in adverse conditions (heavy rain) tests how well the model performs under challenging scenarios, which is a measure of AI robustness (1). D. The time required for an e-commerce recommendation engine to update its suggestions to reflect a new, rapidly emerging fashion trend. The speed at which a system adapts its recommendations to new trends reflects its ability to adapt its functionality to changing requirements, which is functional adaptability (3). In which case, the correct combination is: 1C – 2B – 3D – 4A, which makes c) correct.`,
        textVi: `1D – 2A – 3C – 4B`,
        rationaleVi: `Xét lần lượt từng ví dụ: A. Tỷ lệ thành công của người vận hành từ xa khi buộc một drone chuyển sang giao thức hạ cánh an toàn lúc hệ thống điều hướng AI có hành vi nguy hiểm. Thước đo này đánh giá hiệu quả của sự can thiệp con người vào hoạt động của hệ thống trong tình huống AI có hành vi nguy hiểm, phù hợp với định nghĩa của intervenability: khả năng cho phép can thiệp từ bên ngoài vào các quy trình tự động. Điều này khớp với intervenability (4). B. Thời gian trung bình cần thiết để ghi đè thành công quyết định tự động của hệ thống quản lý gian lận khi chặn giao dịch của khách hàng. Thước đo này liên quan đến việc người dùng có thể ghi đè quyết định của hệ thống tự động nhanh đến mức nào, và mức độ người dùng có thể kiểm soát hoặc tác động đến hành động của hệ thống. Đây là chỉ số trực tiếp của user controllability (2). C. Điểm F1 của mô hình phát hiện đối tượng trong xe tự lái khi trời mưa lớn. Điểm F1 trong điều kiện bất lợi (mưa lớn) kiểm tra mức độ hoạt động tốt của mô hình trong các tình huống thách thức, đây là thước đo của AI robustness (1). D. Thời gian cần thiết để một hệ thống gợi ý thương mại điện tử cập nhật đề xuất nhằm phản ánh một xu hướng thời trang mới đang nổi lên nhanh chóng. Tốc độ hệ thống điều chỉnh gợi ý theo xu hướng mới phản ánh khả năng thích ứng chức năng của nó với các yêu cầu đang thay đổi, đây chính là functional adaptability (3). Như vậy, tổ hợp đúng là: 1C – 2B – 3D – 4A, nên phương án c) đúng.`,
      },
      {
        key: "b",
        text: `1C – 2D – 3B – 4A`,
        rationale: `Considering each of the examples in turn: A. The success rate of a remote operator in forcing a drone into the safe-landing protocol when its AI navigation system exhibits hazardous behavior. This measure assesses the effectiveness of human intervention in the system's operation during hazardous AI behavior, aligning with the definition of intervenability: the ability to permit external intervention in automated processes. This matches with intervenability (4). B. The average time required to successfully override a fraud management system's automated decision to block a customer's transaction. This measure is concerned with how quickly a user can override an automated system's decision and the degree to which a user can control or influence the system's actions. This is a direct indicator of user controllability (2). C. The F1-score of an object detection model in an autonomous car in heavy rain. The F1-score in adverse conditions (heavy rain) tests how well the model performs under challenging scenarios, which is a measure of AI robustness (1). D. The time required for an e-commerce recommendation engine to update its suggestions to reflect a new, rapidly emerging fashion trend. The speed at which a system adapts its recommendations to new trends reflects its ability to adapt its functionality to changing requirements, which is functional adaptability (3). In which case, the correct combination is: 1C – 2B – 3D – 4A, which makes c) correct.`,
        textVi: `1C – 2D – 3B – 4A`,
        rationaleVi: `Xét lần lượt từng ví dụ: A. Tỷ lệ thành công của người vận hành từ xa khi buộc một drone chuyển sang giao thức hạ cánh an toàn lúc hệ thống điều hướng AI có hành vi nguy hiểm. Thước đo này đánh giá hiệu quả của sự can thiệp con người vào hoạt động của hệ thống trong tình huống AI có hành vi nguy hiểm, phù hợp với định nghĩa của intervenability: khả năng cho phép can thiệp từ bên ngoài vào các quy trình tự động. Điều này khớp với intervenability (4). B. Thời gian trung bình cần thiết để ghi đè thành công quyết định tự động của hệ thống quản lý gian lận khi chặn giao dịch của khách hàng. Thước đo này liên quan đến việc người dùng có thể ghi đè quyết định của hệ thống tự động nhanh đến mức nào, và mức độ người dùng có thể kiểm soát hoặc tác động đến hành động của hệ thống. Đây là chỉ số trực tiếp của user controllability (2). C. Điểm F1 của mô hình phát hiện đối tượng trong xe tự lái khi trời mưa lớn. Điểm F1 trong điều kiện bất lợi (mưa lớn) kiểm tra mức độ hoạt động tốt của mô hình trong các tình huống thách thức, đây là thước đo của AI robustness (1). D. Thời gian cần thiết để một hệ thống gợi ý thương mại điện tử cập nhật đề xuất nhằm phản ánh một xu hướng thời trang mới đang nổi lên nhanh chóng. Tốc độ hệ thống điều chỉnh gợi ý theo xu hướng mới phản ánh khả năng thích ứng chức năng của nó với các yêu cầu đang thay đổi, đây chính là functional adaptability (3). Như vậy, tổ hợp đúng là: 1C – 2B – 3D – 4A, nên phương án c) đúng.`,
      },
      {
        key: "c",
        text: `1C – 2B – 3D – 4A`,
        rationale: `Considering each of the examples in turn: A. The success rate of a remote operator in forcing a drone into the safe-landing protocol when its AI navigation system exhibits hazardous behavior. This measure assesses the effectiveness of human intervention in the system's operation during hazardous AI behavior, aligning with the definition of intervenability: the ability to permit external intervention in automated processes. This matches with intervenability (4). B. The average time required to successfully override a fraud management system's automated decision to block a customer's transaction. This measure is concerned with how quickly a user can override an automated system's decision and the degree to which a user can control or influence the system's actions. This is a direct indicator of user controllability (2). C. The F1-score of an object detection model in an autonomous car in heavy rain. The F1-score in adverse conditions (heavy rain) tests how well the model performs under challenging scenarios, which is a measure of AI robustness (1). D. The time required for an e-commerce recommendation engine to update its suggestions to reflect a new, rapidly emerging fashion trend. The speed at which a system adapts its recommendations to new trends reflects its ability to adapt its functionality to changing requirements, which is functional adaptability (3). In which case, the correct combination is: 1C – 2B – 3D – 4A, which makes c) correct.`,
        textVi: `1C – 2B – 3D – 4A`,
        rationaleVi: `Xét lần lượt từng ví dụ: A. Tỷ lệ thành công của người vận hành từ xa khi buộc một drone chuyển sang giao thức hạ cánh an toàn lúc hệ thống điều hướng AI có hành vi nguy hiểm. Thước đo này đánh giá hiệu quả của sự can thiệp con người vào hoạt động của hệ thống trong tình huống AI có hành vi nguy hiểm, phù hợp với định nghĩa của intervenability: khả năng cho phép can thiệp từ bên ngoài vào các quy trình tự động. Điều này khớp với intervenability (4). B. Thời gian trung bình cần thiết để ghi đè thành công quyết định tự động của hệ thống quản lý gian lận khi chặn giao dịch của khách hàng. Thước đo này liên quan đến việc người dùng có thể ghi đè quyết định của hệ thống tự động nhanh đến mức nào, và mức độ người dùng có thể kiểm soát hoặc tác động đến hành động của hệ thống. Đây là chỉ số trực tiếp của user controllability (2). C. Điểm F1 của mô hình phát hiện đối tượng trong xe tự lái khi trời mưa lớn. Điểm F1 trong điều kiện bất lợi (mưa lớn) kiểm tra mức độ hoạt động tốt của mô hình trong các tình huống thách thức, đây là thước đo của AI robustness (1). D. Thời gian cần thiết để một hệ thống gợi ý thương mại điện tử cập nhật đề xuất nhằm phản ánh một xu hướng thời trang mới đang nổi lên nhanh chóng. Tốc độ hệ thống điều chỉnh gợi ý theo xu hướng mới phản ánh khả năng thích ứng chức năng của nó với các yêu cầu đang thay đổi, đây chính là functional adaptability (3). Như vậy, tổ hợp đúng là: 1C – 2B – 3D – 4A, nên phương án c) đúng.`,
      },
      {
        key: "d",
        text: `1A – 2D – 3C – 4B`,
        rationale: `Considering each of the examples in turn: A. The success rate of a remote operator in forcing a drone into the safe-landing protocol when its AI navigation system exhibits hazardous behavior. This measure assesses the effectiveness of human intervention in the system's operation during hazardous AI behavior, aligning with the definition of intervenability: the ability to permit external intervention in automated processes. This matches with intervenability (4). B. The average time required to successfully override a fraud management system's automated decision to block a customer's transaction. This measure is concerned with how quickly a user can override an automated system's decision and the degree to which a user can control or influence the system's actions. This is a direct indicator of user controllability (2). C. The F1-score of an object detection model in an autonomous car in heavy rain. The F1-score in adverse conditions (heavy rain) tests how well the model performs under challenging scenarios, which is a measure of AI robustness (1). D. The time required for an e-commerce recommendation engine to update its suggestions to reflect a new, rapidly emerging fashion trend. The speed at which a system adapts its recommendations to new trends reflects its ability to adapt its functionality to changing requirements, which is functional adaptability (3). In which case, the correct combination is: 1C – 2B – 3D – 4A, which makes c) correct.`,
        textVi: `1A – 2D – 3C – 4B`,
        rationaleVi: `Xét lần lượt từng ví dụ: A. Tỷ lệ thành công của người vận hành từ xa khi buộc một drone chuyển sang giao thức hạ cánh an toàn lúc hệ thống điều hướng AI có hành vi nguy hiểm. Thước đo này đánh giá hiệu quả của sự can thiệp con người vào hoạt động của hệ thống trong tình huống AI có hành vi nguy hiểm, phù hợp với định nghĩa của intervenability: khả năng cho phép can thiệp từ bên ngoài vào các quy trình tự động. Điều này khớp với intervenability (4). B. Thời gian trung bình cần thiết để ghi đè thành công quyết định tự động của hệ thống quản lý gian lận khi chặn giao dịch của khách hàng. Thước đo này liên quan đến việc người dùng có thể ghi đè quyết định của hệ thống tự động nhanh đến mức nào, và mức độ người dùng có thể kiểm soát hoặc tác động đến hành động của hệ thống. Đây là chỉ số trực tiếp của user controllability (2). C. Điểm F1 của mô hình phát hiện đối tượng trong xe tự lái khi trời mưa lớn. Điểm F1 trong điều kiện bất lợi (mưa lớn) kiểm tra mức độ hoạt động tốt của mô hình trong các tình huống thách thức, đây là thước đo của AI robustness (1). D. Thời gian cần thiết để một hệ thống gợi ý thương mại điện tử cập nhật đề xuất nhằm phản ánh một xu hướng thời trang mới đang nổi lên nhanh chóng. Tốc độ hệ thống điều chỉnh gợi ý theo xu hướng mới phản ánh khả năng thích ứng chức năng của nó với các yêu cầu đang thay đổi, đây chính là functional adaptability (3). Như vậy, tổ hợp đúng là: 1C – 2B – 3D – 4A, nên phương án c) đúng.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "8",
    lo: "AI-2.1.2",
    chapterNum: 2,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST describes a key challenge when AI is used in safety-related systems?`,
    stemVi: `Phát biểu nào sau đây mô tả TỐT NHẤT một thách thức then chốt khi AI được dùng trong các hệ thống liên quan đến an toàn (safety-related)?`,
    options: [
      {
        key: "a",
        text: `When the requirements are too detailed, it leaves little room for the ML system to learn from the implicit goals contained within the training data`,
        rationale: `Is not correct. The actual problem is the opposite: requirements are generally too vague and are often only implicitly provided by data, leading to poor traceability.`,
        textVi: `Khi requirement quá chi tiết, nó để lại rất ít khoảng trống cho hệ ML học từ các mục tiêu ngầm (implicit) chứa trong dữ liệu huấn luyện`,
        rationaleVi: `Sai. Vấn đề thực tế lại ngược lại: requirement thường quá mơ hồ và thường chỉ được thể hiện ngầm qua dữ liệu, dẫn đến khả năng truy vết (traceability) kém.`,
      },
      {
        key: "b",
        text: `The potential for non-determinism and self-learning makes some AI-based systems unpredictable as they diverge from their original tested state`,
        rationale: `Is correct. This unpredictability is a core safety challenge when deploying AI in safety-related systems, as it complicates verification, validation, and ongoing assurance of safe operation.`,
        textVi: `Khả năng xảy ra tính không xác định (non-determinism) và tự học khiến một số hệ thống dựa trên AI trở nên khó dự đoán khi chúng lệch dần khỏi trạng thái đã được test ban đầu`,
        rationaleVi: `Đúng. Tính khó dự đoán này là thách thức an toàn cốt lõi khi triển khai AI trong các hệ thống liên quan đến an toàn, vì nó gây khó khăn cho việc xác minh (verification), thẩm định (validation) và đảm bảo liên tục về vận hành an toàn.`,
      },
      {
        key: "c",
        text: `Because self-learning safety-related systems stop adapting after deployment, safety is often compromised by the need for manual updates of the operational AI-based system`,
        rationale: `Is not correct. The problem is that self-learning systems do not stop adapting after deployment and so move away from their original tested behavior.`,
        textVi: `Vì các hệ thống liên quan đến an toàn có khả năng tự học sẽ ngừng thích ứng sau khi triển khai, tính an toàn thường bị ảnh hưởng bởi nhu cầu cập nhật thủ công cho hệ thống dựa trên AI đang vận hành`,
        rationaleVi: `Sai. Vấn đề thực chất là các hệ thống tự học KHÔNG ngừng thích ứng sau khi triển khai, nên chúng lệch dần khỏi hành vi đã được test ban đầu.`,
      },
      {
        key: "d",
        text: `The mature safety-related standards tend to be out-of-date and require the use of outdated AI technologies, which hinders innovative AI solutions in AI-based systems`,
        rationale: `Is not correct. Mature safety-related standards currently lack any provisions for AI, and some explicitly restrict its use.`,
        textVi: `Các tiêu chuẩn an toàn đã trưởng thành (mature) thường lỗi thời và yêu cầu sử dụng công nghệ AI đã cũ, gây cản trở các giải pháp AI sáng tạo trong hệ thống dựa trên AI`,
        rationaleVi: `Sai. Các tiêu chuẩn an toàn đã trưởng thành hiện nay hoàn toàn thiếu các quy định dành cho AI, và một số tiêu chuẩn còn tường minh hạn chế việc sử dụng AI.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "9",
    lo: "AI-2.2.1",
    chapterNum: 2,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following examples is LEAST likely to be a valid acceptance criterion for AI-specific quality characteristics defined in the ISO 25059 standard for an AI-based system?`,
    stemVi: `Ví dụ nào sau đây ÍT KHẢ NĂNG NHẤT là một tiêu chí chấp nhận (acceptance criterion) hợp lệ cho các đặc tính chất lượng đặc thù của AI được định nghĩa trong tiêu chuẩn ISO 25059, áp dụng cho một hệ thống dựa trên AI?`,
    options: [
      {
        key: "a",
        text: `The security guard in the museum control room can trigger an immediate 'all-stop' command that causes the patrol robot to cease all motion within 0.5 seconds to prevent collision with a sculpture`,
        rationale: `Is not correct. This relates to intervenability, as defined in ISO 25059, which describes the user's ability to control the autonomous patrol robot when they notice it might run into a sculpture. It also provides a specific, measurable timeframe for the intervention.`,
        textVi: `Nhân viên bảo vệ trong phòng điều khiển bảo tàng có thể kích hoạt ngay lệnh "dừng khẩn cấp" (all-stop), khiến robot tuần tra ngừng mọi chuyển động trong vòng 0,5 giây để tránh va chạm với một tác phẩm điêu khắc`,
        rationaleVi: `Sai. Ví dụ này liên quan đến intervenability như được định nghĩa trong ISO 25059, mô tả khả năng người dùng kiểm soát robot tuần tra tự hành khi họ nhận thấy nó có thể va vào một tác phẩm điêu khắc. Nó cũng đưa ra một khung thời gian can thiệp cụ thể, có thể đo lường được.`,
      },
      {
        key: "b",
        text: `A greenhouse control system reacts within 20 minutes when the measured humidity is greater than 10% from the optimum humidity`,
        rationale: `Is not correct. This relates to functional correctness, which is defined in ISO 25059. It describes how the system adapts to changes in humidity to maintain the desired environment. It provides specific, measurable humidity and a timeframe for the control system to react.`,
        textVi: `Một hệ thống điều khiển nhà kính phản ứng trong vòng 20 phút khi độ ẩm đo được chênh lệch hơn 10% so với độ ẩm tối ưu`,
        rationaleVi: `Sai. Ví dụ này liên quan đến functional correctness (tính đúng đắn chức năng) như được định nghĩa trong ISO 25059. Nó mô tả cách hệ thống thích ứng với các thay đổi về độ ẩm để duy trì môi trường mong muốn. Nó đưa ra mức độ ẩm cụ thể, có thể đo lường được, và một khung thời gian phản ứng cho hệ thống điều khiển.`,
      },
      {
        key: "c",
        text: `The spam alert control system is easy for the user to set up and requires minimal technical expertise to maintain`,
        rationale: `Is correct. It is the LEAST likely option because it focuses on some of the sub-characteristics of usability, such as learnability and operability, which are generic quality characteristics applicable to most systems, and are not directly associated with the AI-specific characteristics in ISO 25059 (i.e. user controllability and transparency, which are sub-characteristics of usability for AI-based systems). The acceptance criterion is also more subjective than the other options and so more challenging to test.`,
        textVi: `Hệ thống cảnh báo thư rác dễ dàng để người dùng thiết lập và chỉ đòi hỏi rất ít chuyên môn kỹ thuật để bảo trì`,
        rationaleVi: `Đúng. Đây là phương án ÍT KHẢ NĂNG NHẤT vì nó tập trung vào một số đặc tính con của usability, như learnability (khả năng dễ học) và operability (khả năng dễ vận hành) — đây là những đặc tính chất lượng chung, áp dụng cho hầu hết hệ thống, chứ không gắn trực tiếp với các đặc tính đặc thù của AI trong ISO 25059 (tức user controllability và transparency — các đặc tính con của usability dành riêng cho hệ thống dựa trên AI). Tiêu chí chấp nhận này cũng mang tính chủ quan hơn các phương án khác, nên khó test hơn.`,
      },
      {
        key: "d",
        text: `When the analysis tool flags a retinal scan for severe diabetic retinopathy, it shall display a visual heatmap overlay on the image, highlighting the key features`,
        rationale: `Is not correct. This relates to transparency, which is defined in ISO 25059. It describes the system's provision of extra information to explain its decision-making.`,
        textVi: `Khi công cụ phân tích gắn cờ một ảnh chụp đáy mắt (retinal scan) là có bệnh võng mạc tiểu đường mức độ nặng, nó phải hiển thị một lớp phủ bản đồ nhiệt (heatmap) trực quan trên ảnh, làm nổi bật các đặc trưng chính`,
        rationaleVi: `Sai. Ví dụ này liên quan đến transparency (tính minh bạch) như được định nghĩa trong ISO 25059. Nó mô tả việc hệ thống cung cấp thêm thông tin để giải thích cho quyết định của mình.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "10",
    lo: "AI-3.1.1",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Given the following forms of ML:
1. Clustering
2. Reinforcement learning
3. Classification
4. Regression
And the following examples:
A. The mobile game app updates its feedback, response timing, and the number of user options it provides based on how much the players spend
B. The language translation app searches the internet to find text provided in multiple languages to improve its translation function
C. A manufacturing company predicts when equipment is likely to fail based on sensor data and historical maintenance records
D. A social network platform groups its users into communities based on their interactions with each other and their stated interests
Which of the following BEST matches the examples with the forms of ML?`,
    stemVi: `Cho các dạng ML sau đây:
1. Clustering (phân cụm)
2. Reinforcement learning (học tăng cường)
3. Classification (phân loại)
4. Regression (hồi quy)
Và các ví dụ sau đây:
A. Ứng dụng game di động điều chỉnh phản hồi, thời điểm phản hồi và số lượng tùy chọn cung cấp cho người dùng dựa trên số tiền người chơi đã chi
B. Ứng dụng dịch ngôn ngữ tìm kiếm trên Internet các văn bản được cung cấp bằng nhiều ngôn ngữ để cải thiện chức năng dịch của nó
C. Một công ty sản xuất dự đoán thời điểm thiết bị có khả năng hỏng dựa trên dữ liệu cảm biến và lịch sử bảo trì
D. Một nền tảng mạng xã hội nhóm người dùng của mình thành các cộng đồng dựa trên tương tác giữa họ với nhau và sở thích họ đã khai báo
Phương án nào sau đây khớp TỐT NHẤT các ví dụ với các dạng ML?`,
    options: [
      {
        key: "a",
        text: `1B – 2D – 3A – 4C`,
        rationale: `Considering the descriptions of example systems: A. The amount spent can be considered the reward function for this system, with the system changing its behavior to increase the amount spent. Hence, this is an example of Reinforcement Learning (2). B. The app utilizes text in what can be considered a source language and a corresponding 'correct' translation of this source, employing a form of supervised learning with no explicit reward function mentioned. Classification uses parallel training data—pairs of matching sentences in two languages (e.g., "Hello" in English and "Bonjour" in French)—where each pair has a label linking source to target text. The model learns mappings via supervised training, encoding input text features and predicting the correct translation output, minimizing errors across many such pairs to generalize to new sentences. Hence, this is an example of Classification (3). C. Regression is used in this scenario to predict a continuous outcome (in this case, the time until equipment failure) based on a set of input variables (sensor data and historical maintenance records). By analyzing the relationship between these variables, the ML model can identify patterns and trends that indicate when equipment is at risk of failure. Hence, this is an example of Regression (4). D. By analyzing user interactions (e.g., likes, comments, shared content) and stated interests, the social network platform can identify patterns and similarities among users. These patterns can then be used to group users into communities or "clusters" that share common interests and behaviors. Hence, this is an example of Clustering (1). Hence, 1D – 2A – 3B – 4C, is correct and so option c) is the correct option.`,
        textVi: `1B – 2D – 3A – 4C`,
        rationaleVi: `Xét các mô tả của từng hệ thống ví dụ: A. Số tiền chi tiêu có thể được xem là hàm thưởng (reward function) cho hệ thống này, khi hệ thống thay đổi hành vi để tăng số tiền người chơi chi. Do đó, đây là ví dụ của Reinforcement Learning (2). B. Ứng dụng sử dụng văn bản có thể xem như ngôn ngữ nguồn và bản dịch "đúng" tương ứng của nguồn đó, áp dụng một dạng học có giám sát (supervised learning) mà không đề cập hàm thưởng tường minh nào. Classification sử dụng dữ liệu huấn luyện song song — các cặp câu tương ứng giữa hai ngôn ngữ (ví dụ: "Hello" trong tiếng Anh và "Bonjour" trong tiếng Pháp) — trong đó mỗi cặp có một nhãn liên kết văn bản nguồn với văn bản đích. Mô hình học các ánh xạ thông qua huấn luyện có giám sát, mã hóa đặc trưng của văn bản đầu vào và dự đoán bản dịch đúng, giảm thiểu sai số qua nhiều cặp như vậy để khái quát hóa cho các câu mới. Do đó, đây là ví dụ của Classification (3). C. Regression được dùng trong tình huống này để dự đoán một kết quả liên tục (ở đây là thời gian cho đến khi thiết bị hỏng) dựa trên một tập các biến đầu vào (dữ liệu cảm biến và lịch sử bảo trì). Bằng cách phân tích mối quan hệ giữa các biến này, mô hình ML có thể nhận diện các mẫu và xu hướng cho thấy khi nào thiết bị có nguy cơ hỏng. Do đó, đây là ví dụ của Regression (4). D. Bằng cách phân tích tương tác của người dùng (như lượt thích, bình luận, nội dung chia sẻ) và sở thích đã khai báo, nền tảng mạng xã hội có thể nhận diện các mẫu và điểm tương đồng giữa người dùng. Các mẫu này sau đó được dùng để nhóm người dùng thành các cộng đồng hay "cụm" có chung sở thích và hành vi. Do đó, đây là ví dụ của Clustering (1). Vậy 1D – 2A – 3B – 4C là đúng, nên phương án c) là phương án đúng.`,
      },
      {
        key: "b",
        text: `1C – 2A – 3D – 4B`,
        rationale: `Considering the descriptions of example systems: A. The amount spent can be considered the reward function for this system, with the system changing its behavior to increase the amount spent. Hence, this is an example of Reinforcement Learning (2). B. The app utilizes text in what can be considered a source language and a corresponding 'correct' translation of this source, employing a form of supervised learning with no explicit reward function mentioned. Classification uses parallel training data—pairs of matching sentences in two languages (e.g., "Hello" in English and "Bonjour" in French)—where each pair has a label linking source to target text. The model learns mappings via supervised training, encoding input text features and predicting the correct translation output, minimizing errors across many such pairs to generalize to new sentences. Hence, this is an example of Classification (3). C. Regression is used in this scenario to predict a continuous outcome (in this case, the time until equipment failure) based on a set of input variables (sensor data and historical maintenance records). By analyzing the relationship between these variables, the ML model can identify patterns and trends that indicate when equipment is at risk of failure. Hence, this is an example of Regression (4). D. By analyzing user interactions (e.g., likes, comments, shared content) and stated interests, the social network platform can identify patterns and similarities among users. These patterns can then be used to group users into communities or "clusters" that share common interests and behaviors. Hence, this is an example of Clustering (1). Hence, 1D – 2A – 3B – 4C, is correct and so option c) is the correct option.`,
        textVi: `1C – 2A – 3D – 4B`,
        rationaleVi: `Xét các mô tả của từng hệ thống ví dụ: A. Số tiền chi tiêu có thể được xem là hàm thưởng (reward function) cho hệ thống này, khi hệ thống thay đổi hành vi để tăng số tiền người chơi chi. Do đó, đây là ví dụ của Reinforcement Learning (2). B. Ứng dụng sử dụng văn bản có thể xem như ngôn ngữ nguồn và bản dịch "đúng" tương ứng của nguồn đó, áp dụng một dạng học có giám sát (supervised learning) mà không đề cập hàm thưởng tường minh nào. Classification sử dụng dữ liệu huấn luyện song song — các cặp câu tương ứng giữa hai ngôn ngữ (ví dụ: "Hello" trong tiếng Anh và "Bonjour" trong tiếng Pháp) — trong đó mỗi cặp có một nhãn liên kết văn bản nguồn với văn bản đích. Mô hình học các ánh xạ thông qua huấn luyện có giám sát, mã hóa đặc trưng của văn bản đầu vào và dự đoán bản dịch đúng, giảm thiểu sai số qua nhiều cặp như vậy để khái quát hóa cho các câu mới. Do đó, đây là ví dụ của Classification (3). C. Regression được dùng trong tình huống này để dự đoán một kết quả liên tục (ở đây là thời gian cho đến khi thiết bị hỏng) dựa trên một tập các biến đầu vào (dữ liệu cảm biến và lịch sử bảo trì). Bằng cách phân tích mối quan hệ giữa các biến này, mô hình ML có thể nhận diện các mẫu và xu hướng cho thấy khi nào thiết bị có nguy cơ hỏng. Do đó, đây là ví dụ của Regression (4). D. Bằng cách phân tích tương tác của người dùng (như lượt thích, bình luận, nội dung chia sẻ) và sở thích đã khai báo, nền tảng mạng xã hội có thể nhận diện các mẫu và điểm tương đồng giữa người dùng. Các mẫu này sau đó được dùng để nhóm người dùng thành các cộng đồng hay "cụm" có chung sở thích và hành vi. Do đó, đây là ví dụ của Clustering (1). Vậy 1D – 2A – 3B – 4C là đúng, nên phương án c) là phương án đúng.`,
      },
      {
        key: "c",
        text: `1D – 2A – 3B – 4C`,
        rationale: `Considering the descriptions of example systems: A. The amount spent can be considered the reward function for this system, with the system changing its behavior to increase the amount spent. Hence, this is an example of Reinforcement Learning (2). B. The app utilizes text in what can be considered a source language and a corresponding 'correct' translation of this source, employing a form of supervised learning with no explicit reward function mentioned. Classification uses parallel training data—pairs of matching sentences in two languages (e.g., "Hello" in English and "Bonjour" in French)—where each pair has a label linking source to target text. The model learns mappings via supervised training, encoding input text features and predicting the correct translation output, minimizing errors across many such pairs to generalize to new sentences. Hence, this is an example of Classification (3). C. Regression is used in this scenario to predict a continuous outcome (in this case, the time until equipment failure) based on a set of input variables (sensor data and historical maintenance records). By analyzing the relationship between these variables, the ML model can identify patterns and trends that indicate when equipment is at risk of failure. Hence, this is an example of Regression (4). D. By analyzing user interactions (e.g., likes, comments, shared content) and stated interests, the social network platform can identify patterns and similarities among users. These patterns can then be used to group users into communities or "clusters" that share common interests and behaviors. Hence, this is an example of Clustering (1). Hence, 1D – 2A – 3B – 4C, is correct and so option c) is the correct option.`,
        textVi: `1D – 2A – 3B – 4C`,
        rationaleVi: `Xét các mô tả của từng hệ thống ví dụ: A. Số tiền chi tiêu có thể được xem là hàm thưởng (reward function) cho hệ thống này, khi hệ thống thay đổi hành vi để tăng số tiền người chơi chi. Do đó, đây là ví dụ của Reinforcement Learning (2). B. Ứng dụng sử dụng văn bản có thể xem như ngôn ngữ nguồn và bản dịch "đúng" tương ứng của nguồn đó, áp dụng một dạng học có giám sát (supervised learning) mà không đề cập hàm thưởng tường minh nào. Classification sử dụng dữ liệu huấn luyện song song — các cặp câu tương ứng giữa hai ngôn ngữ (ví dụ: "Hello" trong tiếng Anh và "Bonjour" trong tiếng Pháp) — trong đó mỗi cặp có một nhãn liên kết văn bản nguồn với văn bản đích. Mô hình học các ánh xạ thông qua huấn luyện có giám sát, mã hóa đặc trưng của văn bản đầu vào và dự đoán bản dịch đúng, giảm thiểu sai số qua nhiều cặp như vậy để khái quát hóa cho các câu mới. Do đó, đây là ví dụ của Classification (3). C. Regression được dùng trong tình huống này để dự đoán một kết quả liên tục (ở đây là thời gian cho đến khi thiết bị hỏng) dựa trên một tập các biến đầu vào (dữ liệu cảm biến và lịch sử bảo trì). Bằng cách phân tích mối quan hệ giữa các biến này, mô hình ML có thể nhận diện các mẫu và xu hướng cho thấy khi nào thiết bị có nguy cơ hỏng. Do đó, đây là ví dụ của Regression (4). D. Bằng cách phân tích tương tác của người dùng (như lượt thích, bình luận, nội dung chia sẻ) và sở thích đã khai báo, nền tảng mạng xã hội có thể nhận diện các mẫu và điểm tương đồng giữa người dùng. Các mẫu này sau đó được dùng để nhóm người dùng thành các cộng đồng hay "cụm" có chung sở thích và hành vi. Do đó, đây là ví dụ của Clustering (1). Vậy 1D – 2A – 3B – 4C là đúng, nên phương án c) là phương án đúng.`,
      },
      {
        key: "d",
        text: `1D – 2C – 3B – 4A`,
        rationale: `Considering the descriptions of example systems: A. The amount spent can be considered the reward function for this system, with the system changing its behavior to increase the amount spent. Hence, this is an example of Reinforcement Learning (2). B. The app utilizes text in what can be considered a source language and a corresponding 'correct' translation of this source, employing a form of supervised learning with no explicit reward function mentioned. Classification uses parallel training data—pairs of matching sentences in two languages (e.g., "Hello" in English and "Bonjour" in French)—where each pair has a label linking source to target text. The model learns mappings via supervised training, encoding input text features and predicting the correct translation output, minimizing errors across many such pairs to generalize to new sentences. Hence, this is an example of Classification (3). C. Regression is used in this scenario to predict a continuous outcome (in this case, the time until equipment failure) based on a set of input variables (sensor data and historical maintenance records). By analyzing the relationship between these variables, the ML model can identify patterns and trends that indicate when equipment is at risk of failure. Hence, this is an example of Regression (4). D. By analyzing user interactions (e.g., likes, comments, shared content) and stated interests, the social network platform can identify patterns and similarities among users. These patterns can then be used to group users into communities or "clusters" that share common interests and behaviors. Hence, this is an example of Clustering (1). Hence, 1D – 2A – 3B – 4C, is correct and so option c) is the correct option.`,
        textVi: `1D – 2C – 3B – 4A`,
        rationaleVi: `Xét các mô tả của từng hệ thống ví dụ: A. Số tiền chi tiêu có thể được xem là hàm thưởng (reward function) cho hệ thống này, khi hệ thống thay đổi hành vi để tăng số tiền người chơi chi. Do đó, đây là ví dụ của Reinforcement Learning (2). B. Ứng dụng sử dụng văn bản có thể xem như ngôn ngữ nguồn và bản dịch "đúng" tương ứng của nguồn đó, áp dụng một dạng học có giám sát (supervised learning) mà không đề cập hàm thưởng tường minh nào. Classification sử dụng dữ liệu huấn luyện song song — các cặp câu tương ứng giữa hai ngôn ngữ (ví dụ: "Hello" trong tiếng Anh và "Bonjour" trong tiếng Pháp) — trong đó mỗi cặp có một nhãn liên kết văn bản nguồn với văn bản đích. Mô hình học các ánh xạ thông qua huấn luyện có giám sát, mã hóa đặc trưng của văn bản đầu vào và dự đoán bản dịch đúng, giảm thiểu sai số qua nhiều cặp như vậy để khái quát hóa cho các câu mới. Do đó, đây là ví dụ của Classification (3). C. Regression được dùng trong tình huống này để dự đoán một kết quả liên tục (ở đây là thời gian cho đến khi thiết bị hỏng) dựa trên một tập các biến đầu vào (dữ liệu cảm biến và lịch sử bảo trì). Bằng cách phân tích mối quan hệ giữa các biến này, mô hình ML có thể nhận diện các mẫu và xu hướng cho thấy khi nào thiết bị có nguy cơ hỏng. Do đó, đây là ví dụ của Regression (4). D. Bằng cách phân tích tương tác của người dùng (như lượt thích, bình luận, nội dung chia sẻ) và sở thích đã khai báo, nền tảng mạng xã hội có thể nhận diện các mẫu và điểm tương đồng giữa người dùng. Các mẫu này sau đó được dùng để nhóm người dùng thành các cộng đồng hay "cụm" có chung sở thích và hành vi. Do đó, đây là ví dụ của Clustering (1). Vậy 1D – 2A – 3B – 4C là đúng, nên phương án c) là phương án đúng.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "11",
    lo: "AI-3.1.2",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Given the following activities from the ML workflow:
1. Deploy the Model
2. Prepare & Test Data
3. Test the Model
4. Evaluate the Model
And, given the following descriptions:
A. Model performance is tested using validation data
B. The origin of the test data used to test the model is identified
C. Test data are used to verify the agreed performance criteria are met
D. The model is tested on the target platform
Which of the following BEST matches the descriptions with the activities in the ML workflow?`,
    stemVi: `Cho các hoạt động sau đây trong quy trình ML:
1. Deploy the Model (Triển khai mô hình)
2. Prepare & Test Data (Chuẩn bị & test dữ liệu)
3. Test the Model (Test mô hình)
4. Evaluate the Model (Đánh giá mô hình)
Và các mô tả sau đây:
A. Hiệu năng của mô hình được test bằng dữ liệu validation
B. Nguồn gốc của dữ liệu test dùng để test mô hình được xác định
C. Dữ liệu test được dùng để xác minh các tiêu chí hiệu năng đã thống nhất được đáp ứng
D. Mô hình được test trên nền tảng đích (target platform)
Phương án nào sau đây khớp TỐT NHẤT các mô tả với các hoạt động trong quy trình ML?`,
    options: [
      {
        key: "a",
        text: `1A – 2C – 3B – 4D`,
        rationale: `1. Model performance is tested using validation data — This is part of the 'Evaluate the Model' activity. (D) 2. The origin of the test data used to test the model is identified — This is part of the 'Prepare & Test Data' activity. (B) 3. Test data are used to determine that the agreed performance criteria are met — This is part of the 'Test the Model' activity. (C) 4. The model is tested on the target platform — This is part of the 'Deploy the Model' activity. (A) Hence, the correct option is: 1D – 2B – 3C – 4A, and so d) is correct.`,
        textVi: `1A – 2C – 3B – 4D`,
        rationaleVi: `1. Hiệu năng của mô hình được test bằng dữ liệu validation — Đây thuộc hoạt động "Evaluate the Model". (D) 2. Nguồn gốc của dữ liệu test dùng để test mô hình được xác định — Đây thuộc hoạt động "Prepare & Test Data". (B) 3. Dữ liệu test được dùng để xác định các tiêu chí hiệu năng đã thống nhất được đáp ứng — Đây thuộc hoạt động "Test the Model". (C) 4. Mô hình được test trên nền tảng đích — Đây thuộc hoạt động "Deploy the Model". (A) Vậy phương án đúng là: 1D – 2B – 3C – 4A, nên d) đúng.`,
      },
      {
        key: "b",
        text: `1C – 2D – 3B – 4A`,
        rationale: `1. Model performance is tested using validation data — This is part of the 'Evaluate the Model' activity. (D) 2. The origin of the test data used to test the model is identified — This is part of the 'Prepare & Test Data' activity. (B) 3. Test data are used to determine that the agreed performance criteria are met — This is part of the 'Test the Model' activity. (C) 4. The model is tested on the target platform — This is part of the 'Deploy the Model' activity. (A) Hence, the correct option is: 1D – 2B – 3C – 4A, and so d) is correct.`,
        textVi: `1C – 2D – 3B – 4A`,
        rationaleVi: `1. Hiệu năng của mô hình được test bằng dữ liệu validation — Đây thuộc hoạt động "Evaluate the Model". (D) 2. Nguồn gốc của dữ liệu test dùng để test mô hình được xác định — Đây thuộc hoạt động "Prepare & Test Data". (B) 3. Dữ liệu test được dùng để xác định các tiêu chí hiệu năng đã thống nhất được đáp ứng — Đây thuộc hoạt động "Test the Model". (C) 4. Mô hình được test trên nền tảng đích — Đây thuộc hoạt động "Deploy the Model". (A) Vậy phương án đúng là: 1D – 2B – 3C – 4A, nên d) đúng.`,
      },
      {
        key: "c",
        text: `1D – 2B – 3A – 4C`,
        rationale: `1. Model performance is tested using validation data — This is part of the 'Evaluate the Model' activity. (D) 2. The origin of the test data used to test the model is identified — This is part of the 'Prepare & Test Data' activity. (B) 3. Test data are used to determine that the agreed performance criteria are met — This is part of the 'Test the Model' activity. (C) 4. The model is tested on the target platform — This is part of the 'Deploy the Model' activity. (A) Hence, the correct option is: 1D – 2B – 3C – 4A, and so d) is correct.`,
        textVi: `1D – 2B – 3A – 4C`,
        rationaleVi: `1. Hiệu năng của mô hình được test bằng dữ liệu validation — Đây thuộc hoạt động "Evaluate the Model". (D) 2. Nguồn gốc của dữ liệu test dùng để test mô hình được xác định — Đây thuộc hoạt động "Prepare & Test Data". (B) 3. Dữ liệu test được dùng để xác định các tiêu chí hiệu năng đã thống nhất được đáp ứng — Đây thuộc hoạt động "Test the Model". (C) 4. Mô hình được test trên nền tảng đích — Đây thuộc hoạt động "Deploy the Model". (A) Vậy phương án đúng là: 1D – 2B – 3C – 4A, nên d) đúng.`,
      },
      {
        key: "d",
        text: `1D – 2B – 3C – 4A`,
        rationale: `1. Model performance is tested using validation data — This is part of the 'Evaluate the Model' activity. (D) 2. The origin of the test data used to test the model is identified — This is part of the 'Prepare & Test Data' activity. (B) 3. Test data are used to determine that the agreed performance criteria are met — This is part of the 'Test the Model' activity. (C) 4. The model is tested on the target platform — This is part of the 'Deploy the Model' activity. (A) Hence, the correct option is: 1D – 2B – 3C – 4A, and so d) is correct.`,
        textVi: `1D – 2B – 3C – 4A`,
        rationaleVi: `1. Hiệu năng của mô hình được test bằng dữ liệu validation — Đây thuộc hoạt động "Evaluate the Model". (D) 2. Nguồn gốc của dữ liệu test dùng để test mô hình được xác định — Đây thuộc hoạt động "Prepare & Test Data". (B) 3. Dữ liệu test được dùng để xác định các tiêu chí hiệu năng đã thống nhất được đáp ứng — Đây thuộc hoạt động "Test the Model". (C) 4. Mô hình được test trên nền tảng đích — Đây thuộc hoạt động "Deploy the Model". (A) Vậy phương án đúng là: 1D – 2B – 3C – 4A, nên d) đúng.`,
      },
    ],
    correctKeys: ["d"],
  },
  {
    id: "12",
    lo: "AI-3.1.4",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements about the use of pre-trained models is CORRECT?`,
    stemVi: `Phát biểu nào sau đây về việc sử dụng mô hình pre-trained (đã huấn luyện sẵn) là ĐÚNG?`,
    options: [
      {
        key: "a",
        text: `When applied to a neural network, the RAG approach works by adding additional layers that hold documentation specifically related to the prompt`,
        rationale: `Is not correct. The RAG approach does not add new layers to the neural network to store documentation; instead, it retrieves relevant external data at inference time and augments the model's input with this information.`,
        textVi: `Khi áp dụng cho mạng nơ-ron, cách tiếp cận RAG hoạt động bằng cách thêm các lớp (layer) bổ sung để lưu tài liệu liên quan cụ thể đến prompt`,
        rationaleVi: `Sai. Cách tiếp cận RAG không thêm lớp mới vào mạng nơ-ron để lưu tài liệu; thay vào đó, nó truy xuất (retrieve) dữ liệu bên ngoài liên quan tại thời điểm suy luận (inference) và bổ sung thông tin này vào đầu vào của mô hình.`,
      },
      {
        key: "b",
        text: `Fine-tuning a biased LLM with high-quality, task-specific data prevents unfair outputs based on sensitive attributes`,
        rationale: `Is not correct. While fine-tuning with high-quality data can reduce bias, it does not guarantee the prevention of unfair outputs, as bias can persist or even be introduced during the fine-tuning process.`,
        textVi: `Fine-tune một LLM đang có bias bằng dữ liệu chất lượng cao, chuyên biệt cho tác vụ sẽ ngăn chặn được các đầu ra không công bằng dựa trên các thuộc tính nhạy cảm`,
        rationaleVi: `Sai. Tuy fine-tuning với dữ liệu chất lượng cao có thể giảm bias, nhưng không đảm bảo ngăn chặn hoàn toàn các đầu ra không công bằng, vì bias có thể vẫn tồn tại hoặc thậm chí bị đưa thêm vào trong quá trình fine-tuning.`,
      },
      {
        key: "c",
        text: `To successfully adapt a pre-trained neural network, fine-tuning requires that additional training with new data is applied to all layers of the network`,
        rationale: `Is not correct. Fine-tuning can be performed on all layers or just a subset. Often, only some layers are updated while others are kept frozen, depending on the task and available data.`,
        textVi: `Để thích ứng thành công một mạng nơ-ron pre-trained, fine-tuning đòi hỏi việc huấn luyện bổ sung với dữ liệu mới phải được áp dụng cho tất cả các lớp của mạng`,
        rationaleVi: `Sai. Fine-tuning có thể được thực hiện trên toàn bộ các lớp hoặc chỉ một phần. Thông thường, chỉ một số lớp được cập nhật trong khi các lớp khác được giữ cố định (frozen), tùy vào tác vụ và dữ liệu sẵn có.`,
      },
      {
        key: "d",
        text: `The RAG approach requires the identification and acquisition of data relevant to the task up front, but requires no changes to the pre-trained model`,
        rationale: `Is correct. RAG relies on curating and indexing relevant external data before use, but it does not require modifying the architecture or parameters of the pre-trained model itself; instead, it augments the model's inputs with retrieved information at runtime.`,
        textVi: `Cách tiếp cận RAG đòi hỏi việc xác định và thu thập dữ liệu liên quan đến tác vụ từ trước, nhưng không yêu cầu thay đổi gì đối với mô hình pre-trained`,
        rationaleVi: `Đúng. RAG dựa vào việc chọn lọc và lập chỉ mục (index) dữ liệu bên ngoài liên quan trước khi sử dụng, nhưng không đòi hỏi thay đổi kiến trúc hay tham số của mô hình pre-trained; thay vào đó, nó bổ sung thông tin truy xuất được vào đầu vào của mô hình tại thời điểm chạy (runtime).`,
      },
    ],
    correctKeys: ["d"],
  },
  {
    id: "13",
    lo: "AI-3.2.1",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST describes a key activity in data preparation for machine learning?`,
    stemVi: `Phát biểu nào sau đây mô tả TỐT NHẤT một hoạt động then chốt trong việc chuẩn bị dữ liệu cho machine learning?`,
    options: [
      {
        key: "a",
        text: `Data preparation comprises the identification and gathering of data from various sources, providing the algorithm with raw data to learn from`,
        rationale: `Is not correct. This statement highlights a fundamental step in data preparation: collecting and consolidating data from different sources before any processing or analysis begins. However, data preparation typically also involves cleaning, transforming, and organizing data, in addition to gathering raw data.`,
        textVi: `Chuẩn bị dữ liệu bao gồm việc xác định và thu thập dữ liệu từ nhiều nguồn khác nhau, cung cấp cho thuật toán dữ liệu thô để học`,
        rationaleVi: `Sai. Phát biểu này nêu bật một bước nền tảng trong chuẩn bị dữ liệu: thu thập và hợp nhất dữ liệu từ nhiều nguồn khác nhau trước khi bắt đầu bất kỳ xử lý hay phân tích nào. Tuy nhiên, chuẩn bị dữ liệu thường còn bao gồm việc làm sạch, biến đổi và tổ chức dữ liệu, chứ không chỉ thu thập dữ liệu thô.`,
      },
      {
        key: "b",
        text: `Feature engineering of the data is performed after an ML model has been trained to optimize its performance for real-world deployment`,
        rationale: `Is not correct. This statement is inaccurate because feature engineering is generally performed before (or during) model training, not after. The purpose of feature engineering is to create or modify features to improve ML model performance during the training phase.`,
        textVi: `Feature engineering trên dữ liệu được thực hiện sau khi mô hình ML đã được huấn luyện, nhằm tối ưu hiệu năng cho việc triển khai thực tế`,
        rationaleVi: `Sai. Phát biểu này không chính xác vì feature engineering thường được thực hiện trước (hoặc trong khi) huấn luyện mô hình, chứ không phải sau đó. Mục đích của feature engineering là tạo hoặc điều chỉnh các feature nhằm cải thiện hiệu năng mô hình ML trong giai đoạn huấn luyện.`,
      },
      {
        key: "c",
        text: `Data pre-processing includes augmentation and sampling, which either add or reduce the number of examples in the training data respectively`,
        rationale: `Is correct. This correctly identifies two common data pre-processing techniques: augmentation (increasing data by creating modified versions) and sampling (reducing data by selecting subsets).`,
        textVi: `Tiền xử lý dữ liệu (data pre-processing) bao gồm augmentation và sampling, tương ứng là tăng hoặc giảm số lượng mẫu trong dữ liệu huấn luyện`,
        rationaleVi: `Đúng. Phát biểu này xác định đúng hai kỹ thuật tiền xử lý dữ liệu phổ biến: augmentation (tăng dữ liệu bằng cách tạo các phiên bản đã chỉnh sửa) và sampling (giảm dữ liệu bằng cách chọn ra các tập con).`,
      },
      {
        key: "d",
        text: `Exploratory data analysis (EDA) is a form of exploratory testing applied to the data preparation activities of acquisition, pre-processing and labelling`,
        rationale: `Is not correct. This statement partially captures the purpose of EDA, which is to understand data characteristics and detect issues through visualization and summary statistics. However, EDA is not "exploratory testing" but rather is an analytical process that informs subsequent data preparation steps.`,
        textVi: `Phân tích dữ liệu khám phá (Exploratory data analysis - EDA) là một dạng exploratory testing áp dụng cho các hoạt động chuẩn bị dữ liệu gồm thu thập, tiền xử lý và gán nhãn`,
        rationaleVi: `Sai. Phát biểu này chỉ nắm bắt một phần mục đích của EDA, vốn là để hiểu đặc điểm dữ liệu và phát hiện vấn đề thông qua trực quan hóa và thống kê tóm tắt. Tuy nhiên, EDA không phải là "exploratory testing" mà là một quy trình phân tích, làm cơ sở cho các bước chuẩn bị dữ liệu tiếp theo.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "14",
    lo: "AI-3.2.3",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST contrasts the roles of training, validation, and test datasets in ML model development?`,
    stemVi: `Phát biểu nào sau đây đối chiếu TỐT NHẤT vai trò của tập dữ liệu training, validation và test trong quá trình phát triển mô hình ML?`,
    options: [
      {
        key: "a",
        text: `The training dataset is used to optimize hyperparameters, the validation dataset is used to tune predictions, and the test dataset is used to generate training data`,
        rationale: `Is not correct. The training dataset is primarily used to fit the model's parameters, not to optimize hyperparameters. The validation dataset is typically used to tune hyperparameters, and the test dataset is never used to generate training data.`,
        textVi: `Tập training dùng để tối ưu hyperparameter, tập validation dùng để tinh chỉnh dự đoán, còn tập test dùng để tạo ra dữ liệu training`,
        rationaleVi: `Sai. Tập training chủ yếu dùng để khớp (fit) các tham số của mô hình, không phải để tối ưu hyperparameter. Tập validation mới thường được dùng để tinh chỉnh hyperparameter, và tập test không bao giờ được dùng để tạo dữ liệu training.`,
      },
      {
        key: "b",
        text: `The training dataset is used to create the model, the validation dataset is used to tune the model, and the test dataset evaluates its performance on unseen data`,
        rationale: `Is correct. The training dataset is used to fit or create the model, the validation dataset is used to tune the model's hyperparameters and prevent overfitting, and the test dataset is reserved for evaluating the model's performance on unseen data. It accurately describes the distinct and sequential roles of each dataset in the ML workflow.`,
        textVi: `Tập training dùng để tạo ra mô hình, tập validation dùng để tinh chỉnh mô hình, còn tập test đánh giá hiệu năng của mô hình trên dữ liệu chưa từng thấy`,
        rationaleVi: `Đúng. Tập training dùng để khớp hoặc tạo ra mô hình, tập validation dùng để tinh chỉnh hyperparameter của mô hình và ngăn ngừa overfitting, còn tập test được dành riêng để đánh giá hiệu năng mô hình trên dữ liệu chưa từng thấy. Phát biểu này mô tả chính xác vai trò riêng biệt và tuần tự của từng tập dữ liệu trong quy trình ML.`,
      },
      {
        key: "c",
        text: `The training dataset is used for final model evaluation, the validation dataset ensures the model does not overfit, and the test dataset is used for tuning hyperparameters`,
        rationale: `Is not correct. The training dataset is not used for final model evaluation - that is the role of the test dataset. Additionally, the test dataset is not used for tuning hyperparameters, as that would risk overfitting to the test dataset.`,
        textVi: `Tập training dùng để đánh giá cuối cùng của mô hình, tập validation đảm bảo mô hình không bị overfitting, còn tập test dùng để tinh chỉnh hyperparameter`,
        rationaleVi: `Sai. Tập training không được dùng để đánh giá cuối cùng của mô hình — đó là vai trò của tập test. Ngoài ra, tập test cũng không được dùng để tinh chỉnh hyperparameter, vì làm vậy sẽ có nguy cơ gây overfitting với chính tập test.`,
      },
      {
        key: "d",
        text: `The training dataset ensures the model generalizes well, the validation dataset is used to deploy the model, and the test dataset is used for initial evaluation`,
        rationale: `Is not correct. The training dataset's primary role is not to ensure generalization but to fit the model. The validation dataset is not used for deployment, and the test dataset is not used for initial evaluation but for final assessment after model development`,
        textVi: `Tập training đảm bảo mô hình khái quát hóa tốt, tập validation dùng để triển khai mô hình, còn tập test dùng cho đánh giá ban đầu`,
        rationaleVi: `Sai. Vai trò chính của tập training không phải để đảm bảo khả năng khái quát hóa mà là để khớp mô hình. Tập validation không được dùng để triển khai, và tập test không dùng cho đánh giá ban đầu mà là để đánh giá cuối cùng sau khi phát triển mô hình.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "15",
    lo: "AI-3.3.1",
    chapterNum: 3,
    kLevel: "K3",
    points: 2,
    selectCount: 1,
    stem: `Consider the following confusion matrix for an image classifier:

Confusion Matrix | Predicted Positive | Predicted Negative
Actual Positive | 78 | 6
Actual Negative | 22 | 14

Which of the following options represents the CORRECT formula for calculating the precision of the classifier?`,
    stemVi: `Xét ma trận nhầm lẫn (confusion matrix) sau đây cho một bộ phân loại ảnh (image classifier):

Confusion Matrix | Predicted Positive | Predicted Negative
Actual Positive | 78 | 6
Actual Negative | 22 | 14

Phương án nào sau đây thể hiện ĐÚNG công thức tính precision (độ chuẩn xác) của bộ phân loại?`,
    options: [
      {
        key: "a",
        text: `(20/120) *100`,
        rationale: `Is not correct. See option c for the correct formula and calculation.`,
        textVi: `(20/120) *100`,
        rationaleVi: `Sai. Xem phương án c để biết công thức và cách tính đúng.`,
      },
      {
        key: "b",
        text: `(78/120) *100`,
        rationale: `Is not correct. See option c for the correct formula and calculation.`,
        textVi: `(78/120) *100`,
        rationaleVi: `Sai. Xem phương án c để biết công thức và cách tính đúng.`,
      },
      {
        key: "c",
        text: `(78/100) *100`,
        rationale: `Is correct. The formula for Precision = TP/ (TP+FP) *100 = 78/(78+22) = 78/100 *100`,
        textVi: `(78/100) *100`,
        rationaleVi: `Đúng. Công thức Precision = TP/(TP+FP) *100 = 78/(78+22) = 78/100 *100`,
      },
      {
        key: "d",
        text: `(22/100) *100`,
        rationale: `Is not correct. See option c for the correct formula and calculation.`,
        textVi: `(22/100) *100`,
        rationaleVi: `Sai. Xem phương án c để biết công thức và cách tính đúng.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "16",
    lo: "AI-3.4.1",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `During the training of a deep neural network, the network produces an output, and the loss is calculated.
Which of the following CORRECTLY describes the next step in the training process?`,
    stemVi: `Trong quá trình huấn luyện một mạng nơ-ron sâu (deep neural network), mạng tạo ra một đầu ra, và giá trị loss được tính toán.
Phương án nào sau đây mô tả ĐÚNG bước tiếp theo trong quy trình huấn luyện?`,
    options: [
      {
        key: "a",
        text: `The weights and biases across the network are adjusted to reduce the calculated loss`,
        rationale: `Is correct. This is the next step in the ML training loop. The loss is fed back through the network to adjust the values of the weights and biases.`,
        textVi: `Các trọng số (weight) và độ lệch (bias) trên toàn mạng được điều chỉnh để giảm giá trị loss đã tính được`,
        rationaleVi: `Đúng. Đây là bước tiếp theo trong vòng lặp huấn luyện ML. Giá trị loss được truyền ngược lại qua mạng để điều chỉnh giá trị của các trọng số và độ lệch.`,
      },
      {
        key: "b",
        text: `The same training data is passed through the network again to confirm the loss value`,
        rationale: `Is not correct. The training proceeds to the next batch of data or completes the epoch. It doesn't rerun the same data just to confirm the loss value.`,
        textVi: `Cùng một dữ liệu huấn luyện được đưa qua mạng một lần nữa để xác nhận giá trị loss`,
        rationaleVi: `Sai. Quá trình huấn luyện tiếp tục với batch dữ liệu tiếp theo hoặc hoàn tất một epoch. Nó không chạy lại cùng dữ liệu chỉ để xác nhận giá trị loss.`,
      },
      {
        key: "c",
        text: `The activation functions are altered to different non-linear formulas to find a better fit`,
        rationale: `Is not correct. Activation functions are chosen during model design and are not usually changed during a training run.`,
        textVi: `Các hàm kích hoạt (activation function) được thay đổi sang các công thức phi tuyến khác để tìm mức khớp tốt hơn`,
        rationaleVi: `Sai. Hàm kích hoạt được lựa chọn trong giai đoạn thiết kế mô hình và thường không bị thay đổi trong một lượt huấn luyện.`,
      },
      {
        key: "d",
        text: `The network's hidden layers are reset with new random weight values`,
        rationale: `Is not correct. Resetting the weights happens at the start of training (initialization), not after calculating the loss value for a batch of data.`,
        textVi: `Các lớp ẩn (hidden layer) của mạng được đặt lại với các giá trị trọng số ngẫu nhiên mới`,
        rationaleVi: `Sai. Việc đặt lại trọng số diễn ra ở đầu quá trình huấn luyện (bước khởi tạo), không phải sau khi tính giá trị loss cho một batch dữ liệu.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "17",
    lo: "AI-4.1.1",
    chapterNum: 4,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Given the following examples of AI-based systems:
i. A system that learns from real-time data to improve its failure predictions and automatically updates maintenance schedules
ii. A spam filter for an email app, which identifies spam based on predefined rules
iii. A recommendation engine on a streaming service that updates its suggestions based on a user's changing viewing habits and preferences
iv. A personal assistant that learns continuously from its user
v. A rule-based system for medical diagnosis
Which of the following BEST describes the systems which can be considered to be locked AI-based systems?`,
    stemVi: `Cho các ví dụ hệ thống dựa trên AI sau đây:
i. Một hệ thống học từ dữ liệu thời gian thực để cải thiện dự đoán hỏng hóc và tự động cập nhật lịch bảo trì
ii. Một bộ lọc thư rác cho ứng dụng email, xác định thư rác dựa trên các quy tắc định trước
iii. Một hệ gợi ý trên dịch vụ streaming, cập nhật đề xuất dựa trên thói quen và sở thích xem đang thay đổi của người dùng
iv. Một trợ lý cá nhân liên tục học từ người dùng của nó
v. Một hệ thống dựa trên luật (rule-based) cho chẩn đoán y khoa
Phương án nào sau đây mô tả TỐT NHẤT các hệ thống có thể được coi là hệ AI khóa (locked AI-based system)?`,
    options: [
      {
        key: "a",
        text: `ii and v`,
        rationale: `Considering the provided example AI-based systems: i. A system that learns from real-time data to improve its failure predictions and automatically updates maintenance schedules. This is a form of adaptive AI-based system that changes the schedules based on real-time data. ii. A spam filter in an email app, which identifies spam based on predefined rules. This is a form of locked AI-based system, which generates predictable test results, as it is based on following predefined spam identification rules that will not be changed until the rule-based model is rebuilt. iii. A recommendation engine on a streaming service that updates its suggestions based on a user's changing viewing habits and preferences. This is a form of adaptive system that adapts based on the user's viewing habits and preferences. iv. A personal assistant that learns from its user. This is an adaptive AI-based system because it adapts its parameters based on users' interactions with the system. v. A rule-based system for medical diagnosis. This is a form of a locked AI-based system, which will not change the domain rules until the rule-based model is rebuilt. Thus, the spam filter and medical diagnosis systems would be more straightforward to test because they are both forms of locked systems and generate predictable test results. And, so, option a) is correct`,
        textVi: `ii và v`,
        rationaleVi: `Xét các ví dụ hệ thống dựa trên AI đã cho: i. Một hệ thống học từ dữ liệu thời gian thực để cải thiện dự đoán hỏng hóc và tự động cập nhật lịch bảo trì. Đây là một dạng hệ AI thích ứng (adaptive), thay đổi lịch bảo trì dựa trên dữ liệu thời gian thực. ii. Một bộ lọc thư rác trong ứng dụng email, xác định thư rác dựa trên các quy tắc định trước. Đây là một dạng hệ AI khóa (locked), tạo ra kết quả test có thể dự đoán được, vì nó dựa trên việc tuân theo các quy tắc xác định thư rác định trước, sẽ không thay đổi cho đến khi mô hình dựa trên luật được xây dựng lại. iii. Một hệ gợi ý trên dịch vụ streaming, cập nhật đề xuất dựa trên thói quen và sở thích xem đang thay đổi của người dùng. Đây là một dạng hệ thích ứng, thay đổi dựa trên thói quen và sở thích xem của người dùng. iv. Một trợ lý cá nhân học từ người dùng của nó. Đây là hệ AI thích ứng vì nó điều chỉnh tham số dựa trên tương tác của người dùng với hệ thống. v. Một hệ thống dựa trên luật cho chẩn đoán y khoa. Đây là một dạng hệ AI khóa, sẽ không thay đổi các quy tắc theo lĩnh vực cho đến khi mô hình dựa trên luật được xây dựng lại. Do đó, bộ lọc thư rác và hệ chẩn đoán y khoa sẽ dễ test hơn vì cả hai đều là dạng hệ khóa và tạo ra kết quả test có thể dự đoán được. Vì vậy, phương án a) đúng`,
      },
      {
        key: "b",
        text: `i, iii, and iv`,
        rationale: `Considering the provided example AI-based systems: i. A system that learns from real-time data to improve its failure predictions and automatically updates maintenance schedules. This is a form of adaptive AI-based system that changes the schedules based on real-time data. ii. A spam filter in an email app, which identifies spam based on predefined rules. This is a form of locked AI-based system, which generates predictable test results, as it is based on following predefined spam identification rules that will not be changed until the rule-based model is rebuilt. iii. A recommendation engine on a streaming service that updates its suggestions based on a user's changing viewing habits and preferences. This is a form of adaptive system that adapts based on the user's viewing habits and preferences. iv. A personal assistant that learns from its user. This is an adaptive AI-based system because it adapts its parameters based on users' interactions with the system. v. A rule-based system for medical diagnosis. This is a form of a locked AI-based system, which will not change the domain rules until the rule-based model is rebuilt. Thus, the spam filter and medical diagnosis systems would be more straightforward to test because they are both forms of locked systems and generate predictable test results. And, so, option a) is correct`,
        textVi: `i, iii và iv`,
        rationaleVi: `Xét các ví dụ hệ thống dựa trên AI đã cho: i. Một hệ thống học từ dữ liệu thời gian thực để cải thiện dự đoán hỏng hóc và tự động cập nhật lịch bảo trì. Đây là một dạng hệ AI thích ứng (adaptive), thay đổi lịch bảo trì dựa trên dữ liệu thời gian thực. ii. Một bộ lọc thư rác trong ứng dụng email, xác định thư rác dựa trên các quy tắc định trước. Đây là một dạng hệ AI khóa (locked), tạo ra kết quả test có thể dự đoán được, vì nó dựa trên việc tuân theo các quy tắc xác định thư rác định trước, sẽ không thay đổi cho đến khi mô hình dựa trên luật được xây dựng lại. iii. Một hệ gợi ý trên dịch vụ streaming, cập nhật đề xuất dựa trên thói quen và sở thích xem đang thay đổi của người dùng. Đây là một dạng hệ thích ứng, thay đổi dựa trên thói quen và sở thích xem của người dùng. iv. Một trợ lý cá nhân học từ người dùng của nó. Đây là hệ AI thích ứng vì nó điều chỉnh tham số dựa trên tương tác của người dùng với hệ thống. v. Một hệ thống dựa trên luật cho chẩn đoán y khoa. Đây là một dạng hệ AI khóa, sẽ không thay đổi các quy tắc theo lĩnh vực cho đến khi mô hình dựa trên luật được xây dựng lại. Do đó, bộ lọc thư rác và hệ chẩn đoán y khoa sẽ dễ test hơn vì cả hai đều là dạng hệ khóa và tạo ra kết quả test có thể dự đoán được. Vì vậy, phương án a) đúng`,
      },
      {
        key: "c",
        text: `i, and iii`,
        rationale: `Considering the provided example AI-based systems: i. A system that learns from real-time data to improve its failure predictions and automatically updates maintenance schedules. This is a form of adaptive AI-based system that changes the schedules based on real-time data. ii. A spam filter in an email app, which identifies spam based on predefined rules. This is a form of locked AI-based system, which generates predictable test results, as it is based on following predefined spam identification rules that will not be changed until the rule-based model is rebuilt. iii. A recommendation engine on a streaming service that updates its suggestions based on a user's changing viewing habits and preferences. This is a form of adaptive system that adapts based on the user's viewing habits and preferences. iv. A personal assistant that learns from its user. This is an adaptive AI-based system because it adapts its parameters based on users' interactions with the system. v. A rule-based system for medical diagnosis. This is a form of a locked AI-based system, which will not change the domain rules until the rule-based model is rebuilt. Thus, the spam filter and medical diagnosis systems would be more straightforward to test because they are both forms of locked systems and generate predictable test results. And, so, option a) is correct`,
        textVi: `i và iii`,
        rationaleVi: `Xét các ví dụ hệ thống dựa trên AI đã cho: i. Một hệ thống học từ dữ liệu thời gian thực để cải thiện dự đoán hỏng hóc và tự động cập nhật lịch bảo trì. Đây là một dạng hệ AI thích ứng (adaptive), thay đổi lịch bảo trì dựa trên dữ liệu thời gian thực. ii. Một bộ lọc thư rác trong ứng dụng email, xác định thư rác dựa trên các quy tắc định trước. Đây là một dạng hệ AI khóa (locked), tạo ra kết quả test có thể dự đoán được, vì nó dựa trên việc tuân theo các quy tắc xác định thư rác định trước, sẽ không thay đổi cho đến khi mô hình dựa trên luật được xây dựng lại. iii. Một hệ gợi ý trên dịch vụ streaming, cập nhật đề xuất dựa trên thói quen và sở thích xem đang thay đổi của người dùng. Đây là một dạng hệ thích ứng, thay đổi dựa trên thói quen và sở thích xem của người dùng. iv. Một trợ lý cá nhân học từ người dùng của nó. Đây là hệ AI thích ứng vì nó điều chỉnh tham số dựa trên tương tác của người dùng với hệ thống. v. Một hệ thống dựa trên luật cho chẩn đoán y khoa. Đây là một dạng hệ AI khóa, sẽ không thay đổi các quy tắc theo lĩnh vực cho đến khi mô hình dựa trên luật được xây dựng lại. Do đó, bộ lọc thư rác và hệ chẩn đoán y khoa sẽ dễ test hơn vì cả hai đều là dạng hệ khóa và tạo ra kết quả test có thể dự đoán được. Vì vậy, phương án a) đúng`,
      },
      {
        key: "d",
        text: `ii, iv, and v`,
        rationale: `Considering the provided example AI-based systems: i. A system that learns from real-time data to improve its failure predictions and automatically updates maintenance schedules. This is a form of adaptive AI-based system that changes the schedules based on real-time data. ii. A spam filter in an email app, which identifies spam based on predefined rules. This is a form of locked AI-based system, which generates predictable test results, as it is based on following predefined spam identification rules that will not be changed until the rule-based model is rebuilt. iii. A recommendation engine on a streaming service that updates its suggestions based on a user's changing viewing habits and preferences. This is a form of adaptive system that adapts based on the user's viewing habits and preferences. iv. A personal assistant that learns from its user. This is an adaptive AI-based system because it adapts its parameters based on users' interactions with the system. v. A rule-based system for medical diagnosis. This is a form of a locked AI-based system, which will not change the domain rules until the rule-based model is rebuilt. Thus, the spam filter and medical diagnosis systems would be more straightforward to test because they are both forms of locked systems and generate predictable test results. And, so, option a) is correct`,
        textVi: `ii, iv và v`,
        rationaleVi: `Xét các ví dụ hệ thống dựa trên AI đã cho: i. Một hệ thống học từ dữ liệu thời gian thực để cải thiện dự đoán hỏng hóc và tự động cập nhật lịch bảo trì. Đây là một dạng hệ AI thích ứng (adaptive), thay đổi lịch bảo trì dựa trên dữ liệu thời gian thực. ii. Một bộ lọc thư rác trong ứng dụng email, xác định thư rác dựa trên các quy tắc định trước. Đây là một dạng hệ AI khóa (locked), tạo ra kết quả test có thể dự đoán được, vì nó dựa trên việc tuân theo các quy tắc xác định thư rác định trước, sẽ không thay đổi cho đến khi mô hình dựa trên luật được xây dựng lại. iii. Một hệ gợi ý trên dịch vụ streaming, cập nhật đề xuất dựa trên thói quen và sở thích xem đang thay đổi của người dùng. Đây là một dạng hệ thích ứng, thay đổi dựa trên thói quen và sở thích xem của người dùng. iv. Một trợ lý cá nhân học từ người dùng của nó. Đây là hệ AI thích ứng vì nó điều chỉnh tham số dựa trên tương tác của người dùng với hệ thống. v. Một hệ thống dựa trên luật cho chẩn đoán y khoa. Đây là một dạng hệ AI khóa, sẽ không thay đổi các quy tắc theo lĩnh vực cho đến khi mô hình dựa trên luật được xây dựng lại. Do đó, bộ lọc thư rác và hệ chẩn đoán y khoa sẽ dễ test hơn vì cả hai đều là dạng hệ khóa và tạo ra kết quả test có thể dự đoán được. Vì vậy, phương án a) đúng`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "18",
    lo: "AI-4.1.2",
    chapterNum: 4,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following options BEST explains why a statistical approach is necessary when testing an AI-based system?`,
    stemVi: `Phương án nào sau đây giải thích TỐT NHẤT vì sao cần một cách tiếp cận thống kê (statistical approach) khi test một hệ thống dựa trên AI?`,
    options: [
      {
        key: "a",
        text: `The system is typically large and complex, making test automation impractical without the use of statistical sampling`,
        rationale: `Is not correct. While AI-based systems can be large and complex, the rationale for using a statistical approach is primarily driven by their non-deterministic nature, not the impracticality of automation or size.`,
        textVi: `Hệ thống thường lớn và phức tạp, khiến việc tự động hóa test trở nên bất khả thi nếu không dùng phương pháp lấy mẫu thống kê (statistical sampling)`,
        rationaleVi: `Sai. Tuy hệ thống dựa trên AI có thể lớn và phức tạp, lý do chính để dùng cách tiếp cận thống kê là do bản chất không xác định (non-deterministic) của chúng, chứ không phải vì tự động hóa bất khả thi hay vì kích thước hệ thống.`,
      },
      {
        key: "b",
        text: `The system exhibits non-deterministic behavior, requiring large and representative test datasets to draw meaningful conclusions`,
        rationale: `Is correct. AI-based systems are non-deterministic and require extensive, representative test datasets to achieve statistical significance, especially in assessing functional correctness statistically.`,
        textVi: `Hệ thống thể hiện hành vi không xác định, đòi hỏi tập dữ liệu test lớn và có tính đại diện để rút ra kết luận có ý nghĩa`,
        rationaleVi: `Đúng. Hệ thống dựa trên AI mang tính không xác định và cần tập dữ liệu test đủ lớn, có tính đại diện để đạt được ý nghĩa thống kê, đặc biệt khi đánh giá tính đúng đắn chức năng theo phương pháp thống kê.`,
      },
      {
        key: "c",
        text: `A single test case is sufficient to determine if a model is well-calibrated, but only statistical methods can verify accuracy`,
        rationale: `Is not correct. This option misrepresents the concept. A single test case is not sufficient to assess the quality of the AI-based system. Statistical evaluation over many predictions is necessary.`,
        textVi: `Một test case duy nhất là đủ để xác định liệu mô hình có được hiệu chỉnh (calibrated) tốt hay không, nhưng chỉ có phương pháp thống kê mới có thể xác minh độ chính xác`,
        rationaleVi: `Sai. Phương án này diễn đạt sai khái niệm. Một test case duy nhất không đủ để đánh giá chất lượng của hệ thống dựa trên AI. Cần có đánh giá thống kê trên nhiều dự đoán.`,
      },
      {
        key: "d",
        text: `The system is trained on real-world data and therefore does not require a separate test dataset; instead, it requires statistical validation`,
        rationale: `Is not correct. This contradicts best practices. A separate test dataset (from training and validation) is essential, not optional, and is part of the statistical rigor required.`,
        textVi: `Hệ thống được huấn luyện trên dữ liệu thực tế nên không cần tập dữ liệu test riêng; thay vào đó, nó chỉ cần thẩm định thống kê (statistical validation)`,
        rationaleVi: `Sai. Điều này đi ngược với thực hành tốt nhất. Một tập dữ liệu test riêng biệt (tách khỏi training và validation) là bắt buộc, không phải tùy chọn, và là một phần của tính chặt chẽ thống kê cần thiết.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "19",
    lo: "AI-4.1.3",
    chapterNum: 4,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Why is setting a 'seed' only a LIMITED solution for addressing the test oracle problem in AI systems?`,
    stemVi: `Vì sao việc thiết lập một "seed" chỉ là một giải pháp GIỚI HẠN để giải quyết vấn đề test oracle trong các hệ thống AI?`,
    options: [
      {
        key: "a",
        text: `It is a method that only functions for AI systems built from complete and detailed technical specifications`,
        rationale: `Is not correct. Setting a seed is an implementation detail that is independent of the quality or completeness of the system's specifications.`,
        textVi: `Đây là một phương pháp chỉ hoạt động với các hệ thống AI được xây dựng từ đặc tả kỹ thuật đầy đủ và chi tiết`,
        rationaleVi: `Sai. Việc thiết lập seed là một chi tiết triển khai, độc lập với chất lượng hay mức độ đầy đủ của đặc tả hệ thống.`,
      },
      {
        key: "b",
        text: `It ensures reproducibility for individual test runs but cannot alter the model's inherent probabilistic nature in production`,
        rationale: `Is correct. The setting of a 'seed' is bound to a specific test execution and does not solve the fundamental probabilistic nature of the model when it operates in a real-world environment.`,
        textVi: `Nó đảm bảo khả năng tái lập (reproducibility) cho từng lượt chạy test riêng lẻ nhưng không thể thay đổi bản chất xác suất vốn có của mô hình khi vận hành trong môi trường production`,
        rationaleVi: `Đúng. Việc thiết lập "seed" gắn liền với một lượt thực thi test cụ thể và không giải quyết được bản chất xác suất nền tảng của mô hình khi nó hoạt động trong môi trường thực tế.`,
      },
      {
        key: "c",
        text: `Its success depends upon extensive consultation with domain experts to select the most appropriate seed value for the tests`,
        rationale: `Is not correct. Choosing a seed is a simple programming step and does not involve domain experts.`,
        textVi: `Sự thành công của nó phụ thuộc vào việc tham vấn sâu rộng với chuyên gia lĩnh vực để chọn ra giá trị seed phù hợp nhất cho các bài test`,
        rationaleVi: `Sai. Việc chọn seed là một bước lập trình đơn giản và không cần đến chuyên gia lĩnh vực.`,
      },
      {
        key: "d",
        text: `It introduces a high degree of subjectivity into the model's behavior, which complicates the test evaluation process.`,
        rationale: `Is not correct. Setting a seed does not make the behavior subjective. For a given test run, it should make the behavior objective and repeatable.`,
        textVi: `Nó đưa vào một mức độ chủ quan cao trong hành vi của mô hình, làm phức tạp thêm quá trình đánh giá test.`,
        rationaleVi: `Sai. Việc thiết lập seed không khiến hành vi trở nên chủ quan. Đối với một lượt chạy test cho trước, nó phải làm cho hành vi trở nên khách quan và có thể lặp lại.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "20",
    lo: "AI-4.2.1",
    chapterNum: 4,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST describes a common approach to testing GenAI models?`,
    stemVi: `Phát biểu nào sau đây mô tả TỐT NHẤT một cách tiếp cận phổ biến để test các mô hình GenAI?`,
    options: [
      {
        key: "a",
        text: `GenAI models are tested by verifying that their outputs exactly match predefined expected results`,
        rationale: `Is not correct. Generative AI models do not produce deterministic outputs, so exact matching with predefined expected results is not a suitable approach for this testing.`,
        textVi: `Mô hình GenAI được test bằng cách xác minh đầu ra khớp chính xác với kết quả mong đợi đã định trước`,
        rationaleVi: `Sai. Mô hình generative AI không tạo ra đầu ra mang tính xác định, nên việc khớp chính xác với kết quả mong đợi định trước không phải là cách tiếp cận phù hợp cho việc test này.`,
      },
      {
        key: "b",
        text: `It involves manipulating diverse inputs and parameters and then assessing the output's adherence to rules, because a direct input-to-output match is not feasible`,
        rationale: `Is correct. Because of the variability and complexity in GenAI outputs, testing focuses on coherence, rules compliance, and plausibility, rather than matching fixed expected outputs. Diverse inputs, optional prompts, and parameters all influence the test results.`,
        textVi: `Nó bao gồm việc thay đổi đa dạng đầu vào và tham số, sau đó đánh giá mức độ đầu ra tuân thủ các quy tắc, vì việc khớp trực tiếp đầu vào-đầu ra là không khả thi`,
        rationaleVi: `Đúng. Do tính biến thiên và phức tạp trong đầu ra của GenAI, việc test tập trung vào tính mạch lạc (coherence), sự tuân thủ quy tắc và tính hợp lý (plausibility), thay vì khớp với đầu ra mong đợi cố định. Đầu vào đa dạng, prompt tùy chọn và các tham số đều ảnh hưởng đến kết quả test.`,
      },
      {
        key: "c",
        text: `Since GenAI models are probabilistic, formal testing is unnecessary because outputs will always vary and cannot be evaluated effectively`,
        rationale: `Is not correct. While generative AI models are probabilistic, testing (e.g., exploratory testing, metamorphic testing and adversarial testing) can still be used.`,
        textVi: `Vì mô hình GenAI mang tính xác suất, việc test một cách bài bản là không cần thiết bởi đầu ra sẽ luôn thay đổi và không thể đánh giá hiệu quả`,
        rationaleVi: `Sai. Tuy mô hình generative AI mang tính xác suất, việc test (ví dụ: exploratory testing, metamorphic testing và adversarial testing) vẫn có thể áp dụng được.`,
      },
      {
        key: "d",
        text: `GenAI models are mainly tested through manual review, as automated testing does not apply to creative AI outputs`,
        rationale: `Is not correct. Manual review is possible, but automated methods, including other GenAI tools or image recognition systems, can also effectively evaluate generated content. Therefore, asserting that automated testing 'does not apply' is inaccurate.`,
        textVi: `Mô hình GenAI chủ yếu được test qua rà soát thủ công (manual review), vì test tự động không áp dụng được cho các đầu ra AI mang tính sáng tạo`,
        rationaleVi: `Sai. Rà soát thủ công là khả thi, nhưng các phương pháp tự động, bao gồm các công cụ GenAI khác hoặc hệ thống nhận diện hình ảnh, cũng có thể đánh giá hiệu quả nội dung được sinh ra. Do đó, khẳng định rằng test tự động "không áp dụng được" là không chính xác.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "21",
    lo: "AI-4.2.2",
    chapterNum: 4,
    kLevel: "K3",
    points: 2,
    selectCount: 1,
    stem: `Your organization plans to deploy a GenAI-powered legal document generator. During implementation planning, the security team argues for focusing red teaming efforts on preventing prompt injection attacks, while the compliance team wants to prioritize bias detection in legal advice generation. The development team suggests running red teaming after the system goes live to save time.
Which of the following is the MOST effective red teaming implementation strategy for this scenario?`,
    stemVi: `Tổ chức của bạn dự định triển khai một công cụ sinh tài liệu pháp lý dựa trên GenAI. Trong giai đoạn lập kế hoạch triển khai, đội bảo mật lập luận nên tập trung nỗ lực red teaming vào việc ngăn chặn tấn công prompt injection, trong khi đội tuân thủ (compliance) muốn ưu tiên phát hiện bias trong nội dung tư vấn pháp lý được sinh ra. Đội phát triển đề xuất chạy red teaming sau khi hệ thống lên production để tiết kiệm thời gian.
Chiến lược triển khai red teaming nào sau đây là HIỆU QUẢ NHẤT cho tình huống này?`,
    options: [
      {
        key: "a",
        text: `Prioritize security vulnerabilities first, then address bias issues in a separate phase after deployment`,
        rationale: `Is not correct. Red teaming is typically performed before deployment.`,
        textVi: `Ưu tiên xử lý các lỗ hổng bảo mật trước, sau đó xử lý các vấn đề về bias trong một giai đoạn riêng sau khi triển khai`,
        rationaleVi: `Sai. Red teaming thường được thực hiện trước khi triển khai.`,
      },
      {
        key: "b",
        text: `Focus on bias detection since legal advice accuracy is more critical than security concerns`,
        rationale: `Is not correct. There is no guidance given in the question that security is more or less important than testing for bias.`,
        textVi: `Tập trung vào phát hiện bias vì độ chính xác của tư vấn pháp lý quan trọng hơn các vấn đề bảo mật`,
        rationaleVi: `Sai. Đề bài không đưa ra chỉ dẫn nào cho thấy bảo mật quan trọng hơn hay kém quan trọng hơn việc test bias.`,
      },
      {
        key: "c",
        text: `Deploy immediately and conduct red teaming reactively based on incidents and user feedback`,
        rationale: `Is not correct. Red teaming is done proactively before deployment.`,
        textVi: `Triển khai ngay lập tức và thực hiện red teaming một cách bị động, dựa trên sự cố và phản hồi của người dùng`,
        rationaleVi: `Sai. Red teaming được thực hiện chủ động trước khi triển khai.`,
      },
      {
        key: "d",
        text: `Use attack scenarios covering both security and bias vulnerabilities before deployment`,
        rationale: `Is correct. Red teaming should be conducted before deployment, not after and multiple vulnerability types (security and bias) should be tested together.`,
        textVi: `Sử dụng các kịch bản tấn công bao phủ cả lỗ hổng bảo mật lẫn lỗ hổng về bias trước khi triển khai`,
        rationaleVi: `Đúng. Red teaming nên được thực hiện trước khi triển khai, không phải sau đó, và nhiều loại lỗ hổng (bảo mật và bias) nên được test cùng nhau.`,
      },
    ],
    correctKeys: ["d"],
  },
  {
    id: "22",
    lo: "AI-4.3.1",
    chapterNum: 4,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `An ML-based weather prediction system provides excellent results for most locations; however, it has been noticed that the predictions for areas in the UK with an altitude greater than 1250 meters are regularly inaccurate.
Which of the following test levels should have been performed MORE thoroughly?`,
    stemVi: `Một hệ thống dự báo thời tiết dựa trên ML cho kết quả rất tốt ở hầu hết các địa điểm; tuy nhiên, người ta nhận thấy các dự đoán cho những khu vực ở Anh có độ cao trên 1250 mét thường xuyên không chính xác.
Cấp độ test nào sau đây lẽ ra cần được thực hiện KỸ LƯỠNG HƠN?`,
    options: [
      {
        key: "a",
        text: `System testing`,
        rationale: `Is not correct. While system testing may have detected this defect, input data testing is the most effective test level for detecting it, as it would have been caught at an earlier phase.`,
        textVi: `Test hệ thống (system testing)`,
        rationaleVi: `Sai. Tuy test hệ thống có thể đã phát hiện lỗi này, input data testing mới là cấp độ test hiệu quả nhất để phát hiện nó, vì lỗi lẽ ra đã bị bắt được ở một giai đoạn sớm hơn.`,
      },
      {
        key: "b",
        text: `Input data testing`,
        rationale: `Is correct. Input data testing focuses on data quality and on the representativeness of data. It appears that areas in the UK with an altitude greater than 1,250 meters were not adequately represented in the training data.`,
        textVi: `Test dữ liệu đầu vào (input data testing)`,
        rationaleVi: `Đúng. Input data testing tập trung vào chất lượng dữ liệu và tính đại diện của dữ liệu. Có vẻ như các khu vực ở Anh có độ cao trên 1.250 mét đã không được đại diện đầy đủ trong dữ liệu huấn luyện.`,
      },
      {
        key: "c",
        text: `Component integration testing`,
        rationale: `Is not correct. Component integration testing checks for defects in the interfaces and the interactions between components and is not focused on specific data values.`,
        textVi: `Test tích hợp thành phần (component integration testing)`,
        rationaleVi: `Sai. Component integration testing kiểm tra lỗi ở giao diện và tương tác giữa các thành phần, không tập trung vào các giá trị dữ liệu cụ thể.`,
      },
      {
        key: "d",
        text: `ML model testing`,
        rationale: `Is not correct. ML model testing may have identified this defect, but input data testing would be the most effective test level to detect it, as it would have been caught earlier.`,
        textVi: `Test mô hình ML (ML model testing)`,
        rationaleVi: `Sai. ML model testing có thể đã phát hiện lỗi này, nhưng input data testing mới là cấp độ test hiệu quả nhất để phát hiện nó, vì lỗi lẽ ra đã bị bắt được sớm hơn.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "23",
    lo: "AI-4.3.2",
    chapterNum: 4,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements about applying risk-based testing to ML systems is CORRECT?`,
    stemVi: `Phát biểu nào sau đây về việc áp dụng risk-based testing (test dựa trên rủi ro) cho hệ thống ML là ĐÚNG?`,
    options: [
      {
        key: "a",
        text: `Security and usability risks can apply to any system, while risks associated with data bias and ML model performance are specific to ML systems`,
        rationale: `Is correct. Security and usability are generic quality characteristics and can apply to any system. Data bias and model performance are potential risks specific to ML systems.`,
        textVi: `Rủi ro về bảo mật và tính khả dụng (usability) có thể áp dụng cho bất kỳ hệ thống nào, trong khi các rủi ro liên quan đến bias dữ liệu và hiệu năng mô hình ML là đặc thù riêng của hệ thống ML`,
        rationaleVi: `Đúng. Bảo mật và tính khả dụng là các đặc tính chất lượng chung, có thể áp dụng cho bất kỳ hệ thống nào. Bias dữ liệu và hiệu năng mô hình là những rủi ro tiềm ẩn đặc thù của hệ thống ML.`,
      },
      {
        key: "b",
        text: `Conventional systems handle risks related to data bias, whereas ML systems focus on risks related to algorithmic bias`,
        rationale: `Is not correct. Both data bias and algorithmic bias are risks associated explicitly with an ML system and, therefore, do not apply to conventional systems.`,
        textVi: `Hệ thống truyền thống xử lý các rủi ro liên quan đến bias dữ liệu, trong khi hệ thống ML tập trung vào các rủi ro liên quan đến bias thuật toán`,
        rationaleVi: `Sai. Cả bias dữ liệu lẫn bias thuật toán đều là các rủi ro gắn liền rõ ràng với hệ thống ML, do đó không áp dụng cho hệ thống truyền thống.`,
      },
      {
        key: "c",
        text: `Risk management in conventional systems is a static approach, while in a self-learning system risk needs to be adjusted dynamically`,
        rationale: `Is not correct. Risk management for both non-AI systems and AI systems (including self-learning ML systems) should be dynamic in nature.`,
        textVi: `Quản lý rủi ro trong hệ thống truyền thống là một cách tiếp cận tĩnh, trong khi ở hệ thống tự học, rủi ro cần được điều chỉnh một cách động`,
        rationaleVi: `Sai. Quản lý rủi ro cho cả hệ thống không phải AI lẫn hệ thống AI (kể cả hệ ML tự học) đều nên mang tính động.`,
      },
      {
        key: "d",
        text: `In conventional systems, functional correctness is the primary risk factor, whereas functional adaptability is the primary risk factor for an ML system`,
        rationale: `Is not correct. Functional correctness may be the primary risk factor for conventional systems and for ML systems, but this is context dependent.`,
        textVi: `Trong hệ thống truyền thống, tính đúng đắn chức năng (functional correctness) là yếu tố rủi ro chính, còn khả năng thích ứng chức năng (functional adaptability) là yếu tố rủi ro chính đối với hệ thống ML`,
        rationaleVi: `Sai. Tính đúng đắn chức năng có thể là yếu tố rủi ro chính cho cả hệ thống truyền thống lẫn hệ thống ML, nhưng điều này còn tùy thuộc vào bối cảnh cụ thể.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "24",
    lo: "AI-5.1.1",
    chapterNum: 5,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `The team developing a new machine learning model has received a dataset from a new, unverified third-party vendor. They are uncertain about the origin of this dataset and concerned that the raw data may have been tampered with.
Which of the following test approaches is MOST suitable for addressing this specific risk?`,
    stemVi: `Đội phát triển một mô hình machine learning mới đã nhận được một tập dữ liệu từ một nhà cung cấp bên thứ ba mới, chưa được xác minh. Họ không chắc chắn về nguồn gốc của tập dữ liệu này và lo ngại rằng dữ liệu thô có thể đã bị can thiệp.
Cách tiếp cận test nào sau đây PHÙ HỢP NHẤT để giải quyết rủi ro cụ thể này?`,
    options: [
      {
        key: "a",
        text: `Data provenance testing`,
        rationale: `Is correct. The scenario describes a need to verify the data's origin and to determine that it hasn't been tampered with. This maps to data provenance testing.`,
        textVi: `Test nguồn gốc dữ liệu (data provenance testing)`,
        rationaleVi: `Đúng. Tình huống mô tả nhu cầu xác minh nguồn gốc của dữ liệu và xác định rằng nó chưa bị can thiệp. Điều này khớp với data provenance testing.`,
      },
      {
        key: "b",
        text: `Data representativeness testing`,
        rationale: `Is not correct. While the team would likely perform data representativeness testing on a new dataset, this activity addresses whether the data's characteristics match those of the real world, not whether its documented origin is accurate, or whether it is valid raw data.`,
        textVi: `Test tính đại diện của dữ liệu (data representativeness testing)`,
        rationaleVi: `Sai. Tuy đội có thể sẽ thực hiện data representativeness testing trên tập dữ liệu mới, hoạt động này giải quyết việc liệu đặc điểm dữ liệu có khớp với thực tế hay không, chứ không phải liệu nguồn gốc được ghi nhận có chính xác hay không, hay liệu đó có phải dữ liệu thô hợp lệ hay không.`,
      },
      {
        key: "c",
        text: `Feature testing`,
        rationale: `Is not correct. Feature testing evaluates the predictive power of the features, which is a different concern from verifying the source and integrity of the dataset itself.`,
        textVi: `Test đặc trưng (feature testing)`,
        rationaleVi: `Sai. Feature testing đánh giá sức mạnh dự đoán (predictive power) của các feature, đây là mối quan tâm khác với việc xác minh nguồn gốc và tính toàn vẹn của chính tập dữ liệu.`,
      },
      {
        key: "d",
        text: `Dataset constraint testing`,
        rationale: `Is not correct. Dataset constraint testing checks for internal consistency of the dataset (e.g., ranges, types), but it cannot verify where the data came from or if it was illegitimately altered.`,
        textVi: `Test ràng buộc tập dữ liệu (dataset constraint testing)`,
        rationaleVi: `Sai. Dataset constraint testing kiểm tra tính nhất quán nội bộ của tập dữ liệu (ví dụ: phạm vi giá trị, kiểu dữ liệu), nhưng không thể xác minh dữ liệu đến từ đâu hay liệu nó có bị thay đổi trái phép hay không.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "25",
    lo: "AI-5.1.2",
    chapterNum: 5,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `A financial services company has developed an ML system for loan approval. A tester responsible for testing this system wants to determine if there is potential bias in the system related to factors such as gender and age attributes.
Which of the following approaches would be MOST suitable for detecting bias in the training data early?`,
    stemVi: `Một công ty dịch vụ tài chính đã phát triển một hệ thống ML để phê duyệt khoản vay. Một tester chịu trách nhiệm test hệ thống này muốn xác định liệu có tồn tại bias tiềm ẩn trong hệ thống liên quan đến các yếu tố như giới tính và độ tuổi hay không.
Cách tiếp cận nào sau đây PHÙ HỢP NHẤT để phát hiện sớm bias trong dữ liệu huấn luyện?`,
    options: [
      {
        key: "a",
        text: `Conducting static analysis of the model's source code to identify how its operations on the age and gender related attributes could lead to bias`,
        rationale: `Is not correct. This approach focuses on the model logic, not the characteristics of the training data. It does not directly uncover bias patterns present within the data.`,
        textVi: `Thực hiện static analysis (phân tích tĩnh) trên mã nguồn của mô hình để xác định cách các phép toán trên thuộc tính độ tuổi và giới tính có thể dẫn đến bias`,
        rationaleVi: `Sai. Cách tiếp cận này tập trung vào logic của mô hình, không phải đặc điểm của dữ liệu huấn luyện. Nó không trực tiếp phát hiện các mẫu bias hiện diện trong dữ liệu.`,
      },
      {
        key: "b",
        text: `Testing using a dataset that is representative and analyzing the predictions for statistically significant differences in outcomes across age and gender`,
        rationale: `Is not correct. This approach examines model outputs rather than the training data itself. It is valuable for identifying bias in predictions, but not for initial detection of bias in the data.`,
        textVi: `Test bằng một tập dữ liệu có tính đại diện và phân tích các dự đoán để tìm sự khác biệt có ý nghĩa thống kê trong kết quả theo độ tuổi và giới tính`,
        rationaleVi: `Sai. Cách tiếp cận này xem xét đầu ra của mô hình chứ không phải chính dữ liệu huấn luyện. Nó có giá trị để phát hiện bias trong dự đoán, nhưng không phải để phát hiện sớm bias trong dữ liệu.`,
      },
      {
        key: "c",
        text: `Reviewing the overall ML workflow and data preparation processes to identify potential sources of bias introduction`,
        rationale: `Is correct. This approach could help highlight where bias might be introduced, but it relies on process checks rather than actual evidence from the data.`,
        textVi: `Rà soát toàn bộ quy trình ML và quy trình chuẩn bị dữ liệu để xác định các nguồn tiềm ẩn có thể đưa bias vào`,
        rationaleVi: `Đúng. Cách tiếp cận này có thể giúp làm nổi bật nơi bias có thể được đưa vào, nhưng nó dựa trên việc kiểm tra quy trình chứ không phải bằng chứng thực tế từ dữ liệu.`,
      },
      {
        key: "d",
        text: `Performing disparate impact analysis using counterfactuals based on gender, age or both`,
        rationale: `Is not correct. This approach evaluates the outcomes or predictions under hypothetical changes, targeting outcome bias rather than directly assessing the training dataset.`,
        textVi: `Thực hiện phân tích tác động khác biệt (disparate impact analysis) bằng cách sử dụng các kịch bản phản thực (counterfactual) dựa trên giới tính, độ tuổi hoặc cả hai`,
        rationaleVi: `Sai. Cách tiếp cận này đánh giá kết quả hoặc dự đoán dưới các thay đổi giả định, nhắm vào bias trong kết quả đầu ra, chứ không đánh giá trực tiếp tập dữ liệu huấn luyện.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "26",
    lo: "AI-5.1.3",
    chapterNum: 5,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `What is a KEY difference in the test strategy for a data pipeline built for training versus one designed for an operational system?`,
    stemVi: `Đâu là sự khác biệt THEN CHỐT trong chiến lược test giữa một data pipeline được xây dựng cho việc huấn luyện so với một pipeline được thiết kế cho hệ thống đang vận hành (operational)?`,
    options: [
      {
        key: "a",
        text: `Testing an operational pipeline would focus mainly on validating individual transformation scripts, whereas a training pipeline's testing would prioritize end-to-end system testing`,
        rationale: `Is not correct. Both pipeline types would benefit from a full layered approach. An operational pipeline would require extensive end-to-end system testing, not just validation of individual scripts.`,
        textVi: `Test một operational pipeline sẽ chủ yếu tập trung vào việc thẩm định từng script biến đổi (transformation script) riêng lẻ, trong khi test một training pipeline sẽ ưu tiên test hệ thống đầu-cuối (end-to-end)`,
        rationaleVi: `Sai. Cả hai loại pipeline đều nên áp dụng cách tiếp cận phân lớp (layered) đầy đủ. Một operational pipeline cần được test hệ thống đầu-cuối một cách sâu rộng, chứ không chỉ thẩm định từng script riêng lẻ.`,
      },
      {
        key: "b",
        text: `A training pipeline would rely almost exclusively on fault injection and back-to-back tests, while an operational pipeline would be limited to unit and component integration testing`,
        rationale: `Is not correct. Both pipeline types would use a range of tests. Limiting one to only system level test approach and the other to only component and integration level test approach is not following a layered approach.`,
        textVi: `Một training pipeline sẽ gần như chỉ dựa vào fault injection và back-to-back test, trong khi một operational pipeline sẽ chỉ giới hạn ở unit test và component integration test`,
        rationaleVi: `Sai. Cả hai loại pipeline đều nên dùng nhiều loại test khác nhau. Việc giới hạn một loại chỉ ở cách tiếp cận test cấp hệ thống và loại kia chỉ ở cấp thành phần/tích hợp là không tuân theo cách tiếp cận phân lớp.`,
      },
      {
        key: "c",
        text: `Configuration management reviews would be critical for operational pipelines but are considered unnecessary for the less formal nature of exploratory training pipelines`,
        rationale: `Is not correct. Configuration management verifies correct versions are used 'across training, testing, and production', implying it is important for both types of pipelines to provide consistency and reproducibility, not just operational ones.`,
        textVi: `Rà soát quản lý cấu hình (configuration management) sẽ rất quan trọng đối với operational pipeline nhưng được coi là không cần thiết với bản chất ít bài bản hơn của training pipeline mang tính khám phá`,
        rationaleVi: `Sai. Configuration management xác minh rằng đúng phiên bản được sử dụng "trong cả training, testing và production", hàm ý rằng nó quan trọng với cả hai loại pipeline để đảm bảo tính nhất quán và khả năng tái lập, chứ không chỉ với pipeline vận hành.`,
      },
      {
        key: "d",
        text: `Testing a training pipeline would primarily focus on determining that data is handled correctly, while an operational pipeline's testing would emphasize high performance and reliability under load`,
        rationale: `Is correct. The purpose of the pipeline dictates the test strategy. Training pipelines prioritize generating high quality data, whereas live operational pipelines focus on non-functional aspects such as performance efficiency, scalability, and AI robustness.`,
        textVi: `Test một training pipeline sẽ chủ yếu tập trung xác định dữ liệu được xử lý đúng, trong khi test một operational pipeline sẽ nhấn mạnh hiệu năng cao và độ tin cậy dưới tải`,
        rationaleVi: `Đúng. Mục đích của pipeline quyết định chiến lược test. Training pipeline ưu tiên tạo ra dữ liệu chất lượng cao, trong khi operational pipeline đang vận hành thực tế tập trung vào các khía cạnh phi chức năng như hiệu năng, khả năng mở rộng (scalability) và AI robustness.`,
      },
    ],
    correctKeys: ["d"],
  },
  {
    id: "27",
    lo: "AI-5.1.4",
    chapterNum: 5,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `What is the purpose of creating a 'reference dataset' during data representativeness testing?`,
    stemVi: `Mục đích của việc tạo ra một "tập dữ liệu tham chiếu" (reference dataset) trong quá trình data representativeness testing là gì?`,
    options: [
      {
        key: "a",
        text: `It serves as a universally applicable dataset derived from trusted industry benchmarks`,
        rationale: `Is not correct. A reference dataset does not need to be universally applicable or solely derived from industry benchmarks. It is typically tailored to match the operational and contextual characteristics of the AI system's target population.`,
        textVi: `Nó đóng vai trò như một tập dữ liệu có thể áp dụng phổ quát, được xây dựng từ các benchmark đáng tin cậy của ngành`,
        rationaleVi: `Sai. Một tập dữ liệu tham chiếu không cần phải áp dụng phổ quát hay chỉ được xây dựng từ các benchmark của ngành. Nó thường được thiết kế riêng để khớp với đặc điểm vận hành và bối cảnh của nhóm đối tượng mục tiêu của hệ thống AI.`,
      },
      {
        key: "b",
        text: `It functions as a quantitative baseline for formally comparing the statistical properties of the training data`,
        rationale: `Is correct. The reference dataset's core purpose is to provide a statistical baseline, allowing practitioners to objectively compare the distributions, feature correlations, and coverage of the training data against what is expected in real-world operational environments.`,
        textVi: `Nó đóng vai trò như một đường cơ sở định lượng (quantitative baseline) để so sánh một cách bài bản các tính chất thống kê của dữ liệu huấn luyện`,
        rationaleVi: `Đúng. Mục đích cốt lõi của tập dữ liệu tham chiếu là cung cấp một đường cơ sở thống kê, cho phép người thực hành so sánh một cách khách quan phân phối (distribution), tương quan giữa các feature và độ bao phủ của dữ liệu huấn luyện so với những gì được kỳ vọng trong môi trường vận hành thực tế.`,
      },
      {
        key: "c",
        text: `It is used to apply stratified sampling directly to the training data to verify that all subgroups are covered`,
        rationale: `Is not correct. Stratified sampling is typically applied to the reference dataset to create a comprehensive baseline, rather than directly to the training data itself. The reference dataset aims that all relevant subgroups are represented, serving as a standard for evaluating the representativeness of the other datasets.`,
        textVi: `Nó được dùng để áp dụng stratified sampling (lấy mẫu phân tầng) trực tiếp lên dữ liệu huấn luyện nhằm xác minh rằng mọi nhóm con đều được bao phủ`,
        rationaleVi: `Sai. Stratified sampling thường được áp dụng lên chính tập dữ liệu tham chiếu để tạo ra một đường cơ sở toàn diện, chứ không phải áp dụng trực tiếp lên dữ liệu huấn luyện. Tập dữ liệu tham chiếu nhắm đến việc đảm bảo mọi nhóm con liên quan đều được đại diện, đóng vai trò như một chuẩn để đánh giá tính đại diện của các tập dữ liệu khác.`,
      },
      {
        key: "d",
        text: `It serves as the primary dataset for performing the final model validation and testing with high independence`,
        rationale: `Is not correct. The reference dataset is not intended as the main source for final ML model testing or testing with high independence. It exists to evaluate the representativeness of data before model training.`,
        textVi: `Nó đóng vai trò là tập dữ liệu chính để thực hiện thẩm định và test mô hình lần cuối với tính độc lập cao`,
        rationaleVi: `Sai. Tập dữ liệu tham chiếu không nhằm mục đích là nguồn chính cho việc test mô hình ML lần cuối hay test với tính độc lập cao. Nó tồn tại để đánh giá tính đại diện của dữ liệu trước khi huấn luyện mô hình.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "28",
    lo: "AI-5.1.5",
    chapterNum: 5,
    kLevel: "K3",
    points: 2,
    selectCount: 1,
    stem: `You are testing an ML dataset for a banking loan approval system. The dataset contains the following attributes:
• applicant_id (integer, unique)
• annual_income (decimal, in USD)
• loan_amount (decimal, in USD)
• credit_score (integer, 300-850)
• employment_years (integer, 0-50)
• monthly_payment (decimal, in USD)
The following business rules apply:
• Loan amount cannot exceed 5 times annual income
• Monthly payment = loan_amount / 324 (for 30-year loans)
• Credit scores must be within the standard range
• All monetary values must be positive
When applying dataset constraint testing to validate the 'monthly_payment' for 30-year loans, which type of constraint would be MOST appropriate?`,
    stemVi: `Bạn đang test một tập dữ liệu ML cho hệ thống phê duyệt khoản vay ngân hàng. Tập dữ liệu chứa các thuộc tính sau:
• applicant_id (số nguyên, duy nhất)
• annual_income (số thập phân, đơn vị USD)
• loan_amount (số thập phân, đơn vị USD)
• credit_score (số nguyên, 300-850)
• employment_years (số nguyên, 0-50)
• monthly_payment (số thập phân, đơn vị USD)
Các quy tắc nghiệp vụ sau đây được áp dụng:
• Số tiền vay không được vượt quá 5 lần thu nhập hàng năm
• Khoản trả hàng tháng = loan_amount / 324 (đối với khoản vay 30 năm)
• Điểm tín dụng phải nằm trong phạm vi chuẩn
• Mọi giá trị tiền tệ phải là số dương
Khi áp dụng dataset constraint testing để thẩm định "monthly_payment" cho các khoản vay 30 năm, loại constraint (ràng buộc) nào sau đây là PHÙ HỢP NHẤT?`,
    options: [
      {
        key: "a",
        text: `Single-value range constraint`,
        rationale: `Is not correct. A range constraint only validates that a single attribute's values fall within specified bounds, but doesn't verify the mathematical relationship between monthly_payment and loan_amount.`,
        textVi: `Ràng buộc phạm vi một giá trị (single-value range constraint)`,
        rationaleVi: `Sai. Ràng buộc phạm vi (range constraint) chỉ thẩm định rằng giá trị của một thuộc tính duy nhất nằm trong phạm vi quy định, nhưng không xác minh mối quan hệ toán học giữa monthly_payment và loan_amount.`,
      },
      {
        key: "b",
        text: `Multi-value count constraint`,
        rationale: `Is not correct. A count constraint checks the quantity of non-null values, not the mathematical correctness of calculated fields.`,
        textVi: `Ràng buộc đếm nhiều giá trị (multi-value count constraint)`,
        rationaleVi: `Sai. Ràng buộc đếm (count constraint) kiểm tra số lượng giá trị không null, không kiểm tra tính đúng đắn toán học của các trường được tính toán.`,
      },
      {
        key: "c",
        text: `Comparison correlate constraint,`,
        rationale: `Is correct. This scenario requires validating a mathematical relationship between two attributes (monthly_payment and loan_amount). The correlate constraint is specifically designed to check that values for one attribute correlate with values for another attribute according to a defined rule - in this case, that monthly_payment equals loan_amount/324.`,
        textVi: `Ràng buộc tương quan so sánh (comparison correlate constraint)`,
        rationaleVi: `Đúng. Tình huống này đòi hỏi thẩm định một mối quan hệ toán học giữa hai thuộc tính (monthly_payment và loan_amount). Ràng buộc tương quan (correlate constraint) được thiết kế đặc biệt để kiểm tra rằng giá trị của một thuộc tính tương quan với giá trị của thuộc tính khác theo một quy tắc đã định — trong trường hợp này là monthly_payment bằng loan_amount/324.`,
      },
      {
        key: "d",
        text: `Multi-value duplicate constraint`,
        rationale: `Is not correct. A duplicate constraint identifies identical values but having duplicate monthly payments could be legitimate (different applicants might have the same payment amount).`,
        textVi: `Ràng buộc trùng lặp nhiều giá trị (multi-value duplicate constraint)`,
        rationaleVi: `Sai. Ràng buộc trùng lặp (duplicate constraint) xác định các giá trị giống hệt nhau, nhưng việc có các khoản trả hàng tháng trùng nhau có thể là hợp lệ (những người vay khác nhau có thể có cùng số tiền phải trả).`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "29",
    lo: "AI-5.1.6",
    chapterNum: 5,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following BEST explains the role of multiple annotations in data label correctness testing?`,
    stemVi: `Phương án nào sau đây giải thích TỐT NHẤT vai trò của multiple annotations (gán nhãn nhiều lần) trong data label correctness testing?`,
    options: [
      {
        key: "a",
        text: `Multiple annotations can be used to automate label verification to ensure consistency`,
        rationale: `Is not correct. Multiple annotations are not normally automated. Multiple annotation typically relies on human annotators and does not ensure consistency; instead, it highlights inconsistency.`,
        textVi: `Multiple annotations có thể được dùng để tự động hóa việc xác minh nhãn nhằm đảm bảo tính nhất quán`,
        rationaleVi: `Sai. Multiple annotations thường không được tự động hóa. Multiple annotation thường dựa vào người gán nhãn (human annotator) và không đảm bảo tính nhất quán; thay vào đó, nó làm lộ ra sự thiếu nhất quán.`,
      },
      {
        key: "b",
        text: `Multiple annotations can point to label defects based on the comparison of annotations`,
        rationale: `Is correct. Multiple annotation involves data points being independently labeled by multiple annotators. Comparison of these labels leads to the discovery of disagreements among annotators, highlighting potential defects.`,
        textVi: `Multiple annotations có thể chỉ ra các lỗi nhãn dựa trên việc so sánh các lần gán nhãn`,
        rationaleVi: `Đúng. Multiple annotation liên quan đến việc các điểm dữ liệu được gán nhãn độc lập bởi nhiều người gán nhãn khác nhau. Việc so sánh các nhãn này giúp phát hiện những bất đồng giữa những người gán nhãn, từ đó làm lộ ra các lỗi tiềm ẩn.`,
      },
      {
        key: "c",
        text: `Multiple annotations compare label distributions across datasets to detect potential defects`,
        rationale: `Is not correct. Comparing label distributions is a part of data distribution analysis, not multiple annotations.`,
        textVi: `Multiple annotations so sánh phân phối nhãn (label distribution) giữa các tập dữ liệu để phát hiện lỗi tiềm ẩn`,
        rationaleVi: `Sai. Việc so sánh phân phối nhãn là một phần của phân tích phân phối dữ liệu (data distribution analysis), không phải của multiple annotations.`,
      },
      {
        key: "d",
        text: `Multiple annotations point to defects in data points with high model loss`,
        rationale: `Is not correct. Flagging high-loss data points is the role of model loss analysis, not multiple annotations.`,
        textVi: `Multiple annotations chỉ ra lỗi ở những điểm dữ liệu có giá trị model loss cao`,
        rationaleVi: `Sai. Việc gắn cờ các điểm dữ liệu có loss cao là vai trò của model loss analysis, không phải của multiple annotations.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "30",
    lo: "AI-6.1.1",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Given the following test techniques and test types:
1. ML functional performance testing
2. Testing for bias
3. Adversarial testing
4. Drift testing
And the following risks:
A. The ML model might perform differently for different demographic groups
B. Slightly modified inputs to the ML model might cause quite different and unexpected responses
C. Predictions made by the ML model might be inaccurate in some cases
D. ML model accuracy might have significantly decreased since it was deployed
Which of the following options BEST matches the test techniques and test types with the risks?`,
    stemVi: `Cho các kỹ thuật test và loại test sau đây:
1. ML functional performance testing (test hiệu năng chức năng của ML)
2. Testing for bias (test bias)
3. Adversarial testing
4. Drift testing
Và các rủi ro sau đây:
A. Mô hình ML có thể hoạt động khác nhau đối với các nhóm nhân khẩu học (demographic group) khác nhau
B. Đầu vào bị thay đổi nhẹ cho mô hình ML có thể gây ra những phản hồi khác biệt đáng kể và ngoài dự kiến
C. Các dự đoán do mô hình ML đưa ra có thể không chính xác trong một số trường hợp
D. Độ chính xác của mô hình ML có thể đã suy giảm đáng kể kể từ khi triển khai
Phương án nào sau đây khớp TỐT NHẤT các kỹ thuật/loại test với các rủi ro?`,
    options: [
      {
        key: "a",
        text: `1A – 2D – 3C – 4B`,
        rationale: `Considering each of the risks in turn: A. The ML model might perform differently for different demographic groups. This is best matched with Testing for Bias, which explicitly examines fairness across different populations. (2) B. Slightly modified inputs to the ML model might cause quite different and unexpected responses. This pairs correctly with Adversarial Testing, which deliberately tests an ML model's ability to handle small input perturbations. (3) C. Predictions made by the ML model might be inaccurate in some cases. This is best addressed by ML Functional Performance Testing, which directly evaluates whether the ML model produces accurate outputs. (1) D. ML model accuracy might have significantly decreased since it was deployed. This is appropriately matched with Drift Testing, which monitors performance changes over time in production. (4) Thus, the correct match between risks and test approaches is: 1C – 2A – 3B – 4D, and so b) is the correct option.`,
        textVi: `1A – 2D – 3C – 4B`,
        rationaleVi: `Xét lần lượt từng rủi ro: A. Mô hình ML có thể hoạt động khác nhau đối với các nhóm nhân khẩu học khác nhau. Điều này khớp tốt nhất với Testing for Bias, vốn xem xét tường minh tính công bằng giữa các nhóm dân số khác nhau. (2) B. Đầu vào bị thay đổi nhẹ cho mô hình ML có thể gây ra những phản hồi khác biệt đáng kể và ngoài dự kiến. Điều này khớp đúng với Adversarial Testing, vốn cố tình test khả năng của mô hình ML khi xử lý các nhiễu loạn nhỏ ở đầu vào. (3) C. Các dự đoán do mô hình ML đưa ra có thể không chính xác trong một số trường hợp. Điều này được giải quyết tốt nhất bởi ML Functional Performance Testing, vốn đánh giá trực tiếp liệu mô hình ML có tạo ra đầu ra chính xác hay không. (1) D. Độ chính xác của mô hình ML có thể đã suy giảm đáng kể kể từ khi triển khai. Điều này khớp phù hợp với Drift Testing, vốn theo dõi các thay đổi hiệu năng theo thời gian khi vận hành thực tế. (4) Vậy, sự khớp đúng giữa rủi ro và cách tiếp cận test là: 1C – 2A – 3B – 4D, nên phương án b) đúng.`,
      },
      {
        key: "b",
        text: `1C – 2A – 3B – 4D`,
        rationale: `Considering each of the risks in turn: A. The ML model might perform differently for different demographic groups. This is best matched with Testing for Bias, which explicitly examines fairness across different populations. (2) B. Slightly modified inputs to the ML model might cause quite different and unexpected responses. This pairs correctly with Adversarial Testing, which deliberately tests an ML model's ability to handle small input perturbations. (3) C. Predictions made by the ML model might be inaccurate in some cases. This is best addressed by ML Functional Performance Testing, which directly evaluates whether the ML model produces accurate outputs. (1) D. ML model accuracy might have significantly decreased since it was deployed. This is appropriately matched with Drift Testing, which monitors performance changes over time in production. (4) Thus, the correct match between risks and test approaches is: 1C – 2A – 3B – 4D, and so b) is the correct option.`,
        textVi: `1C – 2A – 3B – 4D`,
        rationaleVi: `Xét lần lượt từng rủi ro: A. Mô hình ML có thể hoạt động khác nhau đối với các nhóm nhân khẩu học khác nhau. Điều này khớp tốt nhất với Testing for Bias, vốn xem xét tường minh tính công bằng giữa các nhóm dân số khác nhau. (2) B. Đầu vào bị thay đổi nhẹ cho mô hình ML có thể gây ra những phản hồi khác biệt đáng kể và ngoài dự kiến. Điều này khớp đúng với Adversarial Testing, vốn cố tình test khả năng của mô hình ML khi xử lý các nhiễu loạn nhỏ ở đầu vào. (3) C. Các dự đoán do mô hình ML đưa ra có thể không chính xác trong một số trường hợp. Điều này được giải quyết tốt nhất bởi ML Functional Performance Testing, vốn đánh giá trực tiếp liệu mô hình ML có tạo ra đầu ra chính xác hay không. (1) D. Độ chính xác của mô hình ML có thể đã suy giảm đáng kể kể từ khi triển khai. Điều này khớp phù hợp với Drift Testing, vốn theo dõi các thay đổi hiệu năng theo thời gian khi vận hành thực tế. (4) Vậy, sự khớp đúng giữa rủi ro và cách tiếp cận test là: 1C – 2A – 3B – 4D, nên phương án b) đúng.`,
      },
      {
        key: "c",
        text: `1B – 2A – 3C – 4D`,
        rationale: `Considering each of the risks in turn: A. The ML model might perform differently for different demographic groups. This is best matched with Testing for Bias, which explicitly examines fairness across different populations. (2) B. Slightly modified inputs to the ML model might cause quite different and unexpected responses. This pairs correctly with Adversarial Testing, which deliberately tests an ML model's ability to handle small input perturbations. (3) C. Predictions made by the ML model might be inaccurate in some cases. This is best addressed by ML Functional Performance Testing, which directly evaluates whether the ML model produces accurate outputs. (1) D. ML model accuracy might have significantly decreased since it was deployed. This is appropriately matched with Drift Testing, which monitors performance changes over time in production. (4) Thus, the correct match between risks and test approaches is: 1C – 2A – 3B – 4D, and so b) is the correct option.`,
        textVi: `1B – 2A – 3C – 4D`,
        rationaleVi: `Xét lần lượt từng rủi ro: A. Mô hình ML có thể hoạt động khác nhau đối với các nhóm nhân khẩu học khác nhau. Điều này khớp tốt nhất với Testing for Bias, vốn xem xét tường minh tính công bằng giữa các nhóm dân số khác nhau. (2) B. Đầu vào bị thay đổi nhẹ cho mô hình ML có thể gây ra những phản hồi khác biệt đáng kể và ngoài dự kiến. Điều này khớp đúng với Adversarial Testing, vốn cố tình test khả năng của mô hình ML khi xử lý các nhiễu loạn nhỏ ở đầu vào. (3) C. Các dự đoán do mô hình ML đưa ra có thể không chính xác trong một số trường hợp. Điều này được giải quyết tốt nhất bởi ML Functional Performance Testing, vốn đánh giá trực tiếp liệu mô hình ML có tạo ra đầu ra chính xác hay không. (1) D. Độ chính xác của mô hình ML có thể đã suy giảm đáng kể kể từ khi triển khai. Điều này khớp phù hợp với Drift Testing, vốn theo dõi các thay đổi hiệu năng theo thời gian khi vận hành thực tế. (4) Vậy, sự khớp đúng giữa rủi ro và cách tiếp cận test là: 1C – 2A – 3B – 4D, nên phương án b) đúng.`,
      },
      {
        key: "d",
        text: `1A – 2C – 3D – 4B`,
        rationale: `Considering each of the risks in turn: A. The ML model might perform differently for different demographic groups. This is best matched with Testing for Bias, which explicitly examines fairness across different populations. (2) B. Slightly modified inputs to the ML model might cause quite different and unexpected responses. This pairs correctly with Adversarial Testing, which deliberately tests an ML model's ability to handle small input perturbations. (3) C. Predictions made by the ML model might be inaccurate in some cases. This is best addressed by ML Functional Performance Testing, which directly evaluates whether the ML model produces accurate outputs. (1) D. ML model accuracy might have significantly decreased since it was deployed. This is appropriately matched with Drift Testing, which monitors performance changes over time in production. (4) Thus, the correct match between risks and test approaches is: 1C – 2A – 3B – 4D, and so b) is the correct option.`,
        textVi: `1A – 2C – 3D – 4B`,
        rationaleVi: `Xét lần lượt từng rủi ro: A. Mô hình ML có thể hoạt động khác nhau đối với các nhóm nhân khẩu học khác nhau. Điều này khớp tốt nhất với Testing for Bias, vốn xem xét tường minh tính công bằng giữa các nhóm dân số khác nhau. (2) B. Đầu vào bị thay đổi nhẹ cho mô hình ML có thể gây ra những phản hồi khác biệt đáng kể và ngoài dự kiến. Điều này khớp đúng với Adversarial Testing, vốn cố tình test khả năng của mô hình ML khi xử lý các nhiễu loạn nhỏ ở đầu vào. (3) C. Các dự đoán do mô hình ML đưa ra có thể không chính xác trong một số trường hợp. Điều này được giải quyết tốt nhất bởi ML Functional Performance Testing, vốn đánh giá trực tiếp liệu mô hình ML có tạo ra đầu ra chính xác hay không. (1) D. Độ chính xác của mô hình ML có thể đã suy giảm đáng kể kể từ khi triển khai. Điều này khớp phù hợp với Drift Testing, vốn theo dõi các thay đổi hiệu năng theo thời gian khi vận hành thực tế. (4) Vậy, sự khớp đúng giữa rủi ro và cách tiếp cận test là: 1C – 2A – 3B – 4D, nên phương án b) đúng.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "31",
    lo: "AI-6.1.2",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements about the documentation of ML models is CORRECT?`,
    stemVi: `Phát biểu nào sau đây về tài liệu (documentation) của mô hình ML là ĐÚNG?`,
    options: [
      {
        key: "a",
        text: `Information related to the speed of model prediction is a part of the documentation of an AI component`,
        rationale: `Is correct. This is a part of the non-functional requirement/documentation.`,
        textVi: `Thông tin liên quan đến tốc độ dự đoán của mô hình là một phần của tài liệu cho một thành phần AI`,
        rationaleVi: `Đúng. Đây là một phần của requirement/tài liệu phi chức năng (non-functional).`,
      },
      {
        key: "b",
        text: `Interaction of AI and non-AI components is within the scope of the model documentation`,
        rationale: `Is not correct. It is not in the scope of model documentation.`,
        textVi: `Sự tương tác giữa các thành phần AI và không-AI nằm trong phạm vi của tài liệu mô hình`,
        rationaleVi: `Sai. Điều này không nằm trong phạm vi của tài liệu mô hình.`,
      },
      {
        key: "c",
        text: `Bias-related characteristics of input data are challenging to assess as the model documentation doesn't contain the source of the training data`,
        rationale: `Is not correct. Model documentation should contain the source of the training data.`,
        textVi: `Các đặc điểm liên quan đến bias của dữ liệu đầu vào khó đánh giá vì tài liệu mô hình không chứa nguồn gốc của dữ liệu huấn luyện`,
        rationaleVi: `Sai. Tài liệu mô hình nên chứa nguồn gốc của dữ liệu huấn luyện.`,
      },
      {
        key: "d",
        text: `Changes made by self-learning ML systems are fully documented at the time of the update to ensure up-to-date documentation`,
        rationale: `Is not correct. Documentation of changes made by the self-learning system could only be made by the system itself at the time of the update.`,
        textVi: `Các thay đổi do hệ thống ML tự học thực hiện được ghi lại đầy đủ ngay tại thời điểm cập nhật để đảm bảo tài liệu luôn cập nhật`,
        rationaleVi: `Sai. Việc ghi lại các thay đổi do hệ thống tự học thực hiện chỉ có thể được chính hệ thống đó thực hiện tại thời điểm cập nhật.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "32",
    lo: "AI-6.1.3",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Upon release, an ML model provided correct predictions fewer times than expected. Additional tests have been conducted, and the level of accuracy for these tests was measured at 83%.
Previously, the ML model had achieved an accuracy of 83% ± 4% at a confidence level of 94%.
Which of the following options is MOST likely to represent the current situation?`,
    stemVi: `Khi mới ra mắt, mô hình ML đưa ra dự đoán đúng ít lần hơn kỳ vọng. Các bài test bổ sung đã được thực hiện, và mức độ chính xác đo được cho các bài test này là 83%.
Trước đó, mô hình ML đã đạt độ chính xác 83% ± 4% ở mức độ tin cậy (confidence level) 94%.
Phương án nào sau đây CÓ KHẢ NĂNG NHẤT phản ánh tình huống hiện tại?`,
    options: [
      {
        key: "a",
        text: `accuracy of 83% ± 2% at 94% confidence level`,
        rationale: `Is correct. When more tests are run for the same measured accuracy (83%), the margin of error typically decreases if the confidence level stays the same. This is because a larger sample size can reduce the margin of error and/or increase our statistical confidence in the measured value. If the ML model previously achieved 83% accuracy with a margin of error of ± 4% at a 94% confidence level, and additional tests were run while maintaining the same 83% accuracy measurement and maintaining the confidence level at 94%, this would result in a lower margin of error (e.g. ± 2%). This indicates we can be more certain that the true accuracy is indeed around 83%.`,
        textVi: `độ chính xác 83% ± 2% ở mức độ tin cậy 94%`,
        rationaleVi: `Đúng. Khi chạy thêm nhiều bài test cho cùng một mức độ chính xác đo được (83%), biên sai số (margin of error) thường giảm nếu mức độ tin cậy giữ nguyên. Điều này là vì cỡ mẫu lớn hơn có thể giảm biên sai số và/hoặc tăng độ tin cậy thống kê của chúng ta đối với giá trị đo được. Nếu mô hình ML trước đó đạt độ chính xác 83% với biên sai số ± 4% ở mức độ tin cậy 94%, và các bài test bổ sung được chạy trong khi vẫn giữ nguyên mức đo độ chính xác 83% và mức độ tin cậy 94%, điều này sẽ dẫn đến biên sai số thấp hơn (ví dụ ± 2%). Điều này cho thấy chúng ta có thể chắc chắn hơn rằng độ chính xác thực sự là khoảng 83%.`,
      },
      {
        key: "b",
        text: `accuracy of 83% ± 4% at 92% confidence level`,
        rationale: `Is not correct. When more tests are run, the margin of error typically decreases and the confidence level typically increases rather than decreases, assuming the measured accuracy remains the same. Going from 94% to 92% confidence would indicate fewer tests were run or that the test results were more variable, which contradicts the scenario where additional tests were performed.`,
        textVi: `độ chính xác 83% ± 4% ở mức độ tin cậy 92%`,
        rationaleVi: `Sai. Khi chạy thêm nhiều bài test, biên sai số thường giảm và mức độ tin cậy thường tăng lên chứ không giảm, với giả định độ chính xác đo được giữ nguyên. Việc mức độ tin cậy giảm từ 94% xuống 92% sẽ cho thấy có ít bài test hơn được chạy hoặc kết quả test biến động nhiều hơn, điều này mâu thuẫn với tình huống là có các bài test bổ sung đã được thực hiện.`,
      },
      {
        key: "c",
        text: `accuracy of 83% ± 6% at 94% confidence level`,
        rationale: `Is not correct. If additional tests were run and the accuracy remained at 83%, the margin of error would typically decrease and not increase, if the confidence level was maintained at 94%. The increased margin of error of ± 6% makes this option less likely than the option where it decreases (a).`,
        textVi: `độ chính xác 83% ± 6% ở mức độ tin cậy 94%`,
        rationaleVi: `Sai. Nếu các bài test bổ sung được chạy và độ chính xác vẫn giữ ở 83%, biên sai số thường sẽ giảm chứ không tăng, nếu mức độ tin cậy vẫn giữ ở 94%. Việc biên sai số tăng lên ± 6% khiến phương án này ít khả năng hơn so với phương án mà biên sai số giảm xuống (a).`,
      },
      {
        key: "d",
        text: `accuracy of 85% ± 4% at 94% confidence level`,
        rationale: `Is not correct. The scenario states that the ML model's accuracy for the additional tests was measured to be 83%, not 85%. An increase in the accuracy percentage would indicate that the ML model performed better in the additional tests, which contradicts the given information that the ML model "provided correct predictions fewer times than expected" while maintaining the same measured accuracy of 83%.`,
        textVi: `độ chính xác 85% ± 4% ở mức độ tin cậy 94%`,
        rationaleVi: `Sai. Tình huống nêu rõ rằng độ chính xác của mô hình ML cho các bài test bổ sung được đo là 83%, không phải 85%. Việc tỷ lệ chính xác tăng lên sẽ cho thấy mô hình ML hoạt động tốt hơn trong các bài test bổ sung, điều này mâu thuẫn với thông tin đã cho rằng mô hình ML "đưa ra dự đoán đúng ít lần hơn kỳ vọng" trong khi vẫn giữ mức độ chính xác đo được là 83%.`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "33",
    lo: "AI-6.1.4",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST summarizes adversarial testing of machine learning systems?`,
    stemVi: `Phát biểu nào sau đây tóm tắt TỐT NHẤT về adversarial testing đối với các hệ thống machine learning?`,
    options: [
      {
        key: "a",
        text: `It is a form of black-box testing, ignoring knowledge of the internals of the machine learning system to create adversarial examples`,
        rationale: `Is not correct. It incorrectly implies that internal knowledge of the ML model is irrelevant, whereas such knowledge can enhance the testing process by crafting more targeted adversarial examples.`,
        textVi: `Đây là một dạng black-box testing, bỏ qua kiến thức về nội bộ của hệ thống machine learning khi tạo ra các adversarial example`,
        rationaleVi: `Sai. Phát biểu này ngụ ý sai rằng kiến thức nội bộ về mô hình ML là không liên quan, trong khi kiến thức đó có thể nâng cao quá trình test bằng cách tạo ra các adversarial example nhắm mục tiêu chính xác hơn.`,
      },
      {
        key: "b",
        text: `It focuses on generating manual adversarial examples, without automation, to test the vulnerability of machine learning systems`,
        rationale: `Is not correct. It incorrectly suggests that manual methods are the only approach, ignoring automated techniques, which are also crucial in adversarial testing.`,
        textVi: `Nó tập trung vào việc tạo thủ công các adversarial example, không có tự động hóa, để test lỗ hổng của hệ thống machine learning`,
        rationaleVi: `Sai. Phát biểu này gợi ý sai rằng phương pháp thủ công là cách tiếp cận duy nhất, bỏ qua các kỹ thuật tự động, vốn cũng rất quan trọng trong adversarial testing.`,
      },
      {
        key: "c",
        text: `It identifies model vulnerabilities through adversarial examples, which are minimally perturbed inputs that induce misclassification`,
        rationale: `Is correct. In adversarial testing, the adversarial examples are often created to identify vulnerabilities by perturbing working inputs.`,
        textVi: `Nó xác định các lỗ hổng của mô hình thông qua adversarial example, tức các đầu vào bị nhiễu loạn (perturb) ở mức tối thiểu nhằm gây ra phân loại sai`,
        rationaleVi: `Đúng. Trong adversarial testing, các adversarial example thường được tạo ra để xác định lỗ hổng bằng cách gây nhiễu loạn trên các đầu vào đang hoạt động bình thường.`,
      },
      {
        key: "d",
        text: `It verifies the machine learning system's functionality by using previously working tests to avoid ML model failures during evaluation and tuning`,
        rationale: `Is not correct. This misses the point of adversarial testing, which deliberately uses updated input values (i.e. tests) to create adversarial examples.`,
        textVi: `Nó xác minh chức năng của hệ thống machine learning bằng cách sử dụng lại các test đã hoạt động tốt trước đó nhằm tránh các lỗi mô hình ML trong quá trình đánh giá và tinh chỉnh`,
        rationaleVi: `Sai. Phát biểu này bỏ lỡ mục đích cốt lõi của adversarial testing, vốn cố tình sử dụng các giá trị đầu vào đã được cập nhật (tức các test) để tạo ra adversarial example.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "34",
    lo: "AI-6.1.5",
    chapterNum: 6,
    kLevel: "K3",
    points: 2,
    selectCount: 1,
    stem: `An AI-based mobile phone search system provides a list of phones that it believes are most suitable for the user based on its knowledge of the user's previous mobile phone usage and their specified preferences.

Metamorphic testing is being used with the following source test case:

Inputs
Selected price range: $200-$300
3D camera: Don't care
Screen size: mid to large
OS: Android or iOS
Battery Life: Don't care

Outputs
Recommended Phones:
SnapHappy_X1
SnapHappy_M2
SnapHappy_M3
ClickNow_1000x
ClickNow_1000xs

And this test data for two corresponding follow-up test cases:

Input T1
Selected price range: $200-$300
3D camera: yes
Screen size: mid to large
OS: Android or iOS
Battery Life: Don't care

Input T2
Selected price range: $200-$300
3D camera: no
Screen size: mid to large
OS: Android or iOS
Battery Life: Don't care

Which of the following options is MOST likely to be a valid list of recommended phones for the follow-up test cases?`,
    stemVi: `Một hệ thống tìm kiếm điện thoại di động dựa trên AI cung cấp danh sách các điện thoại mà nó cho là phù hợp nhất với người dùng, dựa trên hiểu biết về lịch sử sử dụng điện thoại trước đây và các sở thích đã khai báo của người dùng.

Metamorphic testing đang được áp dụng với test case nguồn (source test case) sau đây:

Đầu vào
Khoảng giá đã chọn: $200-$300
Camera 3D: Không quan trọng
Kích thước màn hình: trung bình đến lớn
Hệ điều hành: Android hoặc iOS
Thời lượng pin: Không quan trọng

Đầu ra
Điện thoại được gợi ý:
SnapHappy_X1
SnapHappy_M2
SnapHappy_M3
ClickNow_1000x
ClickNow_1000xs

Và dữ liệu test sau đây cho hai test case theo sau (follow-up test case) tương ứng:

Đầu vào T1
Khoảng giá đã chọn: $200-$300
Camera 3D: có
Kích thước màn hình: trung bình đến lớn
Hệ điều hành: Android hoặc iOS
Thời lượng pin: Không quan trọng

Đầu vào T2
Khoảng giá đã chọn: $200-$300
Camera 3D: không
Kích thước màn hình: trung bình đến lớn
Hệ điều hành: Android hoặc iOS
Thời lượng pin: Không quan trọng

Phương án nào sau đây CÓ KHẢ NĂNG NHẤT là danh sách điện thoại gợi ý hợp lệ cho các test case theo sau?`,
    options: [
      {
        key: "a",
        text: `T1: SnapHappy_X1, SnapHappy_M2
T2: ClickNow_1000x, ClickNow_1000xs`,
        rationale: `Is not correct. The camera SnapHappy M3 is missing in the combined outputs of T1 and T2`,
        textVi: `T1: SnapHappy_X1, SnapHappy_M2
T2: ClickNow_1000x, ClickNow_1000xs`,
        rationaleVi: `Sai. Điện thoại SnapHappy M3 bị thiếu trong tổng hợp đầu ra của T1 và T2.`,
      },
      {
        key: "b",
        text: `T1: SnapHappy_M2, SnapHappy_M3, ClickNow_1000xs
T2: SnapHappy_X1, ClickNow_1000x`,
        rationale: `Is correct. There is no overlap between the outputs of T1 and T2, and no camera is missing.`,
        textVi: `T1: SnapHappy_M2, SnapHappy_M3, ClickNow_1000xs
T2: SnapHappy_X1, ClickNow_1000x`,
        rationaleVi: `Đúng. Không có sự trùng lặp giữa đầu ra của T1 và T2, và không có điện thoại nào bị thiếu.`,
      },
      {
        key: "c",
        text: `T1: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3, ClickNow_1000x, ClickNow_1000xs
T2: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3`,
        rationale: `Is not correct. The SnapHappy cameras are listed for both test cases.`,
        textVi: `T1: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3, ClickNow_1000x, ClickNow_1000xs
T2: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3`,
        rationaleVi: `Sai. Các điện thoại SnapHappy được liệt kê cho cả hai test case.`,
      },
      {
        key: "d",
        text: `T1: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3, ClickNow_1000x, ClickNow_1000xs
T2: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3, ClickNow_1000x, ClickNow_1000xs`,
        rationale: `Is not correct. The output of the two test cases is identical, despite the differing requirements for the 3D camera.`,
        textVi: `T1: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3, ClickNow_1000x, ClickNow_1000xs
T2: SnapHappy_X1, SnapHappy_M2, SnapHappy_M3, ClickNow_1000x, ClickNow_1000xs`,
        rationaleVi: `Sai. Đầu ra của hai test case giống hệt nhau, mặc dù yêu cầu về camera 3D khác nhau.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "35",
    lo: "AI-6.1.7",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `An organization uses an ML model to predict customer churn but has no mechanism to get direct user feedback or track when customers leave. They want to test for drift by analyzing the data being fed into the live ML model.
Which test type would be MOST appropriate in this situation and why?`,
    stemVi: `Một tổ chức sử dụng mô hình ML để dự đoán khách hàng rời bỏ (churn) nhưng không có cơ chế nào để nhận phản hồi trực tiếp từ người dùng hay theo dõi khi nào khách hàng thực sự rời đi. Họ muốn test drift bằng cách phân tích dữ liệu đang được đưa vào mô hình ML đang vận hành thực tế.
Loại test nào sau đây PHÙ HỢP NHẤT trong tình huống này, và vì sao?`,
    options: [
      {
        key: "a",
        text: `Dynamic drift testing, because it can infer the current ground truth by analyzing the input data's statistical properties`,
        rationale: `Is not correct. While dynamic testing is appropriate for when ground truth is available, it does not analyze the input data's statistical properties.`,
        textVi: `Dynamic drift testing, vì nó có thể suy ra ground truth hiện tại bằng cách phân tích các tính chất thống kê của dữ liệu đầu vào`,
        rationaleVi: `Sai. Tuy dynamic testing phù hợp khi có sẵn ground truth, nó không phân tích các tính chất thống kê của dữ liệu đầu vào.`,
      },
      {
        key: "b",
        text: `Static drift testing, because it identifies drift by detecting changes in the data distributions without requiring ground truth`,
        rationale: `Is correct. Because ground truth is unavailable, static drift testing, which doesn't require it, is the only viable option.`,
        textVi: `Static drift testing, vì nó xác định drift bằng cách phát hiện thay đổi trong phân phối dữ liệu mà không cần ground truth`,
        rationaleVi: `Đúng. Vì ground truth không có sẵn, static drift testing — vốn không cần ground truth — là lựa chọn khả thi duy nhất.`,
      },
      {
        key: "c",
        text: `Dynamic drift testing, because comparing ML model predictions to actual results is the most direct way to measure performance degradation`,
        rationale: `Is not correct. The organization "has no mechanism to track if a customer actually leaves." Therefore, they have no actual results to compare against, making dynamic testing impossible to perform.`,
        textVi: `Dynamic drift testing, vì việc so sánh dự đoán của mô hình ML với kết quả thực tế là cách trực tiếp nhất để đo mức độ suy giảm hiệu năng`,
        rationaleVi: `Sai. Tổ chức "không có cơ chế nào để theo dõi liệu khách hàng có thực sự rời đi hay không." Do đó, họ không có kết quả thực tế nào để so sánh, khiến dynamic testing không thể thực hiện được.`,
      },
      {
        key: "d",
        text: `Static drift testing, because it compares the ML model's live performance metrics against a predefined acceptance threshold`,
        rationale: `Is not correct. Static testing looks at data distributions, whereas comparing performance metrics against ground truth is the mechanism of dynamic testing.`,
        textVi: `Static drift testing, vì nó so sánh các chỉ số hiệu năng (performance metric) thực tế của mô hình ML với một ngưỡng chấp nhận định trước`,
        rationaleVi: `Sai. Static testing xem xét phân phối dữ liệu, trong khi việc so sánh chỉ số hiệu năng với ground truth là cơ chế của dynamic testing.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "36",
    lo: "AI-6.1.8",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `When testing a trained ML model, the development team found that the model was highly accurate when evaluated using validation data but performed poorly with independent test data.
Which of the following options is MOST likely to cause this situation?`,
    stemVi: `Khi test một mô hình ML đã được huấn luyện, đội phát triển nhận thấy mô hình có độ chính xác rất cao khi đánh giá bằng dữ liệu validation nhưng lại hoạt động kém khi dùng dữ liệu test độc lập.
Phương án nào sau đây CÓ KHẢ NĂNG NHẤT là nguyên nhân của tình huống này?`,
    options: [
      {
        key: "a",
        text: `Underfitting`,
        rationale: `Is not correct. The ML model performs well on validation data, so it is unlikely to be a case of underfitting.`,
        textVi: `Underfitting (chưa khớp)`,
        rationaleVi: `Sai. Mô hình ML hoạt động tốt trên dữ liệu validation, nên khó có khả năng đây là trường hợp underfitting.`,
      },
      {
        key: "b",
        text: `Concept drift`,
        rationale: `Is not correct. Concept drift refers to changes that occur after the training of the ML model and the validation stages.`,
        textVi: `Concept drift`,
        rationaleVi: `Sai. Concept drift chỉ những thay đổi xảy ra sau các giai đoạn huấn luyện và validation của mô hình ML.`,
      },
      {
        key: "c",
        text: `Overfitting`,
        rationale: `Is correct. The poor performance on test data and good performance on validation data suggest overfitting.`,
        textVi: `Overfitting (quá khớp)`,
        rationaleVi: `Đúng. Hiệu năng kém trên dữ liệu test và hiệu năng tốt trên dữ liệu validation cho thấy dấu hiệu của overfitting.`,
      },
      {
        key: "d",
        text: `Low acceptance criteria`,
        rationale: `Is not correct. Acceptance criteria should be consistent with different sets of data, so low acceptance criteria are unlikely to lead to a difference between the test results with validation data and independent test data.`,
        textVi: `Tiêu chí chấp nhận (acceptance criteria) thấp`,
        rationaleVi: `Sai. Tiêu chí chấp nhận nên nhất quán giữa các tập dữ liệu khác nhau, nên tiêu chí chấp nhận thấp khó có thể dẫn đến sự khác biệt giữa kết quả test trên dữ liệu validation và dữ liệu test độc lập.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "37",
    lo: "AI-6.1.9",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements BEST describes how A/B testing is used in the context of a machine learning system (MLS)?`,
    stemVi: `Phát biểu nào sau đây mô tả TỐT NHẤT cách A/B testing được sử dụng trong bối cảnh của một hệ thống machine learning (MLS)?`,
    options: [
      {
        key: "a",
        text: `A/B testing is primarily used to generate diverse test cases that cover all possible inputs for an MLS`,
        rationale: `Is not correct. According to the syllabus, "A/B testing does not generate test cases and provides no guidance on how the tests should be designed, although operational inputs are often used in tests." A/B testing compares responses of two variants rather than generating test cases.`,
        textVi: `A/B testing chủ yếu được dùng để tạo ra các test case đa dạng, bao phủ mọi đầu vào có thể có cho một MLS`,
        rationaleVi: `Sai. Theo syllabus, "A/B testing không tạo ra test case và không đưa ra hướng dẫn nào về cách thiết kế test, mặc dù các đầu vào thực tế (operational input) thường được dùng trong các test." A/B testing so sánh phản hồi của hai biến thể (variant), chứ không tạo ra test case.`,
      },
      {
        key: "b",
        text: `A/B testing is used to verify that all components within an MLS interact correctly with each other`,
        rationale: `Is not correct. A/B testing is not focused on component interactions within a system. It compares two different versions of a system, not components within a single system.`,
        textVi: `A/B testing được dùng để xác minh rằng tất cả các thành phần trong một MLS tương tác đúng với nhau`,
        rationaleVi: `Sai. A/B testing không tập trung vào tương tác giữa các thành phần trong một hệ thống. Nó so sánh hai phiên bản khác nhau của một hệ thống, chứ không phải các thành phần bên trong một hệ thống duy nhất.`,
      },
      {
        key: "c",
        text: `A/B testing determines if an updated version of an MLS performs better than the previous version`,
        rationale: `Is correct. As stated in the syllabus, "Whenever the system is updated, A/B testing is used to test that the updated variant performs as well as, or better than, the previous variant." This accurately describes how A/B testing is used in the context of ML systems.`,
        textVi: `A/B testing xác định liệu một phiên bản MLS đã cập nhật có hoạt động tốt hơn phiên bản trước đó hay không`,
        rationaleVi: `Đúng. Theo syllabus, "Mỗi khi hệ thống được cập nhật, A/B testing được dùng để test rằng biến thể đã cập nhật hoạt động tốt bằng hoặc tốt hơn biến thể trước đó." Điều này mô tả chính xác cách A/B testing được sử dụng trong bối cảnh hệ thống ML.`,
      },
      {
        key: "d",
        text: `A/B testing focuses on analyzing the internal algorithm structure of an MLS to identify potential defects`,
        rationale: `Is not correct. A/B testing does not analyze the internal algorithm structure. It is a "statistical testing approach that typically requires comparing test results from several test runs to determine the difference between the programs." It focuses on comparing the outputs of two variants, not examining their internal structures.`,
        textVi: `A/B testing tập trung phân tích cấu trúc thuật toán nội bộ của một MLS để xác định các lỗi tiềm ẩn`,
        rationaleVi: `Sai. A/B testing không phân tích cấu trúc thuật toán nội bộ. Đây là một "cách tiếp cận test thống kê, thường đòi hỏi so sánh kết quả test từ nhiều lượt chạy để xác định sự khác biệt giữa các chương trình." Nó tập trung vào việc so sánh đầu ra của hai biến thể, chứ không xem xét cấu trúc nội bộ của chúng.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "38",
    lo: "AI-6.1.10",
    chapterNum: 6,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following descriptions of the creation of a pseudo-oracle used to support the back-to-back testing of an ML model is MOST likely to be CORRECT?`,
    stemVi: `Mô tả nào sau đây về việc tạo ra một pseudo-oracle dùng để hỗ trợ back-to-back testing cho một mô hình ML CÓ KHẢ NĂNG NHẤT là ĐÚNG?`,
    options: [
      {
        key: "a",
        text: `By varying the hyperparameters used for training the ML model that is being tested`,
        rationale: `Is not correct. Varying hyperparameters is a minor adjustment to the same ML model. It doesn't fundamentally change the model. A pseudo-oracle should ideally be significantly different to detect defects effectively. This option is too similar to the SUT.`,
        textVi: `Bằng cách thay đổi các hyperparameter dùng để huấn luyện mô hình ML đang được test`,
        rationaleVi: `Sai. Thay đổi hyperparameter chỉ là một điều chỉnh nhỏ trên cùng một mô hình ML. Nó không thay đổi bản chất của mô hình. Một pseudo-oracle lý tưởng nên khác biệt đáng kể để phát hiện lỗi hiệu quả. Phương án này quá giống với SUT (hệ thống đang được test).`,
      },
      {
        key: "b",
        text: `By fine-tuning the ML model that is being tested`,
        rationale: `Is not correct. Fine-tuning is a modification of the same ML model, typically involving further training on a specific dataset. It's not a substantial enough change to create a truly independent pseudo-oracle. It still relies on the same core model and framework, increasing the risk of shared defects.`,
        textVi: `Bằng cách fine-tune mô hình ML đang được test`,
        rationaleVi: `Sai. Fine-tuning là một điều chỉnh trên cùng một mô hình ML, thường liên quan đến việc huấn luyện thêm trên một tập dữ liệu cụ thể. Đây không phải là một thay đổi đủ lớn để tạo ra một pseudo-oracle thực sự độc lập. Nó vẫn dựa trên cùng mô hình lõi và framework, làm tăng nguy cơ lỗi bị chia sẻ chung.`,
      },
      {
        key: "c",
        text: `By supplementing the ML model that is being tested with retrieval-augmented generation`,
        rationale: `Is not correct. Retrieval-augmented generation (RAG) enhances a language model by integrating it with a retrieval mechanism. While RAG adds complexity, it still builds upon the core ML model being tested. The fundamental architecture and training process of the base model will be the same. While RAG introduces a difference, it is still an augmentation of the original model rather than an independent alternative.`,
        textVi: `Bằng cách bổ sung retrieval-augmented generation cho mô hình ML đang được test`,
        rationaleVi: `Sai. Retrieval-augmented generation (RAG) nâng cao một mô hình ngôn ngữ bằng cách tích hợp nó với một cơ chế truy xuất. Tuy RAG làm tăng độ phức tạp, nó vẫn được xây dựng trên nền mô hình ML lõi đang được test. Kiến trúc nền tảng và quy trình huấn luyện của mô hình gốc vẫn giữ nguyên. Tuy RAG tạo ra một sự khác biệt, nó vẫn chỉ là một phần bổ sung cho mô hình gốc, chứ không phải một phương án thay thế độc lập.`,
      },
      {
        key: "d",
        text: `By using a different ML development framework than the ML model that is being tested`,
        rationale: `Is correct. Using a different ML development framework means using different libraries, potentially different underlying algorithms or implementations of algorithms, and a different ML development environment. This option maximizes the independence of the pseudo-oracle from the SUT, reducing the risk of shared defects and increasing the potential effectiveness of back-to-back testing.`,
        textVi: `Bằng cách sử dụng một ML development framework khác với framework của mô hình ML đang được test`,
        rationaleVi: `Đúng. Việc sử dụng một ML development framework khác đồng nghĩa với việc dùng các thư viện khác, có thể có thuật toán nền tảng hoặc cách triển khai thuật toán khác, và một môi trường phát triển ML khác. Phương án này tối đa hóa tính độc lập của pseudo-oracle so với SUT, giảm nguy cơ lỗi bị chia sẻ chung và tăng hiệu quả tiềm năng của back-to-back testing.`,
      },
    ],
    correctKeys: ["d"],
  },
  {
    id: "39",
    lo: "AI-7.1.1",
    chapterNum: 7,
    kLevel: "K2",
    points: 1,
    selectCount: 2,
    stem: `Which TWO of the following scenarios describe ML development risks that can be EFFECTIVELY mitigated by performing ML functional performance testing?`,
    stemVi: `HAI kịch bản nào sau đây mô tả các rủi ro trong phát triển ML có thể được giảm thiểu HIỆU QUẢ bằng cách thực hiện ML functional performance testing?`,
    options: [
      {
        key: "a",
        text: `A team notices that their ML development framework becomes slow and even unresponsive when processing large batches of data`,
        rationale: `Is not correct. This describes a risk of poor performance efficiency. The correct mitigation is performance (efficiency) testing, which is distinct from ML functional performance testing (which evaluates functional correctness).`,
        textVi: `Một đội nhận thấy ML development framework của họ trở nên chậm và thậm chí không phản hồi khi xử lý các batch dữ liệu lớn`,
        rationaleVi: `Sai. Điều này mô tả rủi ro về hiệu năng kém (performance efficiency). Biện pháp giảm thiểu đúng là performance (efficiency) testing, khác với ML functional performance testing (vốn đánh giá tính đúng đắn chức năng).`,
      },
      {
        key: "b",
        text: `A new version of a core library used by the ML development framework appears to be causing the ML model to produce unexpected and inaccurate results`,
        rationale: `Is correct. This describes a potential used library defect. ML functional performance testing can evaluate model behavior and expose anomalies stemming from the use of a new library that is defective and causing a change in test results.`,
        textVi: `Một phiên bản mới của thư viện lõi (core library) được dùng bởi ML development framework có vẻ đang khiến mô hình ML tạo ra kết quả ngoài dự kiến và không chính xác`,
        rationaleVi: `Đúng. Điều này mô tả một lỗi tiềm ẩn từ thư viện được sử dụng. ML functional performance testing có thể đánh giá hành vi của mô hình và phát hiện các bất thường bắt nguồn từ việc dùng một thư viện mới bị lỗi, gây ra thay đổi trong kết quả test.`,
      },
      {
        key: "c",
        text: `After a new installation, the development team needs a quick test to determine if the ML development framework's essential services are running correctly`,
        rationale: `Is not correct. This describes the need to mitigate the risk of a defective ML framework installation. The appropriate mitigation for this is smoke testing, not full ML functional performance testing.`,
        textVi: `Sau một lần cài đặt mới, đội phát triển cần một bài test nhanh để xác định liệu các dịch vụ thiết yếu của ML development framework có đang chạy đúng hay không`,
        rationaleVi: `Sai. Điều này mô tả nhu cầu giảm thiểu rủi ro cài đặt ML framework bị lỗi. Biện pháp giảm thiểu phù hợp cho việc này là smoke testing, không phải ML functional performance testing đầy đủ.`,
      },
      {
        key: "d",
        text: `A single test result is difficult to reproduce during evaluation, showing slight variations in ML functional performance with each execution`,
        rationale: `Is correct. This describes the risk of poor interpretation of test results due to the stochastic nature of the learning process. ML functional performance testing, using multiple runs and statistical analysis, is the mitigation for this.`,
        textVi: `Một kết quả test đơn lẻ khó tái lập trong quá trình đánh giá, cho thấy những biến thiên nhỏ về hiệu năng chức năng ML qua mỗi lần thực thi`,
        rationaleVi: `Đúng. Điều này mô tả rủi ro diễn giải sai kết quả test do bản chất ngẫu nhiên (stochastic) của quá trình học. ML functional performance testing, thông qua nhiều lượt chạy và phân tích thống kê, là biện pháp giảm thiểu cho rủi ro này.`,
      },
      {
        key: "e",
        text: `A project leader needs to decide between two potential algorithms based on their suitability for the project's goals`,
        rationale: `Is not correct. This describes sub-optimal algorithm selection. The appropriate mitigation is an algorithm suitability review or A/B testing, not ML functional performance testing of a single algorithm that has not been selected yet.`,
        textVi: `Một trưởng dự án cần quyết định giữa hai thuật toán tiềm năng dựa trên mức độ phù hợp của chúng với mục tiêu dự án`,
        rationaleVi: `Sai. Điều này mô tả việc lựa chọn thuật toán chưa tối ưu. Biện pháp giảm thiểu phù hợp là rà soát mức độ phù hợp của thuật toán hoặc A/B testing, không phải ML functional performance testing cho một thuật toán đơn lẻ chưa được chọn.`,
      },
    ],
    correctKeys: ["b", "d"],
  },
  {
    id: "40",
    lo: "AI-7.1.2",
    chapterNum: 7,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following statements CORRECTLY describes how shadow testing differs from canary testing in the deployment of ML models?`,
    stemVi: `Phát biểu nào sau đây mô tả ĐÚNG sự khác biệt giữa shadow testing và canary testing khi triển khai mô hình ML?`,
    options: [
      {
        key: "a",
        text: `Shadow testing affects the responses from real users, while canary testing does not involve real users`,
        rationale: `This is not correct: It reverses the roles of both test types. Canary testing directly serves a small group of real users with the new ML model, while shadow testing processes live traffic in the background without ever affecting user responses.`,
        textVi: `Shadow testing ảnh hưởng đến phản hồi của người dùng thực, trong khi canary testing không liên quan đến người dùng thực`,
        rationaleVi: `Sai: Phát biểu này đảo ngược vai trò của cả hai loại test. Canary testing trực tiếp phục vụ một nhóm nhỏ người dùng thực bằng mô hình ML mới, trong khi shadow testing xử lý lưu lượng thực tế ở chế độ nền mà không bao giờ ảnh hưởng đến phản hồi của người dùng.`,
      },
      {
        key: "b",
        text: `Shadow testing mirrors traffic without impacting users, while canary testing provides responses from the new ML model`,
        rationale: `This is correct: Shadow testing provides a risk-free way to see how a new ML model behaves with production data, whereas canary testing deliberately exposes a small subset of users to the new model to observe its real-world performance and impact.`,
        textVi: `Shadow testing nhân bản (mirror) lưu lượng mà không ảnh hưởng đến người dùng, trong khi canary testing cung cấp phản hồi từ mô hình ML mới`,
        rationaleVi: `Đúng: Shadow testing cung cấp một cách không rủi ro để quan sát mô hình ML mới hoạt động thế nào với dữ liệu production, trong khi canary testing cố tình cho một tập nhỏ người dùng tiếp xúc với mô hình mới để quan sát hiệu năng và tác động thực tế của nó.`,
      },
      {
        key: "c",
        text: `Canary testing is used for performance testing, while shadow testing is mainly used for component integration testing`,
        rationale: `This is not correct: Both test types are used to validate a model's performance and functional correctness on live traffic. The primary difference is the risk profile, not whether one is for performance testing and the other is for component integration testing.`,
        textVi: `Canary testing được dùng cho performance testing, trong khi shadow testing chủ yếu được dùng cho component integration testing`,
        rationaleVi: `Sai: Cả hai loại test đều được dùng để thẩm định hiệu năng và tính đúng đắn chức năng của mô hình trên lưu lượng thực tế. Sự khác biệt chính nằm ở mức độ rủi ro, chứ không phải việc một loại dành cho performance testing còn loại kia dành cho component integration testing.`,
      },
      {
        key: "d",
        text: `Canary testing compares ML models running offline, while shadow testing is based on the use of live user data`,
        rationale: `This is not correct: It fundamentally misrepresents canary testing as an offline activity. Both canary testing and shadow testing are online methods that use live user data. The key distinction is whether the new ML model's response is actually sent to the user or is only logged for later analysis.`,
        textVi: `Canary testing so sánh các mô hình ML chạy offline, trong khi shadow testing dựa trên việc sử dụng dữ liệu người dùng thực tế`,
        rationaleVi: `Sai: Phát biểu này diễn đạt sai bản chất, coi canary testing là một hoạt động offline. Cả canary testing lẫn shadow testing đều là các phương pháp online, sử dụng dữ liệu người dùng thực tế. Sự khác biệt then chốt nằm ở việc phản hồi của mô hình ML mới có thực sự được gửi đến người dùng hay chỉ được ghi log để phân tích sau.`,
      },
    ],
    correctKeys: ["b"],
  },
  {
    id: "A1",
    lo: "AI-1.1.2",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    type: "matching",
    stem: `Given the following example AI systems, and the three different forms of AI (Narrow AI, General AI, Super AI):
a) An artificial mind that generates entirely new forms of art, music, and mathematics that are incomprehensible to humans.
b) A system that manages complex daily schedules, learns new recipes from a video, and holds conversations about novels it has just read.
c) A system that can independently learn any field of science and collaborate with human scientists by proposing novel hypotheses and original experiments.
d) A system that examines radiological images to detect the specific signatures of cancerous tumors.
e) A language translation model that can convert written text from French to Spanish.
Assign each example AI system to a form of AI. No form of AI can be left empty.

Note: this is a drag-and-drop matching item in the original exam (not a single-select a/b/c/d question). The official Answer Key lists it as "New question type" with no single letter answer. Each option below is one of the five example AI systems; correctKeys records which form of AI each one is correctly assigned to, encoded as "key:Form of AI".`,
    stemVi: `Cho các ví dụ hệ thống AI sau đây, và ba dạng AI khác nhau (Narrow AI, General AI, Super AI):
a) Một trí tuệ nhân tạo tạo ra những hình thức nghệ thuật, âm nhạc và toán học hoàn toàn mới mà con người không thể hiểu được.
b) Một hệ thống quản lý lịch trình hàng ngày phức tạp, học công thức nấu ăn mới từ video, và trò chuyện về những cuốn tiểu thuyết nó vừa đọc xong.
c) Một hệ thống có thể tự học độc lập bất kỳ lĩnh vực khoa học nào và cộng tác với các nhà khoa học con người bằng cách đề xuất giả thuyết mới và thí nghiệm nguyên bản.
d) Một hệ thống phân tích ảnh chụp X-quang để phát hiện các dấu hiệu đặc trưng của khối u ác tính.
e) Một mô hình dịch ngôn ngữ có thể chuyển đổi văn bản viết từ tiếng Pháp sang tiếng Tây Ban Nha.
Gán mỗi hệ thống AI ví dụ vào một dạng AI. Không được để trống bất kỳ dạng AI nào.

Lưu ý: đây là dạng câu hỏi ghép cặp bằng kéo-thả (drag-and-drop) trong đề thi gốc, không phải câu chọn một đáp án a/b/c/d đơn lẻ. Đáp án chính thức liệt kê câu này là "dạng câu hỏi mới" và không có một đáp án chữ cái duy nhất. Mỗi phương án dưới đây là một trong năm hệ thống AI ví dụ; correctKeys ghi lại hệ thống đó được gán đúng vào dạng AI nào, theo định dạng "key:Dạng AI".`,
    options: [
      {
        key: "a",
        text: `An artificial mind that generates entirely new forms of art, music, and mathematics that are incomprehensible to humans.`,
        rationale: `This system demonstrates creativity and intelligence far beyond human capability, producing outputs not understandable by people. Such abilities surpass both human-level general intelligence and any current artificial general intelligence, and so this is an example of super AI.`,
        textVi: `Một trí tuệ nhân tạo tạo ra những hình thức nghệ thuật, âm nhạc và toán học hoàn toàn mới mà con người không thể hiểu được.`,
        rationaleVi: `Hệ thống này thể hiện khả năng sáng tạo và trí tuệ vượt xa năng lực con người, tạo ra đầu ra mà con người không thể hiểu được. Những khả năng như vậy vượt qua cả trí tuệ tổng quát ở mức con người lẫn bất kỳ hệ AI tổng quát nhân tạo (AGI) nào hiện có, vì vậy đây là một ví dụ của super AI.`,
      },
      {
        key: "b",
        text: `A system that manages complex daily schedules, learns new recipes from a video, and holds conversations about novels it has just read.`,
        rationale: `This AI performs a wide range of complex tasks that require learning, perception, planning, and language understanding, comparable to a human's versatility. It shows adaptability and competency across novel domains. Thus, it is an example of AGI.`,
        textVi: `Một hệ thống quản lý lịch trình hàng ngày phức tạp, học công thức nấu ăn mới từ video, và trò chuyện về những cuốn tiểu thuyết nó vừa đọc xong.`,
        rationaleVi: `AI này thực hiện một loạt các tác vụ phức tạp đòi hỏi khả năng học, nhận thức, lập kế hoạch và hiểu ngôn ngữ, tương đương với sự linh hoạt đa năng của con người. Nó thể hiện khả năng thích ứng và năng lực trên nhiều lĩnh vực mới. Do đó, đây là một ví dụ của AGI.`,
      },
      {
        key: "c",
        text: `A system that can independently learn any field of science and collaborate with human scientists by proposing novel hypotheses and original experiments.`,
        rationale: `This system has the ability to autonomously and flexibly master multiple scientific disciplines and engage in creative research. Its competence covers learning, reasoning, and innovative thinking at a human expert's level. Thus, it is an example of AGI.`,
        textVi: `Một hệ thống có thể tự học độc lập bất kỳ lĩnh vực khoa học nào và cộng tác với các nhà khoa học con người bằng cách đề xuất giả thuyết mới và thí nghiệm nguyên bản.`,
        rationaleVi: `Hệ thống này có khả năng tự chủ và linh hoạt làm chủ nhiều lĩnh vực khoa học khác nhau, đồng thời tham gia vào nghiên cứu sáng tạo. Năng lực của nó bao trùm khả năng học, suy luận và tư duy đổi mới ở mức của một chuyên gia con người. Do đó, đây là một ví dụ của AGI.`,
      },
      {
        key: "d",
        text: `A system that examines radiological images to detect the specific signatures of cancerous tumors.`,
        rationale: `This AI excels at a well-defined, specialized task (medical image analysis) without broader understanding or abilities outside of its domain. Its application is confined to pattern recognition within radiological data and does not extend to generalized cognition. Thus, it is an example of narrow AI.`,
        textVi: `Một hệ thống phân tích ảnh chụp X-quang để phát hiện các dấu hiệu đặc trưng của khối u ác tính.`,
        rationaleVi: `AI này vượt trội ở một tác vụ chuyên biệt, được định nghĩa rõ ràng (phân tích ảnh y khoa), nhưng không có hiểu biết hay năng lực rộng hơn ngoài lĩnh vực của nó. Ứng dụng của nó chỉ giới hạn ở việc nhận diện mẫu trong dữ liệu X-quang và không mở rộng đến nhận thức tổng quát. Do đó, đây là một ví dụ của narrow AI.`,
      },
      {
        key: "e",
        text: `A language translation model that can convert written text from French to Spanish.`,
        rationale: `This model is built to perform a single function - translating between two languages. It demonstrates expertise in one bounded task and does not possess comprehensive understanding or adaptability beyond language conversion. Thus, it is an example of narrow AI.`,
        textVi: `Một mô hình dịch ngôn ngữ có thể chuyển đổi văn bản viết từ tiếng Pháp sang tiếng Tây Ban Nha.`,
        rationaleVi: `Mô hình này được xây dựng để thực hiện một chức năng duy nhất — dịch giữa hai ngôn ngữ. Nó thể hiện chuyên môn trong một tác vụ có giới hạn rõ ràng và không sở hữu hiểu biết toàn diện hay khả năng thích ứng ngoài phạm vi chuyển đổi ngôn ngữ. Do đó, đây là một ví dụ của narrow AI.`,
      },
    ],
    correctKeys: ["a:Super AI", "b:General AI", "c:General AI", "d:Narrow AI", "e:Narrow AI"],
  },
  {
    id: "A2",
    lo: "AI-1.1.7",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `Which of the following options BEST describes an advantage of using ML development frameworks when building and training machine learning models?`,
    stemVi: `Phương án nào sau đây mô tả TỐT NHẤT một lợi thế của việc sử dụng ML development framework khi xây dựng và huấn luyện các mô hình machine learning?`,
    options: [
      {
        key: "a",
        text: `They provide support for specifying the ML model architecture design, such as the structure of a decision tree`,
        rationale: `Is correct. Model building is a key function, and ML development frameworks provide "tools for defining the architecture of the ML model," including the ability to specify the structure of the ML model, such as a decision tree.`,
        textVi: `Chúng hỗ trợ việc đặc tả thiết kế kiến trúc mô hình ML, chẳng hạn như cấu trúc của một decision tree`,
        rationaleVi: `Đúng. Xây dựng mô hình là một chức năng then chốt, và ML development framework cung cấp "công cụ để định nghĩa kiến trúc của mô hình ML", bao gồm khả năng đặc tả cấu trúc của mô hình ML, ví dụ như một decision tree.`,
      },
      {
        key: "b",
        text: `They eliminate the need for data preprocessing by automatically optimizing the data before the training`,
        rationale: `Is not correct. The word "eliminate" is an overstatement. ML development frameworks assist with, but do not remove the need for data preprocessing. Data handling is a support function that does not perform complete automation, eliminating the task.`,
        textVi: `Chúng loại bỏ hoàn toàn nhu cầu tiền xử lý dữ liệu bằng cách tự động tối ưu hóa dữ liệu trước khi huấn luyện`,
        rationaleVi: `Sai. Từ "loại bỏ hoàn toàn" là một cách nói phóng đại. ML development framework hỗ trợ, nhưng không loại bỏ nhu cầu tiền xử lý dữ liệu. Xử lý dữ liệu là một chức năng hỗ trợ, không tự động hóa hoàn toàn để loại bỏ hẳn công việc này.`,
      },
      {
        key: "c",
        text: `They require the data scientists who use them to be advanced programmers with in-depth coding skills`,
        rationale: `Is not correct. ML development frameworks exist at different abstraction levels, including "a higher-level API, simplifying model creation". This suggests that programming is not a universal requirement, with the selection of the framework depending on the "expertise of the users."`,
        textVi: `Chúng đòi hỏi các data scientist sử dụng chúng phải là lập trình viên có trình độ cao với kỹ năng viết code chuyên sâu`,
        rationaleVi: `Sai. ML development framework tồn tại ở nhiều mức độ trừu tượng khác nhau, bao gồm "một API cấp cao hơn, giúp đơn giản hóa việc tạo mô hình". Điều này cho thấy lập trình không phải là yêu cầu bắt buộc chung, việc lựa chọn framework phụ thuộc vào "trình độ chuyên môn của người dùng."`,
      },
      {
        key: "d",
        text: `They make model development highly efficient, but lock in any developed ML models to the ML development framework`,
        rationale: `Is not correct. It is not correct that ML development frameworks lock in developed ML models to that framework. Generally, any developed ML models can be deployed anywhere (within reason).`,
        textVi: `Chúng giúp việc phát triển mô hình rất hiệu quả, nhưng khóa (lock in) bất kỳ mô hình ML nào đã phát triển vào chính ML development framework đó`,
        rationaleVi: `Sai. Không đúng khi cho rằng ML development framework khóa các mô hình ML đã phát triển vào framework đó. Nhìn chung, bất kỳ mô hình ML nào đã phát triển đều có thể được triển khai ở bất kỳ đâu (trong giới hạn hợp lý).`,
      },
    ],
    correctKeys: ["a"],
  },
  {
    id: "A3",
    lo: "AI-1.1.8",
    chapterNum: 1,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `An organization is developing an AI-based system for unmanned autonomous driving without considering the risks associated with the system.
Which of the following standards is MOST likely being violated in this scenario, which could result in severe penalties?`,
    stemVi: `Một tổ chức đang phát triển một hệ thống dựa trên AI cho xe tự lái không người điều khiển mà không xem xét đến các rủi ro liên quan đến hệ thống.
Tiêu chuẩn nào sau đây CÓ KHẢ NĂNG NHẤT đang bị vi phạm trong tình huống này, điều có thể dẫn đến các hình phạt nghiêm trọng?`,
    options: [
      {
        key: "a",
        text: `ISO/IEC/IEEE TR 29119-11`,
        rationale: `Is not correct. ISO/IEC/IEEE TR 29119-11 is not about testing AI, but, as with all standards, it provides guidelines and does not impose penalties for non-compliance.`,
        textVi: `ISO/IEC/IEEE TR 29119-11`,
        rationaleVi: `Sai. ISO/IEC/IEEE TR 29119-11 không nói về việc test AI, và giống như mọi tiêu chuẩn khác, nó chỉ đưa ra hướng dẫn chứ không áp đặt hình phạt khi không tuân thủ.`,
      },
      {
        key: "b",
        text: `OECD AI Principles`,
        rationale: `Is not correct. OECD is a non-mandatory set of guidelines.`,
        textVi: `OECD AI Principles`,
        rationaleVi: `Sai. OECD là một bộ hướng dẫn không mang tính bắt buộc.`,
      },
      {
        key: "c",
        text: `EU AI Act`,
        rationale: `Is correct. If the system is covered by the EU AI Act (i.e., it will be used in Europe), failing to follow a risk-based approach can result in severe penalties.`,
        textVi: `EU AI Act`,
        rationaleVi: `Đúng. Nếu hệ thống thuộc phạm vi điều chỉnh của EU AI Act (tức sẽ được sử dụng tại châu Âu), việc không tuân theo cách tiếp cận dựa trên rủi ro (risk-based approach) có thể dẫn đến các hình phạt nghiêm trọng.`,
      },
      {
        key: "d",
        text: `ISO/IEC 25059`,
        rationale: `Is not correct. ISO/IEC 25059 describes the unique quality characteristics of AI systems, but, like all standards, it provides guidelines rather than imposing penalties for non-compliance.`,
        textVi: `ISO/IEC 25059`,
        rationaleVi: `Sai. ISO/IEC 25059 mô tả các đặc tính chất lượng đặc thù của hệ thống AI, nhưng giống như mọi tiêu chuẩn khác, nó chỉ đưa ra hướng dẫn chứ không áp đặt hình phạt khi không tuân thủ.`,
      },
    ],
    correctKeys: ["c"],
  },
  {
    id: "A4",
    lo: "AI-3.1.1",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    type: "matching",
    stem: `Given the following forms of machine learning (Association, Classification, Reinforcement Learning, Regression), and example machine learning systems:
a) An energy company uses historical weather data and corresponding daily power consumption figures to predict the total amount of electricity a city will need tomorrow
b) A robotic arm learns to correctly sort various objects into different bins by receiving a positive reward for each object placed in the correct bin and a penalty for each mistake
c) An agricultural AI system analyzes satellite images of crops, which have been labelled by botanists as "healthy" or "diseased," to identify areas of a farm that require treatment
d) A medical research system analyzes patient records and identifies a strong association between a specific genetic marker and the early onset of a particular disease
Drag to pair each form of machine learning with an example machine learning system.

Note: this is a drag-and-drop matching item in the original exam (not a single-select a/b/c/d question). The official Answer Key lists it as "New question type" with no single letter answer. Each option below is one of the four example ML systems; correctKeys records which form of ML each one is correctly paired with, encoded as "key:Form of ML".`,
    stemVi: `Cho các dạng machine learning sau đây (Association, Classification, Reinforcement Learning, Regression), và các hệ thống machine learning ví dụ:
a) Một công ty năng lượng sử dụng dữ liệu thời tiết lịch sử và số liệu tiêu thụ điện hàng ngày tương ứng để dự đoán tổng lượng điện một thành phố sẽ cần vào ngày mai
b) Một cánh tay robot học cách phân loại đúng các vật thể khác nhau vào những thùng chứa khác nhau, bằng cách nhận thưởng dương cho mỗi vật đặt đúng thùng và bị phạt cho mỗi lần sai
c) Một hệ thống AI nông nghiệp phân tích ảnh vệ tinh của cây trồng, đã được các nhà thực vật học gán nhãn là "khỏe mạnh" hoặc "nhiễm bệnh," để xác định các khu vực trên nông trại cần được xử lý
d) Một hệ thống nghiên cứu y khoa phân tích hồ sơ bệnh nhân và xác định một mối liên hệ chặt chẽ giữa một dấu hiệu di truyền (genetic marker) cụ thể và sự khởi phát sớm của một căn bệnh nhất định
Kéo để ghép mỗi dạng machine learning với một hệ thống machine learning ví dụ.

Lưu ý: đây là dạng câu hỏi ghép cặp bằng kéo-thả trong đề thi gốc, không phải câu chọn một đáp án a/b/c/d đơn lẻ. Đáp án chính thức liệt kê câu này là "dạng câu hỏi mới" và không có một đáp án chữ cái duy nhất. Mỗi phương án dưới đây là một trong bốn hệ thống ML ví dụ; correctKeys ghi lại hệ thống đó được ghép đúng với dạng ML nào, theo định dạng "key:Dạng ML".`,
    options: [
      {
        key: "a",
        text: `An energy company uses historical weather data and corresponding daily power consumption figures to predict the total amount of electricity a city will need tomorrow`,
        rationale: `Regression - The ML model is trained on labeled data to predict a specific, continuous numerical value: the amount of electricity. The model's output is not a category but a quantity on a scale, which is the key characteristic of regression.`,
        textVi: `Một công ty năng lượng sử dụng dữ liệu thời tiết lịch sử và số liệu tiêu thụ điện hàng ngày tương ứng để dự đoán tổng lượng điện một thành phố sẽ cần vào ngày mai`,
        rationaleVi: `Regression — Mô hình ML được huấn luyện trên dữ liệu có nhãn để dự đoán một giá trị số liên tục cụ thể: lượng điện tiêu thụ. Đầu ra của mô hình không phải là một hạng mục mà là một đại lượng trên một thang đo, đây chính là đặc điểm then chốt của regression.`,
      },
      {
        key: "b",
        text: `A robotic arm learns to correctly sort various objects into different bins by receiving a positive reward for each object placed in the correct bin and a penalty for each mistake`,
        rationale: `Reinforcement learning - The system learns through direct interaction with its physical environment, not from a preexisting dataset. The robot's behavior is shaped over time by a system of rewards (for correct placement) and penalties (for incorrect placement).`,
        textVi: `Một cánh tay robot học cách phân loại đúng các vật thể khác nhau vào những thùng chứa khác nhau, bằng cách nhận thưởng dương cho mỗi vật đặt đúng thùng và bị phạt cho mỗi lần sai`,
        rationaleVi: `Reinforcement learning — Hệ thống học thông qua tương tác trực tiếp với môi trường vật lý của nó, chứ không phải từ một tập dữ liệu có sẵn từ trước. Hành vi của robot được định hình dần theo thời gian thông qua một hệ thống thưởng (cho việc đặt đúng) và phạt (cho việc đặt sai).`,
      },
      {
        key: "c",
        text: `An agricultural AI system analyzes satellite images of crops, which have been labelled by botanists as "healthy" or "diseased," to identify areas of a farm that require treatment`,
        rationale: `Classification - It learns from a dataset of images that have been pre-labeled with discrete categories ('healthy' or 'diseased'). Its purpose is to categorize new images into one of these specific, non-numerical classes, distinguishing it from regression.`,
        textVi: `Một hệ thống AI nông nghiệp phân tích ảnh vệ tinh của cây trồng, đã được các nhà thực vật học gán nhãn là "khỏe mạnh" hoặc "nhiễm bệnh," để xác định các khu vực trên nông trại cần được xử lý`,
        rationaleVi: `Classification — Nó học từ một tập dữ liệu ảnh đã được gán nhãn trước với các hạng mục rời rạc ("khỏe mạnh" hoặc "nhiễm bệnh"). Mục đích của nó là phân loại ảnh mới vào một trong các lớp cụ thể, không mang tính số này, đây là điểm phân biệt nó với regression.`,
      },
      {
        key: "d",
        text: `A medical research system analyzes patient records and identifies a strong association between a specific genetic marker and the early onset of a particular disease`,
        rationale: `Association - This system uses association by mining unlabeled patient records to identify dependencies between different attributes, such as a gene and a disease. It does not predict a class but instead reveals the strength of the relationship between variables within the data.`,
        textVi: `Một hệ thống nghiên cứu y khoa phân tích hồ sơ bệnh nhân và xác định một mối liên hệ chặt chẽ giữa một dấu hiệu di truyền cụ thể và sự khởi phát sớm của một căn bệnh nhất định`,
        rationaleVi: `Association — Hệ thống này sử dụng association bằng cách khai thác hồ sơ bệnh nhân chưa được gán nhãn để xác định các mối phụ thuộc giữa các thuộc tính khác nhau, chẳng hạn giữa một gene và một căn bệnh. Nó không dự đoán một lớp (class) mà thay vào đó tiết lộ mức độ mạnh yếu của mối quan hệ giữa các biến trong dữ liệu.`,
      },
    ],
    correctKeys: ["a:Regression", "b:Reinforcement Learning", "c:Classification", "d:Association"],
  },
  {
    id: "A5",
    lo: "AI-3.1.2",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    type: "ordering",
    stem: `Given the following activities:
a) Prepare & Test Data
b) Test the Model
c) Monitor & Tune the Model
d) Evaluate the Model
e) Deploy the Model
Order these activities in a logical sequence from earliest to latest in the ML workflow.

Note: this is a drag-and-drop ordering item in the original exam (not a single-select a/b/c/d question). The official Answer Key lists it as "New question type" with no single letter answer. correctKeys gives the official earliest-to-latest order as a sequence of option keys: a (Prepare & Test Data), d (Evaluate the Model), b (Test the Model), e (Deploy the Model), c (Monitor & Tune the Model). The source Answers document provides this order only as a diagram, without a separate textual rationale per item.`,
    stemVi: `Cho các hoạt động sau đây:
a) Prepare & Test Data (Chuẩn bị & test dữ liệu)
b) Test the Model (Test mô hình)
c) Monitor & Tune the Model (Giám sát & tinh chỉnh mô hình)
d) Evaluate the Model (Đánh giá mô hình)
e) Deploy the Model (Triển khai mô hình)
Sắp xếp các hoạt động này theo một trình tự hợp lý, từ sớm nhất đến muộn nhất trong quy trình ML.

Lưu ý: đây là dạng câu hỏi sắp xếp thứ tự bằng kéo-thả (drag-and-drop ordering) trong đề thi gốc, không phải câu chọn một đáp án a/b/c/d đơn lẻ. Đáp án chính thức liệt kê câu này là "dạng câu hỏi mới" và không có một đáp án chữ cái duy nhất. correctKeys thể hiện thứ tự chính thức từ sớm nhất đến muộn nhất dưới dạng chuỗi các key của phương án: a (Prepare & Test Data), d (Evaluate the Model), b (Test the Model), e (Deploy the Model), c (Monitor & Tune the Model). Tài liệu đáp án nguồn chỉ cung cấp thứ tự này dưới dạng sơ đồ, không có phần giải thích riêng bằng văn bản cho từng mục.`,
    options: [
      {
        key: "a",
        text: `Prepare & Test Data`,
        rationale: `Per the official answer diagram (EARLIER to LATER), this activity is first in the ML workflow sequence. The source document gives no separate textual rationale for this item beyond the diagram itself.`,
        textVi: `Prepare & Test Data (Chuẩn bị & test dữ liệu)`,
        rationaleVi: `Theo sơ đồ đáp án chính thức (từ SỚM đến MUỘN), hoạt động này đứng đầu tiên trong trình tự quy trình ML. Tài liệu nguồn không đưa ra giải thích riêng bằng văn bản cho mục này ngoài chính sơ đồ đó.`,
      },
      {
        key: "b",
        text: `Test the Model`,
        rationale: `Per the official answer diagram (EARLIER to LATER), this activity is third in the ML workflow sequence, after Prepare & Test Data and Evaluate the Model. The source document gives no separate textual rationale for this item beyond the diagram itself.`,
        textVi: `Test the Model (Test mô hình)`,
        rationaleVi: `Theo sơ đồ đáp án chính thức (từ SỚM đến MUỘN), hoạt động này đứng thứ ba trong trình tự quy trình ML, sau Prepare & Test Data và Evaluate the Model. Tài liệu nguồn không đưa ra giải thích riêng bằng văn bản cho mục này ngoài chính sơ đồ đó.`,
      },
      {
        key: "c",
        text: `Monitor & Tune the Model`,
        rationale: `Per the official answer diagram (EARLIER to LATER), this activity is last in the ML workflow sequence. The source document gives no separate textual rationale for this item beyond the diagram itself.`,
        textVi: `Monitor & Tune the Model (Giám sát & tinh chỉnh mô hình)`,
        rationaleVi: `Theo sơ đồ đáp án chính thức (từ SỚM đến MUỘN), hoạt động này đứng cuối cùng trong trình tự quy trình ML. Tài liệu nguồn không đưa ra giải thích riêng bằng văn bản cho mục này ngoài chính sơ đồ đó.`,
      },
      {
        key: "d",
        text: `Evaluate the Model`,
        rationale: `Per the official answer diagram (EARLIER to LATER), this activity is second in the ML workflow sequence, right after Prepare & Test Data. The source document gives no separate textual rationale for this item beyond the diagram itself.`,
        textVi: `Evaluate the Model (Đánh giá mô hình)`,
        rationaleVi: `Theo sơ đồ đáp án chính thức (từ SỚM đến MUỘN), hoạt động này đứng thứ hai trong trình tự quy trình ML, ngay sau Prepare & Test Data. Tài liệu nguồn không đưa ra giải thích riêng bằng văn bản cho mục này ngoài chính sơ đồ đó.`,
      },
      {
        key: "e",
        text: `Deploy the Model`,
        rationale: `Per the official answer diagram (EARLIER to LATER), this activity is fourth in the ML workflow sequence, after Test the Model and before Monitor & Tune the Model. The source document gives no separate textual rationale for this item beyond the diagram itself.`,
        textVi: `Deploy the Model (Triển khai mô hình)`,
        rationaleVi: `Theo sơ đồ đáp án chính thức (từ SỚM đến MUỘN), hoạt động này đứng thứ tư trong trình tự quy trình ML, sau Test the Model và trước Monitor & Tune the Model. Tài liệu nguồn không đưa ra giải thích riêng bằng văn bản cho mục này ngoài chính sơ đồ đó.`,
      },
    ],
    correctKeys: ["a", "d", "b", "e", "c"],
  },
  {
    id: "A6",
    lo: "AI-3.4.3",
    chapterNum: 3,
    kLevel: "K2",
    points: 1,
    selectCount: 1,
    stem: `What is a key reason that structural coverage alone is NOT SUFFICIENT as the basis for testing neural networks?`,
    stemVi: `Đâu là một lý do then chốt khiến structural coverage (độ bao phủ cấu trúc) một mình KHÔNG ĐỦ để làm cơ sở cho việc test mạng nơ-ron?`,
    options: [
      {
        key: "a",
        text: `It tends to overestimate performance on tasks involving human feedback`,
        rationale: `Is not correct. The core limitation is the model's internal reasoning, a general problem applicable to many tasks, not specifically those involving human feedback.`,
        textVi: `Nó có xu hướng đánh giá quá cao hiệu năng trên các tác vụ có liên quan đến phản hồi của con người`,
        rationaleVi: `Sai. Hạn chế cốt lõi nằm ở quá trình suy luận nội bộ của mô hình — đây là một vấn đề chung, áp dụng cho nhiều tác vụ, chứ không riêng gì các tác vụ liên quan đến phản hồi của con người.`,
      },
      {
        key: "b",
        text: `It cannot account for differences in model size when comparing test results`,
        rationale: `Is not correct. Structural coverage is a method for evaluating the test thoroughness of a single model, not for comparing different models. While model size may affect the raw coverage numbers, calculated values are typically presented as percentages, and therefore, this is not a limitation for its intended purpose.`,
        textVi: `Nó không thể tính đến sự khác biệt về kích thước mô hình khi so sánh kết quả test`,
        rationaleVi: `Sai. Structural coverage là một phương pháp đánh giá mức độ đầy đủ của việc test cho một mô hình đơn lẻ, chứ không phải để so sánh giữa các mô hình khác nhau. Tuy kích thước mô hình có thể ảnh hưởng đến con số coverage thô, các giá trị tính toán thường được trình bày dưới dạng phần trăm, do đó đây không phải là một hạn chế đối với mục đích sử dụng dự kiến của nó.`,
      },
      {
        key: "c",
        text: `It does not reveal whether the network relies on misleading or irrelevant features`,
        rationale: `Is correct. It directly addresses the key limitations of coverage measures used in isolation. Neural networks can learn spurious correlations, leading to correct activations for incorrect reasons, meaning the model could achieve high structural coverage while making decisions based on irrelevant features.`,
        textVi: `Nó không cho biết liệu mạng có đang dựa vào các feature gây hiểu lầm hay không liên quan hay không`,
        rationaleVi: `Đúng. Điều này giải quyết trực tiếp hạn chế then chốt của các thước đo coverage khi được dùng đơn độc. Mạng nơ-ron có thể học các tương quan giả (spurious correlation), dẫn đến việc kích hoạt đúng nhưng vì lý do sai, nghĩa là mô hình có thể đạt structural coverage cao trong khi vẫn đưa ra quyết định dựa trên các feature không liên quan.`,
      },
      {
        key: "d",
        text: `It replaces the need to assess the usefulness of individual model outputs`,
        rationale: `Is not correct. Structural coverage is a valuable supplement that should be combined with other methods. It is intended to enhance, not replace, other test activities, such as evaluating the functional correctness and usefulness of the model's outputs.`,
        textVi: `Nó thay thế cho nhu cầu đánh giá tính hữu ích của từng đầu ra riêng lẻ của mô hình`,
        rationaleVi: `Sai. Structural coverage là một phương pháp bổ sung có giá trị, nên được kết hợp với các phương pháp khác. Nó nhằm mục đích nâng cao, chứ không thay thế, các hoạt động test khác, chẳng hạn như đánh giá tính đúng đắn chức năng và tính hữu ích của đầu ra mô hình.`,
      },
    ],
    correctKeys: ["c"],
  },
];
