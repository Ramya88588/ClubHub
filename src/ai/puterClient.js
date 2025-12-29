export async function callPuterGemini(prompt) {
  if (!window.puter || !window.puter.ai) {
    throw new Error("Puter AI not loaded");
  }

  const response = await window.puter.ai.chat(prompt, {
    model: "gemini-3-flash-preview",
  });

  if (response?.message?.content) {
    return response.message.content;
  }

  throw new Error("Unexpected Puter AI response");
}
