export default function LoadImage({ handleImgChange }) {
  return (
    <>
      <h4>Select an image</h4>
      <input type="file" accept="image/*" onChange={handleImgChange} />
    </>
  );
}
