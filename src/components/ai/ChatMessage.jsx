export default function ChatMessage({ text }) {
  return (
    <div className="flex justify-end">
      <div className="bg-blue-600 text-white px-3 py-2 rounded-xl text-sm max-w-[80%]">
        {text}
      </div>
    </div>
  );
}
