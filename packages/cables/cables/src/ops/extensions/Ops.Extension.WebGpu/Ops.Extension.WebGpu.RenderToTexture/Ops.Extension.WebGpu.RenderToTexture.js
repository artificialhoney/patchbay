// https://shi-yan.github.io/webgpuunleashed/2D_Techniques/rendering_to_textures.html
const exec = op.inTrigger("Trigger"),
  next = op.outTrigger("Next"),
  inSize = op.inSwitch("Size", ["Canvas", "Manual"], "Canvas"),
  inWidth = op.inValueInt("texture width", 512),
  inHeight = op.inValueInt("texture height", 512),
  tfilter = op.inSwitch("filter", ["nearest", "linear"], "linear"),
  inClear = op.inBool("Clear", true),
  result = op.outTexture("Texture");

new CABLES.WebGpuOp(op);

let sizeCanvas = true;
let colorTex = null;
let colorTexture = null;
let renderPass;
let colorAtt;
const teapotTextureSize = 512;

let tex;

inSize.onChange = updateUi;

tfilter.onChange = inClear.onChange = () => {
  tex = null;
};

updateUi();

function updateUi() {
  inWidth.setUiAttribs({ greyout: inSize.get() != "Manual" });
  inHeight.setUiAttribs({ greyout: inSize.get() != "Manual" });
  sizeCanvas = inSize.get() == "Canvas";
}

exec.onTriggered = () => {
  const cgp = op.patch.cgp;

  let width = inWidth.get();
  let height = inHeight.get();

  if (sizeCanvas) {
    width = cgp.canvasWidth;
    height = cgp.canvasHeight;
  }

  if (!tex || width != tex.width || height != tex.height) {
    tex = new CGP.Texture(op.patch.cg, {
      width: width,
      height: height,
      name: "op.shortName",
      filter: tfilter.get(),
    });

    const depthTextureForTeapotDesc = {
      size: [width, height, 1],
      dimension: "2d",
      format: "depth24plus",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    };

    let depthTextureForTeapot = cgp.device.createTexture(
      depthTextureForTeapotDesc,
    );

    let depthView = depthTextureForTeapot.createView();

    const depthAtt = {
      view: depthView,
      depthClearValue: 1,
      depthLoadOp: "clear",
      depthStoreOp: "store",
      stencilClearValue: 0,
    };

    const colorTex = {
      size: [width, height, 1],
      dimension: "2d",
      format: "bgra8unorm",
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    };
    colorTexture = cgp.device.createTexture(colorTex);

    tex.gpuTexture = colorTexture;
    tex.gpuTextureDescriptor = colorTex;

    let colorTextureView = colorTexture.createView();
    colorAtt = {
      view: colorTextureView,
      clearValue: { r: 0, g: 0, b: 0, a: 1 },
      loadOp: inClear.get() ? "clear" : "load",
      storeOp: "store",
    };

    renderPass = {
      label: op.shortName,
      colorAttachments: [colorAtt],
      depthStencilAttachment: depthAtt,
    };

    result.setRef(tex);
    console.log("iknit rt2");
  }

  if (!renderPass) {
    console.log("no");
    return;
  }

  const commandEncoder = cgp.device.createCommandEncoder({
    label: "r2t comand enc",
  });

  const oldEnc = cgp.passEncoder;

  cgp.passEncoder = commandEncoder.beginRenderPass(renderPass);
  cgp.renderPassDescriptor = renderPass;

  cgp.renderStart();

  next.trigger();

  cgp.renderEnd();

  cgp.passEncoder.end();

  cgp.device.queue.submit([commandEncoder.finish()]);

  cgp.passEncoder = oldEnc;
};

//
