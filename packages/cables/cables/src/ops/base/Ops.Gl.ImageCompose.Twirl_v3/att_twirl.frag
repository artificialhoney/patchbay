IN vec2 texCoord;
UNI sampler2D tex;
UNI float amount;
UNI float twistAmount;
UNI float times;
UNI float radius;
UNI float centerX;
UNI float centerY;

{{CGL.BLENDMODES}}

void main()
{
    vec2 center=vec2(centerX,centerY);
    vec2 tc = texCoord;
    tc -= center;
    float dist = length(tc);
    if (dist < radius)
    {
        float percent = (radius - dist) / radius;
        float theta = percent * percent * twistAmount * 8.0;
        float s = sin(theta);
        float c = cos(theta);
        tc = vec2(dot(tc, vec2(c, -s)), dot(tc, vec2(s, c)));
    }
    tc += center;

    vec4 col = texture(tex, tc);
    vec4 base=texture(tex,texCoord);
    outColor=cgl_blend(base,col,amount);
}
