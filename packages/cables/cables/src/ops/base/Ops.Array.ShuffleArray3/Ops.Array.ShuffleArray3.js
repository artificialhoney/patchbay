const
    inArr = op.inArray("Array3"),
    inSeed = op.inFloat("Seed", 1),
    outArr = op.outArray("Result");

const newArr = [];
const rndArr = [];
inArr.onChange = update;
inSeed.onChange = update;

function fisherYatesShuffle(array)
{
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = array.length - 1; i >= 0; i -= 1)
    {
        j = Math.floor(Math.seededRandom() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function update()
{
    const arr = inArr.get();

    if (!arr || arr.length % 3 !== 0) return;
    if (arr.length != newArr.length) newArr.length = arr.length;

    let i = 0;
    let j = 0;
    const temp = null;
    Math.randomSeed = inSeed.get() + 1;

    for (i = 0; i < arr.length; i += 3) rndArr[i / 3] = i;

    fisherYatesShuffle(rndArr);

    for (i = 0; i < arr.length; i += 3)
    {
        j = rndArr[i / 3];

        newArr[i + 0] = arr[j + 0];
        newArr[i + 1] = arr[j + 1];
        newArr[i + 2] = arr[j + 2];
    }

    outArr.setRef(newArr);
}
