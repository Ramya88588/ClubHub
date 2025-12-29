export default function FollowUpButtons({ items, onClick }) {
  return (
    <div className="flex flex-wrap gap-2 max-w-[80%]">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onClick(item)}
          className="px-3 py-1.5 text-xs border rounded-full text-blue-600 hover:bg-blue-50 transition"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
