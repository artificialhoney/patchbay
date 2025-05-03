IN vec2 texCoord;
UNI sampler2D tex;
#ifdef MASK
    UNI sampler2D texMask;
#endif

UNI float strength;
UNI float amount;
UNI float width;
UNI float height;
UNI float threshold;

float lumi( vec4 col ) {
    return (0.2126*col.r + 0.7152*col.g + 0.0722*col.b);
}

{{CGL.BLENDMODES3}}

float adjustFrag( mat4 adjustments,float val, vec2 coord )
{
    vec2 coordMod = mod(vec2(coord.x*width,coord.y*height), 4.0);
    int xMod = int(coordMod.x);
    int yMod = int(coordMod.y);

    vec4 col;
    if (xMod == 0) col = adjustments[0];
    else if (xMod == 1) col = adjustments[1];
    else if (xMod == 2) col = adjustments[2];
    else if (xMod == 3) col = adjustments[3];

    float adjustment;
    if (yMod == 0) adjustment = col.x;
    else if (yMod == 1) adjustment = col.y;
    else if (yMod == 2) adjustment = col.z;
    else if (yMod == 3) adjustment = col.w;

    return val + (val * adjustment);
}

void main()
{
    mat4 adjustments = ((mat4(
        1, 13, 4, 16,
        9, 5, 12, 8,
        3, 15, 2, 14,
        11, 7, 10, 6
    ) - 8.) *  1.0 / strength);

    vec4 base=texture(tex,texCoord);
    vec4 color;
    float am=amount;

    #ifdef MASK
        float m=texture(texMask,texCoord).r;
        #ifdef MASK_SRC_1R
            m=1.0-m;
        #endif
        am*=m;
    #endif

    float lum = lumi(base);
    lum = adjustFrag(adjustments,lum, texCoord.xy);

    if (lum > threshold) color = vec4(1, 1, 1, base.a);
    else color = vec4(0, 0, 0, base.a);

    outColor=cgl_blendPixel(base,color,am);
}