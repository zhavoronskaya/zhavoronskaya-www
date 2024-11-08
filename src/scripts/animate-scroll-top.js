// Ensure this script is inserted into browser console:
// https://cdnjs.cloudflare.com/ajax/libs/tween.js/23.1.3/tween.umd.js

function run({ top = 10000, seconds = 10, delay = 1000 } = {}) {
  const main = document.querySelector("main");
  const scroll = { top: 0 }; // Start at (0, 0)
  main.scrollTop = scroll.top;
  const tween = new TWEEN.Tween(scroll, false)
    .to({ top }, seconds * 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      main.scrollTop = scroll.top;
    });

  // Setup the animation loop.
  function animate(time) {
    tween.update(time);
    requestAnimationFrame(animate);
  }

  function start() {
    tween.start();
    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    console.log("RUNNIEND!");
    start();
  }, delay);
}
