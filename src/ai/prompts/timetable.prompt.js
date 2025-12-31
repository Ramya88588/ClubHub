export function timetablePrompt() {
  return `
You extract a student's weekly timetable from an uploaded image.

RULES:
- Output ONLY valid JSON
- No explanations, no markdown
- Use 24-hour HH:MM time
- If unsure, omit the class

FORMAT:
{
  "timetable": {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  }
}
`;
}
