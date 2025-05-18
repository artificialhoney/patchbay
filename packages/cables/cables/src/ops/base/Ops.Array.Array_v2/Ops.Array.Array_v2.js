const
    inLength = op.inValueInt("Array length", 10),
    modeSelect = op.inSwitch("Mode select", ["Number", "1,2,3,4", "0-1", "1-0"], "Number"),
    inDefaultValue = op.inValueFloat("Default Value"),
    outArr = op.outArray("Array"),
    outArrayLength = op.outNumber("Array length out");

let arr = [];
let selectIndex = 0;
const MODE_NUMBER = 0;
const MODE_1_TO_4 = 1;
const MODE_0_TO_1 = 2;
const MODE_1_TO_0 = 3;

op.setUiAttrib({ "extendTitlePort": modeSelect.name });

modeSelect.onChange = onFilterChange;

inDefaultValue.onChange =
    inLength.onChange = () =>
    {
        reset();
    };

onFilterChange();
reset();

function onFilterChange()
{
    let selectedMode = modeSelect.get();
    if (selectedMode === "Number") selectIndex = MODE_NUMBER;
    else if (selectedMode === "1,2,3,4") selectIndex = MODE_1_TO_4;
    else if (selectedMode === "0-1") selectIndex = MODE_0_TO_1;
    else if (selectedMode === "1-0") selectIndex = MODE_1_TO_0;

    if (selectIndex === MODE_NUMBER)
    {
        inDefaultValue.setUiAttribs({ "greyout": false });
    }
    else if (selectIndex === MODE_1_TO_4)
    {
        inDefaultValue.setUiAttribs({ "greyout": true });
    }
    else if (selectIndex === MODE_0_TO_1)
    {
        inDefaultValue.setUiAttribs({ "greyout": true });
    }
    else if (selectIndex === MODE_1_TO_0)
    {
        inDefaultValue.setUiAttribs({ "greyout": true });
    }

    reset();
}

function reset()
{
    arr.length = 0;

    let arrLength = inLength.get();
    let valueForArray = inDefaultValue.get();
    let i;

    // mode 0 - fill all array values with one number
    if (selectIndex === MODE_NUMBER)
    {
        for (i = 0; i < arrLength; i++)
        {
            arr[i] = valueForArray;
        }
    }
    // mode 1 Continuous number array - increments up to array length
    else if (selectIndex === MODE_1_TO_4)
    {
        for (i = 0; i < arrLength; i++)
        {
            arr[i] = i;
        }
    }
    // mode 2 Normalized array
    else if (selectIndex === MODE_0_TO_1)
    {
        for (i = 0; i < arrLength; i++)
        {
            arr[i] = i / arrLength;
        }
    }
    // mode 3 reversed Normalized array
    else if (selectIndex === MODE_1_TO_0)
    {
        for (i = 0; i < arrLength; i++)
        {
            arr[i] = 1 - i / arrLength;
        }
    }

    outArr.setRef(arr);
    outArrayLength.set(arr.length);
}
