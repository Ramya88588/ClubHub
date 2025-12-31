import { useState } from "react";
import ChatWindow from "./ChatWindow";
import chatbotIcon from "../../assets/Chatbot.png";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-{59px} h-{59px} rounded-[10px] text-white shadow-lg z-40 cursor-pointer"
        aria-label="Open chatbot"
      >
        <img src={chatbotIcon} alt="AI" className="w-{60px} h-{60px}" />
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
