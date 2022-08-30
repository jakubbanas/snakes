import { Direction } from "./types";

type KeyEventDirectionMapping = { [key: string]: Direction };
type ControllerAction = () => void;
type ControllerActionMaping = {
  [key in Direction]: ControllerAction;
};

const keyEventDirectionMapping: KeyEventDirectionMapping = {
  w: Direction.UP,
  s: Direction.DOWN,
  a: Direction.LEFT,
  d: Direction.RIGHT,
};

class KeyboardController {
  constructor(controllerActionMapping: ControllerActionMaping) {
    window.addEventListener("keypress", (e) => {
      const { key } = e;
      const direction: Direction = keyEventDirectionMapping[key];
      if (direction === undefined) {
        throw Error("Invalid direction");
      }

      controllerActionMapping[direction]();
    });
  }
}

export default KeyboardController;
