
import { Question, Badge } from './types';

export const QUESTIONS_HA_LONG: Question[] = [
  {
    id: 'hl-q1',
    game_type: 'error_detection',
    question: 'Câu 1: Tìm lỗi sai trong câu và sửa lại',
    content: '“Đền Cửa Ông được công nhẫn là Di tích Quốc gia Đặc biệt”',
    options: [],
    correct_answer: 'nhẫn',
    explanation: '“Nhẫn” là thanh bắt đầu ở âm vực thấp và kết thúc ở âm vực cao. “Nhận” là thanh thuộc âm vực thấp. Công nhận (Recognize): thừa nhận là đúng với sự thật, với lẽ phải hoặc là hợp lệ; Nhẫn (Ring): vòng nhỏ, thường bằng vàng, bạc, đeo vào ngón tay làm đồ trang sức',
    note: 'Đền Cửa Ông toạ lạc tại phường Cửa Ông, tỉnh Quảng Ninh, đền Cửa Ông thờ Hưng Nhượng Vương Trần Quốc Tảng được công nhận là Di tích Quốc gia Đặc biệt năm 2017.',
    category: 'Hạ Long'
  },
  {
    id: 'hl-q2',
    game_type: 'fill_tone',
    question: 'Câu 2: Hãy nghe phát âm các từ này và thêm thanh điệu cho các từ thuộc ẩm thực vùng Hạ Long',
    content: 'Sa sung, Cha mưc, Con ngan, Con sam, Bê bê',
    options: [],
    correct_answer: 'Sá sùng, Chả mực, Con ngán, Con sam, Bề bề',
    explanation: '- Một âm vút lên (Sá - thanh sắc) đi liền với một âm trầm xuống (sùng – thanh huyền). Sá sùng là một loại giun biển quý hiếm ở vùng vịnh.\n- "Chả mực" là món ăn đặc trưng số 1 của Hạ Long. Chữ "Chả" mang thanh hỏi (võng xuống rồi lên), chữ "mực" mang thanh nặng (rơi xuống dứt khoát).\n- "Con ngan" (thanh ngang): Là một loài gia cầm (giống con vịt/ngỗng), sống trên cạn. "Con ngán" (thanh sắc): Là một loại hải sản hai mảnh vỏ (giống con nghêu) cực kỳ nổi tiếng ở vùng biển Hạ Long.\n- Chữ "Sam" vốn mang thanh ngang (không có dấu). Con sam biển là loại hải sản vừa quý hiếm, độc đáo và rất khó chế biến.\n- "Bề bề" (miền Nam gọi là tôm tít/tôm tích) là hải sản phổ biến. Lặp lại một thanh điệu (thanh huyền) cho cả hai âm tiết.',
    note: '',
    category: 'Hạ Long'
  },
  {
    id: 'hl-q3',
    game_type: 'multiple_choice',
    question: 'Câu 3: Từ nào viết đúng thanh điệu?',
    options: ['A. Ha Long', 'B. Hạ Long', 'C. Hả Long', 'D. Hã Long'],
    correct_answer: 'B. Hạ Long',
    explanation: '“Hạ” mang thanh nặng (.) – thanh trắc, âm đi xuống mạnh. Nếu sai thanh → sai nghĩa hoặc không có nghĩa.',
    note: '',
    category: 'Hạ Long'
  },
  {
    id: 'hl-q4',
    game_type: 'multiple_choice',
    question: 'Câu 4: Điền vào chỗ trống:',
    content: '“Vịnh Hạ Long có nhiều hang rất___.”',
    options: ['A. đẽ', 'B. đẻ', 'C. đẹp', 'D. dẹp'],
    correct_answer: 'C. đẹp',
    explanation: '“đẹp” mang thanh nặng, diễn tả tính chất. Các từ còn lại sai nghĩa hoặc sai thanh.',
    note: '',
    category: 'Hạ Long'
  },
  {
    id: 'hl-q5',
    game_type: 'correction',
    question: 'Câu 5: Người học nói: “Tôi thích đi Vin Ha Long”\nChọn cách sửa đúng:',
    options: ['A. Tôi thích đi Vin Hạ Long', 'B. Tôi thích đi Vịnh Hạ Long', 'C. Tôi thích đi Vịnh Ha Long', 'D. Tôi thích đi Vịnh Hã Long'],
    correct_answer: 'B. Tôi thích đi Vịnh Hạ Long',
    explanation: 'Sai 2 lỗi: + “Vin” → “Vịnh” + thiếu thanh nặng',
    note: '',
    category: 'Hạ Long'
  }
];

