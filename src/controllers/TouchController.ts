import { ControllerActionMaping, Direction } from "../types";

class TouchController {
  private initialX = null;
  private initialY = null;
  private controllerActionMapping: ControllerActionMaping;

  private startTouch(e: TouchEvent): void {
    this.initialX = e.touches[0].clientX;
    this.initialY = e.touches[0].clientY;
  }

  private moveTouch(e: TouchEvent): void {
    if (!this.initialX || !this.initialX) {
      return;
    }

    const { clientX } = e.touches[0];
    const { clientY } = e.touches[0];

    const diffX = this.initialX - clientX;
    const diffY = this.initialY - clientY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 0) {
        // swiped left
        this.controllerActionMapping[Direction.LEFT]();
      } else {
        // swiped right
        this.controllerActionMapping[Direction.RIGHT]();
      }
    } else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
        this.controllerActionMapping[Direction.UP]();
      } else {
        // swiped down
        this.controllerActionMapping[Direction.DOWN]();
      }
    }

    this.initialX = null;
    this.initialY = null;

    e.preventDefault();
  }

  constructor(controllerActionMapping: ControllerActionMaping) {
    this.controllerActionMapping = controllerActionMapping;
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("touchstart", this.startTouch.bind(this), false);
    canvas.addEventListener("touchmove", this.moveTouch.bind(this), false);
  }
}

export default TouchController;
