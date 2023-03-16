import { useEffect, useState } from "react";
import LoadData from "./LoadData";
import TextOptions from "./TextOptions";
import fontFamilies from "../fontFamilies";
import LoadImages from "./LoadImages";

export default function DataOptions({
  textboxesData,
  setData,
  setImages,
  filenamesLabel,
  setFilenamesLabel,
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
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white py-10 px-6 shadow-2xl">
      {dataLoaded ? (
        <>
          <h4 className="text-2xl font-semibold text-violet-500">
            Text Options
          </h4>
          {Object.entries(textboxesData).map(([label, textboxData]) =>
            label === filenamesLabel ? (
              <LoadImages
                key={label}
                label={label}
                setImages={setImages}
                dataLength={Object.keys(textboxesData).length}
              />
            ) : (
              <TextOptions
                key={label}
                label={label}
                filenamesLabel={filenamesLabel}
                setFilenamesLabel={setFilenamesLabel}
                textboxData={textboxData}
                onChange={e => onChange(e, label)}
                fonts={fonts}
              />
            )
          )}
          <button
            onClick={handleDownload}
            className="mt-4 rounded-full border-0 bg-violet-100 py-2 px-4 font-semibold text-violet-600 duration-300 hover:bg-violet-200"
          >
            Download Images 🪄
          </button>
        </>
      ) : (
        <LoadData loadData={loadData} />
      )}
    </div>
  );
}
