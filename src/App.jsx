import { useState } from "react";
import "./App.css";
import LoadImage from "./components/LoadImage";
import Editor from "./components/Editor";

function App() {
  const [img, setImg] = useState(null);

  function handleImgChange(e) {
    setImg(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <main>
      {img ? (
        <Editor img={img} />
      ) : (
        <LoadImage handleImgChange={handleImgChange} />
      )}
    </main>
  );
}

export default App;
