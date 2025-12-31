const OPENROUTER_API_KEY =
  "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";

export async function callOpenRouter(prompt) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "ClubHub AI",
    },
    body: JSON.stringify({
      model: "google/gemma-3n-e2b-it:free",
      messages: [
        {
          role: "user",
          content: String(prompt),
        },
      ],
      temperature: 0.4,
      max_tokens: 800,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenRouter error:", err);
    throw new Error("OpenRouter request failed");
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
