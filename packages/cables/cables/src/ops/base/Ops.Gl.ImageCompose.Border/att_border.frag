IN vec2 texCoord;
UNI float width;
UNI sampler2D tex;
UNI float amount;
UNI float r;
UNI float g;
UNI float b;
UNI float aspect;
UNI vec4 mulSides;
UNI bool smoothed;

{{CGL.BLENDMODES}}

void main()
{
    vec4 col= texture(tex,texCoord);

    if(!smoothed)
    {
        float border=0.0;
        if(border==0.0 && texCoord.y < width/aspect/3.0) border=mulSides.x;
        if(border==0.0 && texCoord.y > 1.0-width/aspect/3.0) border=mulSides.z;
        if(border==0.0 && texCoord.x > 1.0-width/3.0) border=mulSides.a;
        if(border==0.0 && texCoord.x < width/3.0 ) border=mulSides.y;

        col = vec4(r,g,b, border);
    }
    else
    {
       float f=smoothstep(0.0,width,texCoord.x)-smoothstep(1.0-width,1.0,texCoord.x);
       f*=smoothstep(0.0,width/aspect,texCoord.y);
       f*=smoothstep(1.0,1.0-width/aspect,texCoord.y);
       col= mix(col,vec4(r,g,b, 1.0),1.0-f);
    }


    vec4 base=texture(tex,texCoord);
    outColor=cgl_blend(base,col,amount*col.a);
}