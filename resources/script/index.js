const hideWaterJug = (waterJug) => { waterJug.classList.add("hide"); };
const appearWaterJug = (waterJug) => { setTimeout(() => { waterJug.classList.remove("hide"); }, 1000); };

const main = () => {
  const waterJug = document.querySelector("#water-jug");
  waterJug.onclick = () => {
    hideWaterJug(waterJug);
    appearWaterJug(waterJug);
  };
};

window.onload = main;