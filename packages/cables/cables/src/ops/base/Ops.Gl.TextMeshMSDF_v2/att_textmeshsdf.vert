UNI sampler2D tex1;
UNI sampler2D tex2;
UNI sampler2D tex3;
UNI sampler2D tex4;

UNI mat4 projMatrix;
UNI mat4 modelMatrix;
UNI mat4 viewMatrix;

IN vec3 vPosition;
IN vec2 attrTexCoord;
IN mat4 instMat;
IN vec2 attrTexOffsets;
IN vec2 attrSize;
IN vec2 attrTcSize;
IN float attrPage;
IN vec4 attrColors;

OUT vec2 texCoord;
OUT float texIndex;
OUT vec4 fragAttrColors;




const float mulSize=0.01;

void main()
{
    texCoord=(attrTexOffsets+attrTexCoord*attrTcSize);
    texCoord.y=1.0-texCoord.y;

    mat4 instMVMat=instMat;
    vec4 vert=vec4( vPosition, 1. );
    vert.x*=attrSize.x*mulSize;
    vert.y*=attrSize.y*mulSize;

    fragAttrColors=attrColors;

    texIndex=attrPage+0.4; // strange ios rounding errors?!

    mat4 mvMatrix=viewMatrix * modelMatrix * instMVMat;

    gl_Position = projMatrix * mvMatrix * vert;
}
