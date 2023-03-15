import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  Bars3BottomRightIcon
} from "@heroicons/react/20/solid";

export default function TextOptions({ label, textboxData, onChange, fonts }) {
  function handleTextAlignChange(value) {
    onChange({ target: { name: "textAlign", value: value } });
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between">
        <p className="ml-2 text-violet-500">{label}</p>
        <div className="flex flex-row">
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-sm ${
              textboxData.textAlign === "left"
                ? "bg-violet-200"
                : "bg-violet-100"
            }`}
            onClick={() => handleTextAlignChange("left")}
          >
            <Bars3BottomLeftIcon className="h-6 w-6 text-violet-500" />
          </button>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-sm ${
              textboxData.textAlign === "center"
                ? "bg-violet-200"
                : "bg-violet-100"
            }`}
            onClick={() => handleTextAlignChange("center")}
          >
            <Bars3Icon className="h-6 w-6 text-violet-500" />
          </button>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-sm ${
              textboxData.textAlign === "right"
                ? "bg-violet-200"
                : "bg-violet-100"
            }`}
            onClick={() => handleTextAlignChange("right")}
          >
            <Bars3BottomRightIcon className="h-6 w-6 text-violet-500" />
          </button>
        </div>
      </div>
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
