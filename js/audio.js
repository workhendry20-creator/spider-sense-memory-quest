/**
 * Spider-Sense Memory Quest Audio Engine
 * Built with Web Audio API for zero-lag synthesized Spider-Sense SFX, Microphone Blow Sensor & Voice Memo
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmInterval = null;
    this.isBgmPlaying = false;
    this.bgmStep = 0;
    this.micStream = null;
    this.micAnalyser = null;
    this.isMicListening = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
      // Silent buffer trick for iOS Safari Web Audio unlock
      try {
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
      } catch (e) {
        console.warn("Audio unlock silent buffer exception:", e);
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isMuted;
  }

  // 1. Spider-Sense Buzzing Sound Effect
  playSpiderSenseSFX() {
    if (this.isMuted) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const duration = 1.3;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(440, now);
    osc2.frequency.setValueAtTime(880, now);

    for (let i = 0; i < 14; i++) {
      const time = now + i * 0.09;
      osc1.frequency.setValueAtTime(520 + (i % 2 === 0 ? 140 : -140), time);
      osc2.frequency.setValueAtTime(980 + (i % 2 === 0 ? 200 : -200), time);
    }

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // 2. Web Shooter "THWIP!" Sound Effect
  playThwipSFX() {
    if (this.isMuted) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 3. Button Click Sound
  playClickSFX() {
    if (this.isMuted) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // 4. Wrong Answer Buzz
  playWrongSFX() {
    if (this.isMuted) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.setValueAtTime(110, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 5. Victory Fanfare Arpeggio
  playFanfareSFX() {
    if (this.isMuted) return;
    this.initContext();

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const now = this.ctx.currentTime;

    notes.forEach((freq, index) => {
      const startTime = now + index * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.01, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // 6. Candle Blowing Wind Sound
  playWindBlowSFX() {
    if (this.isMuted) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // White noise
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.5);
  }

  // 7. Sparkle Chime Sound Effect
  playSparkleSFX() {
    if (this.isMuted) return;
    this.initContext();

    const now = this.ctx.currentTime;
    [1200, 1500, 1800, 2200].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.15, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.2);
    });
  }

  // 8. Retro Superhero Synth BGM Loop
  startBgm() {
    if (this.isMuted) return;
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    const melody = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 392.00, 349.23];
    this.bgmStep = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const freq = melody[this.bgmStep % melody.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq / 2, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);

      this.bgmStep++;
    }, 280);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // 9. Microphone Blow Detector
  async initMicrophoneBlowListener(onBlowCallback) {
    if (this.isMicListening) return;
    this.initContext();

    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const source = this.ctx.createMediaStreamSource(this.micStream);
      this.micAnalyser = this.ctx.createAnalyser();
      this.micAnalyser.fftSize = 256;
      source.connect(this.micAnalyser);
      this.isMicListening = true;

      const dataArray = new Uint8Array(this.micAnalyser.frequencyBinCount);
      let blowCooldown = false;

      const checkVolume = () => {
        if (!this.isMicListening) return;
        this.micAnalyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const averageVolume = sum / dataArray.length;

        // Blow threshold
        if (averageVolume > 65 && !blowCooldown) {
          blowCooldown = true;
          onBlowCallback();
          setTimeout(() => { blowCooldown = false; }, 2000);
        }

        requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access not available or denied:", err);
    }
  }

  stopMicrophoneListener() {
    this.isMicListening = false;
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
  }
}

window.soundEngine = new SoundEngine();
