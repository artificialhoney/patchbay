if (!window.$fx) {
  console.log("$fx not found");
}
window.$fx = window.$fx || {};

if ((!CABLES.fakefxhash && !window.$fx.hash) || CABLES.fakefxhash) {
  CABLES.fakefxhash = true;
}

const isReal = !CABLES.fakefxhash,
  alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

const inHash = op.inString("Hash", ""),
  inRandomizeHash = op.inTriggerButton("Randomize Hash"),
  outHash = op.outString("fxhash"),
  outRandom1 = op.outNumber("fxrand 1"),
  outRandom2 = op.outNumber("fxrand 2"),
  outRandom3 = op.outNumber("fxrand 3"),
  outRandom4 = op.outNumber("fxrand 4"),
  outArr = op.outArray("Random Numbers"),
  outEmbedded = op.outBoolNum("fxhash environment", isReal);

inHash.onChange = init;

let inited = false;

init();

inRandomizeHash.onTriggered = () => {
  inHash.set(randomHash());
  op.refreshParams();
};

function randomHash() {
  let str = "";
  const all = alphabet.length - 1;

  for (let i = 0; i < 51; i++) {
    str += alphabet[Math.round(Math.random() * all)];
  }
  return str;
}

function init() {
  if (isReal && inited) return;
  if (!isReal) {
    window.$fx.hash = inHash.get() || randomHash();
    let b58dec = (str) => {
      return [...str].reduce((p, c) => {
        return (p * alphabet.length + alphabet.indexOf(c)) | 0;
      }, 0);
    };
    let fxhashTrunc = window.$fx.hash.slice(2);
    let regex = new RegExp(
      ".{" + ((window.$fx.hash.length / 4) | 0) + "}",
      "g",
    );
    let hashes = fxhashTrunc.match(regex).map((h) => {
      return b58dec(h);
    });

    let sfc32 = (a, b, c, d) => {
      return () => {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };

    window.$fx.rand = sfc32(...hashes);
  }

  inited = true;

  outHash.set(window.$fx.hash);

  outRandom1.set(0);
  outRandom2.set(0);
  outRandom3.set(0);
  outRandom4.set(0);

  outRandom1.set(window.$fx.rand());
  outRandom2.set(window.$fx.rand());
  outRandom3.set(window.$fx.rand());
  outRandom4.set(window.$fx.rand());

  const arr = [];
  for (let i = 0; i < 1000; i++) arr.push(window.$fx.rand());
  outArr.setRef(arr);
}
