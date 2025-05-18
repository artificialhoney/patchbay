const
    array = op.inArray("array"),
    index = op.inValueInt("index"),
    value = op.outObject("value");

let last = null;

array.ignoreValueSerialize = true;
value.ignoreValueSerialize = true;

index.onChange = update;
array.onChange = update;

op.toWorkPortsNeedToBeLinked(array);

function update()
{
    if (index.get() < 0)
    {
        value.set(null);
        return;
    }

    const arr = array.get();
    if (!arr)
    {
        value.set(null);
        return;
    }

    const ind = index.get();
    if (ind >= arr.length)
    {
        value.set(null);
        return;
    }
    if (arr[ind])
    {
        value.setRef(arr[ind]);
        last = arr[ind];
    }
}
