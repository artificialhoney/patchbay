Typically connected to a Ops.WebAudio.AudioBuffer, which holds the sample / audio file.
In contrast to the [Web Audio AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode), which can only play back an AudioBuffer once, this op can play back multiple times (every time the playback finished a new `AudioBufferSourceNode` is being created internally). 