export const QUESTIONS_PHU_QUOC: Question[] = [
  {
    id: 'pq-q1',
    game_type: 'multiple_choice',
    question: 'Câu 1: Cho đoạn tin nhắn sau và trả lời câu hỏi:\nMai: “Tuần sau tớ đi Phu Quoc không biết ở đó có lễ hội truyền thống nào không nhỉ?”\nLoan: “Ở Phú Quốc nhiều lễ hội truyền thống lắm. Ví dụ như lễ hội Nghinh Ông, lễ hội Nguyễn Trung Trực, lễ hội Dinh Bà Ông Lang,…. Nếu tuần sau cậu đi sẽ có Lễ hội đua thuyền truyền thống đó”\nMai: “Ôi! Tớ háo hức đến tuần sau để tới Phu Quoc quá.”\nTrong đoạn tin nhắn trên, bạn Mai đã bỏ qua thanh điệu của từ “Phu Quoc”. Bạn hãy giúp Mai chọn đúng các dấu thanh để điền vào chữ \"Phu Quoc\" nhé!',
    options: ['Phú Quốc', 'Phu Quốc', 'Phủ Quốc', 'Phú Quôc'],
    correct_answer: 'Phú Quốc',
    explanation: 'Cả hai từ đều mang thanh sắc, âm vực cao',
    category: 'Phú Quốc'
  },
  {
    id: 'pq-q2',
    type: 'REORDER',
    question: 'Câu 2: Hãy sắp xếp các từ sau thành một câu có nghĩa.',
    content: 'nước/Phú/mắm/nược/mây/Phù/mặm/Quốc/thuỷ',
    answer: 'Nước mắm Phú Quốc',
    note: 'Nước mắm Phú Quốc là đặc sản nổi tiếng Kiên Giang, được sản xuất truyền thống từ cá cơm tươi (Than, Đỏ, Sọc Tiêu) và muối biển, ủ chượp trong thùng gỗ hơn 1 năm. Sản phẩm có màu nâu cánh gián đặc trưng, vị đậm đà, độ đạm tự nhiên cao ( 35oN - 45oN). Các thương hiệu uy tín bao gồm Khải Hoàn, Ông Kỳ, Thanh Quốc, Thịnh Phát, Phụng Hưng, Hưng Thịnh.',
    category: 'Phú Quốc'
  },
  {
    id: 'pq-q3',
    game_type: 'multiple_choice',
    question: 'Câu 3: Cho biết các từ trong câu "Nước mắm Phú Quốc" mang thanh điệu gì?',
    options: ['A. Thanh Ngang', 'B. Thanh Huyền', 'C. Thanh Sắc', 'D. Thanh Hỏi'],
    correct_answer: 'C. Thanh Sắc',
    explanation: '“Nước” (water): mang thanh sắc, âm vực cao. Là chất lỏng; “Mắm” (fish sauce): mang thanh sắc, âm vực cao. Là thức ăn làm bằng tôm cá sống ướp muối và để lâu ngày; “Phú Quốc”: cả hai đều mang thanh sắc, âm vực cao. Là một địa danh ở Việt Nam',
    category: 'Phú Quốc'
  },
  {
    id: 'pq-q4',
    game_type: 'multiple_choice',
    question: 'Câu 4: Điền từ phù hợp:\n“Đặc sản Phú Quốc không thể thiếu chén nước mắm nồng nàn và những hạt ............ đen cay nồng, thơm nức.”',
    options: ['A. Tiêu đỏ', 'B. Tiệu đen', 'C. Tiêu', 'D. Tiều'],
    correct_answer: 'C. Tiêu',
    explanation: '"Tiêu" mang thanh ngang, phát âm bằng phẳng, không biến đổi cao độ.',
    note: 'Tiêu Phú Quốc nổi tiếng nhờ hạt mẩy, vỏ mỏng, ruột đặc và có vị cay nồng đậm đà hơn tiêu ở những vùng khác. Các vườn tiêu còn là điểm check-in xanh mướt cho du khách.',
    category: 'Phú Quốc'
  },
  {
    id: 'pq-q5',
    game_type: 'multiple_choice',
    question: 'Câu 5: Trong ẩm thực Phú Quốc, hãy tìm từ đúng trong hai từ sau: "Gỏi cá trích" và "Gỏi cá trịch"',
    options: ['Gỏi cá trích', 'Gỏi cá trịch'],
    correct_answer: 'Gỏi cá trích',
    explanation: '"Trích" (Thanh sắc): Một loại cá biển nhỏ, xương sụn, thịt thơm ngọt, dùng để làm món gỏi trứ danh. Thanh sắc giúp âm tiết vút lên cao. Còn "Trịch" (Thanh nặng): Không có nghĩa khi đi với từ "cá", thường dùng trong từ "nặng trịch" (chỉ trọng lượng rất nặng).',
    note: 'Gỏi cá trích Phú Quốc ăn kèm với dừa nạo, rau rừng và nước chấm đậu phộng đặc quánh, tạo nên hương vị khó quên.',
    category: 'Phú Quốc'
  },
  {
    id: 'pq-q6',
    game_type: 'multiple_choice',
    question: 'Câu 6: Điền từ thích hợp: “Phú Quốc nổi tiếng với nước biển trong và ___ mát.”',
    options: ['A. xanh', 'B. xảnh', 'C. xạnh', 'D. xẵnh'],
    correct_answer: 'A. xanh',
    explanation: 'Chỉ có “xanh” (ngang) là từ đúng. Các biến thể khác → sai thanh = sai từ',
    category: 'Phú Quốc'
  },
  {
    id: 'pq-q7',
    game_type: 'multiple_choice',
    question: 'Câu 7: Điền từ vào chỗ trống của đoạn hội thoại sau:\nLan: Bạn thích món ăn gì ở Phú Quốc?\nHoa: Tôi thích __..',
    options: ['A. Hai Sam va Bao Ngu', 'B. Hải Sâm và Bào Ngư', 'C. Hại Sâm và Bảo Ngư', 'D. Hải Sâm và Bảo Ngự'],
    correct_answer: 'B. Hải Sâm và Bào Ngư',
    note: '"Hải sâm & Bào ngư": Các món đặc sản bổ dưỡng, thường được chế biến trong các nhà hàng cao cấp.',
    category: 'Phú Quốc'
  }
];

