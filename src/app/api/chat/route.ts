import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { IChatHistoryList, IMessage } from "../../../interfaces/chat.interface";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const MAX_HISTORY_LENGTH = 10;

// In-memory chat history (should be replaced with a database)
const chatHistory: IChatHistoryList = {};

export async function POST(request: Request) {
  const body = await request.json();
  try {
    let { messages, chatId } = body;
    if (!chatId) {
      chatId = uuidv4();
    }
    const history = messages.slice(-MAX_HISTORY_LENGTH - 1, -1)
      .map((message: IMessage) => ({ role: message.role, parts: [ { text: message.content } ] }));
    const lastMessage = messages.at(-1);
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 256,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();
    chatHistory[chatId] = messages.concat({ role: "model", content: response });

    return NextResponse.json({ response, chatId });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to get response from AI" });
  }
};

export async function GET() {
  return NextResponse.json(chatHistory);
}
