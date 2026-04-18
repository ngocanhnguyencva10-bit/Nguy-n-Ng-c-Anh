
import { GoogleGenAI } from "@google/genai";
import { HERITAGE_KNOWLEDGE } from "../constants";

/**
 * Hàm hỗ trợ tạm dừng thực thi
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Hàm hỏi AI Guide với cơ chế xử lý lỗi và thử lại (retries)
 * @param question Câu hỏi của người dùng
 * @param userContext Ngữ cảnh hiện tại trong game
 * @param retries Số lần thử lại tối đa (mặc định là 3)
 */
export async function askAIGuide(question: string, userContext: string, retries = 3) {
  // Always create a new GoogleGenAI instance right before making an API call
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let delay = 1000; // Bắt đầu với độ trễ 1 giây

  for (let i = 0; i < retries; i++) {
    try {
      // Sử dụng model gemini-3-flash-preview cho các tác vụ văn bản cơ bản
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Bạn là "3Ling" - Chuyên gia Hướng dẫn Văn hóa và Ngôn ngữ Việt Nam.
        
        DƯỚI ĐÂY LÀ NGUỒN KIẾN THỨC BẠN PHẢI SỬ DỤNG ĐỂ TRẢ LỜI:
        ${HERITAGE_KNOWLEDGE}
        
        NGỮ CẢNH NGƯỜI CHƠI:
        ${userContext}
        
        CÂU HỎI NGƯỜI DÙNG:
        ${question}
        
        YÊU CẦU:
        1. Trả lời bằng tiếng Việt, thân thiện, cổ vũ người chơi.
        2. Nếu câu hỏi liên quan đến kiến thức trong nguồn trên, hãy ưu tiên trích dẫn chính xác (ví dụ: cách làm chả mực, cấu tạo từ...).
        3. Giữ câu trả lời ngắn gọn, súc tích (đưới 100 từ).
        4. Nếu người dùng hỏi về gợi ý câu hỏi trong game, hãy đưa ra manh mối tinh tế dựa trên kiến thức trên, đừng cho đáp án ngay.`,
        config: {
          temperature: 0.7,
          topP: 0.95,
        }
      });

      // Truy cập thuộc tính .text trực tiếp (không phải phương thức)
      return response.text;

    } catch (error: any) {
      // Kiểm tra xem có phải lỗi vượt quá giới hạn (Quota) hay không
      const isQuotaError = 
        error?.status === 429 || 
        error?.message?.includes('429') || 
        error?.message?.includes('RESOURCE_EXHAUSTED');

      if (isQuotaError && i < retries - 1) {
        console.warn(`3Ling đang bị quá tải (429). Thử lại sau ${delay}ms... (Lần thử ${i + 1}/${retries})`);
        await sleep(delay);
        delay *= 2; // Tăng thời gian chờ theo lũy thừa (Exponential backoff)
        continue;
      }

      console.error("Gemini API Error:", error);
      
      if (isQuotaError) {
        return "Hiện tại 3Ling đang có quá nhiều bạn hỏi cùng lúc nên hơi 'quá tải' một chút. Bạn hãy đợi khoảng 1 phút rồi hỏi lại 3Ling nhé! 3Ling vẫn luôn ở đây đợi bạn. 🙏";
      }
      
      return "Xin lỗi bạn, 3Ling đang gặp một chút trục trặc kỹ thuật khi kết nối với kho tri thức. Bạn thử lại sau nhé!";
    }
  }
}
