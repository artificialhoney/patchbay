const render = op.inTrigger("render");
const useVPSize = op.inBool("use viewport size");
const width = op.inValueInt("width");
const height = op.inValueInt("height");

const tfilter = op.inSwitch("filter", ["nearest", "linear", "mipmap"], "linear");
const twrap = op.inValueSelect("wrap", ["clamp to edge", "repeat", "mirrored repeat"]);
const fpTexture = op.inValueBool("HDR");

const trigger = op.outTrigger("trigger");
const texOut = op.outTexture("texture_out");

const bgAlpha = op.inValueSlider("Background Alpha", 0);
const outRatio = op.outValue("Aspect Ratio");

op.setPortGroup("Texture Size", [useVPSize, width, height]);
op.setPortGroup("Texture Settings", [twrap, tfilter, fpTexture]);

const cgl = op.patch.cgl;
texOut.set(CGL.Texture.getEmptyTexture(cgl));
let effect = null;
let tex = null;

let w = 8, h = 8;
const prevViewPort = [0, 0, 0, 0];
let reInitEffect = true;

const bgFrag = ""
    .endl() + "uniform float a;"
    .endl() + "void main()"
    .endl() + "{"
    .endl() + "   outColor= vec4(0.0,0.0,0.0,a);"
    .endl() + "}";
const bgShader = new CGL.Shader(cgl, "imgcompose bg");
bgShader.setSource(bgShader.getDefaultVertexShader(), bgFrag);
const uniBgAlpha = new CGL.Uniform(bgShader, "f", "a", bgAlpha);

let selectedFilter = CGL.Texture.FILTER_LINEAR;
let selectedWrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;

function initEffect()
{
    if (effect)effect.delete();
    if (tex)tex.delete();

    effect = new CGL.TextureEffect(cgl, { "isFloatingPointTexture": fpTexture.get() });

    tex = new CGL.Texture(cgl,
        {
            "name": "image compose",
            "isFloatingPointTexture": fpTexture.get(),
            "filter": selectedFilter,
            "wrap": selectedWrap,
            "width": Math.ceil(width.get()),
            "height": Math.ceil(height.get()),
        });

    effect.setSourceTexture(tex);
    texOut.set(CGL.Texture.getEmptyTexture(cgl));
    // texOut.set(effect.getCurrentSourceTexture());

    // texOut.set(effect.getCurrentSourceTexture());

    reInitEffect = false;

    // op.log("reinit effect");
    // tex.printInfo();
}

fpTexture.onChange = function ()
{
    reInitEffect = true;

    // var e1=cgl.gl.getExtension('EXT_color_buffer_float');
    // var e2=cgl.gl.getExtension('EXT_float_blend');
};

function updateResolution()
{
    if (!effect)initEffect();

    if (useVPSize.get())
    {
        w = cgl.getViewPort()[2];
        h = cgl.getViewPort()[3];
    }
    else
    {
        w = Math.ceil(width.get());
        h = Math.ceil(height.get());
    }

    if ((w != tex.width || h != tex.height) && (w !== 0 && h !== 0))
    {
        height.set(h);
        width.set(w);
        tex.setSize(w, h);
        outRatio.set(w / h);
        effect.setSourceTexture(tex);
        // texOut.set(null);
        texOut.set(CGL.Texture.getEmptyTexture(cgl));
        texOut.set(tex);
    }

    if (texOut.get() && selectedFilter != CGL.Texture.FILTER_NEAREST)
    {
        if (!texOut.get().isPowerOfTwo()) op.setUiError("hintnpot", "texture dimensions not power of two! - texture filtering when scaling will not work on ios devices.", 0);
        else op.setUiError("hintnpot", null, 0);
    }
    else op.setUiError("hintnpot", null, 0);

    // if (texOut.get())
    //     if (!texOut.get().isPowerOfTwo())
    //     {
    //         if (!op.uiAttribs.hint)
    //             op.uiAttr(
    //                 {
    //                     "hint": "texture dimensions not power of two! - texture filtering will not work.",
    //                     "warning": null
    //                 });
    //     }
    //     else
    //     if (op.uiAttribs.hint)
    //     {
    //         op.uiAttr({ "hint": null, "warning": null }); // todo only when needed...
    //     }
}

function updateSizePorts()
{
    if (useVPSize.get())
    {
        width.setUiAttribs({ "greyout": true });
        height.setUiAttribs({ "greyout": true });
    }
    else
    {
        width.setUiAttribs({ "greyout": false });
        height.setUiAttribs({ "greyout": false });
    }
}

useVPSize.onChange = function ()
{
    updateSizePorts();
    if (useVPSize.get())
    {
        width.onChange = null;
        height.onChange = null;
    }
    else
    {
        width.onChange = updateResolution;
        height.onChange = updateResolution;
    }
    updateResolution();
};

op.preRender = function ()
{
    doRender();
    bgShader.bind();
};

var doRender = function ()
{
    if (!effect || reInitEffect)
    {
        initEffect();
    }
    const vp = cgl.getViewPort();
    prevViewPort[0] = vp[0];
    prevViewPort[1] = vp[1];
    prevViewPort[2] = vp[2];
    prevViewPort[3] = vp[3];

    cgl.gl.blendFunc(cgl.gl.SRC_ALPHA, cgl.gl.ONE_MINUS_SRC_ALPHA);

    updateResolution();

    cgl.currentTextureEffect = effect;
    effect.setSourceTexture(tex);

    effect.startEffect();

    // render background color...
    cgl.pushShader(bgShader);
    cgl.currentTextureEffect.bind();
    cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);
    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();

    texOut.set(effect.getCurrentSourceTexture());
    // texOut.set(effect.getCurrentTargetTexture());

    // if(effect.getCurrentSourceTexture.filter==CGL.Texture.FILTER_MIPMAP)
    // {
    //         this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, effect.getCurrentSourceTexture.tex);
    //         effect.getCurrentSourceTexture.updateMipMap();
    //     // else
    //     // {
    //     //     this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureSource.tex);;
    //     //     this._textureSource.updateMipMap();
    //     // }

    //     this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null);
    // }

    effect.endEffect();

    cgl.setViewPort(prevViewPort[0], prevViewPort[1], prevViewPort[2], prevViewPort[3]);

    cgl.gl.blendFunc(cgl.gl.SRC_ALPHA, cgl.gl.ONE_MINUS_SRC_ALPHA);

    cgl.currentTextureEffect = null;
};

function onWrapChange()
{
    if (twrap.get() == "repeat") selectedWrap = CGL.Texture.WRAP_REPEAT;
    if (twrap.get() == "mirrored repeat") selectedWrap = CGL.Texture.WRAP_MIRRORED_REPEAT;
    if (twrap.get() == "clamp to edge") selectedWrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;

    reInitEffect = true;
    updateResolution();
}

twrap.set("repeat");
twrap.onChange = onWrapChange;

function onFilterChange()
{
    if (tfilter.get() == "nearest") selectedFilter = CGL.Texture.FILTER_NEAREST;
    if (tfilter.get() == "linear") selectedFilter = CGL.Texture.FILTER_LINEAR;
    if (tfilter.get() == "mipmap") selectedFilter = CGL.Texture.FILTER_MIPMAP;

    reInitEffect = true;
    updateResolution();
    // effect.setSourceTexture(tex);
    // updateResolution();
}

tfilter.set("linear");
tfilter.onChange = onFilterChange;

useVPSize.set(true);
render.onTriggered = doRender;
op.preRender = doRender;

width.set(640);
height.set(360);
onFilterChange();
onWrapChange();
updateSizePorts();
