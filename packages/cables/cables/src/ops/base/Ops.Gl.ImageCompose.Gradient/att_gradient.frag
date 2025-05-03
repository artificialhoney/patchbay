IN vec2 texCoord;
UNI float amount;
UNI float pos;
UNI float width;

UNI vec3 colA;
UNI vec3 colB;
UNI vec3 colC;
UNI sampler2D tex;

{{CGL.BLENDMODES}}

void main()
{
    vec4 base=texture(tex,texCoord);
    vec4 col;
    float ax=texCoord.x;

    #ifdef GRAD_Y
        ax=texCoord.y;
    #endif
    #ifdef GRAD_XY
        ax=(texCoord.x+texCoord.y)/2.0;
    #endif
    #ifdef GRAD_RADIAL
        ax=distance(texCoord,vec2(0.5,0.5))*2.0;
    #endif

    ax=((ax-0.5)*width)+0.5;

    // ax-=0.03;

    #ifndef GRAD_SMOOTHSTEP
        if(ax<=pos) col = vec4(mix(colA, colB, ax*1.0/pos),1.0);
        else col = vec4(mix(colB, colC, min(1.0,(ax-pos)*1.0/(1.0-pos))),1.0);
    #endif

    #ifdef GRAD_SMOOTHSTEP
        if(ax<=pos) col = vec4(mix(colA, colB, smoothstep(0.0,1.0,ax*1.0/pos)),1.0);
        else col = vec4(mix(colB, colC, smoothstep(0.0,1.0,min(1.0,(ax-pos)*1.0/(1.0-pos)))),1.0);
    #endif

    outColor=cgl_blend(base,col,amount);
}