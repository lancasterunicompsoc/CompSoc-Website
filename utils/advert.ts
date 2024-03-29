export const State = {
  window: "window",
  bounce: "bounce",
  bluescreen: "bluescreen",
};
type StateType = keyof typeof State;

// chance of transitioning from outer to innner
const TRANSITIONS = {
  [State.window]: {
    [State.window]: 0.73,
    [State.bounce]: 0.25,
    [State.bluescreen]: 0.02,
  },
  [State.bounce]: {
    [State.window]: 0.7,
    [State.bounce]: 0.3,
  },
  [State.bluescreen]: {
    [State.window]: 1.0,
  },
};

export default class StateMachine {
  private state: StateType;

  public constructor() {
    this.state = "bounce";
  }

  public next(): StateType {
    const threshold = Math.random();
    const transitions = TRANSITIONS[this.state];
    if (transitions === undefined) {
      throw new Error("transitions was undefined");
    }
    let baseline = 0;
    let key: keyof typeof State;
    for (key in State) {
      const transition = transitions[key] ?? 0;
      if (baseline <= threshold && threshold < baseline + transition) {
        this.state = key;
        break;
      }
      baseline += transition;
    }
    return this.state;
  }
}
