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