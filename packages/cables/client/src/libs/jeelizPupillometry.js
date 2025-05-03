/**
 * Jeeliz Pupillometry - https://github.com/jeeliz/jeelizPupillometry
 *
 * Copyright 2018 Jeeliz ( https://jeeliz.com )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var JEEPUPILAPI = (function ()
{
    function la(b, d, e)
    {
        return b * (1 - e) + d * e;
    }
    function Aa(b, d)
    {
        d(b);
    }
    function Ca(b, d, e)
    {
        return Math.min(Math.max((e - b) / (d - b), 0), 1);
    }
    function Fa(b)
    {
        switch (b)
        {
        case "relu":
            return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
        case "elu":
            return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
        case "elu01":
            return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
        case "arctan":
            return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
        case "copy":
            return "";
        default:
            return !1;
        }
    }
    function Ha(b, d)
    {
        var e = d % 8;
        return (b[(d - e) / 8] >> (7 - e)) & 1;
    }
    function Ia(b)
    {
        var d = JSON.parse(b);
        b = d.ne;
        var e = d.nf,
            k = d.n,
            p = typeof btoa === "undefined" ? Buffer.from(d.data, "base64").toString("latin1") : atob(d.data),
            n = p.length,
            m;
        d = new Uint8Array(n);
        for (m = 0; m < n; ++m) d[m] = p.charCodeAt(m);
        p = new Float32Array(k);
        n = new Float32Array(e);
        m = b + e + 1;
        var r,
            q;
        for (r = 0; r < k; ++r)
        {
            var g = m * r;
            var w = Ha(d, g) === 0 ? 1 : -1;
            var v = g + 1;
            var y = 1,
                F = 0;
            for (q = v + b - 1; q >= v; --q) (F += y * Ha(d, q)), (y *= 2);
            q = F;
            v = d;
            y = g + 1 + b;
            F = n;
            var D = 0,
                G = F.length;
            for (g = y; g < y + G; ++g) (F[D] = Ha(v, g)), ++D;
            for (g = v = 0; g < e; ++g) v += n[g] * Math.pow(2, -g - 1);
            w = v === 0 && q === 0 ? 0 : w * (1 + v) * Math.pow(2, 1 + q - Math.pow(2, b - 1));
            p[r] = w;
        }
        return p;
    }
    var l = (function ()
        {
            function b(f, x)
            {
                f = a.createShader(f);
                a.shaderSource(f, x);
                a.compileShader(f);
                return a.getShaderParameter(f, a.COMPILE_STATUS) ? f : !1;
            }
            function d(f, x)
            {
                f = b(a.VERTEX_SHADER, f);
                x = b(a.FRAGMENT_SHADER, x);
                var z = a.createProgram();
                a.attachShader(z, f);
                a.attachShader(z, x);
                a.linkProgram(z);
                return z;
            }
            function e(f)
            {
                void 0 === f.V && (f.V = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
                void 0 === f.ga_ && (f.ga_ = ["a0"]);
                void 0 === f.Y && (f.Y = [2]);
                if (void 0 === f.precision || f.precision === "highp") f.precision = q;
                f.id = m++;
                void 0 !== f.$c &&
                    f.$c.forEach((z, W) =>
                    {
                        f.c = f.c.replace(z, f.Ha[W]);
                    });
                f.cb = 0;
                f.Y.forEach((z) =>
                {
                    f.cb += 4 * z;
                });
                f.Fa = d(f.V, "precision " + f.precision + " float;\n" + f.c);
                f.v = {};
                f.f.forEach((z) =>
                {
                    f.v[z] = a.getUniformLocation(f.Fa, z);
                });
                f.attributes = {};
                f.oa = [];
                f.ga_.forEach((z) =>
                {
                    var W = a.getAttribLocation(f.Fa, z);
                    f.attributes[z] = W;
                    f.oa.push(W);
                });
                if (f.h)
                {
                    a.useProgram(f.Fa);
                    n = f;
                    p = f.id;
                    for (var x in f.h) a.uniform1i(f.v[x], f.h[x]);
                }
                f.Qd = !0;
            }
            function k(f)
            {
                Ja.gd(K);
                p !== f.id &&
                    (K.na(),
                    (p = f.id),
                    (n = f),
                    a.useProgram(f.Fa),
                    f.oa.forEach((x) =>
                    {
                        x !== 0 && a.enableVertexAttribArray(x);
                    }));
            }
            var p = -1,
                n = !1,
                m = 0,
                r = !1,
                q = "highp",
                g = ["u1"],
                w = ["u0"],
                v = { u1: 0 },
                y = { u0: 0 },
                F = { u1: 0, u2: 1 },
                D = { u3: 0 },
                G = {
                    s0: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: g, h: v },
                    s1: {
                        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: g, h: v, precision: "lowp",
                    },
                    s2: { c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}", f: ["u1", "u2"], h: F },
                    s3: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}", f: g, h: v },
                    s4: { c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}", f: ["u1", "mask"], h: F },
                    s5: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}", f: g, h: v },
                    s6: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}", f: g, h: v },
                    s7: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}", f: ["u0", "u4"], h: y },
                    s8: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}", f: ["u0", "u4"], h: y },
                    s9: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}", f: g, h: v },
                    s10: { c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}", f: ["u1", "u5", "u6"], h: { u1: 0, u5: 1 } },
                    s11: { c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}", f: ["u1", "u7"], h: v },
                    s12: {
                        c:
                            "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
                        f: ["u1", "u8"],
                        h: v,
                    },
                    s13: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}", f: w, h: y },
                    s14: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}", f: w, h: y },
                    s15: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}", f: w, h: y },
                    s16: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}", f: w, h: y },
                    s17: { c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}", f: ["u0", "u6", "u9"], h: { u0: 0, u6: 1, u9: 2 } },
                    s18: { c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}", f: w, h: y },
                    s19: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}", f: w, h: y },
                    s20: { c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}", f: ["u0", "u10"], h: y },
                    s21: {
                        c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
                        f: ["u0", "u13", "u12"],
                        h: { u0: 0, u13: 1 },
                    },
                    s22: { c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}", f: ["u1", "u14"], h: v },
                    s23: { c: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}", f: ["u15", "u16", "u17"], h: { u16: 0, u15: 1, u17: 2 } },
                    s24: { c: "uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}", f: ["u16", "u15", "u18"], h: { u16: 0, u15: 1 } },
                    s25: {
                        c:
                            "uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
                        f: "u15 u16 u18 u22 u19 u20 u21".split(" "),
                        h: {
                            u16: 0, u15: 1, u22: 3, u19: 4, u20: 5, u21: 6,
                        },
                    },
                    s26: {
                        c:
                            "uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}",
                        f: "u15 u16 u18 u24 u25 u26 u23".split(" "),
                        h: { u16: 0, u15: 1, u23: 2 },
                    },
                    s27: { c: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}", f: ["u15", "u16"], h: { u16: 0, u15: 1 } },
                    s28: { c: "uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}", f: ["u1", "u23", "u27"], h: { u1: 0, u23: 1 } },
                    s29: {
                        c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}", f: g, h: v, precision: "lowp",
                    },
                    s30: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}",
                        f: ["u1", "u28"],
                        h: v,
                        precision: "lowp",
                    },
                    s31: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                        f: ["u1", "u28"],
                        h: v,
                        precision: "lowp",
                    },
                    s32: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
                        f: ["u1", "u2", "u29"],
                        h: F,
                    },
                    s33: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}",
                        f: ["u1", "u2", "u29"],
                        h: F,
                    },
                    s34: {
                        c:
                            "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
                        f: ["u3", "u7"],
                        h: D,
                    },
                    s35: {
                        c:
                            "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
                        f: ["u3", "u7"],
                        h: D,
                    },
                    s36: {
                        c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}", f: ["u1"], h: v, precision: "lowp",
                    },
                    s37: {
                        c:
                            "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
                        f: ["u7", "u1"],
                        h: v,
                        precision: "lowp",
                    },
                    s38: {
                        c: "uniform sampler2D u1,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
                        f: ["u1", "u30", "u31"],
                        h: { u1: 0, u30: 1, u31: 2 },
                    },
                },
                L = {
                    s39: {
                        c:
                            "uniform float u18,u32;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        f: ["u18", "u15", "u16", "u23", "u32"],
                        Ha: ["1.1111", "gl_FragColor\\*=2.2222;"],
                    },
                    s40: {
                        c:
                            "uniform float u18,u32,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        f: "u18 u26 u15 u16 u23 u32".split(" "),
                        Ha: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
                    },
                },
                K = {
                    Ya()
                    {
                        return r;
                    },
                    j()
                    {
                        if (!r)
                        {
                            q = "highp";
                            for (var f in G) e(G[f], f);
                            l.set("s0");
                            a.enableVertexAttribArray(0);
                            f = Na.j();
                            r = !0;
                            return f;
                        }
                    },
                    Zb(f)
                    {
                        f.forEach((x) =>
                        {
                            K.R(x);
                        });
                    },
                    R(f)
                    {
                        G[f.id] = f;
                        e(f, f.id);
                    },
                    wb(f, x, z)
                    {
                        x || (x = f);
                        G[x] = Object.create(L[f]);
                        L[f].Ha &&
                            L[f].Ha.forEach((W, Z) =>
                            {
                                G[x].c = G[x].c.replace(new RegExp(W, "g"), z[Z]);
                            });
                        e(G[x], x);
                    },
                    set(f)
                    {
                        k(G[f]);
                    },
                    yc(f)
                    {
                        return typeof G[f] !== "undefined";
                    },
                    Bd()
                    {
                        return n.yd;
                    },
                    na()
                    {
                        p !== -1 &&
                            ((p = -1),
                            n.oa.forEach((f) =>
                            {
                                f !== 0 && a.disableVertexAttribArray(f);
                            }));
                    },
                    ab()
                    {
                        var f = 0;
                        n.oa.forEach((x, z) =>
                        {
                            z = n.Y[z];
                            a.vertexAttribPointer(x, z, a.FLOAT, !1, n.cb, f);
                            f += 4 * z;
                        });
                    },
                    vc()
                    {
                        a.enableVertexAttribArray(0);
                    },
                    Ia()
                    {
                        a.vertexAttribPointer(n.oa[0], 2, a.FLOAT, !1, 8, 0);
                    },
                    de(f, x)
                    {
                        a.uniform1i(n.v[f], x);
                    },
                    u(f, x)
                    {
                        a.uniform1f(n.v[f], x);
                    },
                    D(f, x, z)
                    {
                        a.uniform2f(n.v[f], x, z);
                    },
                    U(f, x)
                    {
                        a.uniform2fv(n.v[f], x);
                    },
                    ee(f, x)
                    {
                        a.uniform3fv(n.v[f], x);
                    },
                    hd(f, x, z, W)
                    {
                        a.uniform3f(n.v[f], x, z, W);
                    },
                    Ob(f, x)
                    {
                        a.uniform4fv(n.v[f], x);
                    },
                    fe(f, x)
                    {
                        a.uniformMatrix2fv(n.v[f], !1, x);
                    },
                    ge(f, x)
                    {
                        a.uniformMatrix3fv(n.v[f], !1, x);
                    },
                    he(f, x)
                    {
                        a.uniformMatrix4fv(n.v[f], !1, x);
                    },
                    B(f, x)
                    {
                        K.set(f);
                        x.forEach((z) =>
                        {
                            switch (z.type)
                            {
                            case "4f":
                                a.uniform4fv(n.v[z.name], z.value);
                                break;
                            case "3f":
                                a.uniform3fv(n.v[z.name], z.value);
                                break;
                            case "2f":
                                a.uniform2fv(n.v[z.name], z.value);
                                break;
                            case "1f":
                                a.uniform1f(n.v[z.name], z.value);
                                break;
                            case "1i":
                                a.uniform1i(n.v[z.name], z.value);
                                break;
                            case "mat2":
                                a.uniformMatrix2fv(n.v[z.name], !1, z.value);
                                break;
                            case "mat3":
                                a.uniformMatrix3fv(n.v[z.name], !1, z.value);
                                break;
                            case "mat4":
                                a.uniformMatrix4fv(n.v[z.name], !1, z.value);
                            }
                        });
                    },
                    Kd()
                    {
                        return "lowp";
                    },
                };
            return K;
        }()),
        a = !1,
        Pa = (function ()
        {
            function b(g)
            {
                console.log("ERROR in ContextFeedForward : ", g);
                return !1;
            }
            function d()
            {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
                {
                    var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                    g = [parseInt(g[1], 10), parseInt(g[2], 10), parseInt(g[3] || 0, 10)];
                    return g[0] === 12 || g[0] === 13 ? !0 : !1;
                }
                return /(Mac)/i.test(navigator.platform) && ((g = navigator.userAgent) ? ((g = g.match(/Mac OS X (\d+)_(\d+)/) || g.match(/Mac OS X (\d+).(\d+)/)), (g = !g || g.length < 3 ? !1 : [parseInt(g[1], 10), parseInt(g[2], 10)])) : (g = !1), g && g[0] === 10 && g[1] === 15) ? !0 : !1;
            }
            var e = !1,
                k = !1,
                p = !1,
                n = !1,
                m = !0,
                r = !1,
                q = {
                    l()
                    {
                        return e.width;
                    },
                    N()
                    {
                        return e.height;
                    },
                    Cd()
                    {
                        return e;
                    },
                    Ad()
                    {
                        return a;
                    },
                    C()
                    {
                        return m;
                    },
                    flush()
                    {
                        a.flush();
                    },
                    Dc()
                    {
                        r || (r = new Uint8Array(e.width * e.height * 4));
                        a.readPixels(0, 0, e.width, e.height, a.RGBA, a.UNSIGNED_BYTE, r);
                        return r;
                    },
                    Ed()
                    {
                        return e.toDataURL("image/jpeg");
                    },
                    Fd()
                    {
                        B.K();
                        k || ((k = document.createElement("canvas")), (p = k.getContext("2d")));
                        k.width = e.width;
                        k.height = e.height;
                        var g = q.Dc(),
                            w = p.createImageData(k.width, k.height),
                            v,
                            y,
                            F = k.width,
                            D = k.height,
                            G = w.data;
                        for (y = 0; y < D; ++y)
                        {
                            var L = D - y - 1;
                            for (v = 0; v < F; ++v)
                            {
                                var K = 4 * (y * F + v);
                                var f = 4 * (L * F + v);
                                G[K] = g[f];
                                G[K + 1] = g[f + 1];
                                G[K + 2] = g[f + 2];
                                G[K + 3] = g[f + 3];
                            }
                        }
                        p.putImageData(w, 0, 0);
                        return k.toDataURL("image/png");
                    },
                    Dd(g)
                    {
                        !k && g && ((k = document.createElement("canvas")), (p = k.getContext("2d")));
                        var w = g ? k : document.createElement("canvas");
                        w.width = e.width;
                        w.height = e.height;
                        (g ? p : w.getContext("2d")).drawImage(e, 0, 0);
                        return w;
                    },
                    j(g)
                    {
                        g.oc && !g.qa ? (e = document.getElementById(g.oc)) : g.qa && (e = g.qa);
                        e || (e = document.createElement("canvas"));
                        e.width = g && void 0 !== g.width ? g.width : 512;
                        e.height = g && void 0 !== g.height ? g.height : 512;
                        typeof g === "undefined" && (g = {});
                        void 0 === g.premultipliedAlpha && (g.premultipliedAlpha = !1);
                        void 0 === g.yb && (g.yb = !0);
                        void 0 === g.antialias && (g.antialias = !1);
                        var w = {
                            antialias: g.antialias, alpha: !0, preserveDrawingBuffer: !0, premultipliedAlpha: g.premultipliedAlpha, stencil: !1, depth: g.yb,
                        };
                        d() || (a = e.getContext("webgl2", w));
                        a ? (m = !0) : ((a = e.getContext("webgl", w)) || (a = e.getContext("experimental-webgl", w)), (m = !1));
                        if (!a) return b("WebGL is not enabled");
                        (n = a.getExtension("WEBGL_lose_context")) && e.addEventListener("webglcontextlost", g.Tc, !1);
                        if (!Oa.j()) return b("Not enough capabilities");
                        if (!Oa.ic() && m) return b("Your configuration cannot process color buffer float");
                        a.clearColor(0, 0, 0, 0);
                        a.disable(a.DEPTH_TEST);
                        a.disable(a.BLEND);
                        a.disable(a.DITHER);
                        a.disable(a.STENCIL_TEST);
                        a.GENERATE_MIPMAP_HINT && a.hint(a.GENERATE_MIPMAP_HINT, a.FASTEST);
                        a.disable(a.SAMPLE_ALPHA_TO_COVERAGE);
                        a.disable(a.SAMPLE_COVERAGE);
                        return !0;
                    },
                    Lc()
                    {
                        if (!l.j()) return !1;
                        a.depthFunc(a.LEQUAL);
                        a.clearDepth(1);
                        return !0;
                    },
                };
            return q;
        }()),
        Ja = (function ()
        {
            var b = typeof l === "undefined" ? JEShaders : l;
            return {
                gd(d)
                {
                    b !== d && (b.na(), (b = d));
                },
                Ya()
                {
                    return b.Ya();
                },
                Ia()
                {
                    b.Ia();
                },
                ab()
                {
                    b.ab();
                },
                na()
                {
                    b.na();
                },
                set(d)
                {
                    b.set(d);
                },
            };
        }()),
        J = (function ()
        {
            var b,
                d,
                e = 0,
                k = -2,
                p = -2,
                n = !1,
                m = {
                    reset()
                    {
                        p = k = -2;
                    },
                    j()
                    {
                        n ||
                            ((b = a.createBuffer()),
                            a.bindBuffer(a.ARRAY_BUFFER, b),
                            a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), a.STATIC_DRAW),
                            (d = a.createBuffer()),
                            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d),
                            a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), a.STATIC_DRAW),
                            m.xa(),
                            (n = !0));
                    },
                    a(r)
                    {
                        var q = e++,
                            g = r.$ ? r.$.length : 0,
                            w = typeof r.mode === "undefined" ? a.STATIC_DRAW : r.mode,
                            v = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, v);
                        a.bufferData(a.ARRAY_BUFFER, r.Rb instanceof Float32Array ? r.Rb : new Float32Array(r.Rb), w);
                        k = q;
                        if (r.$)
                        {
                            var y = a.createBuffer();
                            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, y);
                            if (r.$.length < 65536)
                            {
                                var F = Uint16Array;
                                var D = a.UNSIGNED_SHORT;
                                var G = 2;
                            }
                            else (F = Uint32Array), (D = a.UNSIGNED_INT), (G = 4);
                            a.bufferData(a.ELEMENT_ARRAY_BUFFER, r.$ instanceof F ? r.$ : new F(r.$), w);
                            p = q;
                        }
                        var L = {
                            hc(K)
                            {
                                k !== q && (a.bindBuffer(a.ARRAY_BUFFER, v), (k = q));
                                K && Ja.ab();
                            },
                            fc()
                            {
                                p !== q && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, y), (p = q));
                            },
                            bind(K)
                            {
                                L.hc(K);
                                L.fc();
                            },
                            sc()
                            {
                                a.drawElements(a.TRIANGLES, g, D, 0);
                            },
                            xd(K, f)
                            {
                                a.drawElements(a.TRIANGLES, K, D, f * G);
                            },
                            remove()
                            {
                                a.deleteBuffer(v);
                                r.$ && a.deleteBuffer(y);
                                L = null;
                            },
                        };
                        return L;
                    },
                    xa()
                    {
                        k !== -1 && (a.bindBuffer(a.ARRAY_BUFFER, b), (k = -1));
                        p !== -1 && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d), (p = -1));
                    },
                    g(r, q)
                    {
                        r && J.xa();
                        q && Ja.Ia();
                        a.drawElements(a.TRIANGLES, 3, a.UNSIGNED_SHORT, 0);
                    },
                    Cc()
                    {
                        a.deleteBuffer(b);
                        a.deleteBuffer(d);
                    },
                };
            return m;
        }()),
        B = (function ()
        {
            var b,
                d,
                e,
                k = !1,
                p = { F: -2, Ac: 1 };
            return {
                j()
                {
                    if (!k)
                    {
                        b = a.createFramebuffer();
                        var n = Oa.C();
                        d = n && a.DRAW_FRAMEBUFFER ? a.DRAW_FRAMEBUFFER : a.FRAMEBUFFER;
                        e = n && a.READ_FRAMEBUFFER ? a.READ_FRAMEBUFFER : a.FRAMEBUFFER;
                        k = !0;
                    }
                },
                Hd()
                {
                    return d;
                },
                Ta()
                {
                    return e;
                },
                ia()
                {
                    return a.FRAMEBUFFER;
                },
                Ld()
                {
                    return p;
                },
                zd()
                {
                    return b;
                },
                a(n)
                {
                    void 0 === n.xb && (n.xb = !1);
                    var m = n.J ? n.J : !1,
                        r = n.width,
                        q = void 0 !== n.height ? n.height : n.width,
                        g = b,
                        w = !1,
                        v = !1,
                        y = 0;
                    m && ((r = r || m.l()), (q = q || m.N()));
                    var F = {
                        Nb()
                        {
                            v || ((g = a.createFramebuffer()), (v = !0), (y = p.Ac++));
                        },
                        Yb()
                        {
                            F.Nb();
                            F.m();
                            w = a.createRenderbuffer();
                            a.bindRenderbuffer(a.RENDERBUFFER, w);
                            a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, r, q);
                            a.framebufferRenderbuffer(d, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, w);
                            a.clearDepth(1);
                        },
                        bind(D, G)
                        {
                            y !== p.F && (a.bindFramebuffer(d, g), (p.F = y));
                            m && m.m();
                            G && a.viewport(0, 0, r, q);
                            D && a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                        },
                        rd()
                        {
                            y !== p.F && (a.bindFramebuffer(d, g), (p.F = y));
                        },
                        clear()
                        {
                            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                        },
                        ud()
                        {
                            a.clear(a.COLOR_BUFFER_BIT);
                        },
                        vd()
                        {
                            a.clear(a.DEPTH_BUFFER_BIT);
                        },
                        jd()
                        {
                            a.viewport(0, 0, r, q);
                        },
                        m()
                        {
                            y !== p.F && (a.bindFramebuffer(d, g), (p.F = y));
                        },
                        rtt(D)
                        {
                            m = D;
                            p.F !== y && (a.bindFramebuffer(a.FRAMEBUFFER, g), (p.F = y));
                            D.m();
                        },
                        K()
                        {
                            a.bindFramebuffer(d, null);
                            p.F = -1;
                        },
                        resize(D, G)
                        {
                            r = D;
                            q = G;
                            w && (a.bindRenderbuffer(a.RENDERBUFFER, w), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, r, q));
                        },
                        remove()
                        {
                            a.bindFramebuffer(d, g);
                            a.framebufferTexture2D(d, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0);
                            w && a.framebufferRenderbuffer(d, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, null);
                            a.bindFramebuffer(d, null);
                            a.deleteFramebuffer(g);
                            w && a.deleteRenderbuffer(w);
                            F = null;
                        },
                    };
                    n.xb && F.Yb();
                    return F;
                },
                K()
                {
                    a.bindFramebuffer(d, null);
                    p.F = -1;
                },
                nd()
                {
                    a.bindFramebuffer(d, null);
                    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                    a.viewport(0, 0, Oa.l(), Oa.N());
                    p.F = -1;
                },
                reset()
                {
                    p.F = -2;
                },
                O()
                {
                    p.F !== 0 && (a.bindFramebuffer(d, b), (p.F = 0));
                },
                clear()
                {
                    a.viewport(0, 0, Oa.l(), Oa.N());
                    a.clear(a.COLOR_BUFFER_BIT);
                },
            };
        }()),
        U = (function ()
        {
            function b(c)
            {
                a.bindTexture(a.TEXTURE_2D, c);
            }
            function d(c)
            {
                Z[0] = c;
                c = ta[0];
                var H = (c >> 16) & 32768,
                    I = (c >> 12) & 2047,
                    R = (c >> 23) & 255;
                return R < 103 ? H : R > 142 ? H | 31744 | ((R == 255 ? 0 : 1) && c & 8388607) : R < 113 ? ((I |= 2048), H | ((I >> (114 - R)) + ((I >> (113 - R)) & 1))) : (H = (H | ((R - 112) << 10) | (I >> 1)) + (I & 1));
            }
            function e(c)
            {
                var H = new Uint16Array(c.length);
                c.forEach((I, R) =>
                {
                    H[R] = d(I);
                });
                return H;
            }
            function k()
            {
                if (ja.Ua !== null) return ja.Ua;
                var c = n(e([1, 1, 1, 1]));
                return c === null ? !0 : (ja.Ua = c);
            }
            function p()
            {
                if (ja.Va !== null) return ja.Va;
                var c = n(new Uint8Array([255, 255, 255, 255]));
                return c === null ? !0 : (ja.Va = c);
            }
            function n(c)
            {
                if (!Ja.Ya() || !D) return null;
                try
                {
                    var H = a.getError(),
                        I = ba.a({
                            isFloat: !1, M: !0, array: c, width: 1,
                        });
                    H = a.getError();
                    if (H !== a.NO_ERROR) return !1;
                }
                catch (R)
                {
                    return !1;
                }
                B.K();
                a.viewport(0, 0, 1, 1);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT);
                Ja.set("s0");
                I.hb(0);
                J.g(!1, !0);
                c = new Uint8Array(4);
                a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, c);
                c = c[0] > 0.9;
                I.remove();
                B.O();
                return c;
            }
            var m = 0,
                r,
                q = 0,
                g,
                w = !1,
                v,
                y,
                F,
                D = !1,
                G = !1,
                L,
                K,
                f,
                x = [
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ],
                z = !1,
                W = !1,
                Z = new Float32Array(1),
                ta = new Int32Array(Z.buffer),
                ja = { Ua: null, Va: null },
                ba = {
                    j()
                    {
                        if (!D)
                        {
                            y = [a.RGB, !1, a.RGB, a.RGBA];
                            F = [a.RGB, !1, a.RGB, a.RGBA];
                            r = [a.TEXTURE0, a.TEXTURE1, a.TEXTURE2, a.TEXTURE3, a.TEXTURE4, a.TEXTURE5, a.TEXTURE6, a.TEXTURE7];
                            z = typeof JEContext !== "undefined";
                            W = typeof Oa !== "undefined";
                            z && JEContext.Yd() && r.push(a.TEXTURE8, a.TEXTURE9);
                            g = [-1, -1, -1, -1, -1, -1, -1, -1];
                            v = [a.UNSIGNED_BYTE, a.FLOAT, a.FLOAT];
                            if (!w)
                            {
                                for (var c = new Float32Array(16384), H = 0; H < 16384; ++H) c[H] = 2 * Math.random() - 1;
                                w = {
                                    random: ba.a({
                                        isFloat: !0, isPot: !0, array: c, width: 64,
                                    }),
                                    Qb: ba.a({
                                        isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0]),
                                    }),
                                };
                            }
                            D = !0;
                        }
                    },
                    Kc()
                    {
                        ba.od();
                    },
                    Od()
                    {
                        return w.Qb;
                    },
                    od()
                    {
                        v[1] = Oa.Ba();
                    },
                    bd()
                    {
                        F = y = [a.RGBA, a.RGBA, a.RGBA, a.RGBA];
                    },
                    Zc(c, H)
                    {
                        l.set("s1");
                        B.K();
                        var I = c.l(),
                            R = c.N();
                        a.viewport(0, 0, I, R);
                        c.b(0);
                        J.g(!1, !1);
                        a.readPixels(0, 0, I, R, a.RGBA, a.UNSIGNED_BYTE, H);
                    },
                    Bc(c, H, I)
                    {
                        a.activeTexture(a.TEXTURE0);
                        m = 0;
                        var R = a.createTexture();
                        b(R);
                        var ha = Oa.C() && a.RGBA32F ? a.RGBA32F : a.FLOAT;
                        H = H instanceof Float32Array ? H : new Float32Array(H);
                        var ea = Math.log2(H.length);
                        ea !== Math.floor(ea) && (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, I);
                        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, c.l(), c.N(), 0, a.RGBA, ha, H);
                        b(null);
                        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                        B.O();
                        l.set("s0");
                        c.o();
                        a.clearColor(0, 0, 0, 0);
                        a.clear(a.COLOR_BUFFER_BIT);
                        b(R);
                        J.g(!0, !1);
                        a.deleteTexture(R);
                    },
                    a(c)
                    {
                        function H()
                        {
                            b(qa);
                            Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, Q);
                            c.isPot
                                ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, c.Ab ? a.MIRRORED_REPEAT : a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, c.aa ? a.MIRRORED_REPEAT : a.REPEAT))
                                : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                            c.Da && typeof JESETTINGS !== "undefined" && a.texParameterf(a.TEXTURE_2D, JEContext.Gd().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.qd);
                            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, c.isLinear ? a.LINEAR : a.NEAREST);
                            c.isLinear ? a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !Y ? a.NEAREST_MIPMAP_LINEAR : a.LINEAR) : a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !Y ? a.NEAREST_MIPMAP_NEAREST : a.NEAREST);
                            ma = y[c.ua - 1];
                            na = F[c.ua - 1];
                            O = v[I];
                            if (Oa.C())
                            {
                                var u = a.RGBA32F;
                                ma === a.RGBA && O === a.FLOAT && u && (na = u);
                                ma === a.RGB && O === a.FLOAT && u && ((na = u), (ma = a.RGBA));
                            }
                            if ((c.M && !c.isFloat) || (c.isFloat && c.isMipmap && Na.Oc())) (u = a.RGBA16F) && (na = u), (O = Oa.Ba());
                            c.Cb && typeof a.texStorage2D !== "undefined" && (X = c.Cb);
                            c.Bb && c.ua === 4 && (ma = JEContext.Md());
                            if (c.H) a.texImage2D(a.TEXTURE_2D, 0, na, ma, O, c.H);
                            else if (c.url) a.texImage2D(a.TEXTURE_2D, 0, na, ma, O, ua);
                            else if (fa)
                            {
                                try
                                {
                                    a.getError(),
                                    a.texImage2D(a.TEXTURE_2D, 0, na, M, C, 0, ma, O, fa),
                                    a.getError() !== a.NO_ERROR && (a.texImage2D(a.TEXTURE_2D, 0, na, M, C, 0, ma, O, null), a.getError() !== a.NO_ERROR && a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, M, C, 0, a.RGBA, a.UNSIGNED_BYTE, null));
                                }
                                catch (E)
                                {
                                    a.texImage2D(a.TEXTURE_2D, 0, na, M, C, 0, ma, O, null);
                                }
                                c.isKeepArray || (fa = null);
                            }
                            else a.texImage2D(a.TEXTURE_2D, 0, na, M, C, 0, ma, O, null);
                            if (c.isMipmap)
                            {
                                if (!Y && S) S.Sa(), (Ba = !0);
                                else if (Y)
                                {
                                    u = Math.log(Math.min(M, C)) / Math.log(2);
                                    var N;
                                    P = Array(1 + u);
                                    P[0] = qa;
                                    for (N = 1; N <= u; ++N)
                                    {
                                        var oa = Math.pow(2, N);
                                        var va = M / oa;
                                        oa = C / oa;
                                        var ia = a.createTexture();
                                        b(ia);
                                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                                        a.texImage2D(a.TEXTURE_2D, 0, na, va, oa, 0, ma, O, null);
                                        b(null);
                                        P[N] = ia;
                                    }
                                    Ba = !0;
                                }
                            }
                            b(null);
                            g[m] = -1;
                            Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            T = !0;
                            ka && S && (ka(S), (ka = !1));
                        }
                        typeof c.isFloat === "undefined" && (c.isFloat = !1);
                        typeof c.M === "undefined" && (c.M = !1);
                        typeof c.isPot === "undefined" && (c.isPot = !0);
                        typeof c.isLinear === "undefined" && (c.isLinear = !1);
                        typeof c.isMipmap === "undefined" && (c.isMipmap = !1);
                        typeof c.Oa === "undefined" && (c.Oa = !1);
                        void 0 === c.Da && (c.Da = !1);
                        void 0 === c.aa && (c.aa = !1);
                        void 0 === c.Ab && (c.Ab = !1);
                        void 0 === c.Bb && (c.Bb = !1);
                        void 0 === c.ua && (c.ua = 4);
                        void 0 === c.zb && (c.zb = !1);
                        typeof c.isFlipY === "undefined" && (c.isFlipY = c.url || c.array ? !0 : !1);
                        typeof c.isKeepArray === "undefined" && (c.isKeepArray = !1);
                        c.data && ((c.array = typeof c.data === "string" ? Ia(c.data) : c.isFloat ? new Float32Array(c.data) : new Uint8Array(c.data)), (c.isFlipY = !1));
                        var I = 0,
                            R = c.H ? !0 : !1,
                            ha = null,
                            ea = null,
                            ra = !1,
                            xa = null;
                        c.isFloat && (c.M = !0);
                        c.M && (I = 1);
                        c.zb || Oa.C() || !c.isFloat || !W || Oa.jb() || (c.isFloat = !1);
                        c.isFloat && (I = 2);
                        c.Da && z && !JEContext.Td() && (c.Da = !1);
                        var qa = a.createTexture(),
                            ka = c.Oa,
                            ua = null,
                            fa = !1,
                            M = 0,
                            C = 0,
                            T = !1,
                            pa = q++,
                            ya = !1,
                            sa,
                            t,
                            za,
                            Da,
                            na,
                            ma,
                            O,
                            Q = c.isFlipY,
                            Y = c.M && c.isMipmap && typeof Na !== "undefined" && !Na.kc() ? !0 : !1,
                            P,
                            X = -1,
                            Ba = !1;
                        typeof c.width !== "undefined" && c.width && ((M = c.width), (C = typeof c.height !== "undefined" && c.height ? c.height : M));
                        var S = {
                            get()
                            {
                                return qa;
                            },
                            l()
                            {
                                return M;
                            },
                            N()
                            {
                                return C;
                            },
                            Pd()
                            {
                                return c.url;
                            },
                            Ud()
                            {
                                return c.isFloat;
                            },
                            Wd()
                            {
                                return c.M;
                            },
                            Xd()
                            {
                                return c.isLinear;
                            },
                            Sa()
                            {
                                a.generateMipmap(a.TEXTURE_2D);
                            },
                            ib(u, N)
                            {
                                Y ? (u || (u = S.tb()), S.La(N), b(P[u]), (g[N] = -1)) : S.b(N);
                            },
                            tb()
                            {
                                X === -1 && (X = Math.log(M) / Math.log(2));
                                return X;
                            },
                            rb(u)
                            {
                                if (Y)
                                {
                                    u || (u = S.tb());
                                    l.set("s11");
                                    S.La(0);
                                    var N,
                                        oa = M,
                                        va = C;
                                    for (N = 1; N <= u; ++N) (oa /= 2), (va /= 2), l.D("u7", 0.25 / oa, 0.25 / va), a.viewport(0, 0, oa, va), b(P[N - 1]), a.framebufferTexture2D(B.ia(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, P[N], 0), J.g(!1, N === 1);
                                    g[0] = -1;
                                }
                                else S.Sa();
                            },
                            La(u)
                            {
                                u !== m && (a.activeTexture(r[u]), (m = u));
                            },
                            b(u)
                            {
                                if (!T) return !1;
                                S.La(u);
                                if (g[u] === pa) return !1;
                                b(qa);
                                g[u] = pa;
                                return !0;
                            },
                            hb(u)
                            {
                                a.activeTexture(r[u]);
                                m = u;
                                b(qa);
                                g[u] = pa;
                            },
                            m()
                            {
                                a.framebufferTexture2D(B.ia(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, qa, 0);
                            },
                            o()
                            {
                                a.viewport(0, 0, M, C);
                                a.framebufferTexture2D(B.ia(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, qa, 0);
                            },
                            me()
                            {
                                a.framebufferTexture2D(B.ia(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0);
                            },
                            resize(u, N)
                            {
                                M = u;
                                C = N;
                                H();
                            },
                            clone(u)
                            {
                                u = ba.a({
                                    width: M, height: C, M: c.M, isFloat: c.isFloat, isLinear: c.isLinear, aa: c.aa, isFlipY: u ? !Q : Q, isPot: c.isPot,
                                });
                                Ja.set("s0");
                                B.O();
                                u.m();
                                a.viewport(0, 0, M, C);
                                S.b(0);
                                J.g(!0, !0);
                                return u;
                            },
                            jd()
                            {
                                a.viewport(0, 0, M, C);
                            },
                            remove()
                            {
                                a.deleteTexture(qa);
                                S = null;
                            },
                            refresh()
                            {
                                S.hb(0);
                                Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                                R ? a.texImage2D(a.TEXTURE_2D, 0, na, ma, a.UNSIGNED_BYTE, c.H) : a.texImage2D(a.TEXTURE_2D, 0, na, M, C, 0, ma, O, fa);
                                Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            },
                            kb()
                            {
                                var u = M * C * 4;
                                t = [new Uint8Array(u), new Uint8Array(u), new Uint8Array(u), new Uint8Array(u)];
                                sa = [new Float32Array(t[0].buffer), new Float32Array(t[1].buffer), new Float32Array(t[2].buffer), new Float32Array(t[3].buffer)];
                                za = new Uint8Array(4 * u);
                                Da = new Float32Array(za.buffer);
                                ya = !0;
                            },
                            Mb()
                            {
                                ya || S.kb();
                                a.readPixels(0, 0, M, 4 * C, a.RGBA, a.UNSIGNED_BYTE, za);
                                var u,
                                    N = M * C,
                                    oa = 2 * N,
                                    va = 3 * N;
                                for (u = 0; u < N; ++u) (sa[0][u] = Da[u]), (sa[1][u] = Da[u + N]), (sa[2][u] = Da[u + oa]), (sa[3][u] = Da[u + va]);
                                return sa;
                            },
                            ob()
                            {
                                B.K();
                                l.set("s12");
                                S.b(0);
                                for (var u = 0; u < 4; ++u) a.viewport(0, C * u, M, C), l.Ob("u8", x[u]), J.g(!1, u === 0);
                            },
                            oe(u)
                            {
                                var N = O === v[0] && !p();
                                b(qa);
                                Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, Q);
                                N
                                    ? (ra || ((ha = document.createElement("canvas")), (ha.width = M), (ha.height = C), (ea = ha.getContext("2d")), (xa = ea.createImageData(M, C)), (ra = !0)), xa.data.set(u), ea.putImageData(xa, 0, 0), a.texImage2D(a.TEXTURE_2D, 0, na, ma, O, ha))
                                    : a.texImage2D(a.TEXTURE_2D, 0, na, M, C, 0, ma, O, u);
                                g[m] = pa;
                                Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            },
                            pe(u, N)
                            {
                                b(qa);
                                a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, N);
                                a.texImage2D(a.TEXTURE_2D, 0, na, ma, O, u);
                                g[m] = pa;
                                N && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            },
                            be(u, N)
                            {
                                var oa = M * C,
                                    va = 4 * oa;
                                u = c.M ? (u ? "RGBE" : "JSON") : "RGBA";
                                N && (u = N);
                                N = Oa.C() && !1;
                                switch (u)
                                {
                                case "RGBE":
                                    var ia = "s41";
                                    break;
                                case "JSON":
                                    ia = N ? "s0" : "s12";
                                    break;
                                case "RGBA":
                                case "RGBAARRAY":
                                    ia = "s6";
                                }
                                ya || (u === "RGBA" || u === "RGBE" || u === "RGBAARRAY" ? ((t = new Uint8Array(va)), (ya = !0)) : u !== "JSON" || N || S.kb());
                                B.K();
                                l.set(ia);
                                S.b(0);
                                if (u === "RGBA" || u === "RGBE" || u === "RGBAARRAY")
                                {
                                    a.viewport(0, 0, M, C);
                                    J.g(!0, !0);
                                    a.readPixels(0, 0, M, C, a.RGBA, a.UNSIGNED_BYTE, t);
                                    if (u === "RGBAARRAY") return { data: t };
                                    G || ((L = document.createElement("canvas")), (K = L.getContext("2d")), (G = !0));
                                    L.width = M;
                                    L.height = C;
                                    f = K.createImageData(M, C);
                                    f.data.set(t);
                                    K.putImageData(f, 0, 0);
                                    var E = L.toDataURL("image/png");
                                }
                                else if (u === "JSON")
                                {
                                    if (N) (E = new Float32Array(oa)), a.viewport(0, 0, M, C), J.g(!0, !0), a.readPixels(0, 0, M, C, a.RGBA, a.FLOAT, E);
                                    else
                                    {
                                        for (E = 0; E < 4; ++E) a.viewport(0, C * E, M, C), l.Ob("u8", x[E]), J.g(!E, !E);
                                        S.Mb();
                                        E = Array(oa);
                                        for (ia = 0; ia < oa; ++ia) (E[4 * ia] = sa[0][ia]), (E[4 * ia + 1] = sa[1][ia]), (E[4 * ia + 2] = sa[2][ia]), (E[4 * ia + 3] = sa[3][ia]);
                                    }
                                }
                                return {
                                    format: u, data: E, width: M, height: C, isMirrorY: c.aa, isFlipY: u === "RGBA" ? c.isFlipY : !c.isFlipY,
                                };
                            },
                        };
                        c.isMipmap && !Y && T && !Ba && (S.Sa(), (Ba = !0));
                        if (c.url)
                        {
                            b(qa),
                            a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, null),
                            (ua = new Image()),
                            (ua.wd = "Anonymous"),
                            (ua.crossOrigin = "Anonymous"),
                            (ua.src = c.url),
                            (ua.onload = function ()
                            {
                                M = ua.width;
                                C = ua.height;
                                H();
                            });
                        }
                        else if (c.H)
                        {
                            var aa = function ()
                            {
                                M = void 0 !== c.H.videoWidth ? c.H.videoWidth : c.H.width;
                                C = void 0 !== c.H.videoHeight ? c.H.videoHeight : c.H.height;
                                M ? H() : setTimeout(aa, 1);
                            };
                            aa();
                        }
                        else
                        {
                            c.array
                                ? (c.M && !c.isFloat
                                    ? c.array instanceof Uint16Array
                                        ? ((fa = c.array), H())
                                        : k()
                                            ? ((fa = e(c.array)), H())
                                            : (H(), ba.Bc(S, c.array, Q))
                                    : ((fa = c.isFloat ? (c.array instanceof Float32Array ? c.array : new Float32Array(c.array)) : c.array instanceof Uint8Array ? c.array : new Uint8Array(c.array)), H()),
                                c.isKeepArray || (fa && fa !== c.array && (fa = null), delete c.array))
                                : H();
                        }
                        S.Gc = S.l;
                        ka && T && (ka(S), (ka = !1));
                        return S;
                    },
                    K(c)
                    {
                        c !== m && (a.activeTexture(r[c]), (m = c));
                        g[c] = -1;
                        b(null);
                    },
                    sd(c)
                    {
                        w.random.b(c);
                    },
                    reset()
                    {
                        for (var c = 0; c < r.length; ++c) g[c] = -1;
                        m = -1;
                    },
                    ae()
                    {
                        m = -1;
                    },
                    ke()
                    {
                        for (var c = 0; c < r.length; ++c) ba.K(c);
                    },
                    Cc()
                    {
                        w && (w.random.remove(), w.Qb.remove());
                    },
                    le(c, H)
                    {
                        if (c.format === "RGBA" || c.format === "RGBE")
                        {
                            var I = new Image();
                            I.src = c.data;
                            I.onload = function ()
                            {
                                ba.a({
                                    aa: c.isMirrorY,
                                    isFlipY: c.isFlipY,
                                    isFloat: !1,
                                    H: I,
                                    Oa(R)
                                    {
                                        if (c.format === "RGBA") H(R);
                                        else
                                        {
                                            var ha = c.width,
                                                ea = c.height,
                                                ra = ba.a({
                                                    aa: c.isMirrorY, isFloat: !0, width: ha, height: ea, isFlipY: c.isFlipY,
                                                });
                                            B.O();
                                            a.viewport(0, 0, ha, ea);
                                            l.set("s42");
                                            ra.m();
                                            R.b(0);
                                            J.g(!0, !0);
                                            ba.K(0);
                                            H(ra);
                                            a.flush();
                                            setTimeout(R.remove, 50);
                                        }
                                    },
                                });
                            };
                        }
                        else
                        {
                            c.format === "JSON" ? H(ba.a({
                                isFloat: !0, isFlipY: c.isFlipY, width: c.width, height: c.height, array: new Float32Array(c.data),
                            })) : H(!1);
                        }
                    },
                };
            return ba;
        }()),
        Sa = {
            a(b)
            {
                var d = [U.a(b), U.a(b)],
                    e = [d[1], d[0]],
                    k = e,
                    p = {
                        fd(n)
                        {
                            k[1].m();
                            k[0].b(n);
                            p.Pb();
                        },
                        ce(n)
                        {
                            k[1].o();
                            k[0].b(n);
                            p.Pb();
                        },
                        Pb()
                        {
                            k = k === d ? e : d;
                        },
                        refresh()
                        {
                            k[0].refresh();
                            k[1].refresh();
                        },
                        b(n)
                        {
                            k[0].b(n);
                        },
                        Id()
                        {
                            return k[0];
                        },
                    };
                return p;
            },
        },
        Oa = (function ()
        {
            function b()
            {
                d = typeof Pa === "undefined" ? JEContext : Pa;
                e = !0;
            }
            var d,
                e = !1,
                k = !1,
                p = !1,
                n = !1,
                m = !1,
                r = !1,
                q = !1,
                g = !1,
                w = !1,
                v = !1,
                y = !1,
                F = !0,
                D = !0,
                G = !0,
                L = !1,
                K = typeof window === "undefined" ? {} : window,
                f = {
                    j()
                    {
                        if (e) return !0;
                        b();
                        f.pb();
                        f.Qa();
                        f.wc();
                        f.xc();
                        B.j();
                        U.j();
                        if (!f.pc()) return !1;
                        J.j();
                        U.Kc();
                        return !0;
                    },
                    l()
                    {
                        e || b();
                        return d.l();
                    },
                    N()
                    {
                        e || b();
                        return d.N();
                    },
                    C()
                    {
                        e || b();
                        return d.C();
                    },
                    wc()
                    {
                        y = (v = a.getExtension("EXT_color_buffer_float") || a.getExtension("WEBGL_color_buffer_float") || a.getExtension("OES_color_buffer_float")) ? !0 : !1;
                        K.GL_EXT_COLORBUFFERFLOAT = v;
                    },
                    xc()
                    {
                        a.getExtension("EXT_color_buffer_half_float") || a.getExtension("WEBGL_color_buffer_half_float") || a.getExtension("OES_color_buffer_half_float");
                    },
                    pb()
                    {
                        if (!k)
                        {
                            this.C() || ((p = a.getExtension("OES_texture_float") || a.getExtension("MOZ_OES_texture_float") || a.getExtension("WEBKIT_OES_texture_float")), (m = (K.GL_EXT_FLOAT = p) ? !0 : !1));
                            if (m || this.C()) (n = a.getExtension("OES_texture_float_linear") || a.getExtension("MOZ_OES_texture_float_linear") || a.getExtension("WEBKIT_OES_texture_float_linear")), (K.GL_EXT_FLOATLINEAR = n);
                            k = !0;
                        }
                    },
                    Qa()
                    {
                        if (!w)
                        {
                            if (!this.C())
                            {
                                if ((r = a.getExtension("OES_texture_half_float") || a.getExtension("MOZ_OES_texture_half_float") || a.getExtension("WEBKIT_OES_texture_half_float"))) (L = r.HALF_FLOAT_OES), (q = !0);
                                !L && a.HALF_FLOAT && (L = a.HALF_FLOAT);
                                !L && a.FLOAT && (L = a.FLOAT);
                                K.GL_EXT_HALFFLOAT = r;
                            }
                            if (q || this.C()) (g = a.getExtension("OES_texture_half_float_linear") || a.getExtension("MOZ_OES_texture_half_float_linear") || a.getExtension("WEBKIT_OES_texture_half_float_linear")), (K.GL_EXT_HALFFLOATLINEAR = g);
                            w = !0;
                        }
                    },
                    Ba()
                    {
                        if (f.C()) return a.HALF_FLOAT;
                        f.Qa();
                        return q ? L : a.FLOAT;
                    },
                    jb()
                    {
                        return F;
                    },
                    jc()
                    {
                        return D;
                    },
                    td()
                    {
                        return G;
                    },
                    ic()
                    {
                        return y;
                    },
                    rc()
                    {
                        D = F = !0;
                        var x = a.createFramebuffer();
                        a.bindFramebuffer(a.FRAMEBUFFER, x);
                        var z = a.createTexture();
                        a.bindTexture(a.TEXTURE_2D, z);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                        a.texImage2D(a.TEXTURE_2D, 0, f.C() && a.RGBA32F ? a.RGBA32F : a.RGBA, 1, 1, 0, a.RGBA, a.FLOAT, null);
                        a.framebufferTexture2D(B.ia(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, z, 0);
                        var W = a.checkFramebufferStatus(B.Ta());
                        W !== a.FRAMEBUFFER_COMPLETE && (F = !1);
                        a.texImage2D(a.TEXTURE_2D, 0, f.C() && a.RGBA16F ? a.RGBA16F : a.RGBA, 1, 1, 0, a.RGBA, f.Ba(), null);
                        a.framebufferTexture2D(B.ia(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, z, 0);
                        W = a.checkFramebufferStatus(B.Ta());
                        W !== a.FRAMEBUFFER_COMPLETE && (D = !1);
                        a.bindTexture(a.TEXTURE_2D, null);
                        a.bindFramebuffer(a.FRAMEBUFFER, null);
                        a.deleteTexture(z);
                        a.deleteFramebuffer(x);
                    },
                    qc()
                    {
                        var x = B.a({ width: 1 });
                        x.Nb();
                        var z = U.a({ width: 1, isFloat: !0, ua: 3 });
                        x.m();
                        z.m();
                        a.flush();
                        a.checkFramebufferStatus(B.Ta()) !== a.FRAMEBUFFER_COMPLETE ? (U.bd(), (G = !1)) : (G = !0);
                        x.remove();
                        z.remove();
                    },
                    pc()
                    {
                        f.rc();
                        if (!F && !D) return !1;
                        f.qc();
                        return !0;
                    },
                };
            return f;
        }()),
        Na = (function ()
        {
            function b(D, G, L, K)
            {
                a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, K ? a.NEAREST_MIPMAP_NEAREST : a.LINEAR);
                try
                {
                    var f = a.getError();
                    f !== a.NO_ERROR && console.log("GLERR in test_mipmapping() :", f);
                    a.texImage2D(a.TEXTURE_2D, 0, D, 2, 2, 0, a.RGBA, G, L);
                    f = a.getError();
                    if (f !== a.NO_ERROR) return !1;
                }
                catch (x)
                {
                    return !1;
                }
                K && a.generateMipmap(a.TEXTURE_2D);
                J.xa();
                J.g(!1, !0);
                a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, r);
                f = a.getError();
                f === a.INVALID_OPERATION && typeof a.PIXEL_PACK_BUFFER !== "undefined" && (a.bindBuffer(a.PIXEL_PACK_BUFFER, null), a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, r), (f = a.getError()));
                return f !== a.NO_ERROR ? !1 : r[0] !== 0;
            }
            function d(D)
            {
                return Oa.jb() && b(v, a.FLOAT, new Float32Array(g), D) ? ((n = p.fb), !0) : !1;
            }
            function e(D)
            {
                return Oa.jc() ? (b(y, Oa.Ba(), new Uint16Array(g), D) || b(y, a.FLOAT, new Float32Array(g), D) ? ((n = p.Ka), !0) : !1) : !1;
            }
            var k = !1,
                p = { fb: 3, Ka: 2, RGBA8: 0 },
                n = p.RGBA8,
                m,
                r = new Uint8Array(4),
                q = [0.8, 1, 0.8, 1],
                g = q.concat(q, q, q),
                w = !0,
                v,
                y,
                F = {
                    j()
                    {
                        Oa.pb();
                        Oa.Qa();
                        y = v = a.RGBA;
                        if (Pa.C())
                        {
                            var D = a.RGBA32F;
                            D && (v = D);
                            (D = a.RGBA16F) && (y = D);
                        }
                        J.j();
                        B.reset();
                        B.K();
                        a.viewport(0, 0, 1, 1);
                        l.set("s0");
                        k = !0;
                        m = a.createTexture();
                        a.activeTexture(a.TEXTURE0);
                        a.bindTexture(a.TEXTURE_2D, m);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                        if (e(!0) || d(!0)) return !0;
                        w = !1;
                        if (e(!1) || d(!1)) return !0;
                        if (Pa.C())
                        {
                            y = v = a.RGBA;
                            if (e(!0) || d(!0)) return !0;
                            w = !1;
                            if (e(!1) || d(!1)) return !0;
                        }
                        return !1;
                    },
                    kc()
                    {
                        return w;
                    },
                    Jd()
                    {
                        return n;
                    },
                    Vd()
                    {
                        k || F.j();
                        return n === p.fb;
                    },
                    Oc()
                    {
                        k || F.j();
                        return n === p.Ka;
                    },
                };
            return F;
        }()),
        Ta = {
            a(b)
            {
                var d = U.a(b.alpha),
                    e = U.a(b.beta);
                return {
                    tc()
                    {
                        d.b(1);
                        e.b(2);
                    },
                };
            },
        },
        Wa = {
            a(b)
            {
                var d = b.ld;
                d.index = b.index;
                d.ca = b.ca;
                d.parent = b.parent;
                switch (d.type)
                {
                case "input":
                    b = Ua.a(d);
                    break;
                default:
                    b = Va.a(d);
                }
                return b;
            },
        },
        Ua = {
            a(b)
            {
                typeof b.sift === "undefined" && (b.sift = !1);
                typeof b.DWT === "undefined" && (b.DWT = !1);
                typeof b.blur === "undefined" && (b.blur = !1);
                typeof b.siftOutWidth === "undefined" && (b.siftOutWidth = !1);
                typeof b.density === "undefined" && (b.density = 1);
                var d = !1;
                if (b.mask)
                {
                    d = !0;
                    SETTINGS && void 0 !== SETTINGS.dc && (b.mask = SETTINGS.dc + b.mask);
                    var e = U.a({ isFloat: !1, url: b.mask });
                }
                var k = !1,
                    p = typeof b.preprocessing !== "undefined" ? b.preprocessing : !1,
                    n = !1,
                    m = !1;
                b.sift ? Sift.j({
                    Ic: a, qa: !1, width: b.size, $d: b.siftOutWidth,
                }) : b.DWT && DWT.j({ Ic: a, qa: !1, width: b.size });
                var r = !1;
                b.customInputShader && ((r = "s43"), l.R({
                    name: "_", id: r, c: b.customInputShader, f: ["uSource"], precision: "lowp",
                }), l.B(r, [{ type: "1i", name: "_", value: 0 }]));
                switch (p)
                {
                case "sobel":
                    var q = "s32";
                    n = !0;
                    break;
                case "meanNormalization":
                    q = "s33";
                    n = !0;
                    break;
                case "grayScale":
                    q = "s29";
                    n = !1;
                    break;
                case "grayScaleTilt":
                    q = "s30";
                    m = !0;
                    n = !1;
                    break;
                case "rgbGrayTilt":
                    q = "s31";
                    m = !0;
                    n = !1;
                    break;
                case "copy":
                    q = r || "s0";
                    break;
                case "inputLightRegulation":
                    q = r || "s29";
                    $a.j({ width: b.size, Db: b.nBlurPass, Nc: !1 });
                    k = !0;
                    break;
                case "direct":
                case "none":
                    q = !1;
                    break;
                default:
                    q = "s3";
                }
                m && l.B(q, [{ name: "u28", type: "1f", value: b.tilt }]);
                d && (q += "Mask");
                if (b.blur) var g = U.a({ isFloat: !1, isPot: !1, width: b.size });
                var w = U.a({ isFloat: !1, isPot: !1, width: b.size }),
                    v = {
                        l()
                        {
                            return b.sift ? Sift.ta() : b.size;
                        },
                        ta()
                        {
                            return v.l();
                        },
                        Fc()
                        {
                            return b.sift ? Sift.Ca() : b.DWT ? DWT.Ca() : k ? $a.Ca() : w;
                        },
                        I()
                        {
                            B.O();
                            b.blur && (g.o(), l.set("s44"), l.D("u7", 1 / b.size, 1 / b.size), J.g(!1, !0), g.b(0));
                            q && (l.set(q), n && l.u("u29", 1 / b.size), w.o(), d && e.b(1), J.g(!1, !1), w.b(0), k ? $a.la(w) : b.sift ? (l.na(), Sift.la()) : b.DWT && (l.na(), DWT.la(4)));
                        },
                    };
                return v;
            },
        },
        Va = {
            a(b)
            {
                typeof b.disableNormalize === "undefined" && (b.disableNormalize = !1);
                var d = [],
                    e = [],
                    k,
                    p,
                    n = !1,
                    m,
                    r = !0,
                    q,
                    g,
                    w = b.isReorganize ? b.isReorganize : !1,
                    v = b.kernelsNumber ? !0 : !1,
                    y = b.dynPelu ? Ta.a(b.dynPelu) : !1,
                    F = y ? !0 : !1,
                    D = { isEnabled: !1 },
                    G;
                if (b.type === "softmax")
                {
                    b.activation = "softmax";
                    b.size = Math.pow(2, Math.ceil(Math.log2(Math.sqrt(b.num_classes))));
                    b.sparsity = typeof b.sparsity !== "undefined" ? b.sparsity : b.ca.ta();
                    b.gain = typeof b.gain !== "undefined" ? b.gain : 1;
                    l.B("s20", [{ type: "1f", name: "u10", value: b.gain }]);
                    var L = U.a({ isFloat: !0, isPot: !1, width: b.size }),
                        K = U.a({
                            isFloat: !0, isPot: !1, width: b.size, isMipmap: !0,
                        });
                    r = !1;
                    var f = new Uint8Array(Math.pow(4 * b.size, 2)),
                        x;
                    for (x = 0; x < b.size * b.size; ++x)
                    {
                        var z = x < b.num_classes ? 255 : 0;
                        f[4 * x] = z;
                        f[4 * x + 1] = z;
                        f[4 * x + 2] = z;
                        f[4 * x + 3] = z;
                    }
                    var W = U.a({
                        isFloat: !1, isPot: !1, width: b.size, array: f,
                    });
                }
                else b.cost ? ((b.sparsity = typeof b.sparsity !== "undefined" ? b.sparsity : b.ca.ta()), (r = !1)) : b.connectivityUp === "full" && (b.sparsity = b.ca.ta());
                var Z = {
                        elu: "s15", elu01: "s16", relu: "s14", arctan: "s18", sigmoid: "s13", copy: "s0", softplus: "s19", softmax: "s20", dynPelu: "s17",
                    }[b.activation],
                    ta = b.sparsity * b.sparsity,
                    ja = !1,
                    ba = b.size;
                if (b.maxPooling)
                {
                    switch (b.maxPooling.size)
                    {
                    case 2:
                        var c = "s34";
                        break;
                    case 4:
                        c = "s35";
                    }
                    ja = !0;
                    ba /= b.maxPooling.size;
                    var H = U.a({ isFloat: !0, isPot: !1, width: ba });
                }
                var I = void 0 !== b.Sc && b.Sc ? !0 : !1,
                    R = null,
                    ha = null,
                    ea = null;
                I &&
                    ((R = "s45" + b.index.toString()),
                    l.wb("s45", R, [((b.normalization.n - 1) / 2).toFixed(1)]),
                    l.B(R, [
                        { type: "1i", name: "u1", value: 0 },
                        { type: "2f", name: "u7", value: [1 / b.size, 1 / b.size] },
                        { type: "1f", name: "u6", value: b.normalization.alpha },
                        { type: "1f", name: "u9", value: b.normalization.beta },
                        { type: "1f", name: "u33", value: b.normalization.k },
                    ]),
                    (ha = U.a({ isFloat: !0, isPot: !0, width: b.size })),
                    (ea = U.a({ isFloat: !0, isPot: !0, width: b.size })));
                var ra,
                    xa,
                    qa,
                    ka;
                r && (ka = U.a({ isFloat: !0, isPot: !1, width: b.size }));
                var ua = U.a(b.bias),
                    fa,
                    M = {
                        l()
                        {
                            return b.size;
                        },
                        ta()
                        {
                            return ba;
                        },
                        ub()
                        {
                            return b.num_classes;
                        },
                        gc(C)
                        {
                            G.b(C);
                        },
                        Vc()
                        {
                            b.remap &&
                                b.remap.isEnabled &&
                                (D = {
                                    isEnabled: !0,
                                    Qc: U.a({
                                        isFloat: !1, isFlipY: !1, array: new Uint8Array(b.remap.maskTexture.data), width: b.remap.maskTexture.width, isPot: !1,
                                    }),
                                    layers: b.remap.layers.map(C =>
                                        b.parent.Ec(C)),
                                    depth: b.remap.depth,
                                });
                        },
                        dd()
                        {
                            switch (b.connectivityUp)
                            {
                            case "gaussian":
                                fa = ab.a(b.connectivity);
                                break;
                            case "direct":
                                fa = bb.a(b.connectivity);
                                break;
                            case "square":
                                fa = cb.a(b.connectivity);
                                break;
                            case "squareFast":
                                fa = db.a(b.connectivity, b.activation);
                                break;
                            case "full":
                                fa = eb.a(b.connectivity);
                                break;
                            case "conv":
                                (g = b.kernelsNumber), (fa = fb.a(b.connectivity)), w && (q = U.a({
                                    width: ba, isFloat: !0, isFlipY: !1, isPot: !1,
                                }));
                            }
                            if (fa.ea)
                            {
                                var C = b.size * b.sparsity;
                                xa = Math.log(C / b.size) / Math.log(2);
                                ra = U.a({
                                    isMipmap: !0, isFloat: !0, isPot: !0, width: C, Cb: xa,
                                });
                                qa = U.a({ isFloat: !0, isPot: !0, width: b.size });
                            }
                        },
                        I(C, T)
                        {
                            G = C;
                            fa.ea ? (ra.o(), v && ua.b(2), fa.I(D), ra.b(0), ra.rb(xa), qa.o(), v ? l.set("s0") : (l.set("s28"), l.u("u27", ta), ua.b(1)), ra.ib(xa, 0), J.g(!1, !1), l.set(Z), I ? ha.m() : ka.m(), qa.b(0), F && y.tc(), J.g(!1, !1)) : (ka.o(), ua.b(1), fa.I());
                            I && (l.set(R), ea.m(), ha.b(0), J.g(!1, !1), l.set("s46"), l.u("u6", 1), ka.m(), ea.b(1), J.g(!1, !1));
                            if (r) return ja ? (H.o(), ka.b(0), l.set(c), l.D("u7", 1 / b.size, 1 / b.size), J.g(!1, !1), (T = H)) : (T = ka), T.b(0), w && (q.m(), l.set("s22"), l.D("u14", g, ba / g), J.g(!1, !1), (T = q), q.b(0)), T;
                            if (b.type === "softmax")
                            {
                                l.set("s20");
                                ka.b(0);
                                L.m();
                                J.g(!1, !1);
                                b.disableNormalize ? (C = L) : (l.set("s2"), L.b(0), W.b(1), K.m(), J.g(!1, !1), l.set("s0"), p.o(), K.b(0), K.rb(!1), J.g(!1, !1), l.set("s21"), k.o(), K.ib(!1, 0), l.u("u12", ka.Gc()), p.b(1), J.g(!1, !1), (C = k));
                                if (T)
                                {
                                    switch (n)
                                    {
                                    case "cpuRGBAAvg":
                                        break;
                                    default:
                                        var pa = M.Ib(C);
                                    }
                                    return pa;
                                }
                                return !1;
                            }
                            if (b.cost)
                            {
                                l.set(n === "gpuRawAvg" ? "s8" : "s7");
                                T = ka;
                                b.disableNormalize || (l.u("u4", 1 / b.size), k.o(), ka.b(0), J.g(!1, !1), (T = k));
                                switch (n)
                                {
                                case "cpuRGBA2Float":
                                    T.ob();
                                    pa = M.Ib(T);
                                    m(pa);
                                    break;
                                case "gpuRawAvg":
                                case "gpuRaw":
                                    T.b(0), m(T);
                                }
                                return !1;
                            }
                        },
                        nc(C)
                        {
                            C && typeof C.Hb !== "undefined" && ((n = C.Hb), (m = C.Uc));
                            ka = U.a({
                                isFloat: !0, isPot: !0, isMipmap: b.type === "softmax", width: b.size,
                            });
                            b.type === "softmax" && (p = U.a({ isFloat: !0, isPot: !0, width: 1 }));
                            var T = 0,
                                pa = 0,
                                ya = typeof b.num_classes !== "undefined" && b.num_classes ? b.num_classes : b.size * b.size;
                            for (C = 0; C < ya; ++C) d.push(T + (b.size - 1 - pa) * b.size), e.push([-1, -1, -1, -1]), ++T, T === b.size && ((T = 0), ++pa);
                            b.disableNormalize || (k = U.a({ isFloat: !0, isPot: !0, width: b.size }));
                        },
                        Ib(C)
                        {
                            C.ob();
                            var T = C.Mb();
                            d.forEach((pa, ya) =>
                            {
                                e[ya][0] = T[0][pa];
                                e[ya][1] = T[1][pa];
                                e[ya][2] = T[2][pa];
                                e[ya][3] = T[3][pa];
                            });
                            return e;
                        },
                    };
                b.ca && M.dd(b.ca);
                return M;
            },
        };
    function gb()
    {
        var b = { Sd: !1 },
            d,
            e,
            k;
        b || (b = {});
        this.Ec = function (p)
        {
            return d[p];
        };
        this.ad = function (p)
        {
            var n = !1;
            d = p.map(function (m, r)
            {
                return (n = m = Wa.a({
                    index: r, parent: this, ld: m, ca: n,
                }));
            });
            e = d[0];
            k = d[d.length - 1];
            d.forEach((m, r) =>
            {
                r !== 0 && m.Vc();
            });
        };
        this.I = function (p, n)
        {
            var m = n;
            d.forEach((r) =>
            {
                m = r.I(m, p);
            });
            return m;
        };
        this.sb = function ()
        {
            return e.l();
        };
        this.Ca = function ()
        {
            return k.Fc();
        };
        this.cd = function (p)
        {
            k.nc(p);
        };
        this.ub = function ()
        {
            return k.ub();
        };
    }
    var bb = {
            a(b)
            {
                var d = U.a(b.weights);
                delete b.weights.data;
                return {
                    ea: !0,
                    sa()
                    {
                        return 1;
                    },
                    Hc()
                    {
                        return d;
                    },
                    I()
                    {
                        l.set("s27");
                        d.b(1);
                        J.g(!1, !1);
                    },
                };
            },
        },
        eb = {
            a(b)
            {
                var d = b.fromLayerSize,
                    e = U.a(b.weights);
                return {
                    ea: !0,
                    sa()
                    {
                        return d;
                    },
                    I(k)
                    {
                        if (k.isEnabled)
                        {
                            l.set("s25");
                            k.Qc.b(3);
                            var p,
                                n = Math.min(k.layers.length, k.depth);
                            for (p = 0; p < n; ++p) k.layers[p].gc(4 + p);
                        }
                        else l.set("s24");
                        l.u("u18", b.toLayerSize);
                        e.b(1);
                        J.g(!1, !1);
                    },
                };
            },
        },
        ab = {
            a(b)
            {
                var d = b.toSparsity * b.toLayerSize,
                    e = d / b.fromLayerSize,
                    k = U.a(b.weights);
                U.a({
                    width: d, isFloat: !0, array: new Float32Array(b.fromBindings), isPot: !0,
                });
                var p = U.a({
                    width: d, isFloat: !0, array: new Float32Array(b.toBindings), isPot: !0,
                });
                return {
                    ea: !0,
                    sa()
                    {
                        return e;
                    },
                    I()
                    {
                        l.set("s23");
                        k.b(1);
                        p.b(2);
                        J.g(!1, !0);
                    },
                };
            },
        },
        cb = {
            a(b)
            {
                var d = b.fromLayerSize,
                    e = b.toLayerSize,
                    k = b.toSparsity,
                    p = k * e,
                    n = p / d,
                    m = d / e,
                    r,
                    q,
                    g,
                    w,
                    v = 0,
                    y = 0,
                    F = 0,
                    D = Array(k * e * k * e * 4),
                    G = Array(k * e * k * e * 4),
                    L = Array(d * d);
                for (r = 0; r < L.length; ++r) L[r] = 0;
                var K = Math.floor(k / 2),
                    f = 0.5 / e,
                    x = 0.5 / d,
                    z = 0.5 / p;
                for (r = 0; r < e; ++r)
                {
                    for (q = 0; q < e; ++q)
                    {
                        var W = Math.round(r * m);
                        var Z = Math.round(q * m);
                        var ta = r / e;
                        var ja = q / e;
                        ta += f;
                        ja += f;
                        for (g = 0; g < k; ++g)
                        {
                            for (w = 0; w < k; ++w)
                            {
                                var ba = v / p;
                                var c = y / p;
                                var H = W + g - K;
                                var I = Z + w - K;
                                H < 0 && (H += d);
                                I < 0 && (I += d);
                                H >= d && (H -= d);
                                I >= d && (I -= d);
                                var R = H / d;
                                var ha = I / d;
                                c = 1 - c - 1 / p;
                                R += x;
                                ha += x;
                                ba += z;
                                c += z;
                                var ea = r * k + g,
                                    ra = q * k + w;
                                ra = e * k - ra - 1;
                                ea = ra * e * k + ea;
                                D[4 * ea] = ba;
                                D[4 * ea + 1] = c;
                                D[4 * ea + 2] = R;
                                D[4 * ea + 3] = ha;
                                R = L[I * d + H]++;
                                ha = R % n;
                                H = H * n + ha;
                                I = I * n + (R - ha) / n;
                                I = d * n - 1 - I;
                                I = I * d * n + H;
                                G[4 * I] = ba;
                                G[4 * I + 1] = c;
                                G[4 * I + 2] = ta;
                                G[4 * I + 3] = ja;
                                ++v >= p && ((v = 0), ++y);
                                ++F;
                            }
                        }
                    }
                }
                var xa = U.a(b.weights);
                U.a({
                    width: p, isFloat: !0, array: new Float32Array(G), isPot: !0,
                });
                G = null;
                var qa = U.a({
                    width: p, isFloat: !0, array: new Float32Array(D), isPot: !0,
                });
                D = null;
                return {
                    ea: !0,
                    sa()
                    {
                        return n;
                    },
                    I()
                    {
                        l.set("s23");
                        xa.b(1);
                        qa.b(2);
                        J.g(!1, !1);
                    },
                };
            },
        },
        fb = {
            a(b)
            {
                var d = b.kernelsNumber,
                    e = b.toSparsity,
                    k = (e * b.toLayerSize) / b.fromLayerSize,
                    p = U.a(b.weights);
                return {
                    ea: !0,
                    sa()
                    {
                        return k;
                    },
                    Nd()
                    {
                        return e;
                    },
                    Hc()
                    {
                        return p;
                    },
                    I()
                    {
                        l.set("s26");
                        l.u("u24", d);
                        l.u("u25", e);
                        l.u("u18", b.toLayerSize);
                        l.u("u26", b.fromLayerSize);
                        p.b(1);
                        J.g(!1, !1);
                    },
                };
            },
        },
        db = {
            a(b, d)
            {
                var e = b.fromLayerSize,
                    k = b.toLayerSize,
                    p = b.toSparsity,
                    n = b.stride ? b.stride : 1,
                    m = (p * k) / e,
                    r = k < e,
                    q = e / k,
                    g = U.a(b.weights),
                    w = "s47" + [e.toString(), k.toString(), p.toString(), n.toString(), d].join("_");
                l.yc(w) ||
                    ((b = Fa(d)),
                    (k = [
                        { type: "1f", name: "u18", value: k },
                        { type: "1f", name: "u32", value: n },
                    ]),
                    r && k.push({ type: "1f", name: "u26", value: e }),
                    (e = [(r ? m : p).toFixed(1), b]),
                    r && e.push(q.toFixed(1)),
                    l.wb(r ? "s40" : "s39", w, e),
                    l.B(
                        w,
                        k.concat([
                            { type: "1i", name: "u16", value: 0 },
                            { type: "1i", name: "u23", value: 1 },
                            { type: "1i", name: "u15", value: 3 },
                        ]),
                    ));
                return {
                    ea: !1,
                    sa()
                    {
                        return m;
                    },
                    I()
                    {
                        l.set(w);
                        g.b(3);
                        J.g(!1, !1);
                    },
                };
            },
        },
        $a = (function ()
        {
            var b,
                d,
                e,
                k,
                p,
                n,
                m,
                r,
                q;
            return {
                j(g)
                {
                    b = g.Db ? g.Db : 3;
                    d = g.width ? g.width : 64;
                    k = g.Nc ? !0 : !1;
                    g = {
                        isFloat: !1, width: d, isPot: !1, isFlipY: !1,
                    };
                    p = U.a(g);
                    n = U.a(g);
                    m = U.a(g);
                    r = U.a(g);
                    q = U.a({
                        isFloat: !0, width: d, isPot: !1, isFlipY: !1,
                    });
                    e = 1 / d;
                },
                la(g)
                {
                    l.set("s37");
                    for (var w = 0; w < b; ++w) p.m(), l.D("u7", e, 0), J.g(k, !1), n.m(), p.b(0), l.D("u7", 0, e), J.g(k, !1), n.b(0);
                    l.set("s36");
                    r.m();
                    g.b(0);
                    J.g(k);
                    l.set("s37");
                    for (w = 0; w < b; ++w) m.m(), r.b(0), l.D("u7", e, 0), J.g(k, !1), r.m(), m.b(0), l.D("u7", 0, e), J.g(k, !1);
                    l.set("s38");
                    q.m();
                    g.b(0);
                    n.b(1);
                    r.b(2);
                    J.g(k, !1);
                    q.b(0);
                },
                Ca()
                {
                    return q;
                },
            };
        }()),
        hb = (function ()
        {
            function b(m)
            {
                B.K();
                l.set("s1");
                a.viewport(0, 0, 1, 1);
                J.g(!1, !1);
                a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, m);
                B.O();
            }
            var d = !1,
                e = !1,
                k,
                p,
                n = {
                    j()
                    {
                        var m = { u1: 0 };
                        l.R({
                            id: "s49",
                            name: "_",
                            c:
                                "varying vec2 vv0;uniform sampler2D u1;uniform vec2 u29;const vec3 f=vec3(.3333,.3333,.3333);const vec4 h=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y-u29.y))*1.,a-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y+u29.y))*1.,a+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y-u29.y))*1.,a+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y+u29.y))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y-u29.y))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29.y))*2.,b-=texture2D(u1,vec2(vv0.x+u29.x,vv0.y-u29.y))*1.,b+=texture2D(u1,vec2(vv0.x-u29.x,vv0.y+u29.y))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29.y))*2.,b+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y+u29.y))*1.;vec3 e=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 c=texture2D(u1,vv0),g=vec4(e,c.a);gl_FragColor=vec4(dot(g.rgb,f),dot(c.rgb,f),0.,1.);}",
                            f: ["u1", "u29"],
                            h: m,
                        });
                        l.R({
                            id: "s50",
                            name: "_",
                            c:
                                "uniform sampler2D u1;uniform vec2 u34;uniform float u35,u36,u37,u38;varying vec2 vv0;void main(){vec2 a=floor(vv0*u36);float d=a.x+a.y*u36,g=u36*u36;vec2 h=fract(vv0*u36),b=u37+h*(1.-2.*u37);float c=d/(g-1.),i=mix(u34.x,u34.y,c);vec2 j=b+i*vec2(1.,1./u38)*vec2(cos(u35),sin(u35));float f=texture2D(u1,j).r;gl_FragColor=vec4(f,b,c);}",
                            f: "u1 u34 u35 u36 u37 u38".split(" "),
                            h: m,
                        });
                        l.R({
                            id: "s51",
                            name: "_",
                            c: "uniform sampler2D u1;uniform vec2 u7,u39;varying vec2 vv0;void main(){vec4 a=vec4(0.,0.,0.,0.),b;float e;vec2 f=vv0-u7*2.;for(float c=0.;c<3.9;c+=1.)for(float d=0.;d<3.9;d+=1.)b=texture2D(u1,f+u7*vec2(c,d)),e=step(a.r,b.r),a=mix(a,b,e);gl_FragColor=a;}",
                            f: ["u1", "u7", "u39"],
                            h: m,
                        });
                        l.R({
                            id: "s52", name: "_", c: "uniform sampler2D u1;uniform vec2 u40;uniform float u41;const vec4 f=vec4(0.,1.,0.,1.);varying vec2 vv0;void main(){float a=step(abs(distance(vv0,u40)-u41),1e-3);gl_FragColor=mix(texture2D(u1,vv0),f,a);}", f: ["u1", "u40", "u41"], h: m,
                        });
                        d = !0;
                    },
                    ie(m)
                    {
                        d || n.j();
                        l.set("s49");
                        l.D("u29", 0.5 / m.l(), 0.5 / m.N());
                        m.b(0);
                        J.g(!1, !1);
                    },
                    sc(m)
                    {
                        l.set("s52");
                        l.U("u40", m.i);
                        l.u("u41", m.A);
                        J.g(!1, !1);
                    },
                    a(m)
                    {
                        d || n.j();
                        var r = typeof m.Yc === "undefined" ? 8 : m.Yc,
                            q = m.width,
                            g = m.$a,
                            w = [Math.floor(g[0] * q), Math.ceil(g[1] * q)],
                            v = q - 2 * w[1],
                            y = m.Gb ? m.Gb : 8,
                            F = Math.ceil((typeof m.Lb === "undefined" ? 1 : m.Lb) * q);
                        v = Math.min(v, 2 * F);
                        var D = Math.max(w[1], q / 2 - F) / q,
                            G = typeof m.da === "undefined" ? 1 : m.da,
                            L = U.a({
                                isFloat: !0, isPot: !1, isLinear: !1, isFlipY: !1, width: v * r,
                            }),
                            K = 1 / y,
                            f = Math.ceil(Math.log(L.l()) / Math.log(4));
                        m = L.l();
                        var x = Array(f);
                        for (q = 0; q < f; ++q)
                        {
                            x[q] = U.a({
                                isFloat: !0, isPot: !1, isLinear: !1, isFlipY: !1, width: Math.ceil(m / Math.pow(4, q + 1)),
                            });
                        }
                        var z = new Uint8Array(4),
                            W = { A: -1, i: [0, 0], da: G };
                        return {
                            ed(Z)
                            {
                                G = Z;
                            },
                            la(Z)
                            {
                                Z.b(0);
                                L.o();
                                a.clearColor(0, 0, 0, 0);
                                a.clear(a.COLOR_BUFFER_BIT);
                                a.enable(a.BLEND);
                                a.blendFunc(a.CONSTANT_ALPHA, a.ONE);
                                a.blendColor(K, K, K, K);
                                l.set("s50");
                                l.U("u34", g);
                                l.u("u36", r);
                                l.u("u37", D);
                                l.u("u38", G);
                                Z = 0;
                                for (var ta; Z < y; ++Z) (ta = (2 * Z * Math.PI) / y), l.u("u35", ta), J.g(!1, !1);
                                a.disable(a.BLEND);
                                l.set("s51");
                                L.b(0);
                                Z = 0;
                                ta = L.l();
                                for (var ja; Z < f; ++Z) x[Z].o(), (ja = x[Z].l()), l.D("u39", ja, ja), l.D("u7", 1 / ta, 1 / ta), J.g(!1, !1), x[Z].b(0), (ta = ja);
                                b(z);
                                W.i[0] = z[1] / 255;
                                W.i[1] = z[2] / 255;
                                W.A = g[0] + ((g[1] - g[0]) * z[3]) / 255;
                                W.da = G;
                                return W;
                            },
                        };
                    },
                    Jc()
                    {
                        k = U.a({ width: 256, height: 1, isFloat: !0 });
                        p = U.a({ width: 1, isFloat: !1 });
                        var m = { u1: 0 };
                        l.R({
                            id: "s53",
                            name: "_",
                            c: "uniform sampler2D u1;uniform vec2 u34,u40;varying vec2 vv0;void main(){float e=mix(u34.x,u34.y,vv0.x),b=0.,a=0.;vec2 c;for(float d=0.;d<51.;d+=1.)c=e*vec2(cos(a),sin(a)),b+=texture2D(u1,u40+c).r,a+=.123137;gl_FragColor=vec4(b/51.,0.,0.,1.);}",
                            f: ["u1", "u34"],
                            h: m,
                        });
                        l.R({
                            id: "s54", name: "_", c: "uniform sampler2D u1;varying vec2 vv0;void main(){float b=0.,c=0.,d=0.,e;for(float a=0.;a<255.9;a+=1.)d=texture2D(u1,vec2(a/255.,.5)).r,e=step(b,d),b=mix(b,d,e),c=mix(c,a,e);gl_FragColor=vec4(c/255.,0.,0.,1.);}", f: ["u1"], h: m,
                        });
                        e = !0;
                    },
                    Rd(m)
                    {
                        e || n.Jc();
                        var r = typeof m.i === "undefined" ? [0, 0] : m.i,
                            q = typeof m.$a === "undefined" ? [0, 0] : m.$a,
                            g = new Uint8Array(4),
                            w = { i: r, A: 0 };
                        return {
                            set(v, y)
                            {
                                r[0] = v[0];
                                r[1] = v[1];
                                q[0] = y[0];
                                q[1] = y[1];
                            },
                            la(v)
                            {
                                l.set("s53");
                                l.U("u34", q);
                                l.U("u40", r);
                                k.o();
                                v.b(0);
                                J.g(!1, !1);
                                l.set("s54");
                                p.o();
                                J.g(!1, !1);
                                p.b(0);
                                b(g);
                                w.A = q[0] + ((q[1] - q[0]) * g[0]) / 255;
                                return w;
                            },
                        };
                    },
                };
            return n;
        }());
    function ib(b, d)
    {
        b[d] = !0;
        b.setAttribute(d, "true");
    }
    function jb()
    {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    function kb()
    {
        var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)];
    }
    function lb()
    {
        var b = navigator.userAgent.toLowerCase();
        return b.indexOf("safari") !== -1 && b.indexOf("chrome") === -1 ? !0 : !1;
    }
    function mb()
    {
        return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1;
    }
    function nb(b)
    {
        if (!b) return b;
        var d = !1;
        if (b.video)
        {
            var e = function (k)
            {
                var p = {};
                typeof k.min !== "undefined" && (p.min = k.min);
                typeof k.max !== "undefined" && (p.max = k.max);
                typeof k.ideal !== "undefined" && (p.ideal = k.ideal);
                return p;
            };
            d = {};
            typeof b.video.width !== "undefined" && (d.width = e(b.video.width));
            typeof b.video.height !== "undefined" && (d.height = e(b.video.height));
            typeof b.video.facingMode !== "undefined" && (d.facingMode = b.video.facingMode);
        }
        d = { audio: b.audio, video: d };
        typeof b.deviceId !== "undefined" && (d.deviceId = b.deviceId);
        return d;
    }
    function ob(b)
    {
        var d = b.video.width;
        b.video.width = b.video.height;
        b.video.height = d;
        return b;
    }
    function pb(b)
    {
        function d(v)
        {
            return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort((y, F) =>
                Math.abs(y - v) - Math.abs(F - v));
        }
        function e(v)
        {
            var y = nb(b);
            k.push(v(y));
        }
        var k = [];
        if (!b || !b.video) return k;
        if (b.video.width && b.video.height)
        {
            if (b.video.width.ideal && b.video.height.ideal)
            {
                var p = d(b.video.width.ideal).slice(0, 3),
                    n = d(b.video.height.ideal).slice(0, 3),
                    m = {},
                    r = 0;
                for (m.X = void 0; r < p.length; m = { X: m.X }, ++r)
                {
                    m.X = p[r];
                    var q = {},
                        g = 0;
                    for (q.W = void 0; g < n.length; q = { W: q.W }, ++g)
                    {
                        if (((q.W = n[g]), m.X !== b.video.width.ideal || q.W !== b.video.height.ideal))
                        {
                            var w = Math.max(m.X, q.W) / Math.min(m.X, q.W);
                            w < 4 / 3 - 0.1 ||
                                w > 16 / 9 + 0.1 ||
                                e((function (v, y)
                                {
                                    return function (F)
                                    {
                                        F.video.width.ideal = v.X;
                                        F.video.height.ideal = y.W;
                                        return F;
                                    };
                                }(m, q)));
                        }
                    }
                }
            }
            e(v =>
                ob(v));
        }
        b.video.width &&
            b.video.height &&
            (b.video.width.ideal &&
                b.video.height.ideal &&
                e((v) =>
                {
                    delete v.video.width.ideal;
                    delete v.video.height.ideal;
                    return v;
                }),
            e((v) =>
            {
                delete v.video.width;
                delete v.video.height;
                return v;
            }));
        b.video.facingMode &&
            (e((v) =>
            {
                delete v.video.facingMode;
                return v;
            }),
            b.video.width &&
                b.video.height &&
                e((v) =>
                {
                    ob(v);
                    delete v.video.facingMode;
                    return v;
                }));
        k.push({ audio: b.audio, video: !0 });
        return k;
    }
    function qb(b)
    {
        try
        {
            var d = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
        }
        catch (k)
        {
            d = window.innerHeight > window.innerWidth;
        }
        if (d && b && b.video)
        {
            d = b.video.width;
            var e = b.video.height;
            d && e && d.ideal && e.ideal && d.ideal > e.ideal && ((b.video.height = d), (b.video.width = e));
        }
    }
    function rb(b)
    {
        b.volume = 0;
        ib(b, "muted");
        if (lb())
        {
            if (b.volume === 1)
            {
                var d = function ()
                {
                    b.volume = 0;
                    window.removeEventListener("mousemove", d, !1);
                    window.removeEventListener("touchstart", d, !1);
                };
                window.addEventListener("mousemove", d, !1);
                window.addEventListener("touchstart", d, !1);
            }
            setTimeout(() =>
            {
                b.volume = 0;
                ib(b, "muted");
            }, 5);
        }
    }
    function sb(b, d, e, k)
    {
        function p(m)
        {
            n || ((n = !0), e(m));
        }
        var n = !1;
        navigator.mediaDevices
            .getUserMedia(k)
            .then((m) =>
            {
                function r()
                {
                    setTimeout(() =>
                    {
                        if (b.currentTime)
                        {
                            var q = b.videoWidth,
                                g = b.videoHeight;
                            if (q === 0 || g === 0) p("VIDEO_NULLSIZE");
                            else
                            {
                                q && (b.style.width = q.toString() + "px");
                                g && (b.style.height = g.toString() + "px");
                                q = { lc: null, kd: null, Rc: null };
                                try
                                {
                                    var w = m.getVideoTracks()[0];
                                    w && ((q.Rc = w), (q.lc = w.getCapabilities()), (q.kd = w.getSettings()));
                                }
                                catch (v) {}
                                lb() || jb()
                                    ? b.parentNode && b.parentNode !== null
                                        ? (n || d(b, m, q),
                                        setTimeout(() =>
                                        {
                                            b.play();
                                        }, 100))
                                        : (document.body.appendChild(b),
                                        rb(b),
                                        n || d(b, m, q),
                                        setTimeout(() =>
                                        {
                                            b.style.transform = "scale(0.0001,0.0001)";
                                            b.style.position = "fixed";
                                            b.style.bottom = "0px";
                                            b.style.right = "0px";
                                            rb(b);
                                            setTimeout(() =>
                                            {
                                                b.play();
                                            }, 100);
                                        }, 80))
                                    : n || d(b, m, q);
                            }
                        }
                        else p("VIDEO_NOTSTARTED");
                    }, 700);
                }
                typeof b.srcObject !== "undefined" ? (b.srcObject = m) : ((b.src = window.URL.createObjectURL(m)), (b.videoStream = m));
                rb(b);
                b.addEventListener(
                    "loadeddata",
                    () =>
                    {
                        var q = b.play();
                        rb(b);
                        typeof q === "undefined"
                            ? r()
                            : q
                                .then(() =>
                                {
                                    r();
                                })
                                .catch(() =>
                                {
                                    p("VIDEO_PLAYPROMISEREJECTED");
                                });
                    },
                    !1,
                );
            })
            .catch((m) =>
            {
                p(m);
            });
    }
    function tb(b, d, e)
    {
        var k = mb() ? document.createElement("video") : !1;
        if (k)
        {
            if (mb())
            {
                if (e && e.video)
                {
                    if (jb())
                    {
                        var p = kb();
                        (p[0] < 12 || (p[0] === 12 && p[1] < 2)) && qb(e);
                    }
                    e.video.width && e.video.width.ideal && (k.style.width = e.video.width.ideal + "px");
                    e.video.height && e.video.height.ideal && (k.style.height = e.video.height.ideal + "px");
                }
                ib(k, "autoplay");
                ib(k, "playsinline");
                e && e.audio ? (k.volume = 0) : ib(k, "muted");
                sb(
                    k,
                    b,
                    () =>
                    {
                        function n(r)
                        {
                            if (r.length === 0) d("INVALID_FALLBACKCONSTRAINTS");
                            else
                            {
                                var q = r.shift();
                                sb(
                                    k,
                                    b,
                                    () =>
                                    {
                                        n(r);
                                    },
                                    q,
                                );
                            }
                        }
                        var m = pb(e);
                        n(m);
                    },
                    e,
                );
            }
            else d && d("MEDIASTREAMAPI_NOTFOUND");
        }
        else d && d("VIDEO_NOTPROVIDED");
    }
    window.JEEPUPILAPI = (function ()
    {
        var b,
            d,
            e,
            k,
            p,
            n,
            m,
            r,
            q,
            g,
            w,
            v,
            y,
            F,
            D,
            G,
            L,
            K,
            f,
            x,
            z,
            W,
            Z,
            ta,
            ja;
        function ba()
        {
            return {
                i: [0.5, 0.5], scale: [1, 1], J: !1, Ja: !1, fa: !1, je: !1, G: { i: [0.5, 0.5], A: 0, da: 1 }, P: { i: [0.5, 0.5], A: 0 },
            };
        }
        function c(h)
        {
            if (Y !== Q.pause)
            {
                var A = Y === Q.play ? X.Ma : t.cc;
                Ka = setTimeout(R.bind(null, h), A);
            }
        }
        function H()
        {
            if ([Q.play, Q.ba].indexOf(Y) !== -1) return !1;
            Y = Q.play;
            V.timestamp = Date.now();
            Ga && window.cancelAnimationFrame(Ga);
            R(0);
        }
        function I(h, A, ca, da)
        {
            h = 4 * h + A;
            return ca + (ia[h] / 255 + ia[h + 8] / 65025) * (da - ca);
        }
        function R()
        {
            if (Y !== Q.pause)
            {
                l.vc();
                J.reset();
                J.xa();
                a.disable(a.DEPTH_TEST);
                B.O();
                l.Ia();
                var h = P.element.currentTime - P.Ea;
                h < 0 && (P.Ea = P.element.currentTime);
                1e3 * h < t.pd || (P.J.refresh(), (P.Ea += h), l.set("s65"), P.va.o(), P.J.b(0), J.g(!1, !1));
                for (h = 0; h < V.T; ++h) (Xa = h === V.T - 1), l.set("s66"), oa.o(), P.va.b(0), va.b(1), J.g(!1, !1), oa.b(0), Ba.I(!1, oa);
                h = Date.now();
                V.ra = h - V.timestamp;
                if (X.Xa)
                {
                    var A = t.Na;
                    V.timestamp = h;
                    V.Eb = V.T / V.ra;
                    V.Za = V.Eb * A + V.Za * (1 - A);
                    V.Fb = 1e3 / V.ra;
                    V.ka = V.Fb * t.Na + V.ka * (1 - t.Na);
                    V.ka > t.ha[1] ? ((V.T = Math.min(V.T + 1, t.wa[1])), (V.ka = (t.ha[0] + t.ha[1]) / 2)) : V.ka < t.ha[0] && ((V.T = Math.max(V.T - 1, t.wa[0])), (V.ka = (t.ha[0] + t.ha[1]) / 2));
                    V.mc = t.ec / Math.max(V.Za, 0.001);
                }
                B.K();
                a.viewport(0, 0, 2, 2);
                l.set("s55");
                va.b(0);
                J.g(!1, !1);
                a.readPixels(0, 0, 2, 2, a.RGBA, a.UNSIGNED_BYTE, ia);
                m = I(0, 1, -1, 1);
                r = I(0, 2, -1, 1);
                q = I(0, 3, 0, 1);
                g = I(1, 0, -t.ma[0], t.ma[0]);
                w = I(1, 1, -t.ma[1], t.ma[1]);
                v = I(1, 2, -t.ma[2], t.ma[2]);
                y = I(1, 3, 0, 1);
                b = m - E.x;
                d = r - E.y;
                e = q - E.s;
                k = g - E.rx;
                p = w - E.ry;
                n = v - E.rz;
                h = Math.sqrt(b * b + d * d + e * e) / V.ra;
                A = Math.sqrt(k * k + p * p + n * n) / V.ra;
                h = 1 - Ca(t.lb[0], t.lb[1], h);
                A = 1 - Ca(t.Kb[0], t.Kb[1], A);
                A = h * A * Ca(t.Jb[0], t.Jb[1], y);
                var ca = (La[++ub % La.length] = A);
                for (h = 0; h < La.length; ++h) ca = Math.min(ca, La[h]);
                ca = Math.max(0.5, ca);
                A = Math.min(ca, A);
                h = la(t.gb[0], t.gb[1], 1 - Math.pow(A, t.ac));
                E.x = la(E.x, m, h);
                E.y = la(E.y, r, h);
                E.s = la(E.s, q, h);
                E.rx = la(E.rx, g, h);
                E.ry = la(E.ry, w, h);
                E.rz = la(E.rz, v, h);
                E.detected = la(E.detected, y, t.$b);
                !O.ja && E.detected > t.nb + t.mb ? (O.ja = !0) : O.ja && E.detected < t.nb - t.mb && (O.ja = !1);
                if (O.ja)
                {
                    B.O();
                    var da = aa / u;
                    h = E.x + t.uc * E.ry * E.s;
                    A = E.y + E.s * t.qb[1] * da;
                    var wa = E.s * t.qb[0] * da;
                    ca = E.s * t.Aa[0];
                    da *= E.s * t.Aa[1];
                    ca *= 2 * P.L[0];
                    da *= 2 * P.L[1];
                    h *= 2 * P.L[0];
                    A *= 2 * P.L[1];
                    wa *= P.L[0];
                    E.rx > 0 && (A *= Math.cos(t.zc * E.rx));
                    var Ea = wa;
                    Ea = E.ry < 0 ? Ea + Math.sin(E.ry) * t.za[0] : Ea - Math.sin(E.ry) * t.za[1];
                    O.w[0].i[0] = h + Ea;
                    O.w[0].i[1] = A;
                    O.w[0].scale[0] = ca;
                    O.w[0].scale[1] = da;
                    wa = E.ry > 0 ? wa - Math.sin(E.ry) * t.za[0] : wa + Math.sin(E.ry) * t.za[1];
                    O.w[1].i[0] = h - wa;
                    O.w[1].i[1] = A;
                    O.w[1].scale[0] = ca;
                    O.w[1].scale[1] = da;
                    O.w.forEach(ha);
                }
                B.nd();
                O.ja &&
                    (a.viewport(0, u / 2, aa / 2, u / 2),
                    ea(O.w[1]),
                    a.viewport(aa / 2, u / 2, aa / 2, u / 2),
                    ea(O.w[0]),
                    a.viewport(aa / 2, u / 4, aa / 4, u / 4),
                    ra(O.w[1]),
                    a.viewport(aa / 2 + aa / 4, u / 4, aa / 4, u / 4),
                    ra(O.w[0]),
                    a.viewport(aa / 2, 0, aa / 4, u / 4),
                    xa(O.w[1]),
                    a.viewport(aa / 2 + aa / 4, 0, aa / 4, u / 4),
                    xa(O.w[0]),
                    a.viewport(0, 0, aa / 2, u / 2));
                l.set("s56");
                va.b(0);
                P.va.b(1);
                J.g(!1, !1);
                X.Pa && ((E.pupilLeftRadius = O.w[0].P.A), (E.pupilRightRadius = O.w[1].P.A), X.Pa(E));
                if (Y === Q.play || Y === Q.ba) Ga = window.requestAnimationFrame(c);
            }
        }
        function ha(h)
        {
            l.set("s57");
            l.D("u29", na * h.scale[0], na * h.scale[1]);
            l.U("u40", h.i);
            l.U("u4", h.scale);
            l.u("u42", ma);
            h.J.o();
            P.J.b(0);
            J.g(!1, !1);
            var A = Qa.la(h.J);
            h.G.i[0] = la(h.G.i[0], A.i[0], t.Wa);
            h.G.i[1] = la(h.G.i[1], A.i[1], t.Wa);
            h.G.A = la(h.G.A, A.A, t.Wa);
            h.G.da = A.da;
            l.set("s58");
            l.D("u40", h.i[0] + h.scale[0] * (2 * h.G.i[0] - 1), h.i[1] + h.scale[1] * (2 * h.G.i[1] - 1));
            l.D("u4", 2 * h.G.A * h.scale[0], 2 * h.G.A * h.scale[1]);
            P.J.b(0);
            h.Ja.o();
            J.g(!1, !1);
            A = h.fa.l();
            var ca = (t.Z - A) / 2;
            l.set("s59");
            l.u("u43", Da);
            l.D("u44", ca / t.Z, A / t.Z);
            h.fa.o();
            h.Ja.b(0);
            J.g(!1, !1);
            U.Zc(h.fa, Ra);
            B.O();
            var da,
                wa,
                Ea = 0,
                Ma = [0.5, 0.5];
            for (wa = 0; wa < A; ++wa)
            {
                for (da = 0; da < A; ++da)
                {
                    var Ya = Ra[4 * (da + wa * A)];
                    Ya > Ea && ((Ea = Ya), (Ma[0] = (da + ca) / t.Z), (Ma[1] = (wa + ca) / t.Z));
                }
            }
            h.P.i[0] = Ma[0];
            h.P.i[1] = Ma[1];
            h.P.A = t.Ga[0] + (Ea / 255) * (t.Ga[1] - t.Ga[0]);
            h.P.A *= 0.5;
        }
        function ea(h)
        {
            h.J.b(0);
            l.set("s62");
            l.U("u40", h.G.i);
            l.u("u45", h.G.A);
            l.u("u46", h.G.da);
            J.g(!1, !1);
        }
        function ra(h)
        {
            h.Ja.b(0);
            l.set("s63");
            l.U("u40", h.P.i);
            l.u("u47", h.P.A);
            J.g(!1, !1);
        }
        function xa(h)
        {
            h.fa.b(0);
            l.set("s64");
            J.g(!1, !1);
        }
        function qa()
        {
            P.va = U.a({
                isPot: !0, isMirror: !0, isLinear: !0, isFloat: !1, width: aa, height: u,
            });
            oa = U.a({ isPot: !0, isFloat: !1, width: Ba.sb() });
            var h = {
                width: 2, height: 1, isFloat: !0, isPot: !1, array: new Float32Array([0, t.borderWidth, t.borderHeight, 0, 0, 0, 0, 0]),
            };
            va = Sa.a(h);
            ia = new Uint8Array(8 * h.width);
            r = m = y = 0;
            q = 1;
            v = w = g = 0;
            E = {
                detected: 0, x: 0, y: 0, s: 1, rx: 0, ry: 0, rz: 0, pupilLeftRadius: 0, pupilRightRadius: 0,
            };
            n = p = k = e = d = b = 0;
            O.w.forEach((A) =>
            {
                A.J = U.a({
                    isPot: !1, isLinear: !0, isFloat: !0, width: t.Ra, height: Math.round((t.Ra * t.Aa[1]) / t.Aa[0]),
                });
                A.Ja = U.a({
                    isPot: !0, isLinear: !0, isFloat: !0, isMipmap: !1, width: t.Z,
                });
                A.fa = U.a({
                    isPot: !1, isLinear: !1, isFloat: !1, width: Math.round(t.Wc * t.Z),
                });
                Ra = new Uint8Array(A.fa.l() * A.fa.l() * 4);
            });
        }
        function ka()
        {
            l.B("s66", [
                { type: "1i", name: "u1", value: 0 },
                { type: "1i", name: "u50", value: 1 },
                { type: "2f", name: "u51", value: N },
            ]);
            l.B("s67", [
                { type: "1i", name: "u52", value: 0 },
                { type: "1i", name: "u50", value: 1 },
                { type: "1f", name: "u55", value: t.minScaleTracked },
                { type: "1f", name: "u56", value: t.maxScaleTracked },
                { type: "1f", name: "u57", value: t.md },
                { type: "1f", name: "u58", value: t.Xb },
                { type: "1f", name: "u59", value: t.Vb },
                { type: "3f", name: "u54", value: [t.bb[0] * N[0], t.bb[1] * N[1], t.bb[2]] },
            ]);
            l.B("s68", [{ type: "1i", name: "u52", value: 0 }]);
            l.B("s55", [
                { type: "1i", name: "u50", value: 0 },
                { type: "1f", name: "u60", value: N[0] },
            ]);
            l.B("s56", [
                { type: "1i", name: "u50", value: 0 },
                { type: "1i", name: "u61", value: 1 },
                { type: "2f", name: "u51", value: N },
            ]);
            var h = [{ type: "1i", name: "u1", value: 0 }];
            l.B("s57", h);
            l.B("s58", h);
            l.B("s59", [{ type: "2f", name: "u34", value: t.Ga }].concat(h));
            l.B("s62", h);
            l.B("s63", h);
            l.B("s64", h);
        }
        function ua()
        {
            var h = Ba.sb(),
                A = aa / h;
            L = t.minScale * A;
            K = t.maxScale * A;
            f = (1 - 2 * t.borderWidth) / t.nStepsX;
            x = (1 - 2 * t.borderHeight) / t.nStepsY;
            z = (K - L) / t.nStepsScale;
            W = t.borderWidth;
            Z = t.borderHeight;
            ta = 1 - t.borderWidth;
            ja = 1 - t.borderHeight;
            N = [h / aa, h / u];
            F = 0;
            D = t.borderWidth;
            G = t.borderHeight;
            S = L;
        }
        function fa(h)
        {
            Aa(X.eb, (A) =>
            {
                h(A);
            });
        }
        function M()
        {
            if (
                Pa.j({
                    qa: X.S,
                    width: aa,
                    height: u,
                    debug: !1,
                    Tc()
                    {
                        sa("GLCONTEXT_LOST");
                    },
                    antialias: !0,
                    premultipliedAlpha: !0,
                })
            )
            {
                if (Pa.Lc()) return !0;
                sa("GL_INCOMPATIBLE");
                return !1;
            }
            sa("GL_INCOMPATIBLE");
            return !1;
        }
        function C()
        {
            va.fd(1);
            a.viewport(0, 0, 1, 1);
            l.set("s67");
            l.hd("u53", D, G, S);
            J.g(!1, !1);
            Xa && (a.viewport(1, 0, 1, 1), l.set("s68"), J.g(!1, !1));
            ++F % 2 !== 1 && ((S += z), S > K && ((D += f), (S = L), D > ta && ((D = W), (G += x), G > ja && (G = Z))));
        }
        function T()
        {
            l.B("s65", [
                { type: "1i", name: "u1", value: 0 },
                { type: "2f", name: "u48", value: P.L },
            ]);
        }
        function pa()
        {
            P.L[0] = 0.5;
            P.L[1] = 0.5;
            var h = P.ya[1] / P.ya[0],
                A = Pa.N() / Pa.l();
            h > A ? (P.L[1] *= A / h) : (P.L[0] *= h / A);
        }
        function ya(h, A, ca)
        {
            h && h();
            h = { video: { width: { min: za.minWidth, max: za.maxWidth, ideal: za.idealWidth }, height: { min: za.minHeight, max: za.maxHeight, ideal: za.idealHeight } }, audio: !1 };
            za.deviceId && (h.deviceId = za.deviceId);
            tb(
                (da) =>
                {
                    A && A(da);
                    ca(da);
                },
                () =>
                {
                    sa("WEBCAM_UNAVAILABLE");
                },
                h,
            );
        }
        function sa(h)
        {
            Y !== Q.error && ((Y = Q.error), X.pa && X.pa(h));
        }
        var t = {
                save: "jeelizPupillometryNNC.json",
                bc: 0,
                cc: 25,
                Na: 0.2,
                ha: [45, 60],
                ec: 1 / 3.5,
                wa: [2, 5],
                Wb: 2,
                minScale: 0.3,
                maxScale: 1.1,
                borderWidth: 0.2,
                borderHeight: 0.2,
                nStepsX: 6,
                nStepsY: 5,
                nStepsScale: 3,
                bb: [0.1, 0.1, 0.25],
                md: 60,
                minScaleTracked: 0.6,
                maxScaleTracked: 20,
                Xb: 0.7,
                Vb: 1,
                lb: [0.0015, 0.005],
                Kb: [0.003, 0.02],
                Jb: [0.9, 0.98],
                ma: [0.49, 0.42, 0.17],
                gb: [0.3, 1],
                $b: 0.2,
                ac: 2,
                nb: 0.5,
                mb: 0.03,
                qb: [0.9, 0.57],
                Aa: [0.22, 0.22],
                uc: 0.5,
                Ra: 256,
                za: [0, 0],
                zc: 3,
                Tb: [0.21, 0.24],
                Sb: 40,
                Ub: 0.4,
                Z: 128,
                Wa: 1,
                Mc: 0.005,
                Ga: [0.07, 0.65],
                Wc: 0.15,
                Xc: 0.025,
                pd: 20,
            },
            za = {
                idealWidth: 3264, idealHeight: 2448, minWidth: 1920, maxWidth: 7680, minHeight: 1080, maxHeight: 4320,
            },
            Da = t.Xc,
            na = t.Mc,
            ma,
            O = { ja: !1, w: [ba(), ba()] },
            Q = {
                Pc: -1, error: -2, vb: 0, play: 1, pause: 2, ba: 3,
            },
            Y = Q.vb,
            P = {
                element: !1, J: !1, va: !1, ya: [0, 0], L: [0.5, 0.5], Ea: 0,
            },
            X = {
                pa: !1, Pa: !1, eb: "./", S: !1, Ma: t.bc, Xa: !0,
            },
            Ba;
        var S = (G = D = F = K = L = ja = ta = Z = W = z = x = f = 0);
        var aa,
            u,
            N,
            oa,
            va,
            ia,
            E,
            Ka = !1,
            Ga = !1,
            Xa = !1,
            Ra,
            V = {
                ra: 0, timestamp: 0, Eb: 0, Za: 0, T: t.wa[0], Zd: t.wa[0], Fb: 0, ka: 0, mc: 1,
            },
            La = new Float32Array(12),
            ub = 0,
            Qa,
            Za = {
                init(h)
                {
                    function A()
                    {
                        Y !== Q.error && ++ca === 2 && (pa(), (P.J = U.a({
                            H: P.element, isPot: !1, isFloat: !1, isFlipY: !0, isLinear: !0,
                        })), T(), X.pa && (X.pa(!1, { GL: a, canvasElement: X.S, videoTexture: P.va.get() }), a.disable(a.BLEND)), H());
                    }
                    if (Y !== Q.vb) return h.callbackReady && h.callbackReady("ALREADY_INITIALIZED"), !1;
                    Y = Q.Pc;
                    h.callbackReady && (X.pa = h.callbackReady);
                    h.callbackTrack && (X.Pa = h.callbackTrack);
                    typeof h.animateDelay !== "undefined" && (X.Ma = h.animateDelay);
                    X.Xa = typeof h.isAdaptative === "undefined" ? !0 : h.isAdaptative;
                    X.Xa || (V.T = t.Wb);
                    typeof h.NNCpath !== "undefined" && (X.eb = h.NNCpath);
                    if (!h.canvasId) return sa("NO_CANVASID"), !1;
                    X.S = document.getElementById(h.canvasId);
                    if (!X.S) return sa("INVALID_CANVASID"), !1;
                    aa = X.S.width;
                    u = X.S.height;
                    if (!aa || !u) return sa("INVALID_CANVASDIMENSIONS"), !1;
                    var ca = 0;
                    ya(h.onWebcamAsk, h.onWebcamGet, (da) =>
                    {
                        if (Y !== Q.error)
                        {
                            var wa = da.videoHeight;
                            P.ya[0] = da.videoWidth;
                            P.ya[1] = wa;
                            P.element = da;
                            A && A();
                        }
                    });
                    fa((da) =>
                    {
                        if (!M()) return !1;
                        Ba = new gb();
                        Ba.ad(da.layers);
                        Ba.cd({ Hb: "gpuRawAvg", Uc: C });
                        l.Zb([
                            {
                                id: "s65",
                                name: "_",
                                V: "attribute vec2 a0;uniform vec2 u48;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u48*a0;}",
                                ga_: ["a0"],
                                Y: [2],
                                c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                                f: ["u1", "u48"],
                                precision: "lowp",
                            },
                            {
                                id: "s66",
                                name: "_",
                                c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                                V: "attribute vec2 a0;uniform sampler2D u50;uniform vec2 u51;varying vec2 vv0;void main(){vec4 a=texture2D(u50,vec2(.17,.5));vec2 b=a.gb,c=a.a*u51;vv0=b+a0*.5*c,gl_Position=vec4(a0,0.,1.);}",
                                ga_: ["a0"],
                                Y: [2],
                                f: ["u1", "u50", "u51"],
                                precision: "lowp",
                            },
                            {
                                id: "s67",
                                name: "_",
                                c:
                                    "uniform sampler2D u52,u50;uniform vec3 u53,u54;uniform float u55,u56,u57,u58,u59;const vec4 k=vec4(1.,1.,1.,1.),l=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){vec4 c=texture2D(u52,vec2(.5,.5)),d=texture2D(u52,vec2(.75,.5));float g=dot(e,texture2D(u52,vec2(.75,.75))),h=dot(e,texture2D(u52,vec2(0.,.5))),i=dot(e,texture2D(u52,vec2(.25,.5)));vec4 a=texture2D(u50,vec2(.25,.5));float b=dot(c,e),j=dot(d,e);bool f=b>u58&&b>j+u59;f?a.r=2.:a.r>u57?a.r=0.:a.r>1.9&&(a.a>u56||a.a<u55)?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u53);else a.r*=step(1.9,a.r),a.gba+=vec3(g,h,i)*u54*a.a;gl_FragColor=a;}",
                                V: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                                f: "u52 u50 u53 u55 u56 u57 u54 u58 u59".split(" "),
                            },
                            {
                                id: "s68",
                                name: "_",
                                V: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                                c:
                                    "uniform sampler2D u52;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u52,vec2(0.,.75))),b=dot(e,texture2D(u52,vec2(.25,.75))),c=dot(e,texture2D(u52,vec2(.5,.75))),d=dot(e,texture2D(u52,vec2(.5,.5)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
                                f: ["u52"],
                            },
                            {
                                id: "s55",
                                name: "_",
                                c:
                                    "uniform sampler2D u50;uniform float u60;varying vec2 vv0;void main(){float g=step(.5,vv0.y),c=step(.5,vv0.x);vec4 a=texture2D(u50,vec2(vv0.x,.5));a.a=mix(a.a*u60,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                                f: ["u50", "u60"],
                            },
                            {
                                id: "s56",
                                name: "_",
                                c:
                                    "uniform sampler2D u50,u61;uniform vec2 u51;varying vec2 vv0;void main(){vec2 a=vec2(1.-vv0.x,vv0.y);vec4 d=texture2D(u50,vec2(.25,.5));vec2 b=d.gb;float i=d.a;vec2 c=i*u51,j=b+c/2.,k=b-c/2.,f=step(k,a)*step(a,j);vec3 l=texture2D(u61,a).rgb;vec2 g=2.*abs(b-a)/c;float m=f.x*f.y*pow(max(g.x,g.y),3.);vec3 h=mix(l,vec3(0.,.6,1.),m);gl_FragColor=vec4(h,1.);}",
                                f: ["u50", "u61", "u51"],
                            },
                            {
                                id: "s57",
                                name: "_",
                                c:
                                    "varying vec2 vv0;uniform sampler2D u1;uniform vec2 u29;uniform float u42;const vec3 f=vec3(.3333,.3333,.3333);void main(){vec3 a=vec3(0.);a-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y-u29.y)).rgb*1.,a-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y)).rgb*2.,a-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y+u29.y)).rgb*1.,a+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y-u29.y)).rgb*1.,a+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y)).rgb*2.,a+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y+u29.y)).rgb*1.;vec3 b=vec3(0.);b-=texture2D(u1,vec2(vv0.x-u29.x,vv0.y-u29.y)).rgb*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29.y)).rgb*2.,b-=texture2D(u1,vec2(vv0.x+u29.x,vv0.y-u29.y)).rgb*1.,b+=texture2D(u1,vec2(vv0.x-u29.x,vv0.y+u29.y)).rgb*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29.y)).rgb*2.,b+=texture2D(u1,vec2(vv0.x+u29.x,vv0.y+u29.y)).rgb*1.;vec3 e=a*a+b*b,h=texture2D(u1,vv0).rgb;float c=dot(e,f),g=dot(h,f);c=smoothstep(u42-.1,u42+.1,c),gl_FragColor=vec4(c,g,0.,1.);}",
                                V: "attribute vec2 a0;uniform vec2 u4,u40;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u40+u4*a0,vv0=.5*vv0+vec2(.5,.5);}",
                                ga_: ["a0"],
                                Y: [2],
                                f: ["u1", "u4", "u40", "u29", "u42"],
                            },
                            {
                                id: "s58",
                                name: "_",
                                c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                                V: "attribute vec2 a0;uniform vec2 u4,u40;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u40+u4*a0,vv0=.5*vv0+vec2(.5,.5);}",
                                ga_: ["a0"],
                                Y: [2],
                                f: ["u1", "u4", "u40"],
                            },
                            {
                                id: "s59",
                                name: "_",
                                c:
                                    "uniform sampler2D u1;uniform vec2 u44,u34;uniform float u43;varying vec2 vv0;const float n=3.141592;const int o=4;int l(vec2 a,vec3 d){vec3 b=texture2D(u1,a).rgb;float c=length(b);return int(step(c,u43));}void main(){vec2 h=u44.x*vec2(1.,1.)+vv0*u44.y;vec3 k=texture2D(u1,h).rgb;float c=0.,d,f;int a;vec2 j,i,b;for(float g=0.;g<60.;g+=1.){d=0.,a=o,f=g*n/60.,j=vec2(cos(f),sin(f));for(float e=0.;e<255.;e+=1.){i=(u34.x/2.+e/255.*(u34.y-u34.x)/2.)*j;if(a>0)b=h+i,a-=1-l(b,k),b=h-i,a-=1-l(b,k),d+=1.;}c=max(d,c);}gl_FragColor=vec4(c/255.,0,0,1.);}",
                                f: ["u1", "u44", "u34", "u43"],
                            },
                            {
                                id: "s62",
                                name: "_",
                                c:
                                    "uniform sampler2D u1;uniform vec2 u40;uniform float u45,u46;const vec3 g=vec3(0.,1.,0.);varying vec2 vv0;void main(){vec2 b=vec2(1.,u46);float d=distance(vv0*b,u40*b),f=step(abs(d-u45),1e-3);vec3 c=texture2D(u1,vv0).rgb,a=c.g*vec3(1.,1.,1.);a.r+=c.r,a=mix(a,g,f),gl_FragColor=vec4(a,1.);}",
                                f: ["u1", "u40", "u45", "u46"],
                            },
                            {
                                id: "s63",
                                name: "_",
                                c:
                                    "uniform sampler2D u1;uniform vec2 u40;uniform float u47;const vec3 f=vec3(0.,1.,0.),g=vec3(0.,1.,0.);varying vec2 vv0;void main(){float b=step(abs(distance(vv0,u40)-u47),2e-3),c=step(distance(vv0,u40),4e-3);vec3 d=texture2D(u1,vv0).rgb,a=d;a=mix(a,f,b),a=mix(a,g,c),gl_FragColor=vec4(a,1.);}",
                                f: ["u1", "u40", "u47"],
                            },
                            {
                                id: "s64", name: "_", c: "uniform sampler2D u1;varying vec2 vv0;void main(){float a=texture2D(u1,vv0).r;gl_FragColor=vec4(a,0.,0.,1.);}", f: ["u1"],
                            },
                        ]);
                        qa();
                        Qa = hb.a({
                            width: t.Ra, $a: t.Tb, Gb: t.Sb, Lb: t.Ub,
                        });
                        ua();
                        ka();
                        A();
                        Za.update_controls();
                    });
                    return !0;
                },
                toggle_pause(h)
                {
                    if ([Q.play, Q.pause, Q.ba].indexOf(Y) !== -1) return h ? ([Q.play, Q.ba].indexOf(Y) === -1 ? (h = !1) : (Ka && (clearTimeout(Ka), (Ka = !1)), Ga && (window.cancelAnimationFrame(Ga), (Ga = !1)), (Y = Q.pause), (h = !0))) : (h = H()), h;
                },
                toggle_slow(h)
                {
                    [Q.play, Q.pause, Q.ba].indexOf(Y) !== -1 && [Q.play, Q.ba].indexOf(Y) !== -1 && (Y = h ? Q.ba : Q.play);
                },
                set_animateDelay(h)
                {
                    X.Ma = h;
                },
                resize()
                {
                    var h = X.S.width,
                        A = X.S.height;
                    if (h === aa && A === u) return !1;
                    aa = h;
                    u = A;
                    ua();
                    ka();
                    pa();
                    T();
                    return !0;
                },
                update_controls()
                {
                    function h(ca)
                    {
                        return (ca = document.getElementById(ca)) ? parseFloat(ca.value) : !1;
                    }
                    var A = h("jeePupilControlIrisEdgeSize");
                    !1 !== A && ((na = A), T());
                    A = h("jeePupilControlIrisThres");
                    !1 !== A && (ma = A);
                    A = h("jeePupilControlIrisRoundness");
                    !1 !== A && Qa.ed(A);
                    A = h("jeePupilControlPupilSensitivity");
                    !1 !== A && (Da = A);
                },
            };
        return Za;
    }());
    return JEEPUPILAPI;
}());
