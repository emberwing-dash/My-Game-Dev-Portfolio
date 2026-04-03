"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Text, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei"
import * as THREE from "three"

function FloatingController({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        {/* Controller body */}
        <mesh>
          <boxGeometry args={[1.6, 0.4, 0.8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Left handle */}
        <mesh position={[-0.6, -0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Right handle */}
        <mesh position={[0.6, -0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* D-pad */}
        <mesh position={[-0.4, 0.21, 0]}>
          <boxGeometry args={[0.25, 0.02, 0.08]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.4, 0.21, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.25]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
        </mesh>
        {/* Buttons */}
        {[
          [0.3, 0.21, 0.08],
          [0.5, 0.21, 0],
          [0.4, 0.21, -0.08],
          [0.4, 0.21, 0.08],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
            <meshStandardMaterial 
              color={["#06b6d4", "#22c55e", "#ef4444", "#eab308"][i]} 
              emissive={["#06b6d4", "#22c55e", "#ef4444", "#eab308"][i]}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        {/* Joysticks */}
        <mesh position={[-0.15, 0.25, 0.15]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.15, 0.25, -0.15]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        distort={0.4}
        speed={2}
        metalness={0.8}
        roughness={0.1}
      />
    </mesh>
  )
}

function Particles() {
  const count = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])
  
  const pointsRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7c3aed"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function CameraRig() {
  const { camera, pointer } = useThree()
  
  useFrame(() => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={["#0a0a15"]} />
        <fog attach="fog" args={["#0a0a15", 5, 25]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#7c3aed" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.5} />
        <spotLight position={[0, 10, 0]} color="#22c55e" intensity={0.5} angle={0.3} />
        
        <FloatingController position={[0, 0, 0]} />
        
        <FloatingCube position={[-3, 1.5, -2]} color="#7c3aed" />
        <FloatingCube position={[3, -1, -3]} color="#06b6d4" />
        <FloatingCube position={[2.5, 2, -1]} color="#22c55e" />
        
        <FloatingSphere position={[-2.5, -1.5, -1]} color="#7c3aed" />
        <FloatingSphere position={[2, 1, -2]} color="#06b6d4" />
        <FloatingSphere position={[-1, 2, -2]} color="#22c55e" />
        
        <Particles />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={10} size={2} speed={0.4} color="#7c3aed" />
        
        <CameraRig />
      </Canvas>
    </div>
  )
}
