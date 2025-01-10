const Dropdown = ({ options, onSelect, label }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="mb-2">{label}</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
