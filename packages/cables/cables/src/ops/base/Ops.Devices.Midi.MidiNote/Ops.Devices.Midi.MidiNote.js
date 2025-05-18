/* UTIL */
const NOTE_OFF = 0x8;
const NOTE_ON = 0x9;
const NOTE_VALUES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const MIDIChannels = Array.from(Array(16).keys()).map((i) => { return i + 1; });

function getMIDINote(dataByte1LSB)
{
    return dataByte1LSB <= 126
        ? `${NOTE_VALUES[dataByte1LSB % 12]}${Math.floor(dataByte1LSB / 12) - 2} - ${dataByte1LSB}`
        : "NO NOTE";
}

const noteValues = Array.from(Array(128).keys(), (key) => { return getMIDINote(key); });
const velocityArray = Array.from(Array(128).keys(), (key) => { return 0; });
/* IN */
const inEvent = op.inObject("MIDI Event In");
const midiChannelDropdown = op.inValueSelect("MIDI Channel", MIDIChannels, 1);
const noteDropdown = op.inValueSelect("Note", noteValues, "none");
const normalizeDropdown = op.inSwitch(
    "Normalize Velocity",
    ["none", "0 to 1", "-1 to 1"],
    "none",
);
const gateType = op.inBool("Toggle Gate", false);
const learn = op.inTriggerButton("learn");
const clear = op.inTriggerButton("clear");

op.setPortGroup("MIDI", [inEvent, midiChannelDropdown]);
op.setPortGroup("", [learn, clear]);
op.setPortGroup("Note", [noteDropdown, normalizeDropdown, gateType]);

/* OUT */
const eventOut = op.outObject("MIDI Event Out");
const triggerOut = op.outTrigger("Trigger Out");
const currentNoteOut = op.outNumber("Current Note");
const velocityOut = op.outNumber("Velocity");
const gateOut = op.outBoolNum("Gate");
const arrayOut = op.outArray("Velocity Array");
arrayOut.set(velocityArray);

op.setPortGroup("MIDI/Trigger Out", [eventOut, triggerOut]);
op.setPortGroup("Note Out", [currentNoteOut, velocityOut, gateOut]);
noteDropdown.set(0);
midiChannelDropdown.set(1);

let learning = false;
learn.onTriggered = () =>
{
    learning = true;
};

clear.onTriggered = () =>
{
    noteDropdown.set(0);
    midiChannelDropdown.set(1);
    normalizeDropdown.set(normalizeDropdown.get("none"));
    gateType.set(false);
    op.refreshParams();
};

gateType.onChange = () =>
{
    if (!gateType.get()) gateOut.set(false);
};

inEvent.onChange = () =>
{
    const event = inEvent.get();
    if (!event) return;
    if (event.messageType !== "Note") return;
    if (!event.newNote) return;

    const [statusByte] = event.data;

    const { newNote, velocity } = event;
    const [noteIndex, noteName] = newNote;

    if (learning || noteDropdown.onChange)
    {
        noteDropdown.set(noteName);
        midiChannelDropdown.set(event.channel + 1);

        learning = false;

        if (CABLES.UI)
        {
            gui.emitEvent("portValueEdited", op, noteDropdown, noteDropdown.get());
            gui.emitEvent("portValueEdited", op, midiChannelDropdown, midiChannelDropdown.get());

            op.uiAttr({ "info": `bound to Note: ${noteDropdown.get()}` });
            op.refreshParams();
        }
    }

    if (event.channel === midiChannelDropdown.get() - 1)
    {
        if (getMIDINote(noteIndex) === noteDropdown.get())
        {
            if ((statusByte >> 4 === NOTE_OFF || velocity === 0) && !gateType.get())
            {
                gateOut.set(false);
                velocityOut.set(0);
                velocityArray[noteIndex] = 0;
                arrayOut.set(null);
                arrayOut.set(velocityArray);
            }
            else if (statusByte >> 4 === NOTE_ON)
            {
                if (gateType.get())
                {
                    gateOut.set(!gateOut.get());
                }
                else
                {
                    gateOut.set(true);
                }
                currentNoteOut.set(noteIndex);
                velocityArray[noteIndex] = velocity;
                arrayOut.set(null);
                arrayOut.set(velocityArray);
                if (normalizeDropdown.get() === "0 to 1")
                {
                    // (max'-min')/(max-min)*(value-min)+min'
                    velocityOut.set((1 / 126) * (velocity - 1));
                    velocityArray[noteIndex] = (1 / 126) * (velocity - 1);
                    triggerOut.trigger();
                }
                else if (normalizeDropdown.get() === "-1 to 1")
                {
                    // (max'-min')/(max-min)*(value-min)+min'
                    const normalizedValue = (2 / 126) * (velocity - 1) - 1;
                    velocityArray[noteIndex] = normalizedValue;
                    velocityOut.set(normalizedValue);
                    triggerOut.trigger();
                }
                else if (normalizeDropdown.get() === "none")
                {
                    velocityOut.set(velocity);
                    triggerOut.trigger();
                }
            }
        }
        else if (noteDropdown.get() === 0)
        {
            // no note selected
            if ((statusByte >> 4 === NOTE_OFF || velocity === 0) && !gateType.get())
            {
                gateOut.set(false);
                velocityOut.set(0);
                velocityArray[noteIndex] = 0;
                arrayOut.set(null);
                arrayOut.set(velocityArray);
            }
            else if (statusByte >> 4 === NOTE_ON)
            {
                if (gateType.get())
                {
                    gateOut.set(!gateOut.get());
                }
                else
                {
                    gateOut.set(true);
                }
                currentNoteOut.set(noteIndex);

                if (normalizeDropdown.get() === "0 to 1")
                {
                    // (max'-min')/(max-min)*(value-min)+min'
                    const newVelocity = (1 / 126) * (velocity - 1);
                    velocityOut.set(newVelocity);
                    velocityArray[noteIndex] = newVelocity;
                    arrayOut.set(null);
                    arrayOut.set(velocityArray);
                    triggerOut.trigger();
                }
                else if (normalizeDropdown.get() === "-1 to 1")
                {
                    // (max'-min')/(max-min)*(value-min)+min'
                    const normalizedValue = (2 / 126) * (velocity - 1) - 1;
                    velocityOut.set(normalizedValue);
                    velocityArray[noteIndex] = normalizedValue;
                    arrayOut.set(null);
                    arrayOut.set(velocityArray);
                    triggerOut.trigger();
                }
                else if (normalizeDropdown.get() === "none")
                {
                    velocityOut.set(velocity);
                    velocityArray[noteIndex] = velocity;
                    arrayOut.set(null);
                    arrayOut.set(velocityArray);
                    triggerOut.trigger();
                }
            }
        }
    }
    eventOut.set(null);
    eventOut.set(event);
};
