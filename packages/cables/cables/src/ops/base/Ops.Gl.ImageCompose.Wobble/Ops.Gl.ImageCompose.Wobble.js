const
    render = op.inTrigger("Render"),
    time = op.inValue("time", 0),
    speedX = op.inValue("SpeedX", 4),
    speedY = op.inValue("SpeedY", 8),

    repeatX = op.inValue("RepeatX", 11),
    repeatY = op.inValue("RepeatY", 11),
    mul = op.inValue("Multiply", 0.01),
    maskTex = op.inTexture("Mask"),

    trigger = op.outTrigger("Trigger");

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, op.name, op);

shader.setSource(shader.getDefaultVertexShader(), attachments.wobble_frag);
const textureUniform = new CGL.Uniform(shader, "t", "tex", 0);
const timeUniform = new CGL.Uniform(shader, "f", "time", time);
const speedXUniform = new CGL.Uniform(shader, "f", "speedX", speedX);
const speedYUniform = new CGL.Uniform(shader, "f", "speedY", speedY);
const repeatXUniform = new CGL.Uniform(shader, "f", "repeatX", repeatX);
const repeatYUniform = new CGL.Uniform(shader, "f", "repeatY", repeatY);
const mulUniform = new CGL.Uniform(shader, "f", "mul", mul);
const maskUniform = new CGL.Uniform(shader, "t", "texMask", 1);

maskTex.onChange = function ()
{
    shader.toggleDefine("MASK", maskTex.isLinked());
};

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);
    if (maskTex.get()) cgl.setTexture(1, maskTex.get().tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();
};
