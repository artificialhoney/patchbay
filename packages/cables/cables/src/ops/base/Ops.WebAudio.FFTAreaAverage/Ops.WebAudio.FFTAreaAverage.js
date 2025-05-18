const
    refresh = op.inTriggerButton("refresh"),
    fftArr = op.inArray("FFT Array"),
    x = op.inValueSlider("x"),
    y = op.inValueSlider("y"),
    w = op.inValueSlider("width", 0.2),
    h = op.inValueSlider("height", 0.2),
    drawTex = op.inValueBool("Create Texture", true),
    texOut = op.outTexture("texture_out"),
    value = op.outValue("value");

const cgl = op.patch.cgl;
let data = [];
let line = 0;
let size = 128;

const canvas = document.createElement("canvas");
canvas.id = "fft_" + CABLES.uuid();
canvas.width = canvas.height = size;
canvas.style.display = "none";
let body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let areaX = 0;
let areaY = 0;
let areaW = 20;
let areaH = 20;
let amount = 0;

refresh.onTriggered = function ()
{
    let arr = fftArr.get();
    if (!arr) return;
    let width = arr.length;

    const draw = drawTex.get();

    if (draw)
    {
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#ff0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#888";
        for (let i = 0; i < arr.length; i++)
            ctx.fillRect(i, size - arr[i], 1, arr[i]);
    }

    areaX = x.get() * canvas.width;
    areaY = y.get() * canvas.height;

    areaW = w.get() * size / 2;
    areaH = h.get() * size / 2;

    if (draw)ctx.rect(areaX, areaY, areaW, areaH);
    if (draw)ctx.stroke();

    let val = 0;
    let count = 0;
    for (let xc = areaX; xc < areaX + areaW; xc++)
        for (let yc = areaY; yc < areaY + areaH; yc++)
            if (arr[Math.round(xc)] > size - yc)count++;

    if (amount != amount)amount = 0;
    amount += count / (areaW * areaH);
    amount /= 2;
    value.set(amount);

    if (draw)
    {
        ctx.fillStyle = "#ff0";
        ctx.fillRect(0, 0, amount * canvas.width, 5);

        if (texOut.get()) texOut.get().initTexture(canvas, CGL.Texture.FILTER_NEAREST);
        else texOut.set(new CGL.Texture.createFromImage(cgl, canvas, { "filter": CGL.Texture.FILTER_NEAREST, "name": "fft area texture" }));
    }
};
