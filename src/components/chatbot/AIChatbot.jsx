import { useState } from "react";
import ChatWindow from "./ChatWindow";
import chatbotIcon from "../../assets/Chatbot.png";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14.75 h-14.75 rounded-full text-white shadow-lg z-40 cursor-pointer border border-black"
        aria-label="Open chatbot"
      >
        <img
          src={chatbotIcon}
          alt="AI"
          className="w-[60px] h-[60px] rounded-full"
        />
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
