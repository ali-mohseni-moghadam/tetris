import { useRef, useEffect } from "react";
import Game from "~/game/Game";

function GameReact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function startGame() {
      if (!canvasRef.current) return;
      const game = Game.getInstance();
      try {
        await game.init(canvasRef.current);
      } catch (error) {
        Game.clearInstance();
      }
    }
    void startGame();
  }, []);

  return (
    <main className="z-10 h-full min-h-screen w-full select-none bg-[url('/assets/images/bg.webp')] bg-cover bg-center">
      <div
        id="canvas-container"
        className="h-full max-h-screen overflow-hidden opacity-100"
      >
        <canvas ref={canvasRef} className="h-full w-full outline-none" />
      </div>
    </main>
  );
}
export default GameReact;
