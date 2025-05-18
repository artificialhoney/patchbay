const number1 = op.inValue("number1");
const number2 = op.inValue("number2");
const result = op.outBoolNum("result");

op.setUiAttribs({ "mathTitle": true });

number1.onChange = exec;
number2.onChange = exec;
exec();

function exec()
{
    result.set(number1.get() < number2.get());
}
