export default function LoadImages({ label, setImages, dataLength }) {
  function loadImages(files) {
    const promises = [...files].map(
      file =>
        new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({ name: file.name, data: reader.result });
          reader.readAsDataURL(file);
        })
    );

    Promise.all(promises).then(fileObjects => {
      const images = {};
      fileObjects.forEach(file => (images[file.name] = file.data));
      setImages(images);
    });
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row items-baseline justify-between">
        <p className="ml-2 text-violet-500">{label}</p>
        <p className="text-sm text-violet-400">
          You need to load {dataLength} images
        </p>
      </div>
      <input
        key={label}
        type="file"
        accept="image/*"
        multiple
        onChange={e => loadImages(e.target.files)}
        className="text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-100 file:py-2 file:px-4 file:font-semibold file:text-violet-600 file:duration-300 hover:file:bg-violet-200"
      />
    </div>
  );
}
