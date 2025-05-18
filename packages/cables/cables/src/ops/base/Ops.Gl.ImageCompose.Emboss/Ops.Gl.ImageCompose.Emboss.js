const
    render = op.inTrigger("render"),
    trigger = op.outTrigger("trigger"),
    strength = op.inValue("Strength", 4),
    clear = op.inValueBool("Clear", true),
    cgl = op.patch.cgl,
    shader = new CGL.Shader(cgl, op.name, op);

shader.setSource(shader.getDefaultVertexShader(), attachments.emboss_frag || "");
let textureUniform = new CGL.Uniform(shader, "t", "tex", 0);
let uniStrength = new CGL.Uniform(shader, "f", "strength", strength);
let unitexSizeX = new CGL.Uniform(shader, "f", "texSizeX", 1024);
let unitexSizeY = new CGL.Uniform(shader, "f", "texSizeY", 1024);

clear.onChange = updateClear;
updateClear();

function updateClear()
{
    if (clear.get())shader.define("CLEAR");
    else shader.removeDefine("CLEAR");
}

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);

    unitexSizeX.set(1.0 / cgl.currentTextureEffect.getCurrentSourceTexture().width);
    unitexSizeY.set(1.0 / cgl.currentTextureEffect.getCurrentSourceTexture().height);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();
};
