import {
  ControllerActionMapping,
  Direction,
  KeyEventDirectionMapping,
} from "../types";

const keyEventDirectionMapping: KeyEventDirectionMapping = {
  w: Direction.UP,
  s: Direction.DOWN,
  a: Direction.LEFT,
  d: Direction.RIGHT,
};

class WSADController {
  constructor(controllerActionMapping: ControllerActionMapping) {
    window.addEventListener("keypress", (e: KeyboardEvent) => {
      const { key } = e;
      const direction: Direction = keyEventDirectionMapping[key];
      if (direction === undefined) {
        throw Error("Invalid direction");
      }

      controllerActionMapping[direction]();
    });
  }
}

export default WSADController;
