const exec = op.inTrigger("Exec");
const next = op.outTrigger("Next");

const cgl = op.patch.cgl;

let mm = mat4.create();
let mv = mat4.create();
let m = mat4.create();
let mempty = mat4.create();

exec.onTriggered = function ()
{
    mat4.invert(mm, cgl.mMatrix);
    mat4.invert(mv, cgl.vMatrix);

    mat4.mul(mm, mm, mv);

    mm[12] = 0;
    mm[13] = 0;
    mm[14] = 0;

    cgl.pushModelMatrix();
    cgl.pushViewMatrix();
    mat4.mul(cgl.mMatrix, cgl.mMatrix, mm);
    next.trigger();
    cgl.popViewMatrix();
    cgl.popModelMatrix();
};
