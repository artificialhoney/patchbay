const
    render = op.inTrigger("render"),
    next = op.outTrigger("trigger"),
    inSize = op.inValue("Size", 1),
    inStrength = op.inValue("Strength", 0.5),
    inSmooth = op.inValueBool("Smooth", true),
    x = op.inValue("x"),
    y = op.inValue("y"),
    z = op.inValue("z");

const cgl = op.patch.cgl;

op.setPortGroup("Area Position", [x, y, z]);

const needsUpdateToZero = true;
const mscaleUni = null;
let shader = null;
const srcHeadVert = attachments.areascale_vert;
const uniforms = {};
const srcBodyVert = ""
    .endl() + "mMatrix=MOD_translate(mMatrix);" // modelMatrix*
    .endl();

let moduleVert = null;

render.onLinkChanged = removeModule;

function removeModule()
{
    if (shader && moduleVert) shader.removeModule(moduleVert);
    shader = null;
}

render.onTriggered = function ()
{
    if (!cgl.getShader())
    {
        next.trigger();
        return;
    }

    if (CABLES.UI)
    {
        if (op.isCurrentUiOp())
            gui.setTransformGizmo(
                {
                    "posX": x,
                    "posY": y,
                    "posZ": z
                });

        if (op.isCurrentUiOp())
        {
            cgl.pushModelMatrix();
            mat4.translate(cgl.mMatrix, cgl.mMatrix, [x.get(), y.get(), z.get()]);
            CABLES.GL_MARKER.drawSphere(op, inSize.get());
            cgl.popModelMatrix();
        }
    }


    if (cgl.getShader() != shader)
    {
        if (shader) removeModule();
        shader = cgl.getShader();

        moduleVert = shader.addModule(
            {
                "title": op.objName,
                "name": "MODULE_VERTEX_POSITION",
                srcHeadVert,
                srcBodyVert
            });

        uniforms.inSize = new CGL.Uniform(shader, "f", moduleVert.prefix + "size", inSize);
        uniforms.inStrength = new CGL.Uniform(shader, "f", moduleVert.prefix + "strength", inStrength);
        uniforms.inSmooth = new CGL.Uniform(shader, "f", moduleVert.prefix + "smooth", inSmooth);

        uniforms.x = new CGL.Uniform(shader, "f", moduleVert.prefix + "x", x);
        uniforms.y = new CGL.Uniform(shader, "f", moduleVert.prefix + "y", y);
        uniforms.z = new CGL.Uniform(shader, "f", moduleVert.prefix + "z", z);
    }

    if (!shader) return;
    next.trigger();
};
