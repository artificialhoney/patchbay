const
    bool = op.inValueBool("bool"),
    number = op.outNumber("number");

bool.onChange = function ()
{
    if (bool.get()) number.set(1);
    else number.set(0);
};
