import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="px-4 py-3 border-t flex items-center gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask something…"
        disabled={disabled}
        className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSend}
        disabled={disabled}
        className="w-10 h-10 border rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#4285F4"
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
      </button>
    </div>
  );
}
