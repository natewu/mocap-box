import { Box, Edges } from "@react-three/drei";
import { useEffect, useRef } from 'react';

import { DataVector } from "./lib/DataVector/DataVector";
import { Mesh } from 'three';
import { useEngine } from "./store";
import { useFrame } from '@react-three/fiber';

function MovingBox({ data }: { data: DataVector | undefined }) {
  const boxRef = useRef<Mesh>(null);
  const engine = useEngine((state) => state.engine);

  useEffect(() => {
    if (engine && data) {
      engine.updateData(data);
    }
  }, [engine, data]);

  useFrame(() => {
    if (boxRef.current && engine) {
      const currentTime = performance.now();

      // Calculate the new rotations
      const { rotationX, rotationY } = engine.calculateRotation(currentTime);

      // Rotate box based on the engine calculations
      boxRef.current.rotation.x = rotationX;
      boxRef.current.rotation.y = rotationY;
    }
  });

  return (
    <mesh ref={boxRef}>
      <Box args={[2, 2, 2]}>
        <Edges color="black" />
        <meshStandardMaterial color="orange" />
      </Box>
    </mesh>
  );
};

export default MovingBox;