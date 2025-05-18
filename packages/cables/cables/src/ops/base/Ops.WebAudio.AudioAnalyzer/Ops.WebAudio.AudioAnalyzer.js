const refresh = op.addInPort(new CABLES.Port(op, "refresh", CABLES.OP_PORT_TYPE_FUNCTION));

const audioCtx = CABLES.WEBAUDIO.createAudioContext(op);
const inFftSize = op.inSwitch("FFT size", [64, 128, 256, 512, 1024], 256);
const analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = 0.3;
analyser.fftSize = 256;

const audioIn = CABLES.WEBAUDIO.createAudioInPort(op, "Audio In", analyser);
const anData = op.inValueSelect("Data", ["Frequency", "Time Domain"], "Frequency");

const next = op.outTrigger("Next");
const audioOutPort = CABLES.WEBAUDIO.createAudioOutPort(op, "Audio Out", analyser);
const avgVolume = op.addOutPort(new CABLES.Port(op, "average volume", CABLES.OP_PORT_TYPE_VALUE));
const fftOut = op.addOutPort(new CABLES.Port(op, "fft", CABLES.OP_PORT_TYPE_ARRAY));

let fftBufferLength = analyser.frequencyBinCount;
let fftDataArray = new Uint8Array(fftBufferLength);
let getFreq = true;
const array = null;

inFftSize.onChange = function ()
{
    analyser.fftSize = inFftSize.get();
};

anData.onChange = function ()
{
    if (anData.get() == "Frequency")getFreq = true;
    if (anData.get() == "Time Domain")getFreq = false;
};

refresh.onTriggered = function ()
{
    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;

    if (fftBufferLength != analyser.frequencyBinCount)
    {
        fftBufferLength = analyser.frequencyBinCount;
        fftDataArray = new Uint8Array(fftBufferLength);
    }

    if (!fftDataArray)
    {
        // op.log("[audioanalyzer] fftDataArray is null, returning.");
        return;
    }

    let values = 0;

    for (let i = 0; i < fftDataArray.length; i++) values += fftDataArray[i];

    const average = values / fftDataArray.length;

    avgVolume.set(average / 128);
    try
    {
        if (getFreq) analyser.getByteFrequencyData(fftDataArray);
        else analyser.getByteTimeDomainData(fftDataArray);
    }
    catch (e) { op.log(e); }

    fftOut.set(null);
    fftOut.set(fftDataArray);

    next.trigger();
};
