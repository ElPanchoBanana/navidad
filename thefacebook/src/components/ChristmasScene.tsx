import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RED = "#c62828", GREEN = "#1b5e20", WHITE = "#f5f5f5", SKIN = "#f2c9a0", GOLD = "#f4b400";

const Tree = () => {
  const ornaments = useMemo(() => Array.from({ length: 28 }, (_, i) => {
    const y = 0.6 + Math.random() * 2.6, r = (3.4 - y) * 0.42 + 0.05, a = i * 2.4;
    return { p: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number], c: [RED, GOLD, "#1e88e5", WHITE][i % 4] };
  }), []);
  const star = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (star.current) star.current.rotation.y += d; });
  return (
    <group>
      <mesh position={[0, 0.3, 0]} castShadow><cylinderGeometry args={[0.18, 0.22, 0.6]} /><meshStandardMaterial color="#5d4037" /></mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 1.1 + i * 0.85, 0]} castShadow>
          <coneGeometry args={[1.5 - i * 0.4, 1.4, 10]} /><meshStandardMaterial color={GREEN} roughness={0.8} flatShading />
        </mesh>
      ))}
      {ornaments.map((o, i) => (
        <mesh key={i} position={o.p}><sphereGeometry args={[0.08, 12, 12]} /><meshStandardMaterial color={o.c} metalness={0.6} roughness={0.2} emissive={o.c} emissiveIntensity={0.3} /></mesh>
      ))}
      <mesh ref={star} position={[0, 3.85, 0]}><octahedronGeometry args={[0.22]} /><meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} /></mesh>
    </group>
  );
};

const Santa = (props: JSX.IntrinsicElements["group"]) => {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (g.current) g.current.rotation.y = Math.sin(clock.elapsedTime * 0.8) * 0.3; });
  return (
    <group ref={g} {...props}>
      <mesh position={[0, 0.7, 0]} castShadow><sphereGeometry args={[0.55, 24, 24]} /><meshStandardMaterial color={RED} /></mesh>
      <mesh position={[0, 0.7, 0]}><torusGeometry args={[0.5, 0.07, 8, 24]} /><meshStandardMaterial color="#212121" /></mesh>
      <mesh position={[0, 1.4, 0]}><sphereGeometry args={[0.3, 24, 24]} /><meshStandardMaterial color={SKIN} /></mesh>
      <mesh position={[0, 1.25, 0.15]}><sphereGeometry args={[0.25, 16, 16]} /><meshStandardMaterial color={WHITE} /></mesh>
      <mesh position={[0, 1.42, 0.29]}><sphereGeometry args={[0.05]} /><meshStandardMaterial color="#e57373" /></mesh>
      {[-0.1, 0.1].map((x) => <mesh key={x} position={[x, 1.5, 0.26]}><sphereGeometry args={[0.03]} /><meshStandardMaterial color="#111" /></mesh>)}
      <mesh position={[0, 1.75, 0]} rotation={[-0.2, 0, 0]}><coneGeometry args={[0.28, 0.5, 20]} /><meshStandardMaterial color={RED} /></mesh>
      <mesh position={[0, 1.6, 0]}><torusGeometry args={[0.27, 0.06, 8, 24]} /><meshStandardMaterial color={WHITE} /></mesh>
      <mesh position={[0, 2.02, -0.08]}><sphereGeometry args={[0.07]} /><meshStandardMaterial color={WHITE} /></mesh>
      {[-0.22, 0.22].map((x) => <mesh key={x} position={[x, 0.12, 0.1]}><boxGeometry args={[0.2, 0.2, 0.3]} /><meshStandardMaterial color="#212121" /></mesh>)}
    </group>
  );
};

