export default function EducationFilter({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Education</label>
      <select
        className="w-full border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="BSc Nursing">BSc Nursing</option>
        <option value="GNM">GNM</option>
        <option value="MBBS">MBBS</option>
        {/* Add more dynamically if needed */}
      </select>
    </div>
  );
}
