const render = op.inTrigger("render");
const trigger = op.outTrigger("trigger");
const amount = op.inValueSlider("amount", 1);
const inMask = op.inTexture("Mask");
const invertMask = op.inValueBool("Invert Mask");

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, op.name, op);

shader.setSource(shader.getDefaultVertexShader(), attachments.desaturate_frag);
let textureUniform = new CGL.Uniform(shader, "t", "tex", 0);
let masktextureUniform = new CGL.Uniform(shader, "t", "mask", 1);
let amountUniform = new CGL.Uniform(shader, "f", "amount", amount);

invertMask.onChange = function ()
{
    if (invertMask.get())shader.define("INVERTMASK");
    else shader.removeDefine("INVERTMASK");
};

inMask.onChange = function ()
{
    if (inMask.get())shader.define("MASK");
    else shader.removeDefine("MASK");
};

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);

    if (inMask.get()) cgl.setTexture(1, inMask.get().tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();
};