export const QUESTIONS_HOI_AN: Question[] = [
  {
    "game_type": "multiple_choice",
    "question": "Câu 1: Dưới đây là một số lễ hội truyền thống ở Hội An, hãy chọn lễ hội có chứa thanh sắc và cho biết từ đó là từ nào?",
    "options": ["A. Lễ hội Long Chu", "B. Lễ hội đua ghe", "C. Lễ hội cầu ngư", "D. Lễ hội đêm rằm phố cổ"],
    "correct_answer": "D. Lễ hội đêm rằm phố cổ. Thanh sắc nằm ở từ “phố”",
    "explanation": "\"Long Chu\" – đua ghe: thanh ngang.\n\"Cầu\" (thanh huyền), \"ngư\" (thanh ngang).\n\"Đêm\" (thanh ngang), \"rằm\" (thanh huyền), \"phố\" (thanh sắc), \"cổ\" (thanh hỏi)",
    "note": "\"Lễ hội Long Chu\": diễn ra vào dịp rằm tháng Giêng và rằm tháng 7 hằng năm. Vào ngày lễ chính, toàn thể dân làng rước Long Chu (1 chiếc thuyền hình rồng) về đình, người chủ bái cùng thầy phù thủy sẽ khai quang điểm nhãn cho Long Chu. Sau nhiều nghi lễ cúng tế, vào buổi tối, các tráng đinh sẽ mang Long Chu đến những nơi cần yểm, đốt rồi thả tro ra biển; \nLễ hội đua ghe\": thường diễn ra vào dịp mừng xuân mùng 2 – mùng 7 tháng Giêng. Đua ghe là dịp làm hài lòng các bậc thánh nhân đã phù hộ cho thôn làng được bình yên;\n\"Lễ hội cầu ngư\": thường tổ chức vào rằm tháng 2 âm lịch. Vào dịp cầu ngư, dân cư các làng chài Hội An còn tổ chức lễ tế Cá Ông, tri ân Cá Ông đã cứu giúp người dân gặp nạn trên biển;\n\"Lễ cầu an\": thường diễn ra vào trung tuần tháng 3 âm lịch;\n\"Lễ hội đêm rằm phố cổ\": tổ chức vào mỗi đêm 14 âm lịch hằng tháng. Khi lễ hội diễn ra, các ngôi nhà, hàng quán đều tắt điện, nhường chỗ ánh sáng trăng rằm và những ngọn đèn lồng. Trên các con phố, người đi bộ tỏa ra đường, tham gia chơi các trò chơi dân gian, thi đấu cờ tướng, đánh bài chòi hoặc đi thuyền trên sông Hoài và thả hoa đăng.",
    "id": "ha-q1",
    "category": "Hội An"
  },
  {
    "game_type": "fill_blank",
    "question": "Câu 2: Điền từ phù hợp vào chỗ trống trong câu sau: “Hình ảnh khu phố cổ Hội An được thắp sáng lung linh bằng những ngọn ………… đủ màu sắc, tạo nên khung cảnh nên thơ đáng nhớ”.",
    "options": ["A. Đèn lồng", "B. Đen lông", "C. Đèn lộng", "D. Đẹn lỗng"],
    "correct_answer": "A. Đèn lồng (thanh huyền)",
    "explanation": "“Đèn lồng”: cả 2 từ mang thanh huyền, âm vực thấp.",
    "note": "“Đèn lồng”: đèn có khung bọc ngoài như một cái lồng, có dán giấy hoặc lụa màu, dùng để trang trí",
    "id": "ha-q2",
    "category": "Hội An"
  },
  {
    "game_type": "error_detection",
    "question": "Câu 3: Tìm lỗi sai trong câu và sửa lại\n“Hội An nổi tiếng with món Cao lâu và cơm gà Bà Buội”",
    "content": "“Hội An|nổi tiếng|với món|Cao lâu|và|cơm gà|Bà Buội”",
    "options": [],
    "correct_answer": "Cao lầu",
    "error_word": "Cao lâu",
    "explanation": "*“Lâu” mang thanh ngang (âm vực cao, bằng phẳng). Còn “Lầu” mang thanh huyền (âm vực thấp, đi xuống).",
    "note": "\"Cao lầu\" (Specialty noodle): Là tên một món ăn đặc sản của Hội An; từ \"Lầu\" ở đây ám chỉ việc ngày xưa thực khách thường ngồi trên tầng lầu của quán để vừa ăn vừa ngắm cảnh phố xá.\n\"Cao lầu\" là linh hồn ẩm thực Hội An với sợi mì vàng óng, ăn kèm thịt xíu, da heo chiên giòn và các loại rau sống trà quế đặc trưng.",
    "id": "ha-q3",
    "category": "Hội An"
  },
  {
    "game_type": "classification",
    "question": "Câu 4: Phân loại từ vựng theo thanh điệu\nDưới đây là danh sách các địa danh và món ăn tại Hội An. Hãy sắp xếp các từ viết hoa vào đúng nhóm thanh điệu của chúng:\nchùa Cầu, trà Quế, bánh Mì, thanh Hà, cẩm Phô, mì Quảng.",
    "content": "Danh sách từ: chùa Cầu, trà Quế, bánh Mì, thanh Hà, cẩm Phô, mì Quảng",
    "options": [],
    "correct_answer": "1. Thanh Huyền: chùa Cầu, bánh Mì, thanh Hà\n2. Thanh Sắc: trà Quế\n3. Thanh Hỏi: mì Quảng\n4. Thanh Ngang: cẩm Phô",
    "explanation": "• \"Cầu, Mì, Hà\": Đều mang thanh huyền, tạo cảm giác trầm, nhẹ nhàng như nhịp sống phố cổ; \n• \"Quế\": Thanh sắc, âm vực cao nhất trong các từ trên, gợi lên hương thơm nồng nàn của làng rau;\n• \"Quảng\": Thanh hỏi, luồng hơi đi xuống rồi vòng lên, đặc trưng cho cách phát âm nhấn nhá của người dân xứ Quảng.\n\"Phô\": Thanh ngang (hay còn gọi là thanh bằng không dấu) trong tiếng Việt có đặc trưng cao độ thuộc nhóm thanh cao, âm thanh phát ra không gãy khúc, đường nét ngang thẳng, thường tạo cảm giác nhẹ nhàng, bằng phẳng",
    "note": "• Chùa Cầu: Biểu tượng của Hội An, được in trên tờ tiền 20.000 VNĐ.\n• Làng rau Trà Quế: Nổi tiếng với phương pháp trồng rau hữu cơ bằng rong vớt từ sông Cổ Cò.\n• Làng gốm Thanh Hà: Nơi du khách có thể tự tay nặn những sản phẩm đất nung truyền thống.",
    "id": "ha-q4",
    "category": "Hội An"
  },
  {
    "game_type": "multiple_choice",
    "question": "Câu 5: Điền dấu đúng:\n“Hội An nổi tiếng với phố cổ và những chiếc đèn lồng rực ___.”",
    "options": ["A. ro", "B. rồ", "C. rỡ", "D. rỏ"],
    "correct_answer": "C. rỡ",
    "explanation": "“rực rỡ” → thanh ngã (~). Thanh ngã thường có đường âm điệu gãy, lên cao",
    "note": "",
    "id": "ha-q5",
    "category": "Hội An"
  },
  {
    "game_type": "multiple_choice",
    "question": "Câu 6: Từ nào thuộc thanh bằng?",
    "options": ["A. cổ", "B. phố", "C. đèn", "D. Hội"],
    "correct_answer": "C. đèn",
    "explanation": "Thanh bằng: ngang + huyền . Như vậy,“đèn” = thanh huyền → thanh bằng. Các từ còn lại là thanh trắc",
    "note": "",
    "id": "ha-q6",
    "category": "Hội An"
  },
  {
    "game_type": "multiple_choice",
    "question": "Câu 7: Câu nào đúng nhất?",
    "options": ["A. Hội An RAT DEP", "B. Hội An rất đẹp", "C. Hội An rất đép"],
    "correct_answer": "B. Hội An rất đẹp",
    "explanation": "Trong 1 câu, ta không chỉ cần sử dụng đúng thanh điệu mà còn phải dùng đúng nhịp và trọng âm. Nếu dùng thanh sai, ta sẽ phá vỡ ngữ điệu câu",
    "note": "",
    "id": "ha-q7",
    "category": "Hội An"
  }
];

