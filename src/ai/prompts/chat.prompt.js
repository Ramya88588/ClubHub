export function buildChatPrompt({ message, user, student, events }) {
  return `
You are ClubHub AI, an assistant inside a college club management app.

RULES:
- Respond ONLY in valid JSON
- No markdown
- No explanations outside JSON
- All fields must exist

User role:
${user?.role ?? "student"}

User message:
"${message}"

Events:
${JSON.stringify(events, null, 2)}

RESPONSE FORMAT:
{
  "text": "reply",
  "events": [],
  "notes": [],
  "followUps": []
}
`;
}
