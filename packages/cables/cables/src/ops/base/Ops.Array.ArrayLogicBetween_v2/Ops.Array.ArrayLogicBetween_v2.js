const
    inArray = op.inArray("Array"),
    inMin = op.inFloat("Min", 0),
    inMax = op.inFloat("Max", 0.5),
    inPass = op.inBool("pass value when true", false),
    outArray = op.outArray("Result");

inArray.onChange =
inMin.onChange =
inMax.onChange =
inPass.onChange =
function update()
{
    let arr = inArray.get();
    if (!arr) return;

    let pass = inPass.get();
    const min = inMin.get();
    const max = inMax.get();

    let newArr = [];
    newArr.length = arr.length;

    if (!pass)
    {
        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] > min && arr[i] < max)
            {
                newArr[i] = 1.0;
            }
            else newArr[i] = 0.0;
        }
    }
    else
    {
        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] > min && arr[i] < max)
            {
                newArr[i] = arr[i];
            }
            else newArr[i] = 0.0;
        }
    }
    outArray.set(null);
    outArray.set(newArr);
};
