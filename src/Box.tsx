import { Box, Edges } from "@react-three/drei";
import React, { useEffect, useRef, useState } from 'react';

import { DataVector } from "./App";
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

function MovingBox({ data }: { data: DataVector | undefined }) {
  const boxRef = useRef<Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Initialize the Engine with the data
  const engineRef = useRef<Engine>(new Engine(data));

  const handleMouseMove = (event: MouseEvent) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (boxRef.current && data) {
      const currentTime = performance.now();

      // Update the engine with the new data
      engineRef.current.updateData(data);

      // Calculate the new rotations
      const { rotationX, rotationY } = engineRef.current.calculateRotation(currentTime);

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

export class Engine {
  public data: DataVector | undefined;
  private rotationX: number = 0;
  private rotationY: number = 0;
  private lastUpdateTime: number = 0;

  constructor(data: DataVector | undefined) {
    this.data = data;
  }

  public updateData(data: DataVector | undefined) {
    this.data = data;
  }

  public calculateRotation(currentTime: number) {
    if (!this.data) {
      return { rotationX: this.rotationX, rotationY: this.rotationY };
    }

    const { gx, gy } = this.data;

    if (this.lastUpdateTime === 0) {
      this.lastUpdateTime = currentTime;
      return { rotationX: this.rotationX, rotationY: this.rotationY };
    }

    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert ms to seconds
    this.lastUpdateTime = currentTime;

    // Integrate angular velocities to get the rotation
    this.rotationX += gx * deltaTime;
    this.rotationY += gy * deltaTime;

    return { rotationX: this.rotationX, rotationY: this.rotationY };
  }
}

export default MovingBox;