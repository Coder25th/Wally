'use client'
import { useState } from "react"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import app from "@/shared/Firebase"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export default function WallpaperUpload() {
  const [files, setFiles] = useState([])
  const [success, setSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const storage = getStorage(app)
  const db = getFirestore(app)

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length > 0) {
      setUploading(true)
      try {
        for (const file of files) {
          const storageRef = ref(storage, "wallpapers/" + file.name)
          await uploadBytes(storageRef, file)
          const url = await getDownloadURL(storageRef)

          await addDoc(collection(db, "wallpapers"), {
            name: file.name,
            url: url,
            timestamp: new Date()
          })

          console.log("Uploaded wallpaper! URL:", url)
        }

        setSuccess(true)
        setFiles([])
      } catch (error) {
        console.error("Error uploading files and saving to Firestore: ", error)
      } finally {
        setUploading(false)
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload Wallpapers</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="wallpaper" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Choose wallpaper images
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="wallpaper"
            name="wallpaper"
            required
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            multiple
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {uploading ? "Uploading..." : "Upload Wallpapers"}
        </button>
      </form>
      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 text-green-800 bg-green-100 rounded-lg">
          Wallpapers uploaded successfully!
        </div>
      )}
    </div>
  )
}
