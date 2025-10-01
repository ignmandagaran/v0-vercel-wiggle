"use client"

import { useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"

export default function Loader() {
  const { active, progress } = useProgress()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [active, progress])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500"
      style={{ opacity: active ? 1 : 0 }}
    >
      <div className="text-center">
        <div className="text-white text-lg font-mono">Loading {progress.toFixed(0)}%</div>
        <div className="w-48 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
