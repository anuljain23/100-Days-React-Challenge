import { QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';

const App = () => {

  const [textUrl, setTextUrl] = useState('https://github.com/anuljain23');
  const [useGradient, setUseGradient] = useState(true);
  const [colorA, setColorA] = useState("#1f2937");
  const [colorB, setColorB] = useState("#6366f1");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [preview, setPreview] = useState("");

  const downloadPreview = () => {
    if (!preview) {
      toast.error("Generate preview first");
      return;
    }
    setDownloading(true)
    const a = document.createElement("a");
    a.href = preview;
    a.download = "qr-custom.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success("QR-Code Downloaded!")
    setDownloading(false)
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }

  // Generate QR image from public API (PNG)
  const getQrApiUrl = (value, px = 400, transparentBg = false) => {
    const base = "https://api.qrserver.com/v1/create-qr-code/";
    let fg = fgColor.replace("#", "");
    let bg = transparentBg ? "ffffff" : bgColor.replace("#", "");
    return `${base}?size=${px}x${px}&data=${encodeURIComponent(value)}&color=${fg}&bgcolor=${bg}`;
  };

  const generatePreview = async () => {
    if (!textUrl) {
      toast.error("Please enter text or URL to generate QR code.");
      return;
    }
    setLoading(true);
    try {
      // Force background white when gradient is used
      const qrUrl = getQrApiUrl(textUrl, 400, useGradient);
      const qrImg = await loadImage(qrUrl);

      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = 400;
      finalCanvas.height = 400;
      const fctx = finalCanvas.getContext("2d");

      if (useGradient) {
        // Always white background when using gradient
        fctx.fillStyle = "#ffffff";
        fctx.fillRect(0, 0, 400, 400);

        // Draw QR as mask
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = 400;
        maskCanvas.height = 400;
        const maskCtx = maskCanvas.getContext("2d");
        maskCtx.drawImage(qrImg, 0, 0, 400, 400);

        const imgData = maskCtx.getImageData(0, 0, 400, 400);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) {
            d[i + 3] = 0;
          } else {
            d[i] = 0;
            d[i + 1] = 0;
            d[i + 2] = 0;
            d[i + 3] = 255;
          }
        }

        maskCtx.putImageData(imgData, 0, 0);

        // Gradient fill
        const grad = fctx.createLinearGradient(0, 0, 400, 400);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        fctx.fillStyle = grad;
        fctx.fillRect(0, 0, 400, 400);

        fctx.globalCompositeOperation = "destination-in";
        fctx.drawImage(maskCanvas, 0, 0);
        fctx.globalCompositeOperation = "source-over";
      } else {
        fctx.drawImage(qrImg, 0, 0, 400, 400);
      }

      const dataUrl = finalCanvas.toDataURL("image/png");
      setPreview(dataUrl);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate QR preview");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generatePreview()
  }, [])

  return (
    <div className='min-h-screen p-6 lg:px-40 lg:py-8 md:px-20 md:py-6 flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100'>
      <Toaster position="top-center" />

      {/* Header */}
      <header className='flex items-center w-full mb-8 justify-items-start'>
        <h1 className='flex text-xl md:text-2xl font-bold gap-2 items-center'>
          <QrCode className='text-gray-100 w-6 h-6 md:w-8 md:h-8' /> QR Code Generator
        </h1>
      </header>

      {/* Main Section */}
      <div className='flex flex-col backdrop-blur items-center rounded-2xl w-full shadow-xl bg-gray-800 p-6 lg:w-fit lg:m-auto gap-6 lg:flex-row'>

        {/* Left form div */}
        <div className='w-full'>
          <h2 className='text-lg font-semibold mb-3'>Customize Your QR</h2>

          <>
            <label className="block text-sm font-medium mb-2">Text or URL</label>
            <input
              type="text"
              value={textUrl}
              onChange={(e) => setTextUrl(e.target.value)}
              placeholder="Enter text or URL"
              className="w-full px-3 py-2 rounded-lg border-gray-100/50 border focus:outline-none focus:border-0 focus:ring-1 focus:ring-blue-200 mb-3"
            />
          </>

          <div className="flex items-center gap-3 mb-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useGradient}
                onChange={(e) => setUseGradient(e.target.checked)}
              />
              <span className=' font-medium'>Use gradient</span>
            </label>
          </div>

          {/* Gradient options */}
          <div className="flex gap-3 mb-3">

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Color A</label>
              <input
                type="color"
                value={colorA}
                disabled={!useGradient}
                onChange={(e) => setColorA(e.target.value)}
                className={`w-15 h-8 ${!useGradient ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Color B</label>
              <input
                type="color"
                value={colorB}
                disabled={!useGradient}
                onChange={(e) => setColorB(e.target.value)}
                className={`w-15 h-8 ${!useGradient ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
              />
            </div>

          </div>

          {/* default colour */}
          <div className="flex gap-3 mb-3">

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Foreground color</label>
              <input
                type="color"
                value={fgColor}
                disabled={useGradient}
                onChange={(e) => setFgColor(e.target.value)}
                className={`w-15 h-8 ${useGradient ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Background color</label>
              <input
                type="color"
                value={bgColor}
                disabled={useGradient}
                onChange={(e) => setBgColor(e.target.value)}
                className={`w-15 h-8 ${useGradient ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
              />
            </div>

          </div>

          {/* footer buttons */}
          <div className="flex gap-3 mt-4">

            <button
              onClick={generatePreview}
              disabled={loading}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium ${loading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "Generating..." : "Generate Preview"}
            </button>

            <button
              onClick={downloadPreview}
              disabled={downloading}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium ${downloading ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"}`}
            >
              {downloading ? "Downloading..." : "Download PNG"}
            </button>
          </div>

        </div>

        {/* Right QR Preview div */}
        <div className="w-80 flex flex-col justify-center items-center">
          <h3 className="text-sm font-medium mb-2">Preview</h3>
          <div className="bg-white p-3 rounded-lg shadow-md">
            {preview ? (
              <img src={preview} alt="QR preview" width="300" height="300" />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-gray-400">No preview yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
