import { callPuterGemini } from "./puterClient";
import { buildChatPrompt } from "./prompts/chat.prompt";

export async function runAIBrain(context) {
  const prompt = buildChatPrompt(context);
  const raw = await callPuterGemini(prompt);

  if (typeof raw !== "string" || !raw.trim().startsWith("{")) {
    throw new Error("Invalid JSON from AI");
  }

  return JSON.parse(raw);
}
