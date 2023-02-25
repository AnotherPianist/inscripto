import { useRef, useState } from "react";
import Canvas from "./Canvas";

export default function Editor({ img }) {
  const [canvas, setCanvas] = useState(null);
  const texts = useRef({
    0: { text: "Hello,", top: 10 },
    1: { text: "World!", top: 50 }
  });

  function addText() {
    Object.values(texts.current).forEach(entry => {
      canvas.add(new fabric.Textbox(entry.text, { top: entry.top }));
    });
    canvas.renderAll();
  }

  function handleDownload(params) {
    const a = document.createElement("a");
    a.href = canvas?.toDataURL({ format: "png" });
    a.download = "image.png";
    a.click();
  }

  return (
    <>
      <Canvas img={img} setCanvas={setCanvas} />
      <button onClick={addText}>Add text</button>
      <button onClick={handleDownload}>Download</button>
    </>
  );
}
