import { useState } from "react";
import LoadImage from "./components/LoadImage";
import Editor from "./components/Editor";

function App() {
  const [img, setImg] = useState(null);

  function handleImgChange(e) {
    setImg(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 -z-20 bg-[url(/src/assets/beams.jpg)] bg-center" />
      <div className="absolute inset-0 -z-10 bg-[url(/src/assets/grid.svg)] bg-center" />
      {img ? (
        <Editor img={img} />
      ) : (
        <LoadImage handleImgChange={handleImgChange} />
      )}
    </div>
  );
}

export default App;
