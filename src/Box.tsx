import React, { useEffect, useRef, useState } from 'react';

import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

const MovingBox: React.FC = () => {
  const boxRef = useRef<Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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
    if (boxRef.current) {
      // Rotate box based on mouse
      boxRef.current.rotation.x += (mouse.y - boxRef.current.rotation.x) * 0.5;
      boxRef.current.rotation.y += (mouse.x - boxRef.current.rotation.y) * 0.5;
    }
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default MovingBox;