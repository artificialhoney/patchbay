
var data=op.addInPort(new CABLES.Port(op,"data",CABLES.OP_PORT_TYPE_OBJECT ));
var key=op.addInPort(new CABLES.Port(op,"key",CABLES.OP_PORT_TYPE_VALUE,{type:'string'} ));
var result=op.addOutPort(new CABLES.Port(op,"result",CABLES.OP_PORT_TYPE_ARRAY));
var arrLength=op.addOutPort(new CABLES.Port(op,"Length",CABLES.OP_PORT_TYPE_VALUE));

result.ignoreValueSerialize=true;
data.ignoreValueSerialize=true;

data.onChange=update;
key.onChange=update;
    
function update()
{
    if(data.get() && data.get().hasOwnProperty(key.get()))
    {
        result.set(data.val[key.get()]);
        arrLength.set(result.get().length);
    }
}