export const QUESTIONS_MINI_GAME: Question[] = [
  {
    id: 'mg-q1',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 1: Từ hiển thị: den long',
    options: ['A. đèn lồng', 'B. đen long', 'C. đèn long', 'D. đẹn lồng'],
    correct_answer: 'A. đèn lồng',
    prompt: 'den long',
    explanation: '“Đèn lồng” là biểu tượng văn hoá đặc trưng của Hội An.',
    note: 'Đèn lồng là biểu tượng đặc trưng của Hội An, đặc biệt rực rỡ vào ban đêm và các dịp lễ hội.',
    category: 'Mini Game'
  },
  {
    id: 'mg-q2',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 2: Từ hiển thị: pho co',
    options: ['A. phố cổ', 'B. phó cổ', 'C. phố cỏ', 'D. phô cổ'],
    correct_answer: 'A. phố cổ',
    prompt: 'pho co',
    note: 'Phố cổ Hội An là di sản văn hóa thế giới, nổi tiếng với kiến trúc cổ và không gian yên bình.',
    category: 'Mini Game'
  },
  {
    id: 'mg-q3',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 3: Từ hiển thị: hoi an rat dep',
    options: ['A. Hội An rất đẹp', 'B. Hỏi An rất đẹp', 'C. Hội An rất đép', 'D. Hội An rát đẹp'],
    correct_answer: 'A. Hội An rất đẹp',
    prompt: 'hoi an rat dep',
    note: 'Hội An thu hút du khách nhờ vẻ đẹp cổ kính và ánh đèn lung linh về đêm.',
    category: 'Mini Game'
  },
  {
    id: 'mg-q4',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 4: Từ hiển thị: cau ngu',
    options: ['A. cầu ngư', 'B. câu ngư', 'C. cầu ngứ', 'D. cẩu ngư'],
    correct_answer: 'A. cầu ngư',
    prompt: 'cau ngu',
    note: 'Lễ hội cầu ngư là hoạt động truyền thống của ngư dân, cầu mong biển yên và đánh bắt thuận lợi.',
    category: 'Mini Game'
  },
  {
    id: 'mg-q5',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 5: Từ hiển thị: cao lau',
    options: ['A. cao lầu', 'B. cao lâu', 'C. cao làu', 'D. cào lầu'],
    correct_answer: 'A. cao lầu',
    prompt: 'cao lau',
    note: 'Cao lầu là món ăn đặc trưng của Hội An, có sợi mì dai và ăn kèm thịt, rau sống.',
    category: 'Mini Game'
  },
  {
    id: 'mg-q6',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 6: Từ hiển thị: banh mi',
    options: ['A. bánh mì', 'B. banh mì', 'C. bánh mi', 'D. bảnh mì'],
    correct_answer: 'A. bánh mì',
    prompt: 'banh mi',
    note: 'Bánh mì Hội An nổi tiếng với hương vị đậm đà, được nhiều du khách quốc tế yêu thích.',
    category: 'Mini Game'
  },
  {
    id: 'mg-q7',
    game_type: 'multiple_choice',
    question: '🏮 CÂU 7: Từ hiển thị: tra que',
    options: ['A. trà quế', 'B. tra quẻ', 'C. trà quẻ', 'D. trạ quế'],
    correct_answer: 'A. trà quế',
    prompt: 'tra que',
    note: 'Làng rau Trà Quế là nơi cung cấp rau sạch nổi tiếng, gắn với du lịch trải nghiệm ở Hội An.',
    category: 'Mini Game'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Khởi Hành',
    description: 'Người mới bắt đầu tìm hiểu di sản.',
    icon: '🛶',
    requirement: 'Đăng nhập thành công',
    check: (user) => user.isLoggedIn
  },
  {
    id: 'b2',
    name: 'Chuyên Gia Hạ Long',
    description: 'Nắm vững kiến thức về Vịnh Hạ Long.',
    icon: '🚢',
    requirement: 'Hoàn thành chặng Hạ Long',
    check: (user) => user.completedStages.includes('HA_LONG')
  },
  {
    id: 'b3',
    name: 'Nhà Thám Hiểm Phú Quốc',
    description: 'Khám phá mọi ngóc ngách Đảo Ngọc.',
    icon: '🏝️',
    requirement: 'Hoàn thành chặng Phú Quốc',
    check: (user) => user.completedStages.includes('PHU_QUOC')
  },
  {
    id: 'b4',
    name: 'Người Con Hội An',
    description: 'Am hiểu văn hóa Phố Cổ.',
    icon: '🏮',
    requirement: 'Hoàn thành chặng Hội An',
    check: (user) => user.completedStages.includes('HOI_AN')
  },
  {
    id: 'b5',
    name: 'Nhà Thông Thái',
    description: 'Ghi điểm ấn tượng trong hành trình.',
    icon: '🧠',
    requirement: 'Đạt trên 150 điểm',
    check: (user) => user.score >= 150
  },
  {
    id: 'b6',
    name: 'Đại Sứ Toàn Năng',
    description: 'Hoàn thành toàn bộ hành trình di sản.',
    icon: '🎖️',
    requirement: 'Hoàn thành tất cả các chặng',
    check: (user) => user.completedStages.length >= 4
  }
];

