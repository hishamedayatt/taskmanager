'use client'

export default function Header({ activeTab }) {
  return (
    <div className="flex justify-between items-center mb-6 text-black">
      <h2 className="text-xl font-semibold">{activeTab} Tasks</h2>
    </div>
  );
}
