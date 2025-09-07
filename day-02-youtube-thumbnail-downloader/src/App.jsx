import { useState } from 'react'
import { LuYoutube } from "react-icons/lu";
import getYouTubeID from 'get-youtube-id';
import { Toaster, toast } from "react-hot-toast";
import InputForm from '../components/InputForm';
import ThumbnailGrid from '../components/ThumbnailGrid';

const thumbnailModels = [
  { label: "Max Resolution", url: `https://img.youtube.com/vi`, imageName: 'maxresdefault.jpg' },
  { label: "Standard (1280x720)", url: `https://img.youtube.com/vi`, imageName: 'hq720.jpg' },
  { label: "SD (640x480)", url: `https://img.youtube.com/vi`, imageName: 'sddefault.jpg' },
  { label: "High (480x360)", url: `https://img.youtube.com/vi`, imageName: 'hqdefault.jpg' },
  { label: "Medium (320x180)", url: `https://img.youtube.com/vi`, imageName: 'mqdefault.jpg' },
  { label: "Default (120x90)", url: `https://img.youtube.com/vi`, imageName: 'default.jpg' },
]

const App = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [url, setUrl] = useState('')

  const getThumbnails = () => {
    const videoId = getYouTubeID(url)
    if (!videoId) {
      setThumbnails([]);
      toast.error("Please enter a valid YouTube video URL.");
      return;
    }
    const model = thumbnailModels.map((item) => {
      return {
        ...item,
        url: `${item.url}/${videoId}/${item.imageName}`
      }
    })
    setThumbnails(model)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-start p-4 sm:p-6 text-gray-100'>
      <Toaster position="top-center" />

      {/* Heading */}
      <div className="w-full max-w-5xl mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3 mb-4">
          <LuYoutube className="text-red-500 flex-shrink-0" />
          YouTube Thumbnail Downloader
        </h1>

        {/* Input Form */}
        <InputForm
          url={url}
          setUrl={setUrl}
          onGenerate={getThumbnails}
        />
      </div>

      {/* Thumbnails Section (only show if available) */}
      {thumbnails.length > 0 && <ThumbnailGrid thumbnails={thumbnails} />}
    </div>
  )
}

export default App