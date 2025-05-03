/**
 * Jeeliz Glance Tracker - https://github.com/jeeliz/jeelizGlanceTracker
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

var GLANCETRACKERAPI = (function ()
{
    function na(b, d)
    {
        d(b);
    }
    function qa(b)
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
    function sa(b, d)
    {
        var e = d % 8;
        return (b[(d - e) / 8] >> (7 - e)) & 1;
    }
    function ua(b)
    {
        var d = JSON.parse(b);
        b = d.ne;
        var e = d.nf,
            f = d.n,
            l = typeof btoa === "undefined" ? Buffer.from(d.data, "base64").toString("latin1") : atob(d.data),
            k = l.length,
            p;
        d = new Uint8Array(k);
        for (p = 0; p < k; ++p) d[p] = l.charCodeAt(p);
        l = new Float32Array(f);
        k = new Float32Array(e);
        p = b + e + 1;
        var m,
            n;
        for (m = 0; m < f; ++m)
        {
            var g = p * m;
            var r = sa(d, g) === 0 ? 1 : -1;
            var q = g + 1;
            var x = 1,
                z = 0;
            for (n = q + b - 1; n >= q; --n) (z += x * sa(d, n)), (x *= 2);
            n = z;
            q = d;
            x = g + 1 + b;
            z = k;
            var H = 0,
                A = z.length;
            for (g = x; g < x + A; ++g) (z[H] = sa(q, g)), ++H;
            for (g = q = 0; g < e; ++g) q += k[g] * Math.pow(2, -g - 1);
            r = q === 0 && n === 0 ? 0 : r * (1 + q) * Math.pow(2, 1 + n - Math.pow(2, b - 1));
            l[m] = r;
        }
        return l;
    }
    var t = (function ()
        {
            function b(h, v)
            {
                h = a.createShader(h);
                a.shaderSource(h, v);
                a.compileShader(h);
                return a.getShaderParameter(h, a.COMPILE_STATUS) ? h : !1;
            }
            function d(h, v)
            {
                h = b(a.VERTEX_SHADER, h);
                v = b(a.FRAGMENT_SHADER, v);
                var w = a.createProgram();
                a.attachShader(w, h);
                a.attachShader(w, v);
                a.linkProgram(w);
                return w;
            }
            function e(h)
            {
                void 0 === h.W && (h.W = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
                void 0 === h.Y && (h.Y = ["a0"]);
                void 0 === h.R && (h.R = [2]);
                if (void 0 === h.precision || h.precision === "highp") h.precision = n;
                h.id = p++;
                void 0 !== h.Lb &&
                    h.Lb.forEach((w, Q) =>
                    {
                        h.c = h.c.replace(w, h.da[Q]);
                    });
                h.ua = 0;
                h.R.forEach((w) =>
                {
                    h.ua += 4 * w;
                });
                h.ca = d(h.W, "precision " + h.precision + " float;\n" + h.c);
                h.l = {};
                h.f.forEach((w) =>
                {
                    h.l[w] = a.getUniformLocation(h.ca, w);
                });
                h.attributes = {};
                h.S = [];
                h.Y.forEach((w) =>
                {
                    var Q = a.getAttribLocation(h.ca, w);
                    h.attributes[w] = Q;
                    h.S.push(Q);
                });
                if (h.h)
                {
                    a.useProgram(h.ca);
                    k = h;
                    l = h.id;
                    for (var v in h.h) a.uniform1i(h.l[v], h.h[v]);
                }
                h.Fc = !0;
            }
            function f(h)
            {
                wa.Tb(D);
                l !== h.id &&
                    (D.P(),
                    (l = h.id),
                    (k = h),
                    a.useProgram(h.ca),
                    h.S.forEach((v) =>
                    {
                        v !== 0 && a.enableVertexAttribArray(v);
                    }));
            }
            var l = -1,
                k = !1,
                p = 0,
                m = !1,
                n = "highp",
                g = ["u1"],
                r = ["u0"],
                q = { u1: 0 },
                x = { u0: 0 },
                z = { u1: 0, u2: 1 },
                H = { u3: 0 },
                A = {
                    s0: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: g, h: q },
                    s1: {
                        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: g, h: q, precision: "lowp",
                    },
                    s2: { c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}", f: ["u1", "u2"], h: z },
                    s3: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}", f: g, h: q },
                    s4: { c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}", f: ["u1", "mask"], h: z },
                    s5: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}", f: g, h: q },
                    s6: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}", f: g, h: q },
                    s7: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}", f: ["u0", "u4"], h: x },
                    s8: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}", f: ["u0", "u4"], h: x },
                    s9: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}", f: g, h: q },
                    s10: { c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}", f: ["u1", "u5", "u6"], h: { u1: 0, u5: 1 } },
                    s11: { c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}", f: ["u1", "u7"], h: q },
                    s12: {
                        c:
                            "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
                        f: ["u1", "u8"],
                        h: q,
                    },
                    s13: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}", f: r, h: x },
                    s14: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}", f: r, h: x },
                    s15: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}", f: r, h: x },
                    s16: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}", f: r, h: x },
                    s17: { c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}", f: ["u0", "u6", "u9"], h: { u0: 0, u6: 1, u9: 2 } },
                    s18: { c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}", f: r, h: x },
                    s19: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}", f: r, h: x },
                    s20: { c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}", f: ["u0", "u10"], h: x },
                    s21: {
                        c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
                        f: ["u0", "u13", "u12"],
                        h: { u0: 0, u13: 1 },
                    },
                    s22: { c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}", f: ["u1", "u14"], h: q },
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
                        c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}", f: g, h: q, precision: "lowp",
                    },
                    s30: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}",
                        f: ["u1", "u28"],
                        h: q,
                        precision: "lowp",
                    },
                    s31: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                        f: ["u1", "u28"],
                        h: q,
                        precision: "lowp",
                    },
                    s32: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
                        f: ["u1", "u2", "u29"],
                        h: z,
                    },
                    s33: {
                        c:
                            "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}",
                        f: ["u1", "u2", "u29"],
                        h: z,
                    },
                    s34: {
                        c:
                            "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
                        f: ["u3", "u7"],
                        h: H,
                    },
                    s35: {
                        c:
                            "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
                        f: ["u3", "u7"],
                        h: H,
                    },
                    s36: {
                        c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}", f: ["u1"], h: q, precision: "lowp",
                    },
                    s37: {
                        c:
                            "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
                        f: ["u7", "u1"],
                        h: q,
                        precision: "lowp",
                    },
                    s38: {
                        c: "uniform sampler2D u1,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
                        f: ["u1", "u30", "u31"],
                        h: { u1: 0, u30: 1, u31: 2 },
                    },
                },
                F = {
                    s39: {
                        c:
                            "uniform float u18,u32;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        f: ["u18", "u15", "u16", "u23", "u32"],
                        da: ["1.1111", "gl_FragColor\\*=2.2222;"],
                    },
                    s40: {
                        c:
                            "uniform float u18,u32,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        f: "u18 u26 u15 u16 u23 u32".split(" "),
                        da: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
                    },
                },
                D = {
                    qa()
                    {
                        return m;
                    },
                    i()
                    {
                        if (!m)
                        {
                            n = "highp";
                            for (var h in A) e(A[h], h);
                            t.set("s0");
                            a.enableVertexAttribArray(0);
                            h = xa.i();
                            m = !0;
                            return h;
                        }
                    },
                    $a(h)
                    {
                        h.forEach((v) =>
                        {
                            D.xa(v);
                        });
                    },
                    xa(h)
                    {
                        A[h.id] = h;
                        e(h, h.id);
                    },
                    Ja(h, v, w)
                    {
                        v || (v = h);
                        A[v] = Object.create(F[h]);
                        F[h].da &&
                            F[h].da.forEach((Q, fa) =>
                            {
                                A[v].c = A[v].c.replace(new RegExp(Q, "g"), w[fa]);
                            });
                        e(A[v], v);
                    },
                    set(h)
                    {
                        f(A[h]);
                    },
                    rb(h)
                    {
                        return typeof A[h] !== "undefined";
                    },
                    pc()
                    {
                        return k.mc;
                    },
                    P()
                    {
                        l !== -1 &&
                            ((l = -1),
                            k.S.forEach((h) =>
                            {
                                h !== 0 && a.disableVertexAttribArray(h);
                            }));
                    },
                    sa()
                    {
                        var h = 0;
                        k.S.forEach((v, w) =>
                        {
                            w = k.R[w];
                            a.vertexAttribPointer(v, w, a.FLOAT, !1, k.ua, h);
                            h += 4 * w;
                        });
                    },
                    lc()
                    {
                        a.enableVertexAttribArray(0);
                    },
                    ta()
                    {
                        a.vertexAttribPointer(k.S[0], 2, a.FLOAT, !1, 8, 0);
                    },
                    Sc(h, v)
                    {
                        a.uniform1i(k.l[h], v);
                    },
                    C(h, v)
                    {
                        a.uniform1f(k.l[h], v);
                    },
                    G(h, v, w)
                    {
                        a.uniform2f(k.l[h], v, w);
                    },
                    Tc(h, v)
                    {
                        a.uniform2fv(k.l[h], v);
                    },
                    Uc(h, v)
                    {
                        a.uniform3fv(k.l[h], v);
                    },
                    Ub(h, v, w, Q)
                    {
                        a.uniform3f(k.l[h], v, w, Q);
                    },
                    Va(h, v)
                    {
                        a.uniform4fv(k.l[h], v);
                    },
                    Vc(h, v)
                    {
                        a.uniformMatrix2fv(k.l[h], !1, v);
                    },
                    Wc(h, v)
                    {
                        a.uniformMatrix3fv(k.l[h], !1, v);
                    },
                    Xc(h, v)
                    {
                        a.uniformMatrix4fv(k.l[h], !1, v);
                    },
                    D(h, v)
                    {
                        D.set(h);
                        v.forEach((w) =>
                        {
                            switch (w.type)
                            {
                            case "4f":
                                a.uniform4fv(k.l[w.name], w.value);
                                break;
                            case "3f":
                                a.uniform3fv(k.l[w.name], w.value);
                                break;
                            case "2f":
                                a.uniform2fv(k.l[w.name], w.value);
                                break;
                            case "1f":
                                a.uniform1f(k.l[w.name], w.value);
                                break;
                            case "1i":
                                a.uniform1i(k.l[w.name], w.value);
                                break;
                            case "mat2":
                                a.uniformMatrix2fv(k.l[w.name], !1, w.value);
                                break;
                            case "mat3":
                                a.uniformMatrix3fv(k.l[w.name], !1, w.value);
                                break;
                            case "mat4":
                                a.uniformMatrix4fv(k.l[w.name], !1, w.value);
                            }
                        });
                    },
                    yc()
                    {
                        return "lowp";
                    },
                };
            return D;
        }()),
        a = !1,
        Aa = (function ()
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
                f = !1,
                l = !1,
                k = !1,
                p = !0,
                m = !1,
                n = {
                    s()
                    {
                        return e.width;
                    },
                    F()
                    {
                        return e.height;
                    },
                    qc()
                    {
                        return e;
                    },
                    oc()
                    {
                        return a;
                    },
                    m()
                    {
                        return p;
                    },
                    flush()
                    {
                        a.flush();
                    },
                    vb()
                    {
                        m || (m = new Uint8Array(e.width * e.height * 4));
                        a.readPixels(0, 0, e.width, e.height, a.RGBA, a.UNSIGNED_BYTE, m);
                        return m;
                    },
                    sc()
                    {
                        return e.toDataURL("image/jpeg");
                    },
                    tc()
                    {
                        G.B();
                        f || ((f = document.createElement("canvas")), (l = f.getContext("2d")));
                        f.width = e.width;
                        f.height = e.height;
                        var g = n.vb(),
                            r = l.createImageData(f.width, f.height),
                            q,
                            x,
                            z = f.width,
                            H = f.height,
                            A = r.data;
                        for (x = 0; x < H; ++x)
                        {
                            var F = H - x - 1;
                            for (q = 0; q < z; ++q)
                            {
                                var D = 4 * (x * z + q);
                                var h = 4 * (F * z + q);
                                A[D] = g[h];
                                A[D + 1] = g[h + 1];
                                A[D + 2] = g[h + 2];
                                A[D + 3] = g[h + 3];
                            }
                        }
                        l.putImageData(r, 0, 0);
                        return f.toDataURL("image/png");
                    },
                    rc(g)
                    {
                        !f && g && ((f = document.createElement("canvas")), (l = f.getContext("2d")));
                        var r = g ? f : document.createElement("canvas");
                        r.width = e.width;
                        r.height = e.height;
                        (g ? l : r.getContext("2d")).drawImage(e, 0, 0);
                        return r;
                    },
                    i(g)
                    {
                        g.Da && !g.Z ? (e = document.getElementById(g.Da)) : g.Z && (e = g.Z);
                        e || (e = document.createElement("canvas"));
                        e.width = g && void 0 !== g.width ? g.width : 512;
                        e.height = g && void 0 !== g.height ? g.height : 512;
                        typeof g === "undefined" && (g = {});
                        void 0 === g.premultipliedAlpha && (g.premultipliedAlpha = !1);
                        void 0 === g.pa && (g.pa = !0);
                        void 0 === g.antialias && (g.antialias = !1);
                        var r = {
                            antialias: g.antialias, alpha: !0, preserveDrawingBuffer: !0, premultipliedAlpha: g.premultipliedAlpha, stencil: !1, depth: g.pa,
                        };
                        d() || (a = e.getContext("webgl2", r));
                        a ? (p = !0) : ((a = e.getContext("webgl", r)) || (a = e.getContext("experimental-webgl", r)), (p = !1));
                        if (!a) return b("WebGL is not enabled");
                        (k = a.getExtension("WEBGL_lose_context")) && e.addEventListener("webglcontextlost", g.Nc, !1);
                        if (!I.i()) return b("Not enough capabilities");
                        if (!I.gb() && p) return b("Your configuration cannot process color buffer float");
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
                    Ec()
                    {
                        if (!t.i()) return !1;
                        a.depthFunc(a.LEQUAL);
                        a.clearDepth(1);
                        return !0;
                    },
                };
            return n;
        }()),
        wa = (function ()
        {
            var b = typeof t === "undefined" ? JEShaders : t;
            return {
                Tb(d)
                {
                    b !== d && (b.P(), (b = d));
                },
                qa()
                {
                    return b.qa();
                },
                ta()
                {
                    b.ta();
                },
                sa()
                {
                    b.sa();
                },
                P()
                {
                    b.P();
                },
                set(d)
                {
                    b.set(d);
                },
            };
        }()),
        L = (function ()
        {
            var b,
                d,
                e = 0,
                f = -2,
                l = -2,
                k = !1,
                p = {
                    reset()
                    {
                        l = f = -2;
                    },
                    i()
                    {
                        k ||
                            ((b = a.createBuffer()),
                            a.bindBuffer(a.ARRAY_BUFFER, b),
                            a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), a.STATIC_DRAW),
                            (d = a.createBuffer()),
                            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d),
                            a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), a.STATIC_DRAW),
                            p.ha(),
                            (k = !0));
                    },
                    a(m)
                    {
                        var n = e++,
                            g = m.K ? m.K.length : 0,
                            r = typeof m.mode === "undefined" ? a.STATIC_DRAW : m.mode,
                            q = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, q);
                        a.bufferData(a.ARRAY_BUFFER, m.Ya instanceof Float32Array ? m.Ya : new Float32Array(m.Ya), r);
                        f = n;
                        if (m.K)
                        {
                            var x = a.createBuffer();
                            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, x);
                            if (m.K.length < 65536)
                            {
                                var z = Uint16Array;
                                var H = a.UNSIGNED_SHORT;
                                var A = 2;
                            }
                            else (z = Uint32Array), (H = a.UNSIGNED_INT), (A = 4);
                            a.bufferData(a.ELEMENT_ARRAY_BUFFER, m.K instanceof z ? m.K : new z(m.K), r);
                            l = n;
                        }
                        var F = {
                            eb(D)
                            {
                                f !== n && (a.bindBuffer(a.ARRAY_BUFFER, q), (f = n));
                                D && wa.sa();
                            },
                            bb()
                            {
                                l !== n && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, x), (l = n));
                            },
                            bind(D)
                            {
                                F.eb(D);
                                F.bb();
                            },
                            jc()
                            {
                                a.drawElements(a.TRIANGLES, g, H, 0);
                            },
                            kc(D, h)
                            {
                                a.drawElements(a.TRIANGLES, D, H, h * A);
                            },
                            remove()
                            {
                                a.deleteBuffer(q);
                                m.K && a.deleteBuffer(x);
                                F = null;
                            },
                        };
                        return F;
                    },
                    ha()
                    {
                        f !== -1 && (a.bindBuffer(a.ARRAY_BUFFER, b), (f = -1));
                        l !== -1 && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d), (l = -1));
                    },
                    g(m, n)
                    {
                        m && L.ha();
                        n && wa.ta();
                        a.drawElements(a.TRIANGLES, 3, a.UNSIGNED_SHORT, 0);
                    },
                    ub()
                    {
                        a.deleteBuffer(b);
                        a.deleteBuffer(d);
                    },
                };
            return p;
        }()),
        G = (function ()
        {
            var b,
                d,
                e,
                f = !1,
                l = { o: -2, sb: 1 };
            return {
                i()
                {
                    if (!f)
                    {
                        b = a.createFramebuffer();
                        var k = I.m();
                        d = k && a.DRAW_FRAMEBUFFER ? a.DRAW_FRAMEBUFFER : a.FRAMEBUFFER;
                        e = k && a.READ_FRAMEBUFFER ? a.READ_FRAMEBUFFER : a.FRAMEBUFFER;
                        f = !0;
                    }
                },
                vc()
                {
                    return d;
                },
                ma()
                {
                    return e;
                },
                O()
                {
                    return a.FRAMEBUFFER;
                },
                zc()
                {
                    return l;
                },
                nc()
                {
                    return b;
                },
                a(k)
                {
                    void 0 === k.Ka && (k.Ka = !1);
                    var p = k.Yb ? k.Yb : !1,
                        m = k.width,
                        n = void 0 !== k.height ? k.height : k.width,
                        g = b,
                        r = !1,
                        q = !1,
                        x = 0;
                    p && ((m = m || p.s()), (n = n || p.F()));
                    var z = {
                        Ua()
                        {
                            q || ((g = a.createFramebuffer()), (q = !0), (x = l.sb++));
                        },
                        Za()
                        {
                            z.Ua();
                            z.j();
                            r = a.createRenderbuffer();
                            a.bindRenderbuffer(a.RENDERBUFFER, r);
                            a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, m, n);
                            a.framebufferRenderbuffer(d, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, r);
                            a.clearDepth(1);
                        },
                        bind(H, A)
                        {
                            x !== l.o && (a.bindFramebuffer(d, g), (l.o = x));
                            p && p.j();
                            A && a.viewport(0, 0, m, n);
                            H && a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                        },
                        dc()
                        {
                            x !== l.o && (a.bindFramebuffer(d, g), (l.o = x));
                        },
                        clear()
                        {
                            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                        },
                        gc()
                        {
                            a.clear(a.COLOR_BUFFER_BIT);
                        },
                        hc()
                        {
                            a.clear(a.DEPTH_BUFFER_BIT);
                        },
                        Vb()
                        {
                            a.viewport(0, 0, m, n);
                        },
                        j()
                        {
                            x !== l.o && (a.bindFramebuffer(d, g), (l.o = x));
                        },
                        rtt(H)
                        {
                            p = H;
                            l.o !== x && (a.bindFramebuffer(a.FRAMEBUFFER, g), (l.o = x));
                            H.j();
                        },
                        B()
                        {
                            a.bindFramebuffer(d, null);
                            l.o = -1;
                        },
                        resize(H, A)
                        {
                            m = H;
                            n = A;
                            r && (a.bindRenderbuffer(a.RENDERBUFFER, r), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, m, n));
                        },
                        remove()
                        {
                            a.bindFramebuffer(d, g);
                            a.framebufferTexture2D(d, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0);
                            r && a.framebufferRenderbuffer(d, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, null);
                            a.bindFramebuffer(d, null);
                            a.deleteFramebuffer(g);
                            r && a.deleteRenderbuffer(r);
                            z = null;
                        },
                    };
                    k.Ka && z.Za();
                    return z;
                },
                B()
                {
                    a.bindFramebuffer(d, null);
                    l.o = -1;
                },
                ac()
                {
                    a.bindFramebuffer(d, null);
                    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                    a.viewport(0, 0, I.s(), I.F());
                    l.o = -1;
                },
                reset()
                {
                    l.o = -2;
                },
                J()
                {
                    l.o !== 0 && (a.bindFramebuffer(d, b), (l.o = 0));
                },
                clear()
                {
                    a.viewport(0, 0, I.s(), I.F());
                    a.clear(a.COLOR_BUFFER_BIT);
                },
            };
        }()),
        T = (function ()
        {
            function b(c)
            {
                a.bindTexture(a.TEXTURE_2D, c);
            }
            function d(c)
            {
                fa[0] = c;
                c = ja[0];
                var B = (c >> 16) & 32768,
                    E = (c >> 12) & 2047,
                    C = (c >> 23) & 255;
                return C < 103 ? B : C > 142 ? B | 31744 | ((C == 255 ? 0 : 1) && c & 8388607) : C < 113 ? ((E |= 2048), B | ((E >> (114 - C)) + ((E >> (113 - C)) & 1))) : (B = (B | ((C - 112) << 10) | (E >> 1)) + (E & 1));
            }
            function e(c)
            {
                var B = new Uint16Array(c.length);
                c.forEach((E, C) =>
                {
                    B[C] = d(E);
                });
                return B;
            }
            function f()
            {
                if (X.na !== null) return X.na;
                var c = k(e([1, 1, 1, 1]));
                return c === null ? !0 : (X.na = c);
            }
            function l()
            {
                if (X.oa !== null) return X.oa;
                var c = k(new Uint8Array([255, 255, 255, 255]));
                return c === null ? !0 : (X.oa = c);
            }
            function k(c)
            {
                if (!wa.qa() || !H) return null;
                try
                {
                    var B = a.getError(),
                        E = N.a({
                            isFloat: !1, A: !0, array: c, width: 1,
                        });
                    B = a.getError();
                    if (B !== a.NO_ERROR) return !1;
                }
                catch (C)
                {
                    return !1;
                }
                G.B();
                a.viewport(0, 0, 1, 1);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT);
                wa.set("s0");
                E.ya(0);
                L.g(!1, !0);
                c = new Uint8Array(4);
                a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, c);
                c = c[0] > 0.9;
                E.remove();
                G.J();
                return c;
            }
            var p = 0,
                m,
                n = 0,
                g,
                r = !1,
                q,
                x,
                z,
                H = !1,
                A = !1,
                F,
                D,
                h,
                v = [
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ],
                w = !1,
                Q = !1,
                fa = new Float32Array(1),
                ja = new Int32Array(fa.buffer),
                X = { na: null, oa: null },
                N = {
                    i()
                    {
                        if (!H)
                        {
                            x = [a.RGB, !1, a.RGB, a.RGBA];
                            z = [a.RGB, !1, a.RGB, a.RGBA];
                            m = [a.TEXTURE0, a.TEXTURE1, a.TEXTURE2, a.TEXTURE3, a.TEXTURE4, a.TEXTURE5, a.TEXTURE6, a.TEXTURE7];
                            w = typeof JEContext !== "undefined";
                            Q = typeof I !== "undefined";
                            w && JEContext.Lc() && m.push(a.TEXTURE8, a.TEXTURE9);
                            g = [-1, -1, -1, -1, -1, -1, -1, -1];
                            q = [a.UNSIGNED_BYTE, a.FLOAT, a.FLOAT];
                            if (!r)
                            {
                                for (var c = new Float32Array(16384), B = 0; B < 16384; ++B) c[B] = 2 * Math.random() - 1;
                                r = {
                                    random: N.a({
                                        isFloat: !0, isPot: !0, array: c, width: 64,
                                    }),
                                    Xa: N.a({
                                        isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0]),
                                    }),
                                };
                            }
                            H = !0;
                        }
                    },
                    Bb()
                    {
                        N.bc();
                    },
                    Cc()
                    {
                        return r.Xa;
                    },
                    bc()
                    {
                        q[1] = I.$();
                    },
                    Nb()
                    {
                        z = x = [a.RGBA, a.RGBA, a.RGBA, a.RGBA];
                    },
                    Pc(c, B)
                    {
                        t.set("s1");
                        G.B();
                        var E = c.s(),
                            C = c.F();
                        a.viewport(0, 0, E, C);
                        c.b(0);
                        L.g(!1, !1);
                        a.readPixels(0, 0, E, C, a.RGBA, a.UNSIGNED_BYTE, B);
                    },
                    tb(c, B, E)
                    {
                        a.activeTexture(a.TEXTURE0);
                        p = 0;
                        var C = a.createTexture();
                        b(C);
                        var R = I.m() && a.RGBA32F ? a.RGBA32F : a.FLOAT;
                        B = B instanceof Float32Array ? B : new Float32Array(B);
                        var O = Math.log2(B.length);
                        O !== Math.floor(O) && (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, E);
                        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, c.s(), c.F(), 0, a.RGBA, R, B);
                        b(null);
                        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                        G.J();
                        t.set("s0");
                        c.u();
                        a.clearColor(0, 0, 0, 0);
                        a.clear(a.COLOR_BUFFER_BIT);
                        b(C);
                        L.g(!0, !1);
                        a.deleteTexture(C);
                    },
                    a(c)
                    {
                        function B()
                        {
                            b(U);
                            ka && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, ka);
                            c.isPot
                                ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, c.Ma ? a.MIRRORED_REPEAT : a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, c.L ? a.MIRRORED_REPEAT : a.REPEAT))
                                : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE));
                            c.ba && typeof JESETTINGS !== "undefined" && a.texParameterf(a.TEXTURE_2D, JEContext.uc().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.cc);
                            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, c.isLinear ? a.LINEAR : a.NEAREST);
                            c.isLinear ? a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !ra ? a.NEAREST_MIPMAP_LINEAR : a.LINEAR) : a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.isMipmap && !ra ? a.NEAREST_MIPMAP_NEAREST : a.NEAREST);
                            Y = x[c.V - 1];
                            ba = z[c.V - 1];
                            ca = q[E];
                            if (I.m())
                            {
                                var u = a.RGBA32F;
                                Y === a.RGBA && ca === a.FLOAT && u && (ba = u);
                                Y === a.RGB && ca === a.FLOAT && u && ((ba = u), (Y = a.RGBA));
                            }
                            if ((c.A && !c.isFloat) || (c.isFloat && c.isMipmap && xa.Eb())) (u = a.RGBA16F) && (ba = u), (ca = I.$());
                            c.Oa && typeof a.texStorage2D !== "undefined" && (ya = c.Oa);
                            c.Na && c.V === 4 && (Y = JEContext.Ac());
                            if (c.v) a.texImage2D(a.TEXTURE_2D, 0, ba, Y, ca, c.v);
                            else if (c.url) a.texImage2D(a.TEXTURE_2D, 0, ba, Y, ca, ia);
                            else if (S)
                            {
                                try
                                {
                                    a.getError(),
                                    a.texImage2D(a.TEXTURE_2D, 0, ba, J, y, 0, Y, ca, S),
                                    a.getError() !== a.NO_ERROR && (a.texImage2D(a.TEXTURE_2D, 0, ba, J, y, 0, Y, ca, null), a.getError() !== a.NO_ERROR && a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, J, y, 0, a.RGBA, a.UNSIGNED_BYTE, null));
                                }
                                catch (da)
                                {
                                    a.texImage2D(a.TEXTURE_2D, 0, ba, J, y, 0, Y, ca, null);
                                }
                                c.isKeepArray || (S = null);
                            }
                            else a.texImage2D(a.TEXTURE_2D, 0, ba, J, y, 0, Y, ca, null);
                            if (c.isMipmap)
                            {
                                if (!ra && P) P.la(), (za = !0);
                                else if (ra)
                                {
                                    u = Math.log(Math.min(J, y)) / Math.log(2);
                                    var K;
                                    ta = Array(1 + u);
                                    ta[0] = U;
                                    for (K = 1; K <= u; ++K)
                                    {
                                        var ea = Math.pow(2, K);
                                        var oa = J / ea;
                                        ea = y / ea;
                                        var Z = a.createTexture();
                                        b(Z);
                                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                                        a.texImage2D(a.TEXTURE_2D, 0, ba, oa, ea, 0, Y, ca, null);
                                        b(null);
                                        ta[K] = Z;
                                    }
                                    za = !0;
                                }
                            }
                            b(null);
                            g[p] = -1;
                            ka && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            M = !0;
                            V && P && (V(P), (V = !1));
                        }
                        typeof c.isFloat === "undefined" && (c.isFloat = !1);
                        typeof c.A === "undefined" && (c.A = !1);
                        typeof c.isPot === "undefined" && (c.isPot = !0);
                        typeof c.isLinear === "undefined" && (c.isLinear = !1);
                        typeof c.isMipmap === "undefined" && (c.isMipmap = !1);
                        typeof c.ia === "undefined" && (c.ia = !1);
                        void 0 === c.ba && (c.ba = !1);
                        void 0 === c.L && (c.L = !1);
                        void 0 === c.Ma && (c.Ma = !1);
                        void 0 === c.Na && (c.Na = !1);
                        void 0 === c.V && (c.V = 4);
                        void 0 === c.La && (c.La = !1);
                        typeof c.isFlipY === "undefined" && (c.isFlipY = c.url || c.array ? !0 : !1);
                        typeof c.isKeepArray === "undefined" && (c.isKeepArray = !1);
                        c.data && ((c.array = typeof c.data === "string" ? ua(c.data) : c.isFloat ? new Float32Array(c.data) : new Uint8Array(c.data)), (c.isFlipY = !1));
                        var E = 0,
                            C = c.v ? !0 : !1,
                            R = null,
                            O = null,
                            W = !1,
                            ha = null;
                        c.isFloat && (c.A = !0);
                        c.A && (E = 1);
                        c.La || I.m() || !c.isFloat || !Q || I.Ba() || (c.isFloat = !1);
                        c.isFloat && (E = 2);
                        c.ba && w && !JEContext.Gc() && (c.ba = !1);
                        var U = a.createTexture(),
                            V = c.ia,
                            ia = null,
                            S = !1,
                            J = 0,
                            y = 0,
                            M = !1,
                            aa = n++,
                            la = !1,
                            ma,
                            pa,
                            Ca,
                            va,
                            ba,
                            Y,
                            ca,
                            ka = c.isFlipY,
                            ra = c.A && c.isMipmap && typeof xa !== "undefined" && !xa.ib() ? !0 : !1,
                            ta,
                            ya = -1,
                            za = !1;
                        typeof c.width !== "undefined" && c.width && ((J = c.width), (y = typeof c.height !== "undefined" && c.height ? c.height : J));
                        var P = {
                            get()
                            {
                                return U;
                            },
                            s()
                            {
                                return J;
                            },
                            F()
                            {
                                return y;
                            },
                            Dc()
                            {
                                return c.url;
                            },
                            Hc()
                            {
                                return c.isFloat;
                            },
                            Jc()
                            {
                                return c.A;
                            },
                            Kc()
                            {
                                return c.isLinear;
                            },
                            la()
                            {
                                a.generateMipmap(a.TEXTURE_2D);
                            },
                            za(u, K)
                            {
                                ra ? (u || (u = P.Ha()), P.ga_(K), b(ta[u]), (g[K] = -1)) : P.b(K);
                            },
                            Ha()
                            {
                                ya === -1 && (ya = Math.log(J) / Math.log(2));
                                return ya;
                            },
                            Ga(u)
                            {
                                if (ra)
                                {
                                    u || (u = P.Ha());
                                    t.set("s11");
                                    P.ga_(0);
                                    var K,
                                        ea = J,
                                        oa = y;
                                    for (K = 1; K <= u; ++K) (ea /= 2), (oa /= 2), t.G("u7", 0.25 / ea, 0.25 / oa), a.viewport(0, 0, ea, oa), b(ta[K - 1]), a.framebufferTexture2D(G.O(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, ta[K], 0), L.g(!1, K === 1);
                                    g[0] = -1;
                                }
                                else P.la();
                            },
                            ga_(u)
                            {
                                u !== p && (a.activeTexture(m[u]), (p = u));
                            },
                            b(u)
                            {
                                if (!M) return !1;
                                P.ga_(u);
                                if (g[u] === aa) return !1;
                                b(U);
                                g[u] = aa;
                                return !0;
                            },
                            ya(u)
                            {
                                a.activeTexture(m[u]);
                                p = u;
                                b(U);
                                g[u] = aa;
                            },
                            j()
                            {
                                a.framebufferTexture2D(G.O(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, U, 0);
                            },
                            u()
                            {
                                a.viewport(0, 0, J, y);
                                a.framebufferTexture2D(G.O(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, U, 0);
                            },
                            $c()
                            {
                                a.framebufferTexture2D(G.O(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, null, 0);
                            },
                            resize(u, K)
                            {
                                J = u;
                                y = K;
                                B();
                            },
                            clone(u)
                            {
                                u = N.a({
                                    width: J, height: y, A: c.A, isFloat: c.isFloat, isLinear: c.isLinear, L: c.L, isFlipY: u ? !ka : ka, isPot: c.isPot,
                                });
                                wa.set("s0");
                                G.J();
                                u.j();
                                a.viewport(0, 0, J, y);
                                P.b(0);
                                L.g(!0, !0);
                                return u;
                            },
                            Vb()
                            {
                                a.viewport(0, 0, J, y);
                            },
                            remove()
                            {
                                a.deleteTexture(U);
                                P = null;
                            },
                            refresh()
                            {
                                P.ya(0);
                                ka && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                                C ? a.texImage2D(a.TEXTURE_2D, 0, ba, Y, a.UNSIGNED_BYTE, c.v) : a.texImage2D(a.TEXTURE_2D, 0, ba, J, y, 0, Y, ca, S);
                                ka && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            },
                            Ca()
                            {
                                var u = J * y * 4;
                                pa = [new Uint8Array(u), new Uint8Array(u), new Uint8Array(u), new Uint8Array(u)];
                                ma = [new Float32Array(pa[0].buffer), new Float32Array(pa[1].buffer), new Float32Array(pa[2].buffer), new Float32Array(pa[3].buffer)];
                                Ca = new Uint8Array(4 * u);
                                va = new Float32Array(Ca.buffer);
                                la = !0;
                            },
                            Sa()
                            {
                                la || P.Ca();
                                a.readPixels(0, 0, J, 4 * y, a.RGBA, a.UNSIGNED_BYTE, Ca);
                                var u,
                                    K = J * y,
                                    ea = 2 * K,
                                    oa = 3 * K;
                                for (u = 0; u < K; ++u) (ma[0][u] = va[u]), (ma[1][u] = va[u + K]), (ma[2][u] = va[u + ea]), (ma[3][u] = va[u + oa]);
                                return ma;
                            },
                            Ea()
                            {
                                G.B();
                                t.set("s12");
                                P.b(0);
                                for (var u = 0; u < 4; ++u) a.viewport(0, y * u, J, y), t.Va("u8", v[u]), L.g(!1, u === 0);
                            },
                            ad(u)
                            {
                                var K = ca === q[0] && !l();
                                b(U);
                                ka && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, ka);
                                K
                                    ? (W || ((R = document.createElement("canvas")), (R.width = J), (R.height = y), (O = R.getContext("2d")), (ha = O.createImageData(J, y)), (W = !0)), ha.data.set(u), O.putImageData(ha, 0, 0), a.texImage2D(a.TEXTURE_2D, 0, ba, Y, ca, R))
                                    : a.texImage2D(a.TEXTURE_2D, 0, ba, J, y, 0, Y, ca, u);
                                g[p] = aa;
                                ka && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            },
                            bd(u, K)
                            {
                                b(U);
                                a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, K);
                                a.texImage2D(a.TEXTURE_2D, 0, ba, Y, ca, u);
                                g[p] = aa;
                                K && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                            },
                            Rc(u, K)
                            {
                                var ea = J * y,
                                    oa = 4 * ea;
                                u = c.A ? (u ? "RGBE" : "JSON") : "RGBA";
                                K && (u = K);
                                K = I.m() && !1;
                                switch (u)
                                {
                                case "RGBE":
                                    var Z = "s41";
                                    break;
                                case "JSON":
                                    Z = K ? "s0" : "s12";
                                    break;
                                case "RGBA":
                                case "RGBAARRAY":
                                    Z = "s6";
                                }
                                la || (u === "RGBA" || u === "RGBE" || u === "RGBAARRAY" ? ((pa = new Uint8Array(oa)), (la = !0)) : u !== "JSON" || K || P.Ca());
                                G.B();
                                t.set(Z);
                                P.b(0);
                                if (u === "RGBA" || u === "RGBE" || u === "RGBAARRAY")
                                {
                                    a.viewport(0, 0, J, y);
                                    L.g(!0, !0);
                                    a.readPixels(0, 0, J, y, a.RGBA, a.UNSIGNED_BYTE, pa);
                                    if (u === "RGBAARRAY") return { data: pa };
                                    A || ((F = document.createElement("canvas")), (D = F.getContext("2d")), (A = !0));
                                    F.width = J;
                                    F.height = y;
                                    h = D.createImageData(J, y);
                                    h.data.set(pa);
                                    D.putImageData(h, 0, 0);
                                    var da = F.toDataURL("image/png");
                                }
                                else if (u === "JSON")
                                {
                                    if (K) (da = new Float32Array(ea)), a.viewport(0, 0, J, y), L.g(!0, !0), a.readPixels(0, 0, J, y, a.RGBA, a.FLOAT, da);
                                    else
                                    {
                                        for (da = 0; da < 4; ++da) a.viewport(0, y * da, J, y), t.Va("u8", v[da]), L.g(!da, !da);
                                        P.Sa();
                                        da = Array(ea);
                                        for (Z = 0; Z < ea; ++Z) (da[4 * Z] = ma[0][Z]), (da[4 * Z + 1] = ma[1][Z]), (da[4 * Z + 2] = ma[2][Z]), (da[4 * Z + 3] = ma[3][Z]);
                                    }
                                }
                                return {
                                    format: u, data: da, width: J, height: y, isMirrorY: c.L, isFlipY: u === "RGBA" ? c.isFlipY : !c.isFlipY,
                                };
                            },
                        };
                        c.isMipmap && !ra && M && !za && (P.la(), (za = !0));
                        if (c.url)
                        {
                            b(U),
                            a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, null),
                            (ia = new Image()),
                            (ia.ic = "Anonymous"),
                            (ia.crossOrigin = "Anonymous"),
                            (ia.src = c.url),
                            (ia.onload = function ()
                            {
                                J = ia.width;
                                y = ia.height;
                                B();
                            });
                        }
                        else if (c.v)
                        {
                            var Ga = function ()
                            {
                                J = void 0 !== c.v.videoWidth ? c.v.videoWidth : c.v.width;
                                y = void 0 !== c.v.videoHeight ? c.v.videoHeight : c.v.height;
                                J ? B() : setTimeout(Ga, 1);
                            };
                            Ga();
                        }
                        else
                        {
                            c.array
                                ? (c.A && !c.isFloat
                                    ? c.array instanceof Uint16Array
                                        ? ((S = c.array), B())
                                        : f()
                                            ? ((S = e(c.array)), B())
                                            : (B(), N.tb(P, c.array, ka))
                                    : ((S = c.isFloat ? (c.array instanceof Float32Array ? c.array : new Float32Array(c.array)) : c.array instanceof Uint8Array ? c.array : new Uint8Array(c.array)), B()),
                                c.isKeepArray || (S && S !== c.array && (S = null), delete c.array))
                                : B();
                        }
                        P.yb = P.s;
                        V && M && (V(P), (V = !1));
                        return P;
                    },
                    B(c)
                    {
                        c !== p && (a.activeTexture(m[c]), (p = c));
                        g[c] = -1;
                        b(null);
                    },
                    ec(c)
                    {
                        r.random.b(c);
                    },
                    reset()
                    {
                        for (var c = 0; c < m.length; ++c) g[c] = -1;
                        p = -1;
                    },
                    Qc()
                    {
                        p = -1;
                    },
                    Yc()
                    {
                        for (var c = 0; c < m.length; ++c) N.B(c);
                    },
                    ub()
                    {
                        r && (r.random.remove(), r.Xa.remove());
                    },
                    Zc(c, B)
                    {
                        if (c.format === "RGBA" || c.format === "RGBE")
                        {
                            var E = new Image();
                            E.src = c.data;
                            E.onload = function ()
                            {
                                N.a({
                                    L: c.isMirrorY,
                                    isFlipY: c.isFlipY,
                                    isFloat: !1,
                                    v: E,
                                    ia(C)
                                    {
                                        if (c.format === "RGBA") B(C);
                                        else
                                        {
                                            var R = c.width,
                                                O = c.height,
                                                W = N.a({
                                                    L: c.isMirrorY, isFloat: !0, width: R, height: O, isFlipY: c.isFlipY,
                                                });
                                            G.J();
                                            a.viewport(0, 0, R, O);
                                            t.set("s42");
                                            W.j();
                                            C.b(0);
                                            L.g(!0, !0);
                                            N.B(0);
                                            B(W);
                                            a.flush();
                                            setTimeout(C.remove, 50);
                                        }
                                    },
                                });
                            };
                        }
                        else
                        {
                            c.format === "JSON" ? B(N.a({
                                isFloat: !0, isFlipY: c.isFlipY, width: c.width, height: c.height, array: new Float32Array(c.data),
                            })) : B(!1);
                        }
                    },
                };
            return N;
        }()),
        Ba = {
            a(b)
            {
                var d = [T.a(b), T.a(b)],
                    e = [d[1], d[0]],
                    f = e,
                    l = {
                        Qb(k)
                        {
                            f[1].j();
                            f[0].b(k);
                            l.Wa();
                        },
                        Rb(k)
                        {
                            f[1].u();
                            f[0].b(k);
                            l.Wa();
                        },
                        Wa()
                        {
                            f = f === d ? e : d;
                        },
                        refresh()
                        {
                            f[0].refresh();
                            f[1].refresh();
                        },
                        b(k)
                        {
                            f[0].b(k);
                        },
                        wc()
                        {
                            return f[0];
                        },
                    };
                return l;
            },
        },
        I = (function ()
        {
            function b()
            {
                d = typeof Aa === "undefined" ? JEContext : Aa;
                e = !0;
            }
            var d,
                e = !1,
                f = !1,
                l = !1,
                k = !1,
                p = !1,
                m = !1,
                n = !1,
                g = !1,
                r = !1,
                q = !1,
                x = !1,
                z = !0,
                H = !0,
                A = !0,
                F = !1,
                D = typeof window === "undefined" ? {} : window,
                h = {
                    i()
                    {
                        if (e) return !0;
                        b();
                        h.Fa();
                        h.ka();
                        h.pb();
                        h.qb();
                        G.i();
                        T.i();
                        if (!h.lb()) return !1;
                        L.i();
                        T.Bb();
                        return !0;
                    },
                    s()
                    {
                        e || b();
                        return d.s();
                    },
                    F()
                    {
                        e || b();
                        return d.F();
                    },
                    m()
                    {
                        e || b();
                        return d.m();
                    },
                    pb()
                    {
                        x = (q = a.getExtension("EXT_color_buffer_float") || a.getExtension("WEBGL_color_buffer_float") || a.getExtension("OES_color_buffer_float")) ? !0 : !1;
                        D.GL_EXT_COLORBUFFERFLOAT = q;
                    },
                    qb()
                    {
                        a.getExtension("EXT_color_buffer_half_float") || a.getExtension("WEBGL_color_buffer_half_float") || a.getExtension("OES_color_buffer_half_float");
                    },
                    Fa()
                    {
                        if (!f)
                        {
                            this.m() || ((l = a.getExtension("OES_texture_float") || a.getExtension("MOZ_OES_texture_float") || a.getExtension("WEBKIT_OES_texture_float")), (p = (D.GL_EXT_FLOAT = l) ? !0 : !1));
                            if (p || this.m()) (k = a.getExtension("OES_texture_float_linear") || a.getExtension("MOZ_OES_texture_float_linear") || a.getExtension("WEBKIT_OES_texture_float_linear")), (D.GL_EXT_FLOATLINEAR = k);
                            f = !0;
                        }
                    },
                    ka()
                    {
                        if (!r)
                        {
                            if (!this.m())
                            {
                                if ((m = a.getExtension("OES_texture_half_float") || a.getExtension("MOZ_OES_texture_half_float") || a.getExtension("WEBKIT_OES_texture_half_float"))) (F = m.HALF_FLOAT_OES), (n = !0);
                                !F && a.HALF_FLOAT && (F = a.HALF_FLOAT);
                                !F && a.FLOAT && (F = a.FLOAT);
                                D.GL_EXT_HALFFLOAT = m;
                            }
                            if (n || this.m()) (g = a.getExtension("OES_texture_half_float_linear") || a.getExtension("MOZ_OES_texture_half_float_linear") || a.getExtension("WEBKIT_OES_texture_half_float_linear")), (D.GL_EXT_HALFFLOATLINEAR = g);
                            r = !0;
                        }
                    },
                    $()
                    {
                        if (h.m()) return a.HALF_FLOAT;
                        h.ka();
                        return n ? F : a.FLOAT;
                    },
                    Ba()
                    {
                        return z;
                    },
                    hb()
                    {
                        return H;
                    },
                    fc()
                    {
                        return A;
                    },
                    gb()
                    {
                        return x;
                    },
                    nb()
                    {
                        H = z = !0;
                        var v = a.createFramebuffer();
                        a.bindFramebuffer(a.FRAMEBUFFER, v);
                        var w = a.createTexture();
                        a.bindTexture(a.TEXTURE_2D, w);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
                        a.texImage2D(a.TEXTURE_2D, 0, h.m() && a.RGBA32F ? a.RGBA32F : a.RGBA, 1, 1, 0, a.RGBA, a.FLOAT, null);
                        a.framebufferTexture2D(G.O(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, w, 0);
                        var Q = a.checkFramebufferStatus(G.ma());
                        Q !== a.FRAMEBUFFER_COMPLETE && (z = !1);
                        a.texImage2D(a.TEXTURE_2D, 0, h.m() && a.RGBA16F ? a.RGBA16F : a.RGBA, 1, 1, 0, a.RGBA, h.$(), null);
                        a.framebufferTexture2D(G.O(), a.COLOR_ATTACHMENT0, a.TEXTURE_2D, w, 0);
                        Q = a.checkFramebufferStatus(G.ma());
                        Q !== a.FRAMEBUFFER_COMPLETE && (H = !1);
                        a.bindTexture(a.TEXTURE_2D, null);
                        a.bindFramebuffer(a.FRAMEBUFFER, null);
                        a.deleteTexture(w);
                        a.deleteFramebuffer(v);
                    },
                    mb()
                    {
                        var v = G.a({ width: 1 });
                        v.Ua();
                        var w = T.a({ width: 1, isFloat: !0, V: 3 });
                        v.j();
                        w.j();
                        a.flush();
                        a.checkFramebufferStatus(G.ma()) !== a.FRAMEBUFFER_COMPLETE ? (T.Nb(), (A = !1)) : (A = !0);
                        v.remove();
                        w.remove();
                    },
                    lb()
                    {
                        h.nb();
                        if (!z && !H) return !1;
                        h.mb();
                        return !0;
                    },
                };
            return h;
        }()),
        xa = (function ()
        {
            function b(z, H, A, F)
            {
                a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, F ? a.NEAREST_MIPMAP_NEAREST : a.LINEAR);
                try
                {
                    var D = a.getError();
                    D !== a.NO_ERROR && console.log("GLERR in test_mipmapping() :", D);
                    a.texImage2D(a.TEXTURE_2D, 0, z, 2, 2, 0, a.RGBA, H, A);
                    D = a.getError();
                    if (D !== a.NO_ERROR) return !1;
                }
                catch (h)
                {
                    return !1;
                }
                F && a.generateMipmap(a.TEXTURE_2D);
                L.ha();
                L.g(!1, !0);
                a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, m);
                D = a.getError();
                D === a.INVALID_OPERATION && typeof a.PIXEL_PACK_BUFFER !== "undefined" && (a.bindBuffer(a.PIXEL_PACK_BUFFER, null), a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, m), (D = a.getError()));
                return D !== a.NO_ERROR ? !1 : m[0] !== 0;
            }
            function d(z)
            {
                return I.Ba() && b(internalPixelFormat32f, a.FLOAT, new Float32Array(g), z) ? ((k = l.wa), !0) : !1;
            }
            function e(z)
            {
                return I.hb() ? (b(q, I.$(), new Uint16Array(g), z) || b(q, a.FLOAT, new Float32Array(g), z) ? ((k = l.fa), !0) : !1) : !1;
            }
            var f = !1,
                l = { wa: 3, fa: 2, RGBA8: 0 },
                k = l.RGBA8,
                p,
                m = new Uint8Array(4),
                n = [0.8, 1, 0.8, 1],
                g = n.concat(n, n, n),
                r = !0,
                q,
                x = {
                    i()
                    {
                        I.Fa();
                        I.ka();
                        q = a.RGBA;
                        if (Aa.m())
                        {
                            var z = a.RGBA16F;
                            z && (q = z);
                        }
                        L.i();
                        G.reset();
                        G.B();
                        a.viewport(0, 0, 1, 1);
                        t.set("s0");
                        f = !0;
                        p = a.createTexture();
                        a.activeTexture(a.TEXTURE0);
                        a.bindTexture(a.TEXTURE_2D, p);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
                        if (e(!0) || d(!0)) return !0;
                        r = !1;
                        if (e(!1) || d(!1)) return !0;
                        if (Aa.m())
                        {
                            q = a.RGBA;
                            if (e(!0) || d(!0)) return !0;
                            r = !1;
                            if (e(!1) || d(!1)) return !0;
                        }
                        return !1;
                    },
                    ib()
                    {
                        return r;
                    },
                    xc()
                    {
                        return k;
                    },
                    Ic()
                    {
                        f || x.i();
                        return k === l.wa;
                    },
                    Eb()
                    {
                        f || x.i();
                        return k === l.fa;
                    },
                };
            return x;
        }()),
        Da = {
            a(b)
            {
                var d = T.a(b.alpha),
                    e = T.a(b.beta);
                return {
                    ob()
                    {
                        d.b(1);
                        e.b(2);
                    },
                };
            },
        },
        Ha = {
            a(b)
            {
                var d = b.Xb;
                d.index = b.index;
                d.M = b.M;
                d.parent = b.parent;
                switch (d.type)
                {
                case "input":
                    b = Ea.a(d);
                    break;
                default:
                    b = Fa.a(d);
                }
                return b;
            },
        },
        Ea = {
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
                    Ia && void 0 !== Ia.ab && (b.mask = Ia.ab + b.mask);
                    var e = T.a({ isFloat: !1, url: b.mask });
                }
                var f = !1,
                    l = typeof b.preprocessing !== "undefined" ? b.preprocessing : !1,
                    k = !1,
                    p = !1;
                b.sift ? Sift.i({
                    Ab: a, Z: !1, width: b.size, Oc: b.siftOutWidth,
                }) : b.DWT && DWT.i({ Ab: a, Z: !1, width: b.size });
                var m = !1;
                b.customInputShader && ((m = "s43"), t.xa({
                    name: "_", id: m, c: b.customInputShader, f: ["uSource"], precision: "lowp",
                }), t.D(m, [{ type: "1i", name: "_", value: 0 }]));
                switch (l)
                {
                case "sobel":
                    var n = "s32";
                    k = !0;
                    break;
                case "meanNormalization":
                    n = "s33";
                    k = !0;
                    break;
                case "grayScale":
                    n = "s29";
                    k = !1;
                    break;
                case "grayScaleTilt":
                    n = "s30";
                    p = !0;
                    k = !1;
                    break;
                case "rgbGrayTilt":
                    n = "s31";
                    p = !0;
                    k = !1;
                    break;
                case "copy":
                    n = m || "s0";
                    break;
                case "inputLightRegulation":
                    n = m || "s29";
                    Ja.i({ width: b.size, Pa: b.nBlurPass, Db: !1 });
                    f = !0;
                    break;
                case "direct":
                case "none":
                    n = !1;
                    break;
                default:
                    n = "s3";
                }
                p && t.D(n, [{ name: "u28", type: "1f", value: b.tilt }]);
                d && (n += "Mask");
                if (b.blur) var g = T.a({ isFloat: !1, isPot: !1, width: b.size });
                var r = T.a({ isFloat: !1, isPot: !1, width: b.size }),
                    q = {
                        s()
                        {
                            return b.sift ? Sift.U() : b.size;
                        },
                        U()
                        {
                            return q.s();
                        },
                        xb()
                        {
                            return b.sift ? Sift.aa() : b.DWT ? DWT.aa() : f ? Ja.aa() : r;
                        },
                        w()
                        {
                            G.J();
                            b.blur && (g.u(), t.set("s44"), t.G("u7", 1 / b.size, 1 / b.size), L.g(!1, !0), g.b(0));
                            n && (t.set(n), k && t.C("u29", 1 / b.size), r.u(), d && e.b(1), L.g(!1, !1), r.b(0), f ? Ja.ra(r) : b.sift ? (t.P(), Sift.ra()) : b.DWT && (t.P(), DWT.ra(4)));
                        },
                    };
                return q;
            },
        },
        Fa = {
            a(b)
            {
                typeof b.disableNormalize === "undefined" && (b.disableNormalize = !1);
                var d = [],
                    e = [],
                    f,
                    l,
                    k = !1,
                    p,
                    m = !0,
                    n,
                    g,
                    r = b.isReorganize ? b.isReorganize : !1,
                    q = b.kernelsNumber ? !0 : !1,
                    x = b.dynPelu ? Da.a(b.dynPelu) : !1,
                    z = x ? !0 : !1,
                    H = { isEnabled: !1 },
                    A;
                if (b.type === "softmax")
                {
                    b.activation = "softmax";
                    b.size = Math.pow(2, Math.ceil(Math.log2(Math.sqrt(b.num_classes))));
                    b.sparsity = typeof b.sparsity !== "undefined" ? b.sparsity : b.M.U();
                    b.gain = typeof b.gain !== "undefined" ? b.gain : 1;
                    t.D("s20", [{ type: "1f", name: "u10", value: b.gain }]);
                    var F = T.a({ isFloat: !0, isPot: !1, width: b.size }),
                        D = T.a({
                            isFloat: !0, isPot: !1, width: b.size, isMipmap: !0,
                        });
                    m = !1;
                    var h = new Uint8Array(Math.pow(4 * b.size, 2)),
                        v;
                    for (v = 0; v < b.size * b.size; ++v)
                    {
                        var w = v < b.num_classes ? 255 : 0;
                        h[4 * v] = w;
                        h[4 * v + 1] = w;
                        h[4 * v + 2] = w;
                        h[4 * v + 3] = w;
                    }
                    var Q = T.a({
                        isFloat: !1, isPot: !1, width: b.size, array: h,
                    });
                }
                else b.cost ? ((b.sparsity = typeof b.sparsity !== "undefined" ? b.sparsity : b.M.U()), (m = !1)) : b.connectivityUp === "full" && (b.sparsity = b.M.U());
                var fa = {
                        elu: "s15", elu01: "s16", relu: "s14", arctan: "s18", sigmoid: "s13", copy: "s0", softplus: "s19", softmax: "s20", dynPelu: "s17",
                    }[b.activation],
                    ja = b.sparsity * b.sparsity,
                    X = !1,
                    N = b.size;
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
                    X = !0;
                    N /= b.maxPooling.size;
                    var B = T.a({ isFloat: !0, isPot: !1, width: N });
                }
                var E = void 0 !== b.Ib && b.Ib ? !0 : !1,
                    C = null,
                    R = null,
                    O = null;
                E &&
                    ((C = "s45" + b.index.toString()),
                    t.Ja("s45", C, [((b.normalization.n - 1) / 2).toFixed(1)]),
                    t.D(C, [
                        { type: "1i", name: "u1", value: 0 },
                        { type: "2f", name: "u7", value: [1 / b.size, 1 / b.size] },
                        { type: "1f", name: "u6", value: b.normalization.alpha },
                        { type: "1f", name: "u9", value: b.normalization.beta },
                        { type: "1f", name: "u33", value: b.normalization.k },
                    ]),
                    (R = T.a({ isFloat: !0, isPot: !0, width: b.size })),
                    (O = T.a({ isFloat: !0, isPot: !0, width: b.size })));
                var W,
                    ha,
                    U,
                    V;
                m && (V = T.a({ isFloat: !0, isPot: !1, width: b.size }));
                var ia = T.a(b.bias),
                    S,
                    J = {
                        s()
                        {
                            return b.size;
                        },
                        U()
                        {
                            return N;
                        },
                        Ia()
                        {
                            return b.num_classes;
                        },
                        cb(y)
                        {
                            A.b(y);
                        },
                        Kb()
                        {
                            b.remap &&
                                b.remap.isEnabled &&
                                (H = {
                                    isEnabled: !0,
                                    Gb: T.a({
                                        isFloat: !1, isFlipY: !1, array: new Uint8Array(b.remap.maskTexture.data), width: b.remap.maskTexture.width, isPot: !1,
                                    }),
                                    layers: b.remap.layers.map(y =>
                                        b.parent.wb(y)),
                                    depth: b.remap.depth,
                                });
                        },
                        Pb()
                        {
                            switch (b.connectivityUp)
                            {
                            case "gaussian":
                                S = Ka.a(b.connectivity);
                                break;
                            case "direct":
                                S = La.a(b.connectivity);
                                break;
                            case "square":
                                S = Ma.a(b.connectivity);
                                break;
                            case "squareFast":
                                S = Na.a(b.connectivity, b.activation);
                                break;
                            case "full":
                                S = Oa.a(b.connectivity);
                                break;
                            case "conv":
                                (g = b.kernelsNumber), (S = Pa.a(b.connectivity)), r && (n = T.a({
                                    width: N, isFloat: !0, isFlipY: !1, isPot: !1,
                                }));
                            }
                            if (S.N)
                            {
                                var y = b.size * b.sparsity;
                                ha = Math.log(y / b.size) / Math.log(2);
                                W = T.a({
                                    isMipmap: !0, isFloat: !0, isPot: !0, width: y, Oa: ha,
                                });
                                U = T.a({ isFloat: !0, isPot: !0, width: b.size });
                            }
                        },
                        w(y, M)
                        {
                            A = y;
                            S.N ? (W.u(), q && ia.b(2), S.w(H), W.b(0), W.Ga(ha), U.u(), q ? t.set("s0") : (t.set("s28"), t.C("u27", ja), ia.b(1)), W.za(ha, 0), L.g(!1, !1), t.set(fa), E ? R.j() : V.j(), U.b(0), z && x.ob(), L.g(!1, !1)) : (V.u(), ia.b(1), S.w());
                            E && (t.set(C), O.j(), R.b(0), L.g(!1, !1), t.set("s46"), t.C("u6", 1), V.j(), O.b(1), L.g(!1, !1));
                            if (m) return X ? (B.u(), V.b(0), t.set(c), t.G("u7", 1 / b.size, 1 / b.size), L.g(!1, !1), (M = B)) : (M = V), M.b(0), r && (n.j(), t.set("s22"), t.G("u14", g, N / g), L.g(!1, !1), (M = n), n.b(0)), M;
                            if (b.type === "softmax")
                            {
                                t.set("s20");
                                V.b(0);
                                F.j();
                                L.g(!1, !1);
                                b.disableNormalize ? (y = F) : (t.set("s2"), F.b(0), Q.b(1), D.j(), L.g(!1, !1), t.set("s0"), l.u(), D.b(0), D.Ga(!1), L.g(!1, !1), t.set("s21"), f.u(), D.za(!1, 0), t.C("u12", V.yb()), l.b(1), L.g(!1, !1), (y = f));
                                if (M)
                                {
                                    switch (k)
                                    {
                                    case "cpuRGBAAvg":
                                        break;
                                    default:
                                        var aa = J.Ra(y);
                                    }
                                    return aa;
                                }
                                return !1;
                            }
                            if (b.cost)
                            {
                                t.set(k === "gpuRawAvg" ? "s8" : "s7");
                                M = V;
                                b.disableNormalize || (t.C("u4", 1 / b.size), f.u(), V.b(0), L.g(!1, !1), (M = f));
                                switch (k)
                                {
                                case "cpuRGBA2Float":
                                    M.Ea();
                                    aa = J.Ra(M);
                                    p(aa);
                                    break;
                                case "gpuRawAvg":
                                case "gpuRaw":
                                    M.b(0), p(M);
                                }
                                return !1;
                            }
                        },
                        kb(y)
                        {
                            y && typeof y.Qa !== "undefined" && ((k = y.Qa), (p = y.Jb));
                            V = T.a({
                                isFloat: !0, isPot: !0, isMipmap: b.type === "softmax", width: b.size,
                            });
                            b.type === "softmax" && (l = T.a({ isFloat: !0, isPot: !0, width: 1 }));
                            var M = 0,
                                aa = 0,
                                la = typeof b.num_classes !== "undefined" && b.num_classes ? b.num_classes : b.size * b.size;
                            for (y = 0; y < la; ++y) d.push(M + (b.size - 1 - aa) * b.size), e.push([-1, -1, -1, -1]), ++M, M === b.size && ((M = 0), ++aa);
                            b.disableNormalize || (f = T.a({ isFloat: !0, isPot: !0, width: b.size }));
                        },
                        Ra(y)
                        {
                            y.Ea();
                            var M = y.Sa();
                            d.forEach((aa, la) =>
                            {
                                e[la][0] = M[0][aa];
                                e[la][1] = M[1][aa];
                                e[la][2] = M[2][aa];
                                e[la][3] = M[3][aa];
                            });
                            return e;
                        },
                    };
                b.M && J.Pb(b.M);
                return J;
            },
        };
    function Qa()
    {
        var b,
            d,
            e;
        b || (b = {});
        this.wb = function (f)
        {
            return d[f];
        };
        this.Mb = function (f)
        {
            var l = !1;
            d = f.map(function (k, p)
            {
                return (l = k = Ha.a({
                    index: p, parent: this, Xb: k, M: l,
                }));
            });
            e = d[d.length - 1];
            d.forEach((k, p) =>
            {
                p !== 0 && k.Kb();
            });
        };
        this.w = function (f, l)
        {
            var k = l;
            d.forEach((p) =>
            {
                k = p.w(k, f);
            });
            return k;
        };
        this.aa = function ()
        {
            return e.xb();
        };
        this.Ob = function (f)
        {
            e.kb(f);
        };
        this.Ia = function ()
        {
            return e.Ia();
        };
    }
    var La = {
            a(b)
            {
                var d = T.a(b.weights);
                delete b.weights.data;
                return {
                    N: !0,
                    T()
                    {
                        return 1;
                    },
                    zb()
                    {
                        return d;
                    },
                    w()
                    {
                        t.set("s27");
                        d.b(1);
                        L.g(!1, !1);
                    },
                };
            },
        },
        Oa = {
            a(b)
            {
                var d = b.fromLayerSize,
                    e = T.a(b.weights);
                return {
                    N: !0,
                    T()
                    {
                        return d;
                    },
                    w(f)
                    {
                        if (f.isEnabled)
                        {
                            t.set("s25");
                            f.Gb.b(3);
                            var l,
                                k = Math.min(f.layers.length, f.depth);
                            for (l = 0; l < k; ++l) f.layers[l].cb(4 + l);
                        }
                        else t.set("s24");
                        t.C("u18", b.toLayerSize);
                        e.b(1);
                        L.g(!1, !1);
                    },
                };
            },
        },
        Ka = {
            a(b)
            {
                var d = b.toSparsity * b.toLayerSize,
                    e = d / b.fromLayerSize,
                    f = T.a(b.weights);
                T.a({
                    width: d, isFloat: !0, array: new Float32Array(b.fromBindings), isPot: !0,
                });
                var l = T.a({
                    width: d, isFloat: !0, array: new Float32Array(b.toBindings), isPot: !0,
                });
                return {
                    N: !0,
                    T()
                    {
                        return e;
                    },
                    w()
                    {
                        t.set("s23");
                        f.b(1);
                        l.b(2);
                        L.g(!1, !0);
                    },
                };
            },
        },
        Ma = {
            a(b)
            {
                var d = b.fromLayerSize,
                    e = b.toLayerSize,
                    f = b.toSparsity,
                    l = f * e,
                    k = l / d,
                    p = d / e,
                    m,
                    n,
                    g,
                    r,
                    q = 0,
                    x = 0,
                    z = 0,
                    H = Array(f * e * f * e * 4),
                    A = Array(f * e * f * e * 4),
                    F = Array(d * d);
                for (m = 0; m < F.length; ++m) F[m] = 0;
                var D = Math.floor(f / 2),
                    h = 0.5 / e,
                    v = 0.5 / d,
                    w = 0.5 / l;
                for (m = 0; m < e; ++m)
                {
                    for (n = 0; n < e; ++n)
                    {
                        var Q = Math.round(m * p);
                        var fa = Math.round(n * p);
                        var ja = m / e;
                        var X = n / e;
                        ja += h;
                        X += h;
                        for (g = 0; g < f; ++g)
                        {
                            for (r = 0; r < f; ++r)
                            {
                                var N = q / l;
                                var c = x / l;
                                var B = Q + g - D;
                                var E = fa + r - D;
                                B < 0 && (B += d);
                                E < 0 && (E += d);
                                B >= d && (B -= d);
                                E >= d && (E -= d);
                                var C = B / d;
                                var R = E / d;
                                c = 1 - c - 1 / l;
                                C += v;
                                R += v;
                                N += w;
                                c += w;
                                var O = m * f + g,
                                    W = n * f + r;
                                W = e * f - W - 1;
                                O = W * e * f + O;
                                H[4 * O] = N;
                                H[4 * O + 1] = c;
                                H[4 * O + 2] = C;
                                H[4 * O + 3] = R;
                                C = F[E * d + B]++;
                                R = C % k;
                                B = B * k + R;
                                E = E * k + (C - R) / k;
                                E = d * k - 1 - E;
                                E = E * d * k + B;
                                A[4 * E] = N;
                                A[4 * E + 1] = c;
                                A[4 * E + 2] = ja;
                                A[4 * E + 3] = X;
                                ++q >= l && ((q = 0), ++x);
                                ++z;
                            }
                        }
                    }
                }
                var ha = T.a(b.weights);
                T.a({
                    width: l, isFloat: !0, array: new Float32Array(A), isPot: !0,
                });
                A = null;
                var U = T.a({
                    width: l, isFloat: !0, array: new Float32Array(H), isPot: !0,
                });
                H = null;
                return {
                    N: !0,
                    T()
                    {
                        return k;
                    },
                    w()
                    {
                        t.set("s23");
                        ha.b(1);
                        U.b(2);
                        L.g(!1, !1);
                    },
                };
            },
        },
        Pa = {
            a(b)
            {
                var d = b.kernelsNumber,
                    e = b.toSparsity,
                    f = (e * b.toLayerSize) / b.fromLayerSize,
                    l = T.a(b.weights);
                return {
                    N: !0,
                    T()
                    {
                        return f;
                    },
                    Bc()
                    {
                        return e;
                    },
                    zb()
                    {
                        return l;
                    },
                    w()
                    {
                        t.set("s26");
                        t.C("u24", d);
                        t.C("u25", e);
                        t.C("u18", b.toLayerSize);
                        t.C("u26", b.fromLayerSize);
                        l.b(1);
                        L.g(!1, !1);
                    },
                };
            },
        },
        Na = {
            a(b, d)
            {
                var e = b.fromLayerSize,
                    f = b.toLayerSize,
                    l = b.toSparsity,
                    k = b.stride ? b.stride : 1,
                    p = (l * f) / e,
                    m = f < e,
                    n = e / f,
                    g = T.a(b.weights),
                    r = "s47" + [e.toString(), f.toString(), l.toString(), k.toString(), d].join("_");
                t.rb(r) ||
                    ((b = qa(d)),
                    (f = [
                        { type: "1f", name: "u18", value: f },
                        { type: "1f", name: "u32", value: k },
                    ]),
                    m && f.push({ type: "1f", name: "u26", value: e }),
                    (e = [(m ? p : l).toFixed(1), b]),
                    m && e.push(n.toFixed(1)),
                    t.Ja(m ? "s40" : "s39", r, e),
                    t.D(
                        r,
                        f.concat([
                            { type: "1i", name: "u16", value: 0 },
                            { type: "1i", name: "u23", value: 1 },
                            { type: "1i", name: "u15", value: 3 },
                        ]),
                    ));
                return {
                    N: !1,
                    T()
                    {
                        return p;
                    },
                    w()
                    {
                        t.set(r);
                        g.b(3);
                        L.g(!1, !1);
                    },
                };
            },
        },
        Ja = (function ()
        {
            var b,
                d,
                e,
                f,
                l,
                k,
                p,
                m,
                n;
            return {
                i(g)
                {
                    b = g.Pa ? g.Pa : 3;
                    d = g.width ? g.width : 64;
                    f = g.Db ? !0 : !1;
                    g = {
                        isFloat: !1, width: d, isPot: !1, isFlipY: !1,
                    };
                    l = T.a(g);
                    k = T.a(g);
                    p = T.a(g);
                    m = T.a(g);
                    n = T.a({
                        isFloat: !0, width: d, isPot: !1, isFlipY: !1,
                    });
                    e = 1 / d;
                },
                ra(g)
                {
                    t.set("s37");
                    for (var r = 0; r < b; ++r) l.j(), t.G("u7", e, 0), L.g(f, !1), k.j(), l.b(0), t.G("u7", 0, e), L.g(f, !1), k.b(0);
                    t.set("s36");
                    m.j();
                    g.b(0);
                    L.g(f);
                    t.set("s37");
                    for (r = 0; r < b; ++r) p.j(), m.b(0), t.G("u7", e, 0), L.g(f, !1), m.j(), p.b(0), t.G("u7", 0, e), L.g(f, !1);
                    t.set("s38");
                    n.j();
                    g.b(0);
                    k.b(1);
                    m.b(2);
                    L.g(f, !1);
                    n.b(0);
                },
                aa()
                {
                    return n;
                },
            };
        }());
    function Ra(b, d)
    {
        b[d] = !0;
        b.setAttribute(d, "true");
    }
    function Sa()
    {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    function Ta()
    {
        var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)];
    }
    function Ua()
    {
        var b = navigator.userAgent.toLowerCase();
        return b.indexOf("safari") !== -1 && b.indexOf("chrome") === -1 ? !0 : !1;
    }
    function Va()
    {
        return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1;
    }
    function Wa(b)
    {
        if (!b) return b;
        var d = !1;
        if (b.video)
        {
            var e = function (f)
            {
                var l = {};
                typeof f.min !== "undefined" && (l.min = f.min);
                typeof f.max !== "undefined" && (l.max = f.max);
                typeof f.ideal !== "undefined" && (l.ideal = f.ideal);
                return l;
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
    function Xa(b)
    {
        var d = b.video.width;
        b.video.width = b.video.height;
        b.video.height = d;
        return b;
    }
    function Ya(b)
    {
        function d(q)
        {
            return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort((x, z) =>
                Math.abs(x - q) - Math.abs(z - q));
        }
        function e(q)
        {
            var x = Wa(b);
            f.push(q(x));
        }
        var f = [];
        if (!b || !b.video) return f;
        if (b.video.width && b.video.height)
        {
            if (b.video.width.ideal && b.video.height.ideal)
            {
                var l = d(b.video.width.ideal).slice(0, 3),
                    k = d(b.video.height.ideal).slice(0, 3),
                    p = {},
                    m = 0;
                for (p.I = void 0; m < l.length; p = { I: p.I }, ++m)
                {
                    p.I = l[m];
                    var n = {},
                        g = 0;
                    for (n.H = void 0; g < k.length; n = { H: n.H }, ++g)
                    {
                        if (((n.H = k[g]), p.I !== b.video.width.ideal || n.H !== b.video.height.ideal))
                        {
                            var r = Math.max(p.I, n.H) / Math.min(p.I, n.H);
                            r < 4 / 3 - 0.1 ||
                                r > 16 / 9 + 0.1 ||
                                e((function (q, x)
                                {
                                    return function (z)
                                    {
                                        z.video.width.ideal = q.I;
                                        z.video.height.ideal = x.H;
                                        return z;
                                    };
                                }(p, n)));
                        }
                    }
                }
            }
            e(q =>
                Xa(q));
        }
        b.video.width &&
            b.video.height &&
            (b.video.width.ideal &&
                b.video.height.ideal &&
                e((q) =>
                {
                    delete q.video.width.ideal;
                    delete q.video.height.ideal;
                    return q;
                }),
            e((q) =>
            {
                delete q.video.width;
                delete q.video.height;
                return q;
            }));
        b.video.facingMode &&
            (e((q) =>
            {
                delete q.video.facingMode;
                return q;
            }),
            b.video.width &&
                b.video.height &&
                e((q) =>
                {
                    Xa(q);
                    delete q.video.facingMode;
                    return q;
                }));
        f.push({ audio: b.audio, video: !0 });
        return f;
    }
    function Za(b)
    {
        try
        {
            var d = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
        }
        catch (f)
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
    function $a(b)
    {
        b.volume = 0;
        Ra(b, "muted");
        if (Ua())
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
                Ra(b, "muted");
            }, 5);
        }
    }
    function ab(b, d, e, f)
    {
        function l(p)
        {
            k || ((k = !0), e(p));
        }
        var k = !1;
        navigator.mediaDevices
            .getUserMedia(f)
            .then((p) =>
            {
                function m()
                {
                    setTimeout(() =>
                    {
                        if (b.currentTime)
                        {
                            var n = b.videoWidth,
                                g = b.videoHeight;
                            if (n === 0 || g === 0) l("VIDEO_NULLSIZE");
                            else
                            {
                                n && (b.style.width = n.toString() + "px");
                                g && (b.style.height = g.toString() + "px");
                                n = { jb: null, Wb: null, Hb: null };
                                try
                                {
                                    var r = p.getVideoTracks()[0];
                                    r && ((n.Hb = r), (n.jb = r.getCapabilities()), (n.Wb = r.getSettings()));
                                }
                                catch (q) {}
                                Ua() || Sa()
                                    ? b.parentNode && b.parentNode !== null
                                        ? (k || d(b, p, n),
                                        setTimeout(() =>
                                        {
                                            b.play();
                                        }, 100))
                                        : (document.body.appendChild(b),
                                        $a(b),
                                        k || d(b, p, n),
                                        setTimeout(() =>
                                        {
                                            b.style.transform = "scale(0.0001,0.0001)";
                                            b.style.position = "fixed";
                                            b.style.bottom = "0px";
                                            b.style.right = "0px";
                                            $a(b);
                                            setTimeout(() =>
                                            {
                                                b.play();
                                            }, 100);
                                        }, 80))
                                    : k || d(b, p, n);
                            }
                        }
                        else l("VIDEO_NOTSTARTED");
                    }, 700);
                }
                typeof b.srcObject !== "undefined" ? (b.srcObject = p) : ((b.src = window.URL.createObjectURL(p)), (b.videoStream = p));
                $a(b);
                b.addEventListener(
                    "loadeddata",
                    () =>
                    {
                        var n = b.play();
                        $a(b);
                        typeof n === "undefined"
                            ? m()
                            : n
                                .then(() =>
                                {
                                    m();
                                })
                                .catch(() =>
                                {
                                    l("VIDEO_PLAYPROMISEREJECTED");
                                });
                    },
                    !1,
                );
            })
            .catch((p) =>
            {
                l(p);
            });
    }
    function bb(b, d)
    {
        var e = Va() ? document.createElement("video") : !1,
            f = { video: { facingMode: { ideal: "user" }, width: { min: 480, max: 1280, ideal: 800 }, height: { min: 480, max: 1280, ideal: 600 } }, audio: !1 };
        if (e)
        {
            if (Va())
            {
                if (f && f.video)
                {
                    if (Sa())
                    {
                        var l = Ta();
                        (l[0] < 12 || (l[0] === 12 && l[1] < 2)) && Za(f);
                    }
                    f.video.width && f.video.width.ideal && (e.style.width = f.video.width.ideal + "px");
                    f.video.height && f.video.height.ideal && (e.style.height = f.video.height.ideal + "px");
                }
                Ra(e, "autoplay");
                Ra(e, "playsinline");
                f && f.audio ? (e.volume = 0) : Ra(e, "muted");
                ab(
                    e,
                    b,
                    () =>
                    {
                        function k(m)
                        {
                            if (m.length === 0) d("INVALID_FALLBACKCONSTRAINTS");
                            else
                            {
                                var n = m.shift();
                                ab(
                                    e,
                                    b,
                                    () =>
                                    {
                                        k(m);
                                    },
                                    n,
                                );
                            }
                        }
                        var p = Ya(f);
                        k(p);
                    },
                    f,
                );
            }
            else d && d("MEDIASTREAMAPI_NOTFOUND");
        }
        else d && d("VIDEO_NOTPROVIDED");
    }
    var cb = [1, 1, 2],
        db = [0.2, 0.8],
        Ia = {};
    function eb(b)
    {
        function d(C)
        {
            X = setTimeout(f.bind(null, C), 10);
        }
        function e()
        {
            ja && (window.cancelAnimationFrame(ja), (ja = !1));
            X && (window.clearTimeout(X), (X = !1));
        }
        function f()
        {
            if (F !== A.pause)
            {
                G.reset();
                G.J();
                var C = n.currentTime - E;
                C < 0 && (E = n.currentTime);
                1e3 * C < 20 || (g.refresh(), (E += C), t.set("s50"), r.u(), g.b(0), L.g(!1, !0));
                for (C = 0; C < 1; ++C) t.set("s51"), q.u(), r.b(0), x.b(1), L.g(!1, !1), q.b(0), k.w(!1, q);
                h === D.visible && (G.ac(), t.set("s49"), r.b(1), x.b(0), L.g(!1, !1));
                a.flush();
                ja = window.requestAnimationFrame(d);
            }
        }
        var l = Date.now(),
            k,
            p = 1.25 / 3,
            m = [0.16, 0.16],
            n,
            g,
            r,
            q,
            x,
            z,
            H = new Uint8Array([0, 0, 0, 0]),
            A = {
                Fb: 0, ea: 1, ja: 2, pause: 3,
            },
            F = A.Fb,
            D = { hidden: 0, visible: 1 },
            h = b.Cb ? D.visible : D.hidden,
            v = 0,
            w = 0.25,
            Q = 0.25,
            fa = 1.25,
            ja = !1,
            X = !1,
            N = 0,
            c = typeof b.va !== "undefined" ? b.va : "./",
            B = ((typeof b.Ta !== "undefined" ? b.Ta : 0.55) - db[0]) / (db[1] - db[0]),
            E = 0;
        return {
            Sb(C)
            {
                B = C;
            },
            Zb(C)
            {
                h = C ? D.visible : D.hidden;
            },
            $b(C)
            {
                C && F !== A.pause ? ((F = A.pause), e()) : C || F !== A.pause || ((F = A.ja), e(), (F = A.ea), f(0));
            },
            i(C)
            {
                n = C;
                t.$a([
                    {
                        id: "s50",
                        name: "_",
                        W: "attribute vec2 a0;uniform vec2 u34,u35;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u35+u34*a0;}",
                        Y: ["a0"],
                        R: [2],
                        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                        f: ["u1", "u34", "u35"],
                        precision: "lowp",
                    },
                    {
                        id: "s51",
                        name: "_",
                        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                        W:
                            "attribute vec2 a0;uniform sampler2D u36;uniform vec2 u37;const vec2 k=vec2(.25,.5),j=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u36,k);vec2 d=a.gb,b=a.a*u37;vec4 c=texture2D(u36,j);float l=c.a,g=c.y;vec2 f=vec2(1./cos(g),1.);b*=f;vec2 i=a0*.5+e;vv0=d+(i-e)*b,gl_Position=vec4(a0,0.,1.);}",
                        Y: ["a0"],
                        R: [2],
                        f: ["u1", "u36", "u37"],
                        precision: "lowp",
                    },
                    {
                        id: "s52",
                        name: "_",
                        W: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                        c:
                            "uniform sampler2D u38,u36;uniform vec3 u39,u40;uniform float u41,u42,u43,u44,u45,u46;const vec4 e=vec4(.25,.25,.25,.25);const float f=1e-3;void main(){vec4 b=texture2D(u36,vec2(.25,.5));float a=floor(b.r+f),c=0.;vec4 h=texture2D(u38,vec2(.125,.625)),i=texture2D(u38,vec2(.375,.625));float d=dot(h,e),j=dot(i,e);bool k=d>u44&&d>j+u45;k?a=2.:a>u43?a=0.:a>1.9&&(b.a>u42||b.a<u41)?a=0.:a>1.9?a+=1.:0.;if(a<.9)b.gba=u39,a=1.;else{float l=dot(e,texture2D(u38,vec2(.375,.875))),m=dot(e,texture2D(u38,vec2(.625,.875))),n=dot(e,texture2D(u38,vec2(.875,.875))),o=dot(e,texture2D(u38,vec2(.125,.875)));c=clamp(o,-1.+f,1.-f);float p=step(1.5,a);a*=p;float g=b.a*u46;b.gba+=vec3(l,m,n)*u40*g;}b.r=a+c*.5+.5,gl_FragColor=b;}",
                        f: "u38 u36 u39 u41 u42 u43 u45 u44 u40 u46".split(" "),
                    },
                    {
                        id: "s53",
                        name: "_",
                        c: "uniform sampler2D u36,u47;uniform float u48;varying vec2 vv0;const vec2 e=vec2(.5,.5);void main(){vec4 a=texture2D(u36,e),b=texture2D(u47,e);float c=step(2.,a.r),d=fract(a.r);vec4 f=vec4(c,d,0.,1.);gl_FragColor=mix(f,b,u48);}",
                        f: ["u36", "u47", "u48"],
                    },
                    {
                        id: "s49",
                        name: "_",
                        c:
                            "uniform sampler2D u36,u49;uniform vec2 u37;varying vec2 vv0;const vec2 j=vec2(1.,1.);const vec3 k=vec3(0.,.7,1.);void main(){vec4 g=texture2D(u36,vec2(.5,.5));vec3 l=texture2D(u49,vv0).rgb;vec2 h=g.gb;float m=g.a;vec2 b=m*u37,d=h+b,c=h;c-=b/2.,d-=b/2.;vec2 n=.5*(c+d),i=step(c,vv0)*step(vv0,d);float o=i.x*i.y;vec2 a=2.*abs(n-vv0)/b;a=pow(a,3.*j);float f=max(a.x,a.y);f*=o,gl_FragColor=vec4(mix(l,k,f),1.);}",
                        f: ["u36", "u49", "u37"],
                    },
                ]);
                t.D("s51", [
                    { type: "1i", name: "u1", value: 0 },
                    { type: "1i", name: "u36", value: 1 },
                    { type: "2f", name: "u37", value: m },
                ]);
                t.D("s53", [
                    { type: "1i", name: "u36", value: 0 },
                    { type: "1i", name: "u47", value: 1 },
                    { type: "1f", name: "u48", value: 0.9 },
                ]);
                t.D("s49", [
                    { type: "1i", name: "u36", value: 0 },
                    { type: "1i", name: "u49", value: 1 },
                    { type: "2f", name: "u37", value: m },
                ]);
                t.D("s52", [
                    { type: "1i", name: "u38", value: 0 },
                    { type: "1i", name: "u36", value: 1 },
                    { type: "1f", name: "u41", value: 1.1 },
                    { type: "1f", name: "u42", value: 5.8 },
                    { type: "1f", name: "u43", value: 55 },
                    { type: "1f", name: "u44", value: 0.95 },
                    { type: "1f", name: "u45", value: 1.1 },
                    { type: "1f", name: "u46", value: m[0] },
                    { type: "3f", name: "u40", value: [cb[0] * m[0], cb[1] * m[1], cb[2]] },
                ]);
                g = T.a({
                    v: n, isPot: !1, isFloat: !1, isFlipY: !0,
                });
                r = T.a({
                    isPot: !1, Mc: !0, isFloat: !1, width: 400, height: 400,
                });
                q = T.a({ isPot: !0, isFloat: !1, width: 64 });
                x = Ba.a({
                    width: 1, height: 1, isFloat: !0, isPot: !1, array: new Float32Array([0, 0.25, 0.25, 0]),
                });
                z = Ba.a({
                    width: 1, height: 1, isFloat: !0, isPot: !1, array: new Float32Array([0, 0.5, 0, 1]),
                });
                na(c, (R) =>
                {
                    k = new Qa();
                    k.Mb(R.layers);
                    k.Ob({
                        Qa: "gpuRawAvg",
                        Jb()
                        {
                            x.Rb(1);
                            t.set("s52");
                            t.Ub("u39", w, Q, fa);
                            L.g(!1, !1);
                            ++v % 2 !== 0 && ((fa += p), fa > 2.5 && ((w += 0.1), (fa = 1.25), w > 0.75 && ((w = 0.25), (Q += 0.1), Q > 0.75 && (Q = 0.25))));
                            t.set("s53");
                            z.Qb(1);
                            x.b(0);
                            L.g(!1, !1);
                            var O = Date.now();
                            if (O - l > 100)
                            {
                                l = O;
                                t.set("s1");
                                G.B();
                                z.b(0);
                                L.g(!1, !1);
                                a.readPixels(0, 0, 1, 1, a.RGBA, a.UNSIGNED_BYTE, H);
                                O = db[0] + B * (db[1] - db[0]);
                                var W = Math.abs((H[1] / 255) * 2 - 1),
                                    ha = H[0] > 128,
                                    U = ha && W < O + 0.1;
                                F === A.ea && ha && W < O - 0.1 ? (b.Aa(!0), (F = A.ja)) : F !== A.ja || U || (b.Aa(!1), (F = A.ea));
                                G.J();
                            }
                        },
                    });
                    ++N;
                    N === 1 && ((fb.ready = !0), b.fb(!1, {
                        video: n, GL: a, videoTexture: g.get(), videoTextureCut: q.get(),
                    }), F !== A.pause && (e(), (F = A.ea), f(0)), (N = 0));
                });
            },
        };
    }
    var fb = {
        ready: !1,
        set_sensibility(b)
        {
            fb.ready && fb.X.Sb(b);
        },
        toggle_pause(b)
        {
            fb.ready && fb.X.$b(b);
        },
        toggle_display(b)
        {
            fb.ready && fb.X.Zb(b);
        },
        init(b)
        {
            function d(e)
            {
                b.callbackReady && b.callbackReady(e || "UNKNOW_ERROR");
            }
            fb.X = eb({
                Cb: typeof b.isDisplayVideo === "undefined" ? !0 : b.isDisplayVideo,
                fb(e, f)
                {
                    b.callbackReady && b.callbackReady(e, f);
                },
                Aa: b.callbackTrack,
                Ta: b.sensibility,
                va: b.NNC,
            });
            if (!Aa.i({
                Da: b.canvasId, width: 400, height: 400, debug: !1, pa: !1, premultipliedAlpha: !0,
            })) return d && d("COMPAT_FAIL"), !1;
            t.i();
            bb(
                (e) =>
                {
                    var f = [0.5, 0.5],
                        l = e.videoHeight / e.videoWidth,
                        k = Aa.F() / Aa.s();
                    l > k ? (l <= 1 ? (f[0] *= l) : (f[1] /= l)) : ((f[0] *= l), (l = 1 / k), (f[0] *= l), (f[1] *= l));
                    f[1] *= k;
                    fb.X.i(e);
                    t.D("s50", [
                        { type: "1i", name: "u1", value: 0 },
                        { type: "2f", name: "u34", value: f },
                        { type: "2f", name: "u35", value: [0.5, 0.5] },
                    ]);
                },
                () =>
                {
                    d("NO_WEBCAM");
                },
            );
            return !0;
        },
    };
    window.GLANCETRACKERAPI = fb;
    return GLANCETRACKERAPI;
}());
