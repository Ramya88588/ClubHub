import React, { useState } from "react";
import { X } from "lucide-react";

const RegisterModal = ({
  isOpen,
  onClose,
  student,
  event,
  onConfirm,
}) => {
  const [formCompleted, setFormCompleted] = useState(false);

  if (!isOpen) return null;

  const hasGoogleForm =
    event.gFormLink && event.gFormLink !== "#";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Event Registration
        </h2>

        {/* Student Info */}
        <div className="space-y-3 text-sm">
          <div>
            <label className="text-gray-500">Name</label>
            <input
              value={student.name}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-gray-500">Email</label>
            <input
              value={student.email}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Google Form */}
        {hasGoogleForm && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">
              This event requires filling a Google Form.
            </p>

            <a
              href={event.gFormLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-600 text-sm underline"
            >
              Open Google Form
            </a>

            <label className="flex items-center gap-2 mt-2 text-sm">
              <input
                type="checkbox"
                checked={formCompleted}
                onChange={(e) =>
                  setFormCompleted(e.target.checked)
                }
              />
              I have completed the Google Form
            </label>
          </div>
        )}

        {/* Actions */}
        <button
          disabled={hasGoogleForm && !formCompleted}
          onClick={onConfirm}
          className={`mt-6 w-full py-2 rounded-lg text-sm text-white ${
            hasGoogleForm && !formCompleted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          Confirm Registration
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
