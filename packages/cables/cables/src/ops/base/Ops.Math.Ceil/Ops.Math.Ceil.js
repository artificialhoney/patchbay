const number1 = op.inValue("Number");
const result = op.outNumber("Result");

function exec()
{
    result.set(Math.ceil(number1.get()));
}

number1.onChange = exec;
