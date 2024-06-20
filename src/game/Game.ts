import { Engine, Observable, Scene } from "@babylonjs/core";
import Debugger from "./Debugger";
import Environment from "./Enviroments";
import Camera from "./Camera";
import Grounds from "./Ground";

export default class Game {
  private static instance: Game | undefined;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Game();
    }
    return this.instance;
  }

  static clearInstance() {
    this.instance?.cleanUp();
    this.instance = undefined;
  }

  canvas!: HTMLCanvasElement;
  engine!: Engine;
  scene!: Scene;
  camera!: Camera;
  cleanUpObservable = new Observable();
  resizeObservable = new Observable();
  isInitialized = false;

  async init(canvas: HTMLCanvasElement) {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.canvas = canvas;

    this.engine = new Engine(canvas, true, {
      lockstepMaxSteps: 4,
      deterministicLockstep: true,
    });

    this.scene = new Scene(this.engine);

    window.addEventListener("resize", this.onResize.bind(this));

    this.camera = new Camera();

    new Environment();
    new Grounds();

    if (process.env.NODE_ENV === "development") {
      const debugLayer = new Debugger();
      await debugLayer.init();
    }

    await this.scene.whenReadyAsync();

    // let test = 0;
    // setInterval(() => {
    //   const { setTest } = useStore.getState();
    //   test++
    //   setTest(test);
    // }, 1000);

    this.engine.runRenderLoop(() => this.scene.render());
  }

  private onResize() {
    this.engine.resize();
    this.resizeObservable.notifyObservers(undefined);
  }

  cleanUp() {
    this.engine.stopRenderLoop();

    window.removeEventListener("resize", this.onResize.bind(this));
    this.cleanUpObservable.notifyObservers(undefined);

    this.engine.dispose();
  }
}
