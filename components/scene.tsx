"use client"

import { useMemo } from "react"
import { useGraph } from "@react-three/fiber"
import { useGLTF, PresentationControls } from "@react-three/drei"
import type { Group } from "three"
import { useWiggle } from "@/hooks/use-wiggle"
import { SkeletonUtils } from "three-stdlib";

export default function Scene() {
  const { scene } = useGLTF("/models/vercel.glb")
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone)

  const wiggleRef = useWiggle({ stiffness: 180, damping: 10 })

  return (
    <PresentationControls
        global
        snap
        rotation={[0, Math.PI / 4, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
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
  )
}

useGLTF.preload("/models/vercel.glb")
