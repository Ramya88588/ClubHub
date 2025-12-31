const StatsCard = ({ title, value }) => {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center justify-center w-full bg-white">
      <p className="text-sm text-gray-500 uppercase tracking-wide">
        {title}
      </p>
      <p className="text-2xl font-semibold mt-2 text-gray-400">
        {value ?? "---"}
      </p>
    </div>
  );
};

export default StatsCard;
