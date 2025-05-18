const
    inForm=op.inValueSelect("Formula",[1,2,3],1),
    inA=op.inValueInt("A",5),
    inB=op.inValueInt("B",4),
    inC=op.inValueInt("C",1),
    inD=op.inValueInt("D",2),
    result=op.outArray("Result"),
    outTotalPoints = op.outNumber("Total points"),
    outArrayLength = op.outNumber("Array length");

inForm.onChange=inA.onChange=inB.onChange=inC.onChange=inD.onChange=calc;
calc();

function calc()
{
    var numPoints=13200;
    var step=40;

    var arr=[];
    var x=0,y=0,z=0;
    var form=parseInt(inForm.get());
    var th=0.03;

    for(var i = 0; i < numPoints; i+=step)
    {
        var index=i/step;

        if(form==1)
        {
            x=Math.sin( (i * inA.get()) * 0.001 );
            y=Math.cos( (i * inB.get()) * 0.001 );
            z=Math.sin( (i * inC.get()) * 0.001 );
        }
        else if(form==2)
        {
            x=(Math.cos( (i * inA.get()) * 0.001 )+Math.cos( (i * inB.get()) * 0.001 ) )/2;
            y=(Math.sin( (i * inA.get()) * 0.001 )+Math.sin( (i * inC.get()) * 0.001 ) )/2;
            z=(Math.sin( (i * inD.get()) * 0.001 ));
        }
        else if(form==3)
        {
            x=(Math.sin( (i * inA.get()) * 0.001 )*(1+Math.cos( (i * inB.get()) * 0.001 ) ))/2;
            y=(Math.sin( (i * inA.get()) * 0.001 )*(1+Math.sin( (i * inC.get()) * 0.001 ) ))/2;
            z=(Math.sin( (i * inD.get()) * 0.001 ));
        }

        arr[index*3+0] = x;
        arr[index*3+1] = y;
        arr[index*3+2] = z;

        if(index>10 && Math.abs(x-arr[0])<th && Math.abs(y-arr[1])<th && Math.abs(z-arr[2])<th)
        {
            // this method sucks but kinda works....
            break;
        }
    }

    result.set(arr);
    outTotalPoints.set(arr.length/3);
    outArrayLength.set(arr.length);
}

