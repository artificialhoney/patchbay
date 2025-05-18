const eventIn = op.inObject("MIDI Event In");
const timingIn = op.inValueSelect("Timing", ["straight", "dotted", "triplet"], "straight");
const eventOut = op.outObject("MIDI Event Out");
const beatOut = op.outTrigger("Tick Out");
const clockStartOut = op.outTrigger("Clock Start");
const clockStopOut = op.outTrigger("Clock Stop");
const clockContinueOut = op.outTrigger("Clock Continue");

let outBPM = op.outNumber("BPM");
let outBeatDuration = op.outNumber("Tick Duration");
let outSubTick = op.outNumber("Sub Tick");

const fullNoteOut = op.outTrigger("1/1");
const halfNoteOut = op.outTrigger("1/2");
const quarterNoteOut = op.outTrigger("1/4");
const eigthNoteOut = op.outTrigger("1/8");
const sixteenthNoteOut = op.outTrigger("1/16");

const outs = {
    "full": fullNoteOut,
    "half": halfNoteOut,
    "quarter": quarterNoteOut,
    "eigth": eigthNoteOut,
    "sixteenth": sixteenthNoteOut,
};

const CLOCK = 0xf8;
const CLOCK_START = 0xfa;
const CLOCK_CONTINUE = 0xfb;
const CLOCK_STOP = 0xfc;

const STRAIGHT_TICKS = {
    "full": 96,
    "half": 48,
    "quarter": 24,
    "eigth": 12,
    "sixteenth": 6,
};

const TICKS = {
    "straight": STRAIGHT_TICKS,
    "dotted": {
        "full": STRAIGHT_TICKS.full + STRAIGHT_TICKS.full / 2,
        "half": STRAIGHT_TICKS.half + STRAIGHT_TICKS.half / 2,
        "quarter": STRAIGHT_TICKS.quarter + STRAIGHT_TICKS.quarter / 2,
        "eigth": STRAIGHT_TICKS.eigth + STRAIGHT_TICKS.eigth / 2,
        "sixteenth": STRAIGHT_TICKS.sixteenth + STRAIGHT_TICKS.sixteenth / 2,
    },
    "triplet": {
        "full": (STRAIGHT_TICKS.full * 2) / 3,
        "half": (STRAIGHT_TICKS.half * 2) / 3,
        "quarter": (STRAIGHT_TICKS.quarter * 2) / 3,
        "eigth": (STRAIGHT_TICKS.eigth * 2) / 3,
        "sixteenth": (STRAIGHT_TICKS.sixteenth * 2) / 3,
    }
};

let tickCount = 0;
let lastBeat = 0;

eventIn.onChange = () =>
{
    const event = eventIn.get();
    if (!event) return;

    const [statusByte, , ] = event.data;
    if (statusByte === CLOCK_START)
    {
        tickCount = 0;
        clockStartOut.trigger();
    }
    else if (statusByte === CLOCK_STOP)
    {
        clockStopOut.trigger();
    }
    else if (statusByte === CLOCK || statusByte === CLOCK_CONTINUE)
    {
        if (statusByte === CLOCK_CONTINUE) clockContinueOut.trigger();

        const {
            full, half, quarter, eigth, sixteenth,
        } = TICKS[timingIn.get()];
        if (tickCount % 24 === 0)
        {
            if (lastBeat !== 0)
            {
                const diff = CABLES.now() - lastBeat;
                const bpm = 60000 / diff;
                outBPM.set(bpm);
                outBeatDuration.set(15 / bpm);
            }

            lastBeat = CABLES.now();
        }
        if (tickCount % full === 0) outs.full.trigger();
        if (tickCount % half === 0) outs.half.trigger();
        if (tickCount % quarter === 0) outs.quarter.trigger();
        if (tickCount % eigth === 0) outs.eigth.trigger();
        if (tickCount % sixteenth === 0) outs.sixteenth.trigger();
        beatOut.trigger();
        tickCount += 1;
        outSubTick.set(tickCount % 24);
    }

    eventOut.set(event);
};
