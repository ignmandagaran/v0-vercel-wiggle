"use client"

import { Suspense } from "react"
import { Canvas as R3FCanvas } from "@react-three/fiber"
import { OrbitControls, Grid, Environment } from "@react-three/drei"
import Scene from "@/components/scene"
import Loader from "@/components/loader"

export default function Canvas() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Suspense>
        <R3FCanvas camera={{ position: [5, 3, 5], fov: 50 }} shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Scene />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <spotLight position={[-10, 10, -5]} angle={0.3} penumbra={1} intensity={0.5} castShadow />

            {/* Grid Floor */}
            <Grid
              args={[20, 20]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#444444"
              sectionSize={2}
              sectionThickness={1}
              sectionColor="#666666"
              fadeDistance={30}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={false}
              position={[0, -2, 0]}
            />

            {/* Environment for subtle reflections */}
            <Environment preset="studio" />

            {/* Camera Controls */}
            {/*<OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={12}
              maxPolarAngle={Math.PI / 2}
              target={[0, 0, 0]}
            />*/}

            {/* Radial Gradient Background */}
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#1a1a1a", 10, 30]} />
          </Suspense>
        </R3FCanvas>

        <Loader />
      </Suspense>
    </div>
  )
}
