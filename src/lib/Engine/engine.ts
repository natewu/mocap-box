import { DataVector } from "../DataVector/DataVector";

/**
 * Represents an engine that calculates rotation based on mocap data.
 *
 * The `Engine` class manages the state of the mocap data and provides methods to update and calculate the rotation based on the data.
 *
 * @param data - The initial mocap data, or `undefined` if no data is available.
 * @param sensitivityX - The sensitivity of the x-axis rotation, defaults to 1.
 * @param sensitivityY - The sensitivity of the y-axis rotation, defaults to 1.
 */
export class Engine {
  public data: DataVector | undefined;
  private lastUpdateTime: number;
  public rotationX: number = 0;
  public rotationY: number = 0;

  // Specifying the sensitivity of x and y axis from the data received
  private sensitivityX: number;
  private sensitivityY: number;

  constructor(data: DataVector | undefined, sensitivityX = 1, sensitivityY = 1) {
    this.data = data;
    this.lastUpdateTime = performance.now();
    this.sensitivityX = sensitivityX;
    this.sensitivityY = sensitivityY;
  }

  public updateData(data: DataVector | undefined) {
    this.data = data;
  }

  public resetPosition() {
    this.rotationX = 0;
    this.rotationY = 0;
  }

  public calculateRotation(currentTime: number) {
    if (!this.data) {
      return { rotationX: this.rotationX, rotationY: this.rotationY };
    }

    // Convert to seconds
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; 
    this.lastUpdateTime = currentTime;

    const { gx, gy } = this.data;

    // Accumulate rotation based on gyroscope data
    this.rotationX += gx * deltaTime * this.sensitivityX;
    this.rotationY += gy * deltaTime * this.sensitivityY;

    return { rotationX: this.rotationX, rotationY: this.rotationY };
  }
}