import { useRef, useState } from "react";
import Canvas from "./Canvas";
import DataOptions from "./DataOptions";

export default function Editor({ img }) {
  const [canvas, setCanvas] = useState(null);
  const [textboxesData, setTextboxesData] = useState({});
  const textboxes = useRef({});

  const newTextbox = i => ({
    top: i * 20,
    fontFamily: "Arial",
    fontSize: 16,
    fill: "#000000"
  });

  function addText() {
    const _textboxesData = {};
    let options;
    let textbox;

    for (let i = 0; i < 3; i++) {
      options = newTextbox(i);
      textbox = new fabric.Textbox(`Text${i}`, options);
      _textboxesData[i] = options;
      textboxes.current[i] = textbox;
      canvas.add(textbox);
    }

    setTextboxesData(_textboxesData);
    canvas.renderAll();
  }

  function handleTextOptionsChange(e, label) {
    const { name, value } = e.target;
    setTextboxesData(prev => ({
      ...prev,
      [label]: { ...prev[label], [name]: value }
    }));
    textboxes.current[label].set(name, value);
    canvas.renderAll();
  }

  function handleDownload() {
    const a = document.createElement("a");
    a.href = canvas?.toDataURL({ format: "png" });
    a.download = "image.png";
    a.click();
  }

  return (
    <>
      <>
        <Canvas img={img} setCanvas={setCanvas} />
        <button onClick={addText}>Add text</button>
        <button onClick={handleDownload}>Download</button>
      </>
      <>
        <DataOptions
          textboxesData={textboxesData}
          onChange={handleTextOptionsChange}
        />
      </>
    </>
  );
}
