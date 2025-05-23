op.name = "MemoryStats";

let exec = op.inTrigger("update");

exec.onTriggered = function () {
  stats.update();
};

/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 * @author paulirish / http://paulirish.com/
 */
let MemoryStats = function () {
  let msMin = 100;
  let msMax = 0;

  let container = document.createElement("div");
  container.id = "stats";
  container.style.cssText = "width:80px;opacity:0.9;cursor:pointer";

  let msDiv = document.createElement("div");
  msDiv.id = "ms";
  msDiv.style.cssText =
    "padding:0 0 3px 3px;text-align:left;background-color:#020;";
  container.appendChild(msDiv);

  let msText = document.createElement("div");
  msText.id = "msText";
  msText.style.cssText =
    "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
  msText.innerHTML = "Memory";
  msDiv.appendChild(msText);

  let msGraph = document.createElement("div");
  msGraph.id = "msGraph";
  msGraph.style.cssText =
    "position:relative;width:74px;height:30px;background-color:#0f0";
  msDiv.appendChild(msGraph);

  while (msGraph.children.length < 74) {
    let bar = document.createElement("span");
    bar.style.cssText =
      "width:1px;height:30px;float:left;background-color:#131";
    msGraph.appendChild(bar);
  }

  let updateGraph = function (dom, height, color) {
    let child = dom.appendChild(dom.firstChild);
    child.style.height = height + "px";
    if (color) child.style.backgroundColor = color;
  };

  // polyfill usedJSHeapSize
  if (window.performance && !performance.memory) {
    performance.memory = { usedJSHeapSize: 0, totalJSHeapSize: 0 };
  }

  // support of the API?
  if (performance.memory.totalJSHeapSize === 0) {
    console.warn(
      "totalJSHeapSize === 0... performance.memory is only available in Chrome .",
    );
  }

  // TODO, add a sanity check to see if values are bucketed.
  // If so, reminde user to adopt the --enable-precise-memory-info flag.
  // open -a "/Applications/Google Chrome.app" --args --enable-precise-memory-info

  let lastTime = CABLES.now();
  let lastUsedHeap = performance.memory.usedJSHeapSize;
  return {
    domElement: container,

    update: function () {
      // refresh only 30time per second
      if (CABLES.now() - lastTime < 1000 / 30) return;
      lastTime = CABLES.now();

      let delta = performance.memory.usedJSHeapSize - lastUsedHeap;
      lastUsedHeap = performance.memory.usedJSHeapSize;
      let color = delta < 0 ? "#830" : "#131";

      let ms = performance.memory.usedJSHeapSize;
      msMin = Math.min(msMin, ms);
      msMax = Math.max(msMax, ms);
      msText.textContent = "Mem: " + bytesToSize(ms, 2);

      let normValue = ms / (30 * 1024 * 1024);
      let height = Math.min(30, 30 - normValue * 30);
      updateGraph(msGraph, height, color);

      function bytesToSize(bytes, nFractDigit) {
        let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes == 0) return "n/a";
        nFractDigit = nFractDigit !== undefined ? nFractDigit : 0;
        let precision = Math.pow(10, nFractDigit);
        let i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (
          Math.round((bytes * precision) / Math.pow(1024, i)) / precision +
          " " +
          sizes[i]
        );
      }
    },
  };
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = MemoryStats;
}

var stats = new MemoryStats();

stats.domElement.style.position = "fixed";
stats.domElement.style.right = "0px";
stats.domElement.style.bottom = "0px";

document.body.appendChild(stats.domElement);
