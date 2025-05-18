const exe = op.inTrigger("exe");
const callbackname = op.addInPort(new CABLES.Port(op, "callback name", CABLES.OP_PORT_TYPE_VALUE, { "type": "string" }));
const val0 = op.addInPort(new CABLES.Port(op, "value 1", CABLES.OP_PORT_TYPE_VALUE, { "type": "string" }));
const val1 = op.addInPort(new CABLES.Port(op, "value 2", CABLES.OP_PORT_TYPE_VALUE, { "type": "string" }));
const val2 = op.addInPort(new CABLES.Port(op, "value 3", CABLES.OP_PORT_TYPE_VALUE, { "type": "string" }));

let values = [0, 0, 0];

val0.onChange = function () { values[0] = val0.get(); };
val1.onChange = function () { values[1] = val1.get(); };
val2.onChange = function () { values[2] = val2.get(); };

exe.onTriggered = function ()
{
    if (op.patch.config.hasOwnProperty(callbackname.get()))
    {
        op.patch.config[callbackname.get()](values);
    }
    else
    {
        op.log("callback ", callbackname.get(), " not found! Parameters: ", values);
    }
};
