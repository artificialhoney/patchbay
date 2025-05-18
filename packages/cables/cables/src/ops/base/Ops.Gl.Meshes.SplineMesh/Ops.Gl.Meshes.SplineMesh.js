const render = op.inTrigger("Render");
const trigger = op.addOutPort(new CABLES.Port(op, "Next", CABLES.OP_PORT_TYPE_FUNCTION));
const thick = op.inValue("Thickness");
const inStart = op.inValueSlider("Start");
const inLength = op.inValueSlider("Length", 1);
const calcNormals = op.inValueBool("Calculate Normals", false);
const inStrip = op.inValueBool("Line Strip", true);
const inPoints = op.inArray("points");
const inNumPoints = op.inValue("Num Points", 0);

const geomOut = op.addOutPort(new CABLES.Port(op, "geometry", CABLES.OP_PORT_TYPE_OBJECT));

geomOut.ignoreValueSerialize = true;

var geom = new CGL.Geometry("splinemesh");
const cgl = op.patch.cgl;

let draw = false;
let mesh = null;
var geom = null;
let needsBuild = true;

inPoints.onChange = rebuild;
thick.onChange = rebuild;
inNumPoints.onChange = rebuild;
inStrip.onChange = rebuild;
calcNormals.onChange = rebuild;
let numItems = 0;

render.onTriggered = function ()
{
    if (needsBuild)doRebuild();
    if (inLength.get() === 0 || inStart.get() == 1.0) return;


    if (mesh && draw)
    {
        mesh._bufVertexAttrib.startItem = Math.floor(
            inStart.get() * (numItems / 3)) * 3;
        mesh._bufVertexAttrib.numItems =
            Math.floor(
                Math.min(1, inLength.get() + inStart.get()) * (numItems)
            );

        mesh.render(cgl.getShader());
    }
    trigger.trigger();
};

function rebuild()
{
    needsBuild = true;
}

const vecRot = vec3.create();
const vecA = vec3.create();
const vecB = vec3.create();
const vecC = vec3.create();
const vecD = vec3.create();
const vStart = vec3.create();
const vEnd = vec3.create();
const q = quat.create();
const vecRotation = vec3.create();
vec3.set(vecRotation, 1, 0, 0);
const vecX = [1, 0, 0];
const vv = vec3.create();

let index = 0;

