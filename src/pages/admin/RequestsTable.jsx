const RequestsTable = ({ data = [], onApprove, onReject }) => {
  return (
    <div className="bg-white border rounded-lg mt-6">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr className="text-left text-gray-600">
            <th className="p-4">CLUB NAME</th>
            <th className="p-4">CLUBHEAD NAME</th>
            <th className="p-4">EMAIL</th>
            <th className="p-4 text-center">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-400">
                No pending requests
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="p-4">{item.clubName}</td>
                <td className="p-4">{item.clubHeadName}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => onApprove(item)}
                      className="text-green-600 font-bold"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => onReject(item.id)}
                      className="text-red-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination placeholder */}
      <div className="flex justify-center gap-4 py-4 text-gray-500 text-sm">
        <span>First</span>
        <span>Prev</span>
        <span className="font-semibold text-black">1</span>
        <span>2</span>
        <span>3</span>
        <span>Next</span>
        <span>Last</span>
      </div>
    </div>
  );
};

export default RequestsTable;
