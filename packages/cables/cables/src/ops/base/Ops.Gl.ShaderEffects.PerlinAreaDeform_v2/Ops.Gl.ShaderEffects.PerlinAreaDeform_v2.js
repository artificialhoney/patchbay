
let cgl = op.patch.cgl;

op.render = op.addInPort(new CABLES.Port(this, "render", CABLES.OP_PORT_TYPE_FUNCTION));
op.trigger = op.addOutPort(new CABLES.Port(this, "trigger", CABLES.OP_PORT_TYPE_FUNCTION));

let inScale = op.inValue("Scale", 1);
let inSize = op.inValue("Size", 1);
let inStrength = op.inValue("Strength", 1);
let inSmooth = op.inValueBool("Smooth", true);

let output = op.inValueSelect("Output", ["Add XYZ", "Add Z"], "Add XYZ");

let x = op.inValue("x");
let y = op.inValue("y");
let z = op.inValue("z");

let scrollx = op.inValue("Scroll X");
let scrolly = op.inValue("Scroll Y");
let scrollz = op.inValue("Scroll Z");


let shader = null;

let inWorldSpace = op.inValueBool("WorldSpace");

let moduleVert = null;

function removeModule()
{
    if (shader && moduleVert) shader.removeModule(moduleVert);
    shader = null;
}


output.onChange = updateOutput;
op.render.onLinkChanged = removeModule;


inWorldSpace.onChange = updateWorldspace;

function updateOutput()
{
    if (!shader) return;
    if (output.get() == "Add XYZ") shader.define(moduleVert.prefix + "METH_ADD_XYZ");
    else shader.removeDefine(moduleVert.prefix + "METH_ADD_XYZ");

    if (output.get() == "Add Z") shader.define(moduleVert.prefix + "METH_ADD_Z");
    else shader.removeDefine(moduleVert.prefix + "METH_ADD_Z");
}

function updateWorldspace()
{
    if (!shader) return;
    shader.toggleDefine(moduleVert.prefix + "WORLDSPACE", inWorldSpace.get());
}

function getScaling(mat)
{
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];
    return Math.hypot(m31, m32, m33);
}

op.render.onTriggered = function ()
{
    if (!cgl.getShader())
    {
        op.trigger.trigger();
        return;
    }


    if (CABLES.UI)
    {
        cgl.pushModelMatrix();
        mat4.identity(cgl.mMatrix);

        if (cgl.shouldDrawHelpers(op))
        {
            cgl.pushModelMatrix();
            mat4.translate(cgl.mMatrix, cgl.mMatrix, [x.get(), y.get(), z.get()]);
            CABLES.GL_MARKER.drawSphere(op, inSize.get());
            cgl.popModelMatrix();
        }

        if (op.isCurrentUiOp())
            gui.setTransformGizmo(
                {
                    "posX": x,
                    "posY": y,
                    "posZ": z
                });


        cgl.popModelMatrix();
    }


    if (cgl.getShader() != shader)
    {
        if (shader) removeModule();
        shader = cgl.getShader();

        moduleVert = shader.addModule(
            {
                "title": op.objName,
                "name": "MODULE_VERTEX_POSITION",
                "srcHeadVert": attachments.perlindeform_vert,
                "srcBodyVert": attachments.perlindeform_body_vert

            });

        inSize.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "size", inSize);
        inStrength.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "strength", inStrength);
        inSmooth.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "smooth", inSmooth);
        inScale.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "scale", inScale);

        scrollx.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "scrollx", scrollx);
        scrolly.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "scrolly", scrolly);
        scrollz.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "scrollz", scrollz);

        x.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "x", x);
        y.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "y", y);
        z.uniform = new CGL.Uniform(shader, "f", moduleVert.prefix + "z", z);

        updateOutput();
        updateWorldspace();
    }


    if (!shader) return;

    op.trigger.trigger();
};
