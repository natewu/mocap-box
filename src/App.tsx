import './App.css';

import { Button } from "@mui/joy";
import { Canvas } from "@react-three/fiber";
import { DataVector } from "./lib/DataVector/DataVector";
import MovingBox from "./components/Box";
import { useEngine } from "./store";
import { useState } from "react";
import useWebSocket from 'react-use-websocket';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8765';

function App() {
  const engine = useEngine((state) => state.engine);
  const setEngine = useEngine((state) => state.setEngine);

  const [data, setData] = useState<DataVector>();
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

  return (
    <div className="App">
      <div className="control-overlay">
        <Button onClick={() => resetPosition()}>Reset</Button>
      </div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MovingBox data={data}/>
      </Canvas>
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
