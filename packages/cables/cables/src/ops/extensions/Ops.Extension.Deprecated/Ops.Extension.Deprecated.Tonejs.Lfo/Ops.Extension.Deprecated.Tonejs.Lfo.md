LFO stands for low frequency oscillator. `LFO` produces an output signal which can be attached to an audio parameter in order to modulate that it with an oscillator.

The LFO can also be synced to the transport to start/stop and change when the tempo changes (_not implemented yet_).

_Please note_: square-waves do not approximate ±1, more like ±0.85, so if you want to modulate the frequency of an oscillator e.g. the result will be slightly off, see [Tone.js Github discussion](https://github.com/Tonejs/Tone.js/issues/125)
