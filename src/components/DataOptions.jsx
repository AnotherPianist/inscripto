import { useState } from "react";
import LoadData from "./LoadData";
import TextOptions from "./TextOptions";

export default function DataOptions({ textboxesData, setData, onChange }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  function loadData(data) {
    setData(data);
    setDataLoaded(true);
  }

  return (
    <>
      {dataLoaded ? (
        Object.entries(textboxesData).map(([label, textboxData]) => (
          <TextOptions
            key={label}
            label={label}
            textboxData={textboxData}
            onChange={e => onChange(e, label)}
          />
        ))
      ) : (
        <LoadData loadData={loadData} />
      )}
    </>
  );
}
