const render=op.inTrigger('render');
const rotX=op.inValue('RotX');
const rotY=op.inValue('RotY');
const rotZ=op.inValue('RotZ');
const scale=op.inValue('Scale', 1);
const offset=op.inValue('Offset');
const amount=op.inValue('Amount');
const limited=op.inValueBool('Limited', true);
const next=op.outTrigger("trigger")

const srcHeadVert=attachments.bend_vert;
const srcBodyVert=''
    .endl()+'   MOD_bendDistort(pos.xyz, norm);'
    .endl();

var uniAmount=null;
var uniRange=null;
var uniTransMatrix=null;
var uniInvTransMatrix=null;
var cgl=op.patch.cgl;
var shader=null;
var mod=null;

var matricesValid = false;
var transMatrix = mat4.create();
var invTransMatrix = mat4.create();
var amountRadians = 0;

function invalidateMatrices() {
    matricesValid = false;
}

rotX.onChange=invalidateMatrices;
rotY.onChange=invalidateMatrices;
rotZ.onChange=invalidateMatrices;
scale.onChange=invalidateMatrices;
offset.onChange=invalidateMatrices;

amount.onChange=function() { amountRadians = amount.get()*CGL.DEG2RAD; };

function updateRange()
{
    if(uniRange)uniRange.setValue(limited.get() ? [0, 1] : [-Infinity, Infinity]);
}

limited.onChange=updateRange;

mat4.identity(transMatrix);
mat4.identity(invTransMatrix);

var tvec = vec3.create();
var svec = vec4.create();
function updateMatrices() {
    if (matricesValid) return;

    vec3.set(tvec, offset.get(), 0, 0);

    var s = 1 / scale.get();
    vec3.set(svec, s, s, s);

    mat4.identity(transMatrix);
    mat4.translate(transMatrix, transMatrix, tvec);

    mat4.rotateX(transMatrix, transMatrix, rotX.get()*CGL.DEG2RAD);
    mat4.rotateY(transMatrix, transMatrix, rotY.get()*CGL.DEG2RAD);
    mat4.rotateZ(transMatrix, transMatrix, rotZ.get()*CGL.DEG2RAD);

    mat4.scale(transMatrix, transMatrix, svec);

    mat4.invert(invTransMatrix, transMatrix);
    matricesValid = true;
}

function removeModule()
{
    if(shader && mod)
    {
        shader.removeModule(mod);
        shader=null;
    }
}

render.onLinkChanged=removeModule;
render.onTriggered=function()
{
    if(cgl.getShader()!=shader)
    {
        if(shader) removeModule();
        shader=cgl.getShader();
        mod=shader.addModule(
            {
                name:'MODULE_VERTEX_POSITION',
                srcHeadVert:attachments.bend_vert,
                srcBodyVert:srcBodyVert
            });

        uniAmount=new CGL.Uniform(shader,'f',mod.prefix+'amount',0);
        uniRange=new CGL.Uniform(shader,'2f',mod.prefix+'range', [0, 1]);
        uniTransMatrix=new CGL.Uniform(shader,'m4',mod.prefix+'transMatrix',transMatrix);
        uniInvTransMatrix=new CGL.Uniform(shader,'m4',mod.prefix+'invTransMatrix',invTransMatrix);
        updateRange();
    }

    updateMatrices();
    uniAmount.setValue(amountRadians);
    next.trigger();
};
