'use client'
import { useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import app from "@/shared/Firebase"

export default function DownloadWallpapers() {
  const [wallpapers, setWallpapers] = useState([])
  const db = getFirestore(app)

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wallpapers"))
        const wallpapersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setWallpapers(wallpapersData)
      } catch (error) {
        console.error("Error fetching wallpapers: ", error)
      }
    }

    fetchWallpapers()
  }, [])

  const handleDownload = (url, name) => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a')
    link.href = url
    link.download = name
    link.click()
  }

  return (
    <div className="max-w-full h-full">
      {wallpapers.length > 0 ? (
        <div className="columns-[300px] m-6">
          {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="mb-4">
              <a href={wallpaper.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={wallpaper.url}
                  alt={wallpaper.name}
                  className="mb-4 hover:scale-105 hover:transition-transform transition rounded-xl"
                />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-900 dark:text-white">No wallpapers uploaded yet.</p>
      )}
    </div>
  )
}
