const
    inArr = op.inArray("Coordinates"),
    inRad = op.inFloat("Radius", 1),
    outArr = op.outArray("Result");

let arr = [];
inRad.onChange =
    inArr.onChange = update;

function update()
{
    let iarr = inArr.get();

    if (!iarr) return outArr.set(null);


    let l = iarr.length / 2 * 3;
    arr.length = l;
    const radius = inRad.get();

    for (let i = 0; i < iarr.length; i += 2)
    {
        const
            lat = iarr[i + 0],
            lon = iarr[i + 1],
            phi = (90 - lat) * (Math.PI / 180),
            theta = (lon + 180) * (Math.PI / 180);

        const x = -((radius) * Math.sin(phi) * Math.cos(theta)),
            z = ((radius) * Math.sin(phi) * Math.sin(theta)),
            y = ((radius) * Math.cos(phi));

        arr[i / 2 * 3 + 0] = x;
        arr[i / 2 * 3 + 1] = y;
        arr[i / 2 * 3 + 2] = z;
    }

    outArr.setRef(arr);
}
