const render = op.inTrigger("render"),
  segments = op.inValueInt("segments", 40),
  radius = op.inValueFloat("radius", 1),
  percent = op.inValueSlider("percent", 1),
  numAbs = op.inBool("Absolute", true),
  flip = op.inBool("Flip", false),
  inRotate = op.inValueBool("Rotate"),
  trigger = op.outTrigger("trigger"),
  index = op.outNumber("index");

const cgl = op.patch.cgl;

segments.set(40);
radius.set(1);
percent.set(1);

const pos = [];
flip.onChange =
  numAbs.onChange =
  segments.onChange =
  radius.onChange =
  percent.onChange =
    calcLater;

let needsCalc = true;

render.onTriggered = doRender;

function doRender() {
  if (needsCalc) calc();
  const doRot = inRotate.get();
  const perc = percent.get();
  for (let i = 0; i < pos.length; i++) {
    cgl.pushModelMatrix();

    mat4.translate(cgl.mMatrix, cgl.mMatrix, pos[i]);
    if (doRot)
      mat4.rotateZ(
        cgl.mMatrix,
        cgl.mMatrix,
        (i / pos.length) * perc * CGL.DEG2RAD * -360,
      );

    index.set(i);
    trigger.trigger();

    cgl.popModelMatrix();
  }
}

function calcLater() {
  needsCalc = true;
}

function calc() {
  pos.length = 0;

  let i = 0,
    degInRad = 0;
  let segs = segments.get();
  if (segs < 1) segs = 1;

  let num = Math.round(segs * percent.get());
  let step = 360 / Math.round(segs);

  if (!numAbs.get()) {
    num = segs;
    step = (360 / Math.round(segs)) * percent.get();
  }

  const doflip = flip.get();

  for (i = 0; i < num; i++) {
    if (doflip) degInRad = (360 - step * i) * CGL.DEG2RAD;
    else degInRad = step * i * CGL.DEG2RAD;
    pos.push([
      Math.sin(degInRad) * radius.get(),
      Math.cos(degInRad) * radius.get(),
      0,
    ]);
  }

  needsCalc = false;
}
