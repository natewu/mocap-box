import './App.css';

import { Leva, button, useControls } from 'leva'
import { useMemo, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { DataVector } from "./lib/DataVector/DataVector";
import MovingBox from "./components/Box";
import { OrbitControls } from "@react-three/drei";
import { useEngine } from "./store";
import useWebSocket from 'react-use-websocket';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8765';

function App() {
  const engine = useEngine((state) => state.engine);
  const setEngine = useEngine((state) => state.setEngine);

  const [data, setData] = useState<DataVector>();
  const orbitRef = useRef<any>(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('opened');
    },
    onClose: () => {
      console.log('closed');
    },
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      const dataVector = new DataVector(data[Object.keys(data)[0]].mac, data[Object.keys(data)[0]].t, data[Object.keys(data)[0]].ax, data[Object.keys(data)[0]].ay, data[Object.keys(data)[0]].az, data[Object.keys(data)[0]].gx, data[Object.keys(data)[0]].gy, data[Object.keys(data)[0]].gz);
      
      setData(dataVector);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const options = useMemo(() => {
    return {
      color: {
        value: "orange"
      },
      size: {
        value: 1,
        min: 0.1,
        max: 10,
      },
      "Reset Position": button(() => resetPosition()),
      "Reset Camera": button(() => {
        orbitRef.current.reset();
      })
    };
  }, []);

  const BoxControls = useControls("Box", options);


  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <OrbitControls ref={orbitRef} />
        <axesHelper />
        <ambientLight />
        <directionalLight position={[-1, 2, 4]} />
        <pointLight position={[10, 10, 10]} />
        <MovingBox data={data} {...BoxControls} />
      </Canvas>
      <Leva />
    </div>
  );
}

function resetPosition() {
  // Reset the position of the box to 0, 0, 0 locally
  const engine = useEngine.getState().engine;

  if (engine) {
    engine.resetPosition();
  }
}

export default App;
