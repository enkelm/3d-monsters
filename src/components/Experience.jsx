import { CameraControls, Environment, useCursor } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Cactoro, DragonEvolved, Fish, MonsterStage } from "./monsters"

export const Experience = () => {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  const cameraRef = useRef()

  const scene = useThree((s) => s.scene)
  useCursor(hovered)

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      cameraRef.current.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true)
      return
    }
    cameraRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)
  }, [active])

  const monsters = [
    {
      monster: <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish"} />,
      props: {
        name: "Fish",
        color: "#38adcf",
        texture: "textures/water.jpg",
        active,
        onActive: setActive,
        hovered,
        onHovered: setHovered,
      },
    },
    {
      monster: <DragonEvolved scale={0.5} position-y={-1} hovered={hovered === "Dragon"} />,
      props: {
        name: "Dragon",
        color: "#df8d52",
        texture: "textures/fire.jpg",
        ["position-x"]: -2.5,
        ["rotation-y"]: Math.PI / 8,
        active,
        onActive: setActive,
        hovered,
        onHovered: setHovered,
      },
    },
    {
      monster: <Cactoro scale={0.45} position-y={-1} hovered={hovered === "Cactoro"} />,
      props: {
        name: "Cactoro",
        color: "#739d3c",
        texture: "textures/cactus.jpg",
        ["position-x"]: 2.5,
        ["rotation-y"]: -Math.PI / 8,
        active,
        onActive: setActive,
        hovered,
        onHovered: setHovered,
      },
    },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={cameraRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      {monsters.map(({ monster, props }, i) => (
        <MonsterStage key={i} {...props}>
          {monster}
        </MonsterStage>
      ))}
    </>
  )
}
