const
    exec = op.inTrigger("Exec"),
    next = op.outTrigger("Next"),
    outX = op.outNumber("X"),
    outY = op.outNumber("Y"),
    outW = op.outNumber("Width"),
    outH = op.outNumber("Height");

exec.onTriggered = function ()
{
    const vp = op.patch.cgl.viewPort;

    outX.set(vp[0]);
    outY.set(vp[1]);
    outW.set(vp[2]);
    outH.set(vp[3]);

    next.trigger();
};
