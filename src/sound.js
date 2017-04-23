/* globals window AudioContext localStorage */
const sound = {
  aCtx: undefined,
  init() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.aCtx = new AudioContext();

    this.mainGain = this.aCtx.createGain();
    this.mainGain.gain.value = localStorage.getItem('sound') || 0.8;
    this.mainGain.connect(this.aCtx.destination);
  },
  noiseBuffer() {
    const bufferSize = this.aCtx.sampleRate;
    const buffer = this.aCtx.createBuffer(1, bufferSize, this.aCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i += 1) {
      output[i] = (Math.random() * 0.25) - 0.125;
    }

    return buffer;
  },
  playPlop() {
    if (!this.aCtx) {
      this.init();
    }

    const time = sound.aCtx.currentTime;
    const noise = this.aCtx.createBufferSource();
    const noiseEnvelope = this.aCtx.createGain();

    noise.buffer = this.noiseBuffer();
    noise.connect(noiseEnvelope);
    noiseEnvelope.connect(this.mainGain);

    noiseEnvelope.gain.setValueAtTime(1, time);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    noise.start(time);
    noise.stop(time + 0.2);
  },
};

export default sound;
