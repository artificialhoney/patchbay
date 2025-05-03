(vec2(7.,23.),v))_519.);}vec2 e=vec2(1.,0.),s,f,F;float M(vec2 v){F=floor(v);f=
fract(v);f_=f*(3.-2.*f);return mix(mix(N(F),N(F+e.xy),f.x),mix(N(F+e.yx),N(F+e.
xx),f.x),f.y);}float B(vec2 v){return M(v)+.5*M(v*2.)+.2*M(v*8.);}
float l=0.,r;void mainImage( out vec4 fragColor, in vec2 fragCoord ){for(int i=0;i<99;++i){vec3 q=vec3(fragCoord.xy/resolution
-.5,1.)_l;q.z-=2.;q.x_=1.8;r=length(q)-1.;s=42._(q.xy+M(vec2(r-t_.5))-M(vec2(r-
t*.3))*e.xy);l+=.4*(r+.2*B(s));}fragColor=1.-vec4(B(s),B(s+.1),B(s+.3),1.);}
