let render = op.inTrigger("render");
let blendMode = CGL.TextureEffect.AddBlendSelect(op, "blendMode");
let amount = op.inValueSlider("amount", 1);

let image = op.inTexture("image");
let removeAlphaSrc = op.inValueBool("removeAlphaSrc", false);

let imageAlpha = op.inTexture("imageAlpha");
let alphaSrc = op.inValueSelect("alphaSrc", ["alpha channel", "luminance", "luminance inv"]);
let invAlphaChannel = op.inValueBool("invert alpha channel");

const inAspect = op.inValueBool("Aspect Ratio", false);
const inAspectAxis = op.inValueSelect("Stretch Axis", ["X", "Y"], "X");
const inAspectPos = op.inValueSlider("Position", 0.0);
const inAspectCrop = op.inValueBool("Crop", false);

let trigger = op.outTrigger("trigger");

blendMode.set("normal");
let cgl = op.patch.cgl;
let shader = new CGL.Shader(cgl, "drawimage");

imageAlpha.onLinkChanged = updateAlphaPorts;

op.setPortGroup("Mask", [imageAlpha, alphaSrc, invAlphaChannel]);
op.setPortGroup("Aspect Ratio", [inAspect, inAspectPos, inAspectCrop, inAspectAxis]);

removeAlphaSrc.onChange = updateRemoveAlphaSrc;

function updateAlphaPorts()
{
    if (imageAlpha.isLinked())
    {
        removeAlphaSrc.setUiAttribs({ "greyout": true });
        alphaSrc.setUiAttribs({ "greyout": false });
        invAlphaChannel.setUiAttribs({ "greyout": false });
    }
    else
    {
        removeAlphaSrc.setUiAttribs({ "greyout": false });
        alphaSrc.setUiAttribs({ "greyout": true });
        invAlphaChannel.setUiAttribs({ "greyout": true });
    }
}

op.toWorkPortsNeedToBeLinked(image);

shader.setSource(attachments.drawimage_vert, attachments.drawimage_frag);
let textureUniform = new CGL.Uniform(shader, "t", "tex", 0);
let textureImaghe = new CGL.Uniform(shader, "t", "image", 1);
let textureAlpha = new CGL.Uniform(shader, "t", "imageAlpha", 2);

const uniTexAspect = new CGL.Uniform(shader, "f", "aspectTex", 1);
const uniAspectPos = new CGL.Uniform(shader, "f", "aspectPos", inAspectPos);

invAlphaChannel.onChange = function ()
{
    if (invAlphaChannel.get()) shader.define("INVERT_ALPHA");
    else shader.removeDefine("INVERT_ALPHA");
};

inAspect.onChange = updateAspectRatio;
inAspectCrop.onChange = updateAspectRatio;
inAspectAxis.onChange = updateAspectRatio;
function updateAspectRatio()
{
    shader.removeDefine("ASPECT_AXIS_X");
    shader.removeDefine("ASPECT_AXIS_Y");

    if (inAspect.get())
    {
        shader.define("ASPECT_RATIO");

        if (inAspectCrop.get()) shader.define("ASPECT_CROP");
        else shader.removeDefine("ASPECT_CROP");

        if (inAspectAxis.get() == "X") shader.define("ASPECT_AXIS_X");
        if (inAspectAxis.get() == "Y") shader.define("ASPECT_AXIS_Y");

        inAspectPos.setUiAttribs({ "greyout": false });
        inAspectCrop.setUiAttribs({ "greyout": false });
        inAspectAxis.setUiAttribs({ "greyout": false });
    }
    else
    {
        shader.removeDefine("ASPECT_RATIO");
        if (inAspectCrop.get()) shader.define("ASPECT_CROP");
        else shader.removeDefine("ASPECT_CROP");

        if (inAspectAxis.get() == "X") shader.define("ASPECT_AXIS_X");
        if (inAspectAxis.get() == "Y") shader.define("ASPECT_AXIS_Y");

        inAspectPos.setUiAttribs({ "greyout": true });
        inAspectCrop.setUiAttribs({ "greyout": true });
        inAspectAxis.setUiAttribs({ "greyout": true });
    }
}

function updateRemoveAlphaSrc()
{
    if (removeAlphaSrc.get()) shader.define("REMOVE_ALPHA_SRC");
    else shader.removeDefine("REMOVE_ALPHA_SRC");
}

alphaSrc.onChange = function ()
{
    shader.toggleDefine("ALPHA_FROM_LUMINANCE", alphaSrc.get() == "luminance");
    shader.toggleDefine("ALPHA_FROM_INV_UMINANCE", alphaSrc.get() == "luminance_inv");
};

