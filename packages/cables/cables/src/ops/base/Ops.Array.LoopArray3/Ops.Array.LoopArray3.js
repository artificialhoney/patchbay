const inArray = op.inArray("Array in"),
    outArray = op.outArray("Array out");

let newArray = [];

inArray.onChange = function ()
{
    let arr = inArray.get();
    if (!arr)
    {
        outArray.set(null);
        return;
    }

    if (newArray.length !== arr.length) newArray.length = arr.length + 3;
    let i;
    for (i = 0; i < arr.length; i += 3)
    {
        newArray[i + 0] = arr[i + 0];
        newArray[i + 1] = arr[i + 1];
        newArray[i + 2] = arr[i + 2];
    }

    newArray[i + 0] = arr[0];
    newArray[i + 1] = arr[1];
    newArray[i + 2] = arr[2];

    outArray.set(null);
    outArray.set(newArray);
};
