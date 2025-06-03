'use client'

const tabNames = ["All", "Pending", "In Progress", "Completed"];

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-300 mb-4">

      {tabNames.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-2 text-lg ${
            activeTab === tab
              ? "text-black border-b-4 border-green-300 font-semibold"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
