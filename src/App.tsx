import {
  Component,
  createEffect,
  createRenderEffect,
  onCleanup,
} from "solid-js";
import REGL from "regl";

import styles from "./App.module.css";
import somethingFrag from "./shaders/something.frag?raw";
import somethingVert from "./shaders/something.vert?raw";

const App: Component = () => {
  let div: HTMLDivElement;
  createEffect(() => {
    if (div) {
      const regl = REGL(div);

      const drawTriangle = regl({
        frag: somethingFrag,
        vert: somethingVert,
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
          time: ({ tick }) => tick * 0.001,
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
      <div
        ref={(x) => {
          div = x;
        }}
      />
    </div>
  );
};

export default App;
