import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData)

    try {
      const { data } = await axios.post("http://localhost:8080/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpload(data.imageUrl); // Send URL to parent component
      alert("Upload Successful!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} className="px-4 py-2 bg-blue-600 text-white">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadImage;
