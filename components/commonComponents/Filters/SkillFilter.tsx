export default function SkillFilter({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Skills</label>
      <input
        className="w-full border rounded p-2"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., ICU, Cardiology"
      />
    </div>
  );
}
