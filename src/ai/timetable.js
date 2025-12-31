import { timetablePrompt } from "./prompts/timetable.prompt";

export async function getTimetableFromUpload(imageUrl) {
  if (!window.puter?.ai) {
    throw new Error("Puter AI not ready");
  }

  const res = await window.puter.ai.chat(timetablePrompt(), imageUrl, {
    model: "gemini-3-flash-preview",
  });

  const content = res?.message?.content || res?.toString?.() || "";

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in AI response");
  }

  return JSON.parse(jsonMatch[0]);
}
