import { DataVector } from "../DataVector/DataVector";

export class Engine {
  public data: DataVector | undefined;
  private lastUpdateTime: number;
  public rotationX: number = 0;
  public rotationY: number = 0;
  private sensitivityX: number;
  private sensitivityY: number;

  constructor(data: DataVector | undefined, sensitivityX = 1, sensitivityY = 1) {
    this.data = data;
    this.lastUpdateTime = performance.now();
    this.sensitivityX = sensitivityX;
    this.sensitivityY = sensitivityY;
    // console.log(`Engine initialized at time: ${this.lastUpdateTime}`);
  }

  public updateData(data: DataVector | undefined) {
    this.data = data;
  }

  public resetPosition() {
    this.rotationX = 0;
    this.rotationY = 0;
    // console.log("Position reset to 0, 0");
  }

  public calculateRotation(currentTime: number) {
    if (!this.data) {
      return { rotationX: this.rotationX, rotationY: this.rotationY };
    }

    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    this.lastUpdateTime = currentTime;

    const { gx, gy } = this.data;

    // Accumulate rotation based on gyroscope data
    this.rotationX += gx * deltaTime * this.sensitivityX;
    this.rotationY += gy * deltaTime * this.sensitivityY;

    // console.log(`RotationX: ${this.rotationX}, RotationY: ${this.rotationY}, DeltaTime: ${deltaTime}`);

    return { rotationX: this.rotationX, rotationY: this.rotationY };
  }
}