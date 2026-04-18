
const SOUNDS = {
  // Effects
  CORRECT: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  INCORRECT: 'https://assets.mixkit.co/active_storage/sfx/2959/2959-preview.mp3',
  SUCCESS_SFX: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  CHAT_OPEN: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  
  // Background Music (Unified for continuous play)
  MAIN_THEME: 'https://cdn.pixabay.com/audio/2024/02/14/audio_9678822607.mp3',
  VICTORY_THEME: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1515c.mp3'
};

class AudioService {
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private activeBgm: HTMLAudioElement | null = null;
  private currentBgmKey: string | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;

  constructor() {
    // Load settings
    try {
      this.isMuted = localStorage.getItem('isMuted') === 'true';
      this.volume = parseFloat(localStorage.getItem('volume') || '0.5');
    } catch (e) {
      console.error('Failed to load audio settings', e);
    }

    // Preload sounds
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      
      if (key.endsWith('_THEME')) {
        audio.loop = true;
        audio.volume = 0;
      }
      
      this.audioCache.set(key, audio);
    });
  }

  setVolume(val: number) {
    this.volume = val;
    localStorage.setItem('volume', val.toString());
    if (this.activeBgm) {
      this.activeBgm.volume = this.isMuted ? 0 : val * 0.25;
    }
  }

  getVolume() {
    return this.volume;
  }

  playEffect(soundKey: keyof typeof SOUNDS) {
    if (this.isMuted) return;
    const audio = this.audioCache.get(soundKey);
    if (audio && !soundKey.endsWith('_THEME')) {
      const effect = audio.cloneNode() as HTMLAudioElement;
      effect.volume = this.volume;
      effect.play().catch(e => console.debug('Audio play blocked', e));
    }
  }

  play(soundKey: keyof typeof SOUNDS) {
    this.playEffect(soundKey);
  }

  switchBgm(key: 'MAIN_THEME' | 'VICTORY_THEME') {
    if (this.currentBgmKey === key) return;

    // Fade out previous
    if (this.activeBgm) {
      const prev = this.activeBgm;
      let vol = prev.volume;
      const fadeOut = setInterval(() => {
        vol -= 0.05;
        if (vol <= 0) {
          prev.pause();
          prev.currentTime = 0;
          clearInterval(fadeOut);
        } else {
          prev.volume = Math.max(0, vol);
        }
      }, 50);
    }

    this.currentBgmKey = key;
    const next = this.audioCache.get(key);
    if (next) {
      this.activeBgm = next;
      next.volume = 0;
      if (!this.isMuted) {
        next.play().catch(e => console.debug('BG Music blocked', e));
        let vol = 0;
        const targetVol = this.volume * 0.25;
        const fadeIn = setInterval(() => {
          vol += 0.02;
          if (vol >= targetVol) {
            next.volume = targetVol;
            clearInterval(fadeIn);
          } else {
            next.volume = vol;
          }
        }, 50);
      }
    }
  }

  startBgMusic() {
    if (!this.currentBgmKey) {
      this.switchBgm('MAIN_THEME');
    } else if (this.activeBgm && !this.isMuted) {
      this.activeBgm.play().catch(e => console.debug('BG Music blocked', e));
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('isMuted', this.isMuted.toString());
    
    if (this.activeBgm) {
      if (this.isMuted) {
        this.activeBgm.pause();
      } else {
        this.activeBgm.volume = this.volume * 0.3;
        this.activeBgm.play().catch(e => console.debug('BG Music blocked', e));
      }
    }
    return this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }
}

export const audioService = new AudioService();
