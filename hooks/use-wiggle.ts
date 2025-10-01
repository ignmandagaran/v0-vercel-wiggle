"use client"

import { useEffect, useMemo, useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { WiggleBone } from "wiggle"
import "three-stdlib"

function useWiggle(config: { stiffness: number; damping: number }) {
  const ref = useRef<RefObject<THREE.Group>>()
  const wiggleBones = useMemo(() => {
    const bones: WiggleBone[] = []
    return bones
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const skinnedMesh = ref.current.children.find(
      (child) => child.type === 'SkinnedMesh'
    ) as THREE.SkinnedMesh;

    ref.current.children.find(
      (child) => console.log(child.type)
    ) as THREE.SkinnedMesh;

    if (!skinnedMesh) {
      console.log("[v0] No skinned mesh found in model - wiggle disabled")
      return
    }

    skinnedMesh.skeleton.bones.forEach((obj) => {
      if (obj.type === 'Bone' && obj.name !== "Root") {
        wiggleBones.push(new WiggleBone(obj, config));
      }
    });

    console.log(`[v0] Initialized ${wiggleBones.length} wiggle bones`)

    return () => {
      wiggleBones.forEach((wb) => {
        wb.dispose()
      })
    }
  }, [ref, config, wiggleBones])

  useFrame(() => {
    wiggleBones.forEach((wb) => wb.update())
  })

  return ref
}

export { useWiggle }