alphaSrc.set("alpha channel");

{
    //
    // texture flip
    //
    let flipX = op.inValueBool("flip x");
    let flipY = op.inValueBool("flip y");

    flipX.onChange = function ()
    {
        if (flipX.get()) shader.define("TEX_FLIP_X");
        else shader.removeDefine("TEX_FLIP_X");
    };

    flipY.onChange = function ()
    {
        if (flipY.get()) shader.define("TEX_FLIP_Y");
        else shader.removeDefine("TEX_FLIP_Y");
    };
}

{
    //
    // texture transform
    //

    var doTransform = op.inValueBool("Transform");

    var scaleX = op.inValueSlider("Scale X", 1);
    var scaleY = op.inValueSlider("Scale Y", 1);

    var posX = op.inValue("Position X", 0);
    var posY = op.inValue("Position Y", 0);

    var rotate = op.inValue("Rotation", 0);

    let inClipRepeat = op.inValueBool("Clip Repeat", false);

    inClipRepeat.onChange = updateClip;
    function updateClip()
    {
        if (inClipRepeat.get()) shader.define("CLIP_REPEAT");
        else shader.removeDefine("CLIP_REPEAT");
    }

    let uniScaleX = new CGL.Uniform(shader, "f", "scaleX", scaleX);
    let uniScaleY = new CGL.Uniform(shader, "f", "scaleY", scaleY);

    let uniPosX = new CGL.Uniform(shader, "f", "posX", posX);
    let uniPosY = new CGL.Uniform(shader, "f", "posY", posY);
    let uniRotate = new CGL.Uniform(shader, "f", "rotate", rotate);

    doTransform.onChange = updateTransformPorts;
}

function updateTransformPorts()
{
    shader.toggleDefine("TEX_TRANSFORM", doTransform.get());
    if (doTransform.get())
    {
        // scaleX.setUiAttribs({hidePort:false});
        // scaleY.setUiAttribs({hidePort:false});
        // posX.setUiAttribs({hidePort:false});
        // posY.setUiAttribs({hidePort:false});
        // rotate.setUiAttribs({hidePort:false});

        scaleX.setUiAttribs({ "greyout": false });
        scaleY.setUiAttribs({ "greyout": false });
        posX.setUiAttribs({ "greyout": false });
        posY.setUiAttribs({ "greyout": false });
        rotate.setUiAttribs({ "greyout": false });
    }
    else
    {
        scaleX.setUiAttribs({ "greyout": true });
        scaleY.setUiAttribs({ "greyout": true });
        posX.setUiAttribs({ "greyout": true });
        posY.setUiAttribs({ "greyout": true });
        rotate.setUiAttribs({ "greyout": true });

        // scaleX.setUiAttribs({"hidePort":true});
        // scaleY.setUiAttribs({"hidePort":true});
        // posX.setUiAttribs({"hidePort":true});
        // posY.setUiAttribs({"hidePort":true});
        // rotate.setUiAttribs({"hidePort":true});
    }

    // op.refreshParams();
}

CGL.TextureEffect.setupBlending(op, shader, blendMode, amount);

let amountUniform = new CGL.Uniform(shader, "f", "amount", amount);

imageAlpha.onChange = function ()
{
    if (imageAlpha.get() && imageAlpha.get().tex)
    {
        shader.define("HAS_TEXTUREALPHA");
    }
    else
    {
        shader.removeDefine("HAS_TEXTUREALPHA");
    }
};

function doRender()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    let tex = image.get();
    if (tex && tex.tex && amount.get() > 0.0)
    {
        cgl.pushShader(shader);
        cgl.currentTextureEffect.bind();

        const imgTex = cgl.currentTextureEffect.getCurrentSourceTexture();
        cgl.setTexture(0, imgTex.tex);

        uniTexAspect.setValue(1 / (tex.height / tex.width * imgTex.width / imgTex.height));

        cgl.setTexture(1, tex.tex);
        // cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, image.get().tex );

        if (imageAlpha.get() && imageAlpha.get().tex)
        {
            cgl.setTexture(2, imageAlpha.get().tex);
            // cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, imageAlpha.get().tex );
        }

        cgl.currentTextureEffect.finish();
        cgl.popShader();
    }

    trigger.trigger();
}

render.onTriggered = doRender;
updateTransformPorts();
updateRemoveAlphaSrc();
updateAlphaPorts();
updateAspectRatio();
