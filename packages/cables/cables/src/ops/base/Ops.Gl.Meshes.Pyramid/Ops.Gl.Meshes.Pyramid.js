const render = op.inTrigger("Render"),
  sizeW = op.inValue("Width", 1),
  sizeL = op.inValue("Length", 1),
  sizeH = op.inValue("Height", 2),
  inSmooth = op.inValueBool("Smooth", false),
  inDraw = op.inValueBool("Draw", true),
  trigger = op.outTrigger("trigger"),
  geomOut = op.outObject("geometry");

const cgl = op.patch.cgl;
let geom = null;
let mesh = null;
create();
sizeW.onChange = sizeH.onChange = sizeL.onChange = inSmooth.onChange = create; // () => { mesh = null; };

render.onTriggered = function () {
  if (!mesh) create();
  if (inDraw.get()) mesh.render(cgl.getShader());
  trigger.trigger();
};

function create() {
  if (!geom) geom = new CGL.Geometry(op.name);
  let w = sizeW.get();
  let h = sizeH.get();
  let l = sizeL.get();

  geom.vertices = [
    // -w,-l,0,
    // w,-l,0,
    // w,l,0,
    // -w,l,0,
    // 0,0,h,
    -w,
    0,
    -l,
    w,
    0,
    -l,
    w,
    0,
    l,
    -w,
    0,
    l,
    0,
    h,
    0,
  ];

  geom.vertexNormals = [
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
  ];

  geom.texCoords = [0.5, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0];

  geom.verticesIndices = [
    0,
    1,
    2,
    0,
    2,
    3, // bottom

    4,
    1,
    0,
    4,
    3,
    2,
    0,
    3,
    4,
    4,
    2,
    1,
  ];

  if (!inSmooth.get()) geom.unIndex();
  geom.calculateNormals({ forceZUp: false });

  mesh = new CGL.Mesh(cgl, geom);
  geomOut.set(null);
  geomOut.set(geom);
}
