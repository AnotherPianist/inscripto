import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function Canvas({ img, setCanvas }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);

    fabric.Image.fromURL(img, fabricImg => {
      fabricCanvas?.setHeight(fabricImg.height);
      fabricCanvas?.setWidth(fabricImg.width);
      fabricCanvas?.setBackgroundImage(fabricImg);
    });

    setCanvas(fabricCanvas);

    return () => fabricCanvas?.dispose();
  }, []);

  return <canvas ref={canvasRef} />;
}
