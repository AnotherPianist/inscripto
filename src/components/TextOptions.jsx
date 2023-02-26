export default function TextOptions({ label, textboxData, onChange, fonts }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="ml-2 text-violet-500">{label}</p>
      <div className="flex gap-6">
        <select
          name="fontFamily"
          value={textboxData.fontFamily}
          onChange={onChange}
          className="h-10 rounded-md bg-violet-100 p-2 text-violet-600 duration-300 hover:bg-violet-200"
        >
          {fonts.map(font => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="fontSize"
          min={7}
          value={textboxData.fontSize}
          onChange={onChange}
          className="h-10 w-20 rounded-md bg-violet-100 p-2 text-violet-600 duration-300 hover:bg-violet-200"
        />
        <input
          type="color"
          name="fill"
          value={textboxData.fill}
          onChange={onChange}
          className="h-10 w-10 appearance-none rounded-full"
        />
      </div>
    </div>
  );
}
