const render = op.inTrigger("render");
const texture1 = op.inTexture("Texture 1");
const texture2 = op.inTexture("Texture 2");

const trigger = op.outTrigger("Next");

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, op.name, op);

shader.setSource(shader.getDefaultVertexShader(), attachments.tex_difference_frag);
const textureUniform = new CGL.Uniform(shader, "t", "tex", 0);
const unitex1 = new CGL.Uniform(shader, "t", "tex1", 1);
const unitex2 = new CGL.Uniform(shader, "t", "tex2", 2);

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    if (texture1.get() && texture2.get())
    {
        let texture = cgl.currentTextureEffect.getCurrentSourceTexture();

        cgl.pushShader(shader);
        cgl.currentTextureEffect.bind();

        cgl.setTexture(0, texture.tex);
        cgl.setTexture(1, texture1.get().tex);
        cgl.setTexture(2, texture2.get().tex);

        cgl.currentTextureEffect.finish();
        cgl.popShader();
    }

    trigger.trigger();
};
