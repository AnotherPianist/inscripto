export default function LoadImage({ handleImgChange }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-80 bg-clip-padding px-24 py-10 ring-1 ring-gray-900/5 drop-shadow-2xl backdrop-blur-xl">
      <h1 className="my-6 text-6xl font-semibold text-violet-500">Inscripto</h1>
      <p className="my-4 text-2xl text-violet-400">
        Upload an image to get started
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImgChange}
        className="m-4 text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-100 file:py-2 file:px-4 file:font-semibold file:text-violet-600 file:duration-300 hover:file:bg-violet-200"
      />
    </div>
  );
}
