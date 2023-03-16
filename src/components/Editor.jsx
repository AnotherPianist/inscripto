import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import DataOptions from "./DataOptions";

export default function Editor({ img }) {
  const [canvas, setCanvas] = useState(null);
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const [filenamesLabel, setFilenamesLabel] = useState("");
  const [textboxesData, setTextboxesData] = useState({});
  const textboxes = useRef({});
  const fabricImage = useRef(null);

  const newTextboxOptions = i => ({
    top: i * 20 + 20,
    fontFamily: "Arial",
    fontSize: 16,
    fill: "#000000",
    lockScalingY: true,
    textAlign: "center",
    textTruncate: true,
    editable: false,
    originX: "center",
    originY: "center",
    width: canvas.width * 0.8,
    visible: true
  });

  const newImageOptions = {
    lockScalingFlip: true,
    originX: "center",
    originY: "center"
  };

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
        canvas.viewportCenterObjectH(newTextbox);
      });

      setTextboxesData(_textboxesData);
      canvas.renderAll();
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(images).length !== 0) {
      new fabric.Image.fromURL(
        images[data[0][filenamesLabel]],
        img => {
          img.setControlsVisibility({
            mt: false,
            mr: false,
            mb: false,
            ml: false
          });
          fabricImage.current = img;
          canvas.add(img);
          canvas.renderAll();
        },
        newImageOptions
      );
    }
  }, [images]);

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

  function changeImage(entry) {
    const imageSrc = images[entry[filenamesLabel]];

    return new Promise(resolve => {
      fabricImage.current.setSrc(imageSrc, () => {
        canvas.renderAll();
        resolve();
      });
    });
  }

  async function handleDownload() {
    var zip = new JSZip();
    const sep = "base64,";
    let dataURL;

    for (let i = 0; i < data.length; i++) {
      changeTexts(data[i]);
      if (Object.keys(images).length !== 0) await changeImage(data[i]);

      dataURL = canvas.toDataURL({ format: "png" });
      dataURL = dataURL.substring(dataURL.indexOf(sep) + sep.length);
      zip.file(`image${i}.png`, dataURL, { base64: true });
    }

    zip
      .generateAsync({ type: "blob" })
      .then(content => saveAs(content, "images.zip"));
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center">
      <header className="my-4">
        <h1 className="text-4xl font-semibold text-violet-500">
          ✏️ Inscripto 🖼️
        </h1>
      </header>
      <main className="flex w-full flex-1 flex-row items-center justify-evenly">
        <Canvas img={img} setCanvas={setCanvas} />
        <DataOptions
          setData={setData}
          setImages={setImages}
          filenamesLabel={filenamesLabel}
          setFilenamesLabel={setFilenamesLabel}
          textboxesData={textboxesData}
          onChange={handleTextOptionsChange}
          handleDownload={handleDownload}
        />
      </main>
    </div>
  );
}
