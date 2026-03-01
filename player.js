
  document.querySelectorAll('[data-audio]').forEach((wrap) => {
    const audio = wrap.querySelector('audio');
    const btn = wrap.querySelector('.audio-btn');
    const seek = wrap.querySelector('.seek');
    const fill = wrap.querySelector('.fill');
    const time = wrap.querySelector('.time');

    const fmt = (s) => {
      if (!isFinite(s)) return "0:00";
      const m = Math.floor(s / 60);
      const r = Math.floor(s % 60);
      return `${m}:${String(r).padStart(2, "0")}`;
    };

    const setUI = () => {
      const p = audio.duration ? (audio.currentTime / audio.duration) : 0;
      fill.style.width = (p * 100) + "%";
      seek.value = Math.round(p * 1000);
      time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      btn.textContent = audio.paused ? "▶" : "❚❚";
    };

    btn.addEventListener('click', async () => {

  document.querySelectorAll('audio').forEach(a => {
    if (a !== audio) a.pause();
  });

  if (audio.paused) await audio.play();
  else audio.pause();
});

    seek.addEventListener('input', () => {
      if (!audio.duration) return;
      audio.currentTime = (seek.value / 1000) * audio.duration;
      setUI();
    });

    audio.addEventListener('timeupdate', setUI);
    audio.addEventListener('loadedmetadata', setUI);
    audio.addEventListener('play', setUI);
    audio.addEventListener('pause', setUI);

    setUI();
  });
