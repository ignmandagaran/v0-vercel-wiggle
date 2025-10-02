"use client"

import { useMemo } from "react"
import { useGraph, useFrame } from "@react-three/fiber"
import { useGLTF, PresentationControls, Float } from "@react-three/drei"
import type { Group } from "three"
import { useWiggle } from "@/hooks/use-wiggle"
import { SkeletonUtils } from "three-stdlib";

export default function Scene() {
  const { scene } = useGLTF("/models/vercel.glb")
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone)

  const wiggleRef = useWiggle({ stiffness: 360, damping: 10 })

  useFrame(() => {
    if (!wiggleRef.current) return;
    wiggleRef.current.rotation.y += 0.0015;
  });

  return (
    <Float
      speed={3} 
      rotationIntensity={0} 
      floatIntensity={1} 
      floatingRange={[1, 1.2]} 
      position={[0, -1, 0]}
    >
      <PresentationControls
          global
          zoom={0.8}
        >
          <group ref={wiggleRef} dispose={null} scale={2}>
              <primitive object={nodes.Root} position={[0, -0.48, 0]}>
                <primitive object={nodes["001"]} position={[0, 0.6, 0]} />
                <primitive
                  object={nodes["002"]}
                  position={[0, 0.6, 0]}
                  rotation={[0, 0, 2.214]}
                />
                <primitive
                  object={nodes["003"]}
                  position={[0, 0.6, 0]}
                  rotation={[0, 0, -2.214]}
                />
              </primitive>
              <skinnedMesh
                geometry={nodes.Triangle.geometry}
                skeleton={nodes.Triangle.skeleton}
              >
                <meshStandardMaterial color="#fff" roughness={1} metalness={0.1} />
              </skinnedMesh>
            </group>
        </PresentationControls>
    </Float>
  )
}

useGLTF.preload("/models/vercel.glb")
