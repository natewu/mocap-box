import './App.css';

import { Canvas } from "@react-three/fiber";
import MovingBox from "./Box";

function App() {
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
