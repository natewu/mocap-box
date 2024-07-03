import './App.css';

import { Canvas } from "@react-three/fiber";
import MovingBox from "./Box";
import useWebSocket from 'react-use-websocket';

const WS_URL = "ws://localhost:8765/clinic"

function App() {
  // Listen to the websocket and print to console using react-use-websocket

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('opened');
    },
    onClose: () => {
      console.log('closed');
    },
    onMessage: (message) => {
      console.log(message.data);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MovingBox />
      </Canvas>
    </div>
  );
}

export default App;