const Elf = ({ phase = 0, ...props }: JSX.IntrinsicElements["group"] & { phase?: number }) => {
  const g = useRef<THREE.Group>(null);
  const y = (props.position as number[])?.[1] ?? 0;
  useFrame(({ clock }) => { if (g.current) g.current.position.y = y + Math.abs(Math.sin(clock.elapsedTime * 3 + phase)) * 0.25; });
  return (
    <group ref={g} {...props}>
      <mesh position={[0, 0.35, 0]}><capsuleGeometry args={[0.18, 0.3, 6, 12]} /><meshStandardMaterial color="#2e7d32" /></mesh>
      <mesh position={[0, 0.3, 0]}><torusGeometry args={[0.19, 0.04, 6, 16]} /><meshStandardMaterial color={GOLD} /></mesh>
      <mesh position={[0, 0.78, 0]}><sphereGeometry args={[0.17, 20, 20]} /><meshStandardMaterial color={SKIN} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[s * 0.18, 0.8, 0]} rotation={[0, 0, -s * 1.1]}><coneGeometry args={[0.05, 0.18, 8]} /><meshStandardMaterial color={SKIN} /></mesh>)}
      <mesh position={[0, 1.02, 0]} rotation={[0, 0, 0.4]}><coneGeometry args={[0.17, 0.4, 16]} /><meshStandardMaterial color={RED} /></mesh>
      <mesh position={[0.11, 1.2, 0]}><sphereGeometry args={[0.05]} /><meshStandardMaterial color={WHITE} /></mesh>
    </group>
  );
};

const Present = ({ color, ...props }: JSX.IntrinsicElements["group"] & { color: string }) => (
  <group {...props}>
    <mesh castShadow><boxGeometry args={[0.4, 0.35, 0.4]} /><meshStandardMaterial color={color} /></mesh>
    <mesh><boxGeometry args={[0.42, 0.36, 0.08]} /><meshStandardMaterial color={GOLD} /></mesh>
    <mesh><boxGeometry args={[0.08, 0.36, 0.42]} /><meshStandardMaterial color={GOLD} /></mesh>
  </group>
);

const Snow = () => {
  const ref = useRef<THREE.Points>(null);
  const pos = useMemo(() => { const a = new Float32Array(1500 * 3); for (let i = 0; i < a.length; i += 3) { a[i] = (Math.random() - 0.5) * 30; a[i + 1] = Math.random() * 15; a[i + 2] = (Math.random() - 0.5) * 30; } return a; }, []);
  useFrame((_, d) => {
    const p = ref.current?.geometry.attributes.position as THREE.BufferAttribute | undefined; if (!p) return;
    const dt = Math.min(d, 0.05);
    for (let i = 1; i < pos.length; i += 3) { pos[i] -= dt * 0.8; if (pos[i] < 0) pos[i] = 15; }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial color={WHITE} size={0.08} sizeAttenuation />
    </points>
  );
};

const ChristmasScene = () => (
  <div className="fixed inset-0 -z-0" data-scene-ready>
    <Canvas shadows camera={{ position: [0, 2.5, 8], fov: 50 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#0d1b3a"]} />
      <fog attach="fog" args={["#0d1b3a", 8, 22]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[0, 3, 1.5]} color={GOLD} intensity={8} distance={6} />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1} color="#8bb" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <mesh rotation-x={-Math.PI / 2} receiveShadow><circleGeometry args={[30, 48]} /><meshStandardMaterial color="#e8eef7" roughness={1} /></mesh>
      <Tree />
      <Santa position={[2.3, 0, 0.8]} rotation={[0, -0.4, 0]} />
      <Elf position={[-1.8, 0, 1.2]} phase={0} />
      <Elf position={[-2.6, 0, 0.2]} phase={1.5} />
      <Elf position={[1.3, 0, 2]} phase={3} />
      <Present color={RED} position={[0.8, 0.17, 1]} rotation={[0, 0.4, 0]} />
      <Present color="#1e88e5" position={[-0.7, 0.17, 1.1]} rotation={[0, -0.3, 0]} />
      <Present color={GREEN} position={[0.1, 0.17, 1.5]} />
      <Snow />
      <Sparkles count={60} scale={[8, 5, 8]} position={[0, 2.5, 0]} color={GOLD} size={3} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.1} target={[0, 1.5, 0]} />
    </Canvas>
  </div>
);
export default ChristmasScene;
