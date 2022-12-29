import React, { useEffect, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
const Car = () => {
  const { scene } = useGLTF("models/chevrolet_corvette/scene.gltf")

  useEffect(() => {
    scene.scale.set(1, 1, 1)
    scene.position.set(0, 0, 0)
    scene.rotation.y = 3.2

    // scene.scale.set(0.005, 0.005, 0.005)
    // scene.position.set(0, -0.035, 0)
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material.envMapIntensity = 20
      }
    })
  }, [scene])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * 2
    // scene.children[0].children[0].children[0].children[0].children[25].rotation.x =
    //   t
    scene.children[0].children[0].children[0].children[0].rotation.x = -t
    scene.children[0].children[0].children[0].children[1].rotation.x = -t
    scene.children[0].children[0].children[0].children[2].rotation.x = -t
    scene.children[0].children[0].children[0].children[3].rotation.x = -t

    // scene.children[0].children[0].children[0].children[0].rotation.x = t
    // scene.children[0].children[0].children[0].children[1].rotation.x = t
    // scene.children[0].children[0].children[0].children[2].rotation.x = t
    // scene.children[0].children[0].children[0].children[3].rotation.x = t
    // scene.children[0].children[0].children[0].children[4].rotation.x = t
    // const t = state.clock.getElapsedTime() * 2
    // const { children } = scene.children[0].children[0].children[0]
    // children[0].rotation.x = t
    // children[2].rotation.x = t
    // children[4].rotation.x = t
    // children[6].rotation.x = t
  })

  return (
    <Suspense fallback={null}>
      <primitive object={scene} />
    </Suspense>
  )
}

export default Car
