/**
 * Represents a data vector with various sensor measurements.
 * 
 * @property {string} mac - The MAC address of the device that generated the data.
 * @property {number} t - The timestamp of the data.
 * @property {number} ax - The acceleration along the x-axis.
 * @property {number} ay - The acceleration along the y-axis.
 * @property {number} az - The acceleration along the z-axis.
 * @property {number} gx - The angular velocity around the x-axis.
 * @property {number} gy - The angular velocity around the y-axis.
 * @property {number} gz - The angular velocity around the z-axis.
 * 
 * @constructor
 * @param {string} mac - The MAC address of the device.
 * @param {number} t - The timestamp of the data.
 * @param {number} ax - The acceleration along the x-axis.
 * @param {number} ay - The acceleration along the y-axis.
 * @param {number} az - The acceleration along the z-axis.
 * @param {number} gx - The angular velocity around the x-axis.
 * @param {number} gy - The angular velocity around the y-axis.
 * @param {number} gz - The angular velocity around the z-axis.
 */
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