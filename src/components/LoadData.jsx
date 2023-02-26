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
      <h4>Load CSV data file</h4>
      <input type="file" accept=".csv" onChange={readCSV} />
    </>
  );
}
