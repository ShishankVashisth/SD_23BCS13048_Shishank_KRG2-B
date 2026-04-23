function FileCard({ file, onDelete }) {

  const handleDownload = () => {
    window.open(`http://localhost:8080/download/${file}`);
  };

  const getIcon = (file) => {
    if (file.endsWith(".pdf")) return "📕";
    if (file.endsWith(".png") || file.endsWith(".jpg")) return "🖼️";
    if (file.endsWith(".mp4")) return "🎥";
    return "📄";
  };

  return (
    <div className="neon-card gradient-card p-5 rounded-2xl hover:scale-105 transition-all duration-300">

      <div className="text-3xl mb-2">{getIcon(file)}</div>

      <p className="text-white text-sm truncate mb-4">{file}</p>

      <div className="flex justify-between gap-2">

        <button
          onClick={handleDownload}
          className="flex-1 bg-black/30 hover:bg-black/50 px-2 py-1 rounded text-xs text-white"
        >
          ⬇ Download
        </button>

        <button
          onClick={() => onDelete(file)}
          className="flex-1 bg-black/30 hover:bg-red-600 px-2 py-1 rounded text-xs text-white"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default FileCard;