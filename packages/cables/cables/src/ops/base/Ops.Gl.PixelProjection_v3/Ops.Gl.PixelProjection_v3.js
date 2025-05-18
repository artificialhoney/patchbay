const
    render = op.inTrigger("render"),
    inSize = op.inSwitch("Size", ["Canvas", "ViewPort", "Manual"], "Canvas"),

    width = op.inFloat("Width", 500),
    height = op.inFloat("Height", 500),
    zNear = op.inFloat("frustum near", -500),
    zFar = op.inFloat("frustum far", 500),
    inAlign = op.inSwitch("Position 0,0", ["Top Left", "Top Right", "Center", "Bottom Right", "Bottom Left"], "Bottom Left"),

    flipX = op.inBool("Flip X", false),
    flipY = op.inBool("Flip Y", false),
    zeroY = op.inBool("Zero Y", false),
    trigger = op.outTrigger("trigger"),
    outWidth = op.outNumber("Size Width"),
    outHeight = op.outNumber("Size Height");

const cgl = op.patch.cgl;

op.setPortGroup("Size", [inSize, width, height]);
op.setPortGroup("Clipping", [zNear, zFar]);
op.setPortGroup("Flip", [flipX, flipY]);
op.toWorkPortsNeedToBeLinked(render);

render.onTriggered = exec;
inSize.onChange = updateSizeUI;
updateSizeUI();

function updateSizeUI()
{
    width.setUiAttribs({ "greyout": inSize.get() != "Manual" });
    height.setUiAttribs({ "greyout": inSize.get() != "Manual" });
}

function exec()
{
    let xl = 0;
    let yt = 0;
    let xr = 0;
    let yb = 0;

    let w = width.get();
    let h = height.get();

    let x0 = 0;
    let y0 = 0;

    if (inSize.get() == "Canvas")
    {
        w = xr = cgl.canvasWidth / cgl.pixelDensity;
        h = yb = cgl.canvasHeight / cgl.pixelDensity;
    }
    else if (inSize.get() == "ViewPort")
    {
        w = xr = cgl.viewPort[2];
        h = yb = cgl.viewPort[3];
    }
    else
    {
        xr = w;
        yb = h;
    }

    outWidth.set(w);
    outHeight.set(h);

    if (flipX.get())
    {
        const temp = xr;
        xr = x0;
        xl = temp;
    }

    if (flipY.get())
    {
        const temp = yb;
        yb = y0;
        yt = temp;
    }

    if (inAlign.get() === "Center")
    {
        xl -= w / 2;
        xr -= w / 2;
        yt -= h / 2;
        yb -= h / 2;
    }
    else
    if (inAlign.get() === "Bottom Right")
    {
        xl -= w;
        xr = x0;
        yt = y0;
        yb = -h;
    }
    else
    if (inAlign.get() === "Top Right")
    {
        xl -= w;
        xr = x0;
        yt -= h;
        yb = y0;
    }
    if (inAlign.get() === "Top Left")
    {
        xl = x0;
        xr = w;
        yt = -h;
        yb = y0;
    }

    cgl.pushPMatrix();

    mat4.ortho(
        cgl.pMatrix,
        xl,
        xr,
        yt,
        yb,
        zNear.get(),
        zFar.get()
    );

    trigger.trigger();
    cgl.popPMatrix();
}
