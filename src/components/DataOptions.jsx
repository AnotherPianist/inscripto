import { useEffect, useState } from "react";
import LoadData from "./LoadData";
import TextOptions from "./TextOptions";
import fontFamilies from "../fontFamilies";

export default function DataOptions({
  textboxesData,
  setData,
  onChange,
  handleDownload
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    setFonts(fontFamilies);
  }, []);

  function loadData(data) {
    setData(data);
    setDataLoaded(true);
  }

  return (
    <div className="flex max-w-[30%] flex-col items-center gap-4 rounded-lg bg-white py-10 px-6 shadow-2xl">
      {dataLoaded ? (
        <>
          <h4 className="text-2xl font-semibold text-violet-500">
            Text Options
          </h4>
          {Object.entries(textboxesData).map(([label, textboxData]) => (
            <TextOptions
              key={label}
              label={label}
              textboxData={textboxData}
              onChange={e => onChange(e, label)}
              fonts={fonts}
            />
          ))}
          <button
            onClick={handleDownload}
            className="mt-4 rounded-full border-0 bg-violet-100 py-2 px-4 font-semibold text-violet-600 duration-300 hover:bg-violet-200"
          >
            Download Images
          </button>
        </>
      ) : (
        <LoadData loadData={loadData} />
      )}
    </div>
  );
}