function linesToGeom(points, options)
{
    if (!geom)
        geom = new CGL.Geometry("splinemesh");

    let i = 0;

    points = points || [];

    if (points.length === 0)
    {
        for (i = 0; i < 8; i++)
        {
            points.push(Math.random() * 2 - 1);
            points.push(Math.random() * 2 - 1);
            points.push(0);
        }
    }

    let numPoints = points.length;
    if (inNumPoints.get() != 0 &&
        inNumPoints.get() * 3 < points.length)numPoints = (inNumPoints.get() - 1) * 3;

    if (numPoints < 2)
    {
        draw = false;
        return;
    }

    const count = 0;
    const lastPA = null;
    const lastPB = null;

    if ((numPoints / 3) * 18 > geom.vertices.length)
    {
        geom.vertices = new Float32Array((numPoints / 3 * 18));
        geom.texCoords = new Float32Array((numPoints / 3 * 12));
    }

    index = 0;

    let indexTc = 0;
    let lastC = null;
    let lastD = null;

    const m = (thick.get() || 0.1) / 2;
    const ppl = p / numPoints;

    const pi2 = Math.PI / 4;

    const strip = inStrip.get();

    let it = 3;
    if (!strip)it = 6;
    const vv = vec3.create();

    for (var p = 0; p < numPoints; p += it)
    {
        vec3.set(vStart,
            points[p + 0],
            points[p + 1],
            points[p + 2]);

        vec3.set(vEnd,
            points[p + 3],
            points[p + 4],
            points[p + 5]);

        vv[0] = vStart[0] - vEnd[0];
        vv[1] = vStart[1] - vEnd[1];
        vv[2] = vStart[2] - vEnd[2];

        vec3.normalize(vv, vv);
        quat.rotationTo(q, vecX, vv);
        quat.rotateZ(q, q, pi2);
        vec3.transformQuat(vecRot, vecRotation, q);

        if (strip)
        {
            if (lastC)
            {
                vec3.copy(vecA, lastC);
                vec3.copy(vecB, lastD);
            }
            else
            {
                vec3.set(vecA,
                    points[p + 0] + vecRot[0] * m,
                    points[p + 1] + vecRot[1] * m,
                    points[p + 2] + vecRot[2] * m);

                vec3.set(vecB,
                    points[p + 0] + vecRot[0] * -m,
                    points[p + 1] + vecRot[1] * -m,
                    points[p + 2] + vecRot[2] * -m);
            }
        }
        else
        {
            vec3.set(vecA,
                points[p + 0] + vecRot[0] * m,
                points[p + 1] + vecRot[1] * m,
                points[p + 2] + vecRot[2] * m);

            vec3.set(vecB,
                points[p + 0] + vecRot[0] * -m,
                points[p + 1] + vecRot[1] * -m,
                points[p + 2] + vecRot[2] * -m);
        }

        vec3.set(vecC,
            points[p + 3] + vecRot[0] * m,
            points[p + 4] + vecRot[1] * m,
            points[p + 5] + vecRot[2] * m);

        vec3.set(vecD,
            points[p + 3] + vecRot[0] * -m,
            points[p + 4] + vecRot[1] * -m,
            points[p + 5] + vecRot[2] * -m);


        //    A-----C
        //    |     |
        //    B-----D
        //
        // var xd = vecC[0]-vecA[0];
        // var yd = vecC[1]-vecA[1];
        // var zd = vecC[2]-vecA[2];
        // var dist = 3*Math.sqrt(xd*xd + yd*yd + zd*zd);

        let repx0 = 0;
        const repy0 = 0;
        let repx = 1;
        const repy = 1;

        repx0 = p / (numPoints);
        repx = repx0 + 1 / (numPoints / 3);


        // a
        geom.vertices[index++] = vecA[0];
        geom.vertices[index++] = vecA[1];
        geom.vertices[index++] = vecA[2];

        geom.texCoords[indexTc++] = repx0;
        geom.texCoords[indexTc++] = repy0;

        // b
        geom.vertices[index++] = vecB[0];
        geom.vertices[index++] = vecB[1];
        geom.vertices[index++] = vecB[2];

        geom.texCoords[indexTc++] = repx0;
        geom.texCoords[indexTc++] = repy;

        // c
        geom.vertices[index++] = vecC[0];
        geom.vertices[index++] = vecC[1];
        geom.vertices[index++] = vecC[2];

        geom.texCoords[indexTc++] = repx;
        geom.texCoords[indexTc++] = repy0;

        // d
        geom.vertices[index++] = vecD[0];
        geom.vertices[index++] = vecD[1];
        geom.vertices[index++] = vecD[2];


        geom.texCoords[indexTc++] = repx;
        geom.texCoords[indexTc++] = repy;

        // c
        geom.vertices[index++] = vecC[0];
        geom.vertices[index++] = vecC[1];
        geom.vertices[index++] = vecC[2];

        geom.texCoords[indexTc++] = repx;
        geom.texCoords[indexTc++] = repy0;

        // b
        geom.vertices[index++] = vecB[0];
        geom.vertices[index++] = vecB[1];
        geom.vertices[index++] = vecB[2];

        geom.texCoords[indexTc++] = repx0;
        geom.texCoords[indexTc++] = repy;

        if (!lastC)
        {
            lastC = vec3.create();
            lastD = vec3.create();
        }

        if (strip)
        {
            lastC[0] = vecC[0];
            lastC[1] = vecC[1];
            lastC[2] = vecC[2];

            lastD[0] = vecD[0];
            lastD[1] = vecD[1];
            lastD[2] = vecD[2];
        }
    }
}

function doRebuild()
{
    draw = true;
    const points = inPoints.get() || [];


    if (!points.length)
    {
        mesh = null;
        geomOut.set(null);
        return;
    }

    linesToGeom(points);

    if (!mesh)
        mesh = new CGL.Mesh(cgl, geom);

    geomOut.set(null);
    geomOut.set(geom);

    if (!draw)
        return;

    numItems = index / 3;

    const attr = mesh.setAttribute(CGL.SHADERVAR_VERTEX_POSITION, geom.vertices, 3);
    attr.numItems = numItems;

    const attr2 = mesh.setAttribute(CGL.SHADERVAR_VERTEX_TEXCOORD, geom.texCoords, 2);
    attr2.numItems = numItems;


    if (calcNormals.get())geom.calculateNormals({ "forceZUp": true });

    needsBuild = false;
}
