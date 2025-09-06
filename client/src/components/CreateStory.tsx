import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const CreateStory = () => {
  const backgroundColors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];

  const [mode, setMode] = useState("text"); // Used to set media type
  const [background, setBackground] = useState(backgroundColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleCreateStory = () => {};

  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
          <button className="text-white p-2 cursor-pointer">
            <ArrowLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
