import { useEffect, useState } from "react";
import FileCard from "./components/FileCard";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await fetch("http://localhost:8080/files");
    const data = await res.json();
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });

    fetchFiles();
  };

  const handleDelete = async (file) => {
    await fetch(`http://localhost:8080/delete/${file}`, {
      method: "DELETE",
    });

    fetchFiles();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* 🎥 Background */}
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/00"></div>

      {/* UI */}
      <div className="relative z-10 p-6 text-white max-w-5xl mx-auto">

        {/* 🔝 HEADER */}
        <div className="neon-card gradient-card flex justify-between items-center p-4 rounded-xl">
          <h1 className="text-3xl font-bold">File Storage System (DriveMini)</h1>

          <label className="bg-black/30 px-4 py-2 rounded-lg cursor-pointer hover:bg-black/50 transition">
            Upload
            <input type="file" onChange={handleUpload} hidden />
          </label>
        </div>

        {/* 📊 STORAGE */}
        <div className="neon-card gradient-card mt-4 p-3 rounded-xl">
          <p className="text-sm">Storage Used: {files.length} files</p>
        </div>

        {/* 📂 FILE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {files.map((file, i) => (
            <FileCard key={i} file={file} onDelete={handleDelete} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;