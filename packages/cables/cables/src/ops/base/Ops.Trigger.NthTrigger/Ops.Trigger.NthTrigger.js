var exe=op.inTriggerButton("Exe");
var nth=op.inValue("Nth");
var next=op.outTrigger("next");

var count=0;
var lastFrame=-1;

nth.onChange=reset;

function reset()
{
    count=0;
}


exe.onTriggered=function()
{
    if(op.patch._frameNum!=lastFrame) count=0;
    lastFrame=op.patch._frameNum;

    if(count==nth.get())
    {
        next.trigger();
        count=0;
    }
    count++;
    
};