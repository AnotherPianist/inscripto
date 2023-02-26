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
      fabricCanvas.selection = false;
      fabricCanvas.on("object:moving", options => {
        if (options.target && options.target.type === "textbox") {
          const textbox = options.target;
          const canvasCenterX = fabricCanvas.width / 2;
          const textboxCenterX = textbox.left; // It's the center when originX attribute is set to "center"
          const distanceFromCenter = Math.abs(canvasCenterX - textboxCenterX);
          if (distanceFromCenter <= 5) textbox.set({ left: canvasCenterX });
        }
      });
    });

    setCanvas(fabricCanvas);

    return () => fabricCanvas?.dispose();
  }, []);

  return (
    <div className="h-fit w-fit bg-white shadow-2xl ring-1 ring-gray-900/5">
      <canvas ref={canvasRef} />
    </div>
  );
}
