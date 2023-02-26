import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import DataOptions from "./DataOptions";

export default function Editor({ img }) {
  const [canvas, setCanvas] = useState(null);
  const [data, setData] = useState([]);
  const [textboxesData, setTextboxesData] = useState({});
  const textboxes = useRef({});

  const newTextboxOptions = i => ({
    top: i * 20,
    fontFamily: "Arial",
    fontSize: 16,
    fill: "#000000"
  });

  useEffect(() => {
    if (data.length !== 0) {
      const _textboxesData = {};
      let options;
      let newTextbox;

      Object.entries(data[0]).forEach(([label, val], i) => {
        options = newTextboxOptions(i);
        newTextbox = new fabric.Textbox(val, options);
        _textboxesData[label] = options;
        textboxes.current[label] = newTextbox;
        canvas?.add(newTextbox);
      });

      setTextboxesData(_textboxesData);
      canvas.renderAll();
    }
  }, [data]);

  function handleTextOptionsChange(e, label) {
    const { name, value } = e.target;
    setTextboxesData(prev => ({
      ...prev,
      [label]: { ...prev[label], [name]: value }
    }));
    textboxes.current[label].set(name, value);
    canvas.renderAll();
  }

  function changeTexts(entry) {
    Object.entries(entry).forEach(([label, text]) =>
      textboxes.current[label].set("text", text)
    );
    canvas.renderAll();
  }

  function handleDownload() {
    var zip = new JSZip();
    const sep = "base64,";
    let dataURL;
    data.forEach((entry, i) => {
      changeTexts(entry);
      dataURL = canvas.toDataURL({ format: "png" });
      dataURL = dataURL.substring(dataURL.indexOf(sep) + sep.length);
      zip.file(`${i}.png`, dataURL, { base64: true });
    });
    zip
      .generateAsync({ type: "blob" })
      .then(content => saveAs(content, "images.zip"));
  }

  return (
    <>
      <>
        <Canvas img={img} setCanvas={setCanvas} />
        <button onClick={handleDownload}>Download</button>
      </>
      <>
        <DataOptions
          setData={setData}
          textboxesData={textboxesData}
          onChange={handleTextOptionsChange}
        />
      </>
    </>
  );
}
