UNI sampler2D tex;
UNI mat4 projMatrix;
UNI mat4 modelMatrix;
UNI mat4 viewMatrix;
UNI float scale;
IN vec3 vPosition;
IN vec2 attrTexCoord;
IN mat4 instMat;
IN vec2 attrTexOffsets;
IN vec2 attrSize;
IN vec2 attrTcSize;

OUT vec2 texCoord;

const float mulSize=0.01;


void main()
{
   texCoord=(attrTexOffsets+attrTexCoord*attrTcSize);
   texCoord.y=1.0-texCoord.y;

   mat4 instMVMat=instMat;
   vec4 vert=vec4( vPosition, 1. );
   vert.x*=attrSize.x*mulSize;
   vert.y*=attrSize.y*mulSize;

   mat4 mvMatrix=viewMatrix * modelMatrix * instMVMat;

   #ifndef BILLBOARD
       gl_Position = projMatrix * mvMatrix * vert;
   #endif
}
