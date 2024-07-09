import './App.css';

import { Canvas } from "@react-three/fiber";
import MovingBox from "./Box";
import { useState } from "react";
import useWebSocket from 'react-use-websocket';

const WS_URL = "ws://localhost:8765/clinic"

function App() {
  const [data, setData] = useState<DataVector>();
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('opened');
    },
    onClose: () => {
      console.log('closed');
    },
    onMessage: (message) => {
      // Convert json into a DataVector object
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
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MovingBox data={data}/>
      </Canvas>
    </div>
  );
}

export class DataVector{
  public mac: string;
  public t: number;
  public ax: number;
  public ay: number;
  public az: number;
  public gx: number;
  public gy: number;
  public gz: number;

  constructor(mac: string, t: number, ax: number, ay: number, az: number, gx: number, gy: number, gz: number){
    this.mac = mac;
    this.t = t;
    this.ax = ax;
    this.ay = ay;
    this.az = az;
    this.gx = gx;
    this.gy = gy;
    this.gz = gz;
  }
}

export default App;