export const HERITAGE_KNOWLEDGE = `
Hệ thống kiến thức Di Sản Việt (Dựa trên tài liệu gốc):

1. Ngôn ngữ học Tiếng Việt:
- Tiếng: Đơn vị nhỏ nhất có nghĩa, trùng with âm tiết.
- Thanh điệu: Có 6 thanh (Ngang, Huyền, Sắc, Hỏi, Ngã, Nặng).
- Trật tự câu: Thường theo cấu trúc Chủ ngữ - Vị ngữ.
- Xưng hô: Sử dụng các đại từ gia đình (Ông, Bác, Cháu) để thể hiện sự lễ phép.
- Tình thái từ: "ạ" đặt cuối câu hỏi để tăng tính lịch sự.

2. Đặc sản biển Hạ Long:
- Chả mực Hạ Long: Giã tay, giữ độ giòn.
- Sá sùng: Nấu nước phở ngọt lợ tự nhiên.
- Hang Tiên Ông: Lưu giữ vỏ ốc suối Melania người tiền sử.
- Soi Nhụ: Văn hóa khảo cổ nổi tiếng vùng Vịnh.

3. Làng nghề & Du lịch Hội An:
- Kim Bồng: Làng nghề điêu khắc gỗ nổi tiếng.
- Thanh Hà: Làng nghề gốm đất nung lâu đời.
- Cao lầu: Món mì đặc sản duy nhất chỉ có ở Hội An.
- Vườn tượng An Hội: Nơi diễn ra các hoạt động văn hóa Bài Chòi.

4. Du lịch Phú Quốc:
- Nhà thùng: Dụng cụ làm nước mắm truyền thống lâu đời.
- Nghinh Ông: Lễ hội cầu ngư ngư dân vùng biển.
- Chùa Hộ Quốc: Ngôi chùa ven biển lớn nhất Phú Quốc.

5. Trend Gen Z Việt Nam:
- "+1 máy": Đồng ý, tôi cũng vậy.
- "Tuyệt đối điện ảnh": Khen vẻ đẹp nghệ thuật, như phim.
- "Toang": Sự đổ vỡ, thất bại.
- "Sao phải xoắn": Hãy bình tĩnh.
- "Còn cái nịt": Mất trắng, không còn gì.
`;
