import React, { useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Mesh } from "three"

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
const Car = () => {
  const gltf = useLoader(GLTFLoader, "models/car/scene.gltf")

  useEffect(() => {
    console.log("gltf", gltf)
    gltf.scene.scale.set(0.005, 0.005, 0.005)
    gltf.scene.position.set(0, -0.035, 0)
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material.envMapIntensity = 20
      }
    })
  }, [gltf])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * 2

    const { children } = gltf.scene.children[0].children[0].children[0]
    children[0].rotation.x = t
    children[2].rotation.x = t
    children[4].rotation.x = t
    children[6].rotation.x = t
  })

  return <primitive object={gltf.scene} />
}

export default Car
