import React, { useState } from 'react'
import { ImageIcon, Trash2, Upload, X } from 'lucide-react'
import 'animate.css'
import { ToastContainer, toast } from 'react-toastify'
import { useImageStore } from './Store/useImageStore'
import { formatDate } from './utils'

const FIVE_MB = (5 * 1024 * 1024)

const App = () => {
  const { images, addImage, removeImage } = useImageStore()
  const [preview, setPreview] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        e.target.value = "";
        return toast.error("Invalid file type, please upload images only.")
      }
      if (file.size > FIVE_MB) {
        e.target.value = "";
        return toast.error("File too large, upload less than 5 MB file only.")
      }
      const reader = new FileReader(file)
      reader.onload = () => {
        const sizeKB = (file.size / 1024).toFixed(1);
        const sizeDisplay = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(2)} MB` : `${sizeKB} KB`;

        // Generate a unique name using timestamp to avoid blocking re-uploads
        const timestamp = Date.now();
        const uniqueName = `${file.name} (${timestamp})`;

        addImage({
          id: crypto.randomUUID(),
          src: reader.result,
          name: uniqueName,
          size: sizeDisplay,
          createdAt: new Date().toISOString(),
        });
        toast.success("Image uploaded successfully!");
        // Reset file input so user can re-upload same file immediately
        e.target.value = "";
      }
      reader.readAsDataURL(file);
    } else {
      e.target.value = "";
      return toast.error("Unable to read file, please try again!")
    }
  }

  return (
    <div className='min-h-screen text-gray-800 bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex flex-col items-center p-8'>

      {/* Header */}
      <h1 className='text-4xl font-extrabold tracking-wide mb-8 animate__animated animate__fadeIn drop-shadow-sm'>🖼️ ImageVault</h1>

      {/* Upload form */}
      <label className='flex items-center justify-center py-3 px-6 bg-green-500 rounded-2xl text-gray-100 animate__animated animate__fadeInUp hover:bg-green-600 transition shadow-md cursor-pointer mb-8'>
        <Upload className='w-6 h-6 mr-2' /> Upload Image
        <input type="file" accept='image/*' className='hidden' onChange={handleFileUpload} />
      </label>

      {/* Main content */}
      {images.length === 0 ? (
        // Default view
        <div className="text-gray-500 flex flex-col items-center mt-12 animate__animated animate__fadeIn">
          <ImageIcon className="w-12 h-12 mb-3 opacity-80" />
          <p className="text-lg font-medium">No images yet — upload some to start your collection!</p>
        </div>
      ) : (
        // Image gallary
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl animate__animated animate__fadeIn">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setPreview(img)}
            >
              <img src={img.src} alt={img.name} className="w-full h-56 object-cover" />
              <div className="p-3 text-center bg-gray-50 text-gray-700 text-sm font-medium">
                <p className="truncate">{img.name}</p>
                {img.size && <p className="text-xs text-gray-500">{img.size}</p>}
                {img.createdAt && <p className="text-xs text-gray-400">📅 {formatDate(img.createdAt)}</p>}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(img.id);
                  toast.info("Image removed");
                }}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image preview */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-80 flex items-center justify-center z-50 animate__animated animate__fadeIn">
          <div className="relative max-w-3xl max-h-[80vh] bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center">
            <button
              className="absolute top-3 cursor-pointer right-3 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={() => setPreview(null)}
            >
              <X size={20} />
            </button>
            <img src={preview.src} alt={preview.name} className="max-h-[70vh] object-contain rounded-lg" />
            <p className="mt-3 text-gray-700 font-medium">{preview.name}</p>
            {preview.size && <p className="text-gray-500 text-sm">{preview.size}</p>}
            {preview.createdAt && <p className="text-gray-400 text-xs">Uploaded: {formatDate(preview.createdAt)}</p>}
          </div>
        </div>
      )}

      {/* Alert container */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  )
}

export default App