import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [hasMore, setHasMore] = useState(true); // ✅ Track if more data is available

  const isInitialRender = useRef(true);
  const isFetching = useRef(false);

  const fetchImages = useCallback(
    async (reset = false, pageOverride = null, customQuery = null) => {
      try {
        if (!hasMore && !reset) return; // ✅ Stop fetching if no more data
        isFetching.current = true;
        setLoading(true);
        if (reset) setIsSearchLoading(true);
        setError(null);
        setNoResults(false);

        const currentPage = pageOverride ?? page;
        const currentQuery = customQuery ?? searchQuery;

        const endpoint = currentQuery
          ? `https://api.pexels.com/v1/search?page=${reset ? 1 : currentPage}&per_page=12&query=${currentQuery}`
          : `https://api.pexels.com/v1/curated?page=${reset ? 1 : currentPage}&per_page=12`;

        const res = await fetch(endpoint, {
          headers: { Authorization: PEXELS_API_KEY },
        });

        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        const results = Array.isArray(data.photos) ? data.photos : [];

        // ✅ Update "hasMore" when fewer results are returned
        if (results.length === 0) {
          if (reset) setNoResults(true);
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setImages((prev) => {
          if (reset) return results;
          const existingIds = new Set(prev.map((img) => img.id));
          const newUnique = results.filter((img) => !existingIds.has(img.id));
          return [...prev, ...newUnique];
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setIsSearchLoading(false);
        isFetching.current = false;
      }
    },
    [page, searchQuery, hasMore]
  );

  useEffect(() => {
    if (isInitialRender.current) {
      fetchImages(true, 1);
      isInitialRender.current = false;
    } else {
      fetchImages(false, page);
    }
  }, [page, fetchImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !isFetching.current &&
        hasMore // ✅ Only fetch if more images are available
      ) {
        isFetching.current = true;
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleSearch = () => {
    if (query.trim() === lastQuery.trim()) return;
    setLastQuery(query.trim());
    setSearchQuery(query.trim());
    setPage(1);
    setHasMore(true); // ✅ Reset hasMore for a new search
    fetchImages(true, 1, query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Image Gallery</h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-r-0 p-3 w-1/2 focus:outline-0"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {noResults && <p className="text-center text-gray-500 mb-4">No results found</p>}

      {/* Center Loader during search */}
      {isSearchLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Image grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img) => (
          <motion.div
            key={img.id}
            layout="position"
            className="break-inside-avoid overflow-hidden shadow-md hover:shadow-lg group relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img
                src={img.src?.medium}
                alt={img.alt || "Pexels image"}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{img.photographer || "Unknown"}</p>
              </div>
              <a
                href={img.src?.original}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2 bottom-2 px-2 py-1 text-xs bg-white opacity-50 hover:opacity-80"
              >
                <Download size={10} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Loader / No More Data */}
      <div className="flex justify-center mt-6">
        {loading && !isSearchLoading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        )}
        {!noResults && !hasMore && !loading && (
          <p className="text-gray-500 text-sm mt-4">No more images to show</p>
        )}
      </div>
    </div>
  );
}
