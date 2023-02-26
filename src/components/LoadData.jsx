import Papa from "papaparse";

export default function LoadData({ loadData }) {
  function readCSV(e) {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: res => loadData(res.data)
    });
  }

  return (
    <>
      <h4 className="text-2xl font-semibold text-violet-500">
        Load CSV data file
      </h4>
      <input
        type="file"
        accept=".csv"
        onChange={readCSV}
        className="m-4 text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-100 file:py-2 file:px-4 file:font-semibold file:text-violet-600 file:duration-300 hover:file:bg-violet-200"
      />
    </>
  );
}
