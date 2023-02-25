import TextOptions from "./TextOptions";

export default function DataOptions({ textboxesData, onChange }) {
  return (
    <>
      {console.log(textboxesData)}
      {Object.entries(textboxesData).map(([label, textboxData]) => (
        <TextOptions
          key={label}
          label={label}
          textboxData={textboxData}
          onChange={e => onChange(e, label)}
        />
      ))}
    </>
  );
}
