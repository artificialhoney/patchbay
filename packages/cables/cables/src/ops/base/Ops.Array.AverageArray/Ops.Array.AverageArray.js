const inArray = op.inArray("Array"),
    inIterations = op.inValueInt("Iterations", 1),
    inMode = op.inValueSelect("Mode", ["repeat", "clamp"], "repeat"),
    outArray = op.outArray("Smoothed array"),
    outArrayLength = op.outNumber("Array length");

let smoothed = [];

inArray.onChange = update;
inIterations.onChange = update;

function smooth(values)
{
    smoothed.length = values.length;
    let curr, prev, next, improved, i, pi, ni, mode;
    mode = inMode.get();

    for (i = 0; i < smoothed.length; i++)
    {
        pi = i - 1;
        ni = i + 1;
        curr = values[i];

        if (pi < 0)
        {
            if (mode == "repeat")
                prev = values[values.length - 1];
            else if (mode == "clamp")
                prev = curr;
        }
        else
            prev = smoothed[pi];

        if (ni == values.length)
        {
            if (mode == "repeat")
                next = values[0];
            else if (mode == "clamp")
                next = curr;
        }
        else
            next = values[ni];

        improved = (prev + curr + next) / 3;
        smoothed[i] = improved;
    }
    return smoothed;
}

function update()
{
    let array = inArray.get(), num = inIterations.get(), i;

    if (!array)
        return;

    for (i = 0; i < num; i++)
        array = smooth(array);

    outArray.set(null);
    outArray.set(array);
    outArrayLength.set(array.length);
}
