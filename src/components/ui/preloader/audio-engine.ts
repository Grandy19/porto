import { Howl } from 'howler';

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private ambient: Howl | null = null;
  private chime: Howl | null = null;
  private whoosh: Howl | null = null;
  private isEnabled: boolean = false;
  
  constructor() {
    // We don't initialize AudioContext here because it requires user interaction
  }

  public init(enabled: boolean) {
    this.isEnabled = enabled;
    
    if (enabled && typeof window !== 'undefined') {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      
      // Initialize Howler instances
      if (!this.ambient) {
        this.ambient = new Howl({
          src: ['/sounds/ambient.mp3'], // User should provide this file
          loop: true,
          volume: 0, // start at 0 for fade in
          preload: true,
        });
      }
      if (!this.chime) {
        this.chime = new Howl({
          src: ['/sounds/chime.mp3'], // User should provide this file
          volume: 0.2,
          preload: true,
        });
      }
      if (!this.whoosh) {
        this.whoosh = new Howl({
          src: ['/sounds/whoosh.mp3'], // User should provide this file
          volume: 0.2,
          preload: true,
        });
      }
    } else {
      this.stopAll();
    }
  }

  public setEnabled(enabled: boolean) {
    if (enabled && !this.isEnabled) {
      this.init(true);
      // If we are enabling mid-loading, maybe we missed the start, but we can play ambient
      this.playAmbient();
    } else if (!enabled && this.isEnabled) {
      this.stopAll();
    }
    this.isEnabled = enabled;
  }

  public playAmbient() {
    if (!this.isEnabled || !this.ambient) return;
    if (!this.ambient.playing()) {
      this.ambient.play();
      this.ambient.fade(0, 0.15, 2000); // Fade to 15% over 2s
    }
  }

  public fadeOutAmbient() {
    if (this.ambient && this.ambient.playing()) {
      this.ambient.fade(this.ambient.volume(), 0, 800);
      setTimeout(() => {
        this.ambient?.stop();
      }, 800);
    }
  }

  public playChime() {
    if (!this.isEnabled || !this.chime) return;
    this.chime.play();
  }

  public playWhoosh() {
    if (!this.isEnabled || !this.whoosh) return;
    this.whoosh.play();
  }

  // Web Audio API Synth for Brick Clicks (Positional, Soft & Warm Tactile Tap)
  public playBrickClick(xPos: number) {
    if (!this.isEnabled || !this.audioCtx) return;

    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const panner = ctx.createStereoPanner();
    const filter = ctx.createBiquadFilter();

    // Map xPos (approx -30 to 30) to stereo pan (-1 to 1)
    const panValue = Math.max(-1, Math.min(1, xPos / 20));
    panner.pan.value = panValue;

    // Soft warm pitch modulation
    const baseFreq = 340 + (Math.random() * 80 - 40);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.08);

    // Warm Low-pass filter to remove harsh treble clicks
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, ctx.currentTime);
    filter.Q.value = 1.0;

    // Smooth, gentle tactile envelope (very soft and subtle)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.075);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Web Audio API Synth for Shimmer (Dissolve)
  public playShimmer() {
    if (!this.isEnabled || !this.audioCtx) return;

    const ctx = this.audioCtx;
    
    // Create multiple high-pitched short burst oscillators
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const panner = ctx.createStereoPanner();

        panner.pan.value = (Math.random() - 0.5) * 1.5;
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2000 + Math.random() * 4000, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(panner);
        panner.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }, Math.random() * 400); // Scatter over 400ms
    }
  }

  public stopAll() {
    if (this.ambient) this.ambient.stop();
    if (this.chime) this.chime.stop();
    if (this.whoosh) this.whoosh.stop();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
       // We could suspend or close, but usually suspending is safer for reuse
       this.audioCtx.suspend();
    }
  }
}

// Export singleton
export const engine = new AudioEngine();
