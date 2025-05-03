IN vec2 texCoord;
UNI sampler2D tex;
UNI float amount;
UNI float strength;
UNI float texWidth;
UNI float texHeight;
UNI float mulColor;

const vec4 lumcoeff = vec4(0.299,0.587,0.114, 0.);

vec3 desaturate(vec3 color)
{
    return vec3(dot(vec3(0.2126,0.7152,0.0722), color));
}

{{CGL.BLENDMODES}}

void main()
{
    // vec4 col=vec4(1.0,0.0,0.0,1.0);

    float pixelX=strength/texWidth;
    float pixelY=strength/texHeight;

    // col=texture(tex,texCoord);

    float count=1.0;

	vec4 horizEdge = vec4( 0.0 );
	horizEdge -= texture( tex, vec2( texCoord.x - pixelX, texCoord.y - pixelY ) ) * 1.0;
	horizEdge -= texture( tex, vec2( texCoord.x - pixelX, texCoord.y     ) ) * 2.0;
	horizEdge -= texture( tex, vec2( texCoord.x - pixelX, texCoord.y + pixelY ) ) * 1.0;
	horizEdge += texture( tex, vec2( texCoord.x + pixelX, texCoord.y - pixelY ) ) * 1.0;
	horizEdge += texture( tex, vec2( texCoord.x + pixelX, texCoord.y     ) ) * 2.0;
	horizEdge += texture( tex, vec2( texCoord.x + pixelX, texCoord.y + pixelY ) ) * 1.0;
	vec4 vertEdge = vec4( 0.0 );
	vertEdge -= texture( tex, vec2( texCoord.x - pixelX, texCoord.y - pixelY ) ) * 1.0;
	vertEdge -= texture( tex, vec2( texCoord.x    , texCoord.y - pixelY ) ) * 2.0;
	vertEdge -= texture( tex, vec2( texCoord.x + pixelX, texCoord.y - pixelY ) ) * 1.0;
	vertEdge += texture( tex, vec2( texCoord.x - pixelX, texCoord.y + pixelY ) ) * 1.0;
	vertEdge += texture( tex, vec2( texCoord.x    , texCoord.y + pixelY ) ) * 2.0;
	vertEdge += texture( tex, vec2( texCoord.x + pixelX, texCoord.y + pixelY ) ) * 1.0;


	vec3 edge = sqrt((horizEdge.rgb/count * horizEdge.rgb/count) + (vertEdge.rgb/count * vertEdge.rgb/count));

    edge=desaturate(edge);

    if(mulColor>0.0) edge*=texture( tex, texCoord ).rgb*mulColor*4.0;
    edge=max(min(edge,1.0),0.0);

    //blend section
    vec4 col=vec4(edge,1.0);
    vec4 base=texture(tex,texCoord);

    outColor=cgl_blend(base,col,amount);
}

