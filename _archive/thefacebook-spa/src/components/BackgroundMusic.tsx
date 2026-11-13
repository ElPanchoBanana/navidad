import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Para evitar bloqueo de autoplay en navegadores
      const playAudio = () => {
        audio.play().catch(() => {});
        document.removeEventListener("click", playAudio);
      };

      document.addEventListener("click", playAudio);
    }
  }, []);

  return (
    <audio ref={audioRef} src="https://s3.zapopan.gob.mx/geomatica/AMIGOSECRETO/luismi.mp3" loop />
  );
};

export default BackgroundMusic;
