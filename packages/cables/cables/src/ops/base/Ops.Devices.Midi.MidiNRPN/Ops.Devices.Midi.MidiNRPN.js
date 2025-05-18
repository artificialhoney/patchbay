/* UTIL */
const MIDIChannels = Array.from(Array(16).keys()).map((i) => { return i + 1; });

/* IN */
const inEvent = op.inObject("MIDI Event In");
const midiChannelDropdown = op.inValueSelect("MIDI Channel", MIDIChannels, 1);

const nrpnIndexDropdown = op.inValueInt("NRPN Index", 0);
const normalizeDropdown = op.inValueSelect("Normalize", ["none", "0 to 1", "-1 to 1"], "none");
const learn = op.inTriggerButton("learn");
const clear = op.inTriggerButton("clear");

op.setPortGroup("MIDI", [inEvent, midiChannelDropdown]);
op.setPortGroup("NRPN", [nrpnIndexDropdown, normalizeDropdown]);
op.setPortGroup("", [learn, clear]);
/* OUT */
const eventOut = op.outObject("MIDI Event Out");
const triggerOut = op.outTrigger("Trigger Out");
const nrpnIndexOut = op.outNumber("NRPN Index");
const nrpnValueOut = op.outNumber("NRPN Value");

op.setPortGroup("MIDI/Trigger Out", [eventOut, triggerOut]);
op.setPortGroup("NRPN Out", [nrpnIndexOut, nrpnValueOut]);

nrpnIndexDropdown.set(0);
midiChannelDropdown.set(1);
normalizeDropdown.set(normalizeDropdown.get("none"));

let learning = false;
learn.onTriggered = () =>
{
    learning = true;
};

clear.onTriggered = () =>
{
    nrpnIndexDropdown.set(0);
    midiChannelDropdown.set(1);
    normalizeDropdown.set(normalizeDropdown.get("none"));
    op.refreshParams();
};
let outValue;
inEvent.onChange = () =>
{
    const event = inEvent.get();
    if (!event) return;
    if (event.messageType !== "NRPN") return;

    const { channel, nrpnIndex, nrpnValue } = event;

    if (learning)
    {
        nrpnIndexDropdown.set(nrpnIndex);
        midiChannelDropdown.set(channel + 1);

        learning = false;

        if (CABLES.UI)
        {
            op.uiAttr({ "info": `bound to NRPN: ${nrpnIndexDropdown.get()}` });
            op.refreshParams();
        }
    }

    if (channel === midiChannelDropdown.get() - 1)
    {
        if (nrpnIndex === nrpnIndexDropdown.get())
        {
            nrpnIndexOut.set(nrpnIndex);

            outValue = nrpnValue;

            if (normalizeDropdown.get() === "0 to 1")
            {
                nrpnValueOut.set(outValue / 16383);
                triggerOut.trigger();
            }
            else if (normalizeDropdown.get() === "-1 to 1")
            {
                nrpnValueOut.set(outValue / (16383 / 2) - 1);
                triggerOut.trigger();
            }
            else if (normalizeDropdown.get() === "none")
            {
                nrpnValueOut.set(outValue);
                triggerOut.trigger();
            }
            else nrpnValueOut.set(0);
        }
    }
    eventOut.set(null);
    eventOut.set(event);
};
