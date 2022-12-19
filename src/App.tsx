import {
  Component,
  createEffect,
  createRenderEffect,
  onCleanup,
} from "solid-js";
import REGL from "regl";

import styles from "./App.module.css";

const App: Component = () => {
  let canvas: HTMLCanvasElement;
  createEffect(() => {
    if (canvas) {
      const regl = REGL(canvas);

      const drawTriangle = regl({
        frag: `
          precision mediump float;
          void main() {
            gl_FragColor = vec4(1, 0, 0.5, 1);
          }
        `,
        vert: `
          precision mediump float;
          attribute vec2 position;
          void main() {
            gl_Position = vec4(position, 0, 1);
          }
        `,
        depth: { enable: false, mask: false },
        attributes: {
          position: [
            [-4, 0],
            [4, 4],
            [4, -4],
          ],
        },
        uniforms: {
          aspect: ({ viewportWidth, viewportHeight }) =>
            viewportWidth / viewportHeight,
        },
        count: 3,
      });

      // Called every frame
      regl.frame(() => {
        drawTriangle();
      });
      onCleanup(() => {
        regl.destroy();
      });
    }
  });
  return (
    <div class={styles.App}>
      <canvas
        ref={(x) => {
          canvas = x;
        }}
      />
    </div>
  );
};

export default App;
