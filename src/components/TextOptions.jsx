export default function TextOptions({ label, textboxData, onChange }) {
  return (
    <>
      <p>{label}</p>
      <select
        name="fontFamily"
        value={textboxData.fontFamily}
        onChange={onChange}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      <input
        type="number"
        name="fontSize"
        value={textboxData.fontSize}
        onChange={onChange}
      />
      <input
        type="color"
        name="fill"
        value={textboxData.fill}
        onChange={onChange}
      />
    </>
  );
}
