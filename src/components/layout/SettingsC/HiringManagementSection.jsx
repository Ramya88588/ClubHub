import { useState } from "react";
import { clubs } from "./ProfileInfo";
import { set } from "react-hook-form";

const HiringManagementSection = () => {
  const [hiringOpen, setHiringOpen] = useState(clubs[0].hiringOpen);
  const [gForm, setgFormLink] = useState(clubs[0].gFormLink || "");
  const handleGform = (e) => {
    setgFormLink(e.target.value);
    clubs[0] = {
      ...clubs[0],
      gFormLink: gForm,
    };
    console.log("Backend updated:", clubs);
  };
  const toggleHiring = () => {
    const updated = !hiringOpen;
    setHiringOpen(updated);

    clubs[0] = {
      ...clubs[0],
      hiringOpen: updated,
    };

    console.log("Hiring updated:", clubs);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-2">
        <span
          class="material-symbols-outlined text-green-500"
          style={{ fontSize: "34px" }}
        >
          person_add
        </span>
        <h2 className="text-[24px]">Hiring Management</h2>
      </div>

      <div className=" bg-white p-10 rounded-md border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Hiring Status</p>
            <p className="text-sm text-gray-500 mt-2">
              Add your respondent's link of the hiring google form here
            </p>{" "}
          </div>
          <button
            onClick={toggleHiring}
            className={`w-12 h-6 rounded-full flex items-center px-1
            ${hiringOpen ? "bg-green-500" : "bg-gray-300"}
          `}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform
              ${hiringOpen ? "translate-x-6" : "translate-x-0"}
            `}
            />
          </button>
        </div>
        <input
          type="text"
          className={`w-full border rounded-sm mt-2 p-2 outline-none placeholder:font-light ${
            clubs[0].hiringOpen ? "" : "cursor-not-allowed"
          }`}
          placeholder="Eg. https://docs.google.com/forms/d/e/1FAIpQLSeHlf5KU6LjV7_slPfUlz_8951ott_XIYX82CJuj-6b3npq0w/viewform?usp=header"
          onChange={handleGform}
          value={gForm}
          disabled={!clubs[0].hiringOpen}
        />
      </div>
    </div>
  );
};

export default HiringManagementSection;
