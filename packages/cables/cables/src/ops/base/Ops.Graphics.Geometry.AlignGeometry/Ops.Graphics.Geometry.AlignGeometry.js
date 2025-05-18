const
    geometry = op.inObject("Geometry"),
    x = op.inValueSelect("X", ["Ignore", "Center", "Max", "Min"], "Ignore"),
    y = op.inValueSelect("Y", ["Ignore", "Center", "Max", "Min"], "Ignore"),
    z = op.inValueSelect("Z", ["Ignore", "Center", "Max", "Min"], "Ignore"),
    outGeom = op.outObject("Result");

x.onChange = y.onChange = z.onChange = geometry.onChange = update;

const
    axis = [0, 0, 0],
    ALIGN_NONE = 0,
    ALIGN_CENTER = 1,
    ALIGN_MAX = 2,
    ALIGN_MIN = 3;

let geom = null;

function getAxisId(port)
{
    if (port.get() == "Ignore") return ALIGN_NONE;
    if (port.get() == "Center") return ALIGN_CENTER;
    if (port.get() == "Max") return ALIGN_MAX;
    if (port.get() == "Min") return ALIGN_MIN;
}

function update()
{
    const oldGeom = geometry.get();

    if (!oldGeom)
    {
        outGeom.set(null);
        return;
    }

    axis[0] = getAxisId(x);
    axis[1] = getAxisId(y);
    axis[2] = getAxisId(z);

    const bounds = oldGeom.getBounds();
    geom = oldGeom.copy();

    for (let axi = 0; axi < 3; axi++)
    {
        let min = 0, max = 0;
        if (axi === 0)
        {
            min = bounds.minX;
            max = bounds.maxX;
        }
        else if (axi == 1)
        {
            min = bounds.minY;
            max = bounds.maxY;
        }
        else if (axi == 2)
        {
            min = bounds.minZ;
            max = bounds.maxZ;
        }

        if (axis[axi] == ALIGN_NONE)
        {
            for (let i = 0; i < geom.vertices.length; i += 3)
                geom.vertices[i + axi] = oldGeom.vertices[i + axi];
        }
        else if (axis[axi] == ALIGN_CENTER)
        {
            const off = min + (max - min) / 2;
            for (let i = 0; i < geom.vertices.length; i += 3)
                geom.vertices[i + axi] = oldGeom.vertices[i + axi] - off;
        }
        else if (axis[axi] == ALIGN_MAX)
        {
            for (let i = 0; i < geom.vertices.length; i += 3)
                geom.vertices[i + axi] = oldGeom.vertices[i + axi] - max;
        }
        else if (axis[axi] == ALIGN_MIN)
        {
            for (let i = 0; i < geom.vertices.length; i += 3)
                geom.vertices[i + axi] = oldGeom.vertices[i + axi] - min;
        }
    }

    outGeom.setRef(geom);
}
