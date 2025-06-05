import { useState, useEffect } from "react";

function PhotoUploader({ onFileChange, initialPhotoURL }) {
  const defaultImage =
    "/images/stuphoto.png";

  const [photoURL, setPhotoURL] = useState(initialPhotoURL || "");
  const [loading, setLoading] = useState(false);

  const cloudName = "doehvgxw9";
  const uploadPreset = "student_photos";

  useEffect(() => {
    setPhotoURL(initialPhotoURL || "");
  }, [initialPhotoURL]);

  const handleClick = () => {
    document.getElementById("photoInput").click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setPhotoURL(data.secure_url);
      onFileChange(data.secure_url); 
    } catch (error) {
      console.error("上傳失敗：", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block mb-1">學生照片：</label>
      <div
        onClick={handleClick}
        className="w-32 h-32 rounded-full overflow-hidden border-2  border-gray-400 cursor-pointer flex items-center justify-center relative group"
      >
        <img
          src={photoURL || defaultImage}
          alt="student"
          className="w-full h-full object-cover"
        />

        <input
          id="photoInput"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm">
            上傳中...
          </div>
        )}

        {!loading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
            更換照片
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoUploader;



