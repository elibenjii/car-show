import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei"
import "./style.css"
// import Boxes from "./Boxes"
import Car from "./Car"
import Ground from "./Ground"
// import FloatingGrid from "./FloatingGrid"
import Rings from "./Rings"
import Loader from "./Loader"

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera maxDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frameloop="demand">
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <Rings />

      {/* <Boxes /> */}
      {/* <FloatingGrid /> */}
      {/* <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer> */}
    </>
  )
}

function App() {
  const { progress } = useProgress()
  console.log("progress", progress)
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1> Loading {progress}%</h1>
        </div>
      }
    >
      <Canvas shadows performance={{ min: 0.1 }}>
        <CarShow />
      </Canvas>
    </Suspense>
  )
}

export default App
