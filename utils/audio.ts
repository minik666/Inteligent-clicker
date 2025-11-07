const audioCache: { [key: string]: HTMLAudioElement } = {};

export const playSound = (src: string, isMuted: boolean, volume: number = 1.0) => {
  if (isMuted) return;

  try {
    if (!audioCache[src]) {
      audioCache[src] = new Audio(src);
    }
    const audio = audioCache[src];
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(error => {
        // Autoplay was prevented.
        console.warn(`Could not play sound ${src}, possibly due to browser autoplay policy.`, error);
    });
  } catch (error) {
      console.error(`Error playing sound: ${src}`, error);
  }
};
