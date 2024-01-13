import { Environment, MeshPortalMaterial, RoundedBox, Text, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import * as easing from "maath/easing"

const MonsterStage = ({ children, texture, name, color, active, onActive, hovered, onHovered, ...props }) => {
  const map = useTexture(texture)
  const portalMaterial = useRef()

  useFrame((_, delta) => {
    const worldIsOpen = active === name
    easing.damp(portalMaterial.current, "blend", worldIsOpen ? 1 : 0, 0.2, delta)
  })

  return (
    <group {...props}>
      <Text fontSize={0.3} position={[0, -1.3, 0.051]} anchorY="bottom">
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => onActive(active === name ? null : name)}
        onPointerEnter={() => onHovered(name)}
        onPointerLeave={() => onHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}

export default MonsterStage
