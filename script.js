const nameFull = "@Zixor";
const descFull = "Just Random Guy💖.     ";
const newDesc1 = "guns.lol/_zx     ";
let nameIndex = 0;
let descIndex = 0;
let deleting = false;
let currentDesc = descFull;
let changeDesc = false;

function updateTyping() {
  if (deleting) {
    descIndex--;
    nameIndex--;
    if (descIndex <= 0) {
      deleting = false;
      changeDesc = true;
      currentDesc = (currentDesc === descFull) ? newDesc1 : descFull;
    }
  } else {
    nameIndex++;
    descIndex++;
    if (nameIndex >= nameFull.length && descIndex >= descFull.length) {
      deleting = true;
    }
  }

  document.getElementById("name-display").textContent = nameFull.slice(0, nameIndex);
  document.getElementById("desc-display").textContent = currentDesc.slice(0, descIndex);
  document.title = nameFull.slice(0, nameIndex) + " | Bio";
  requestAnimationFrame(() => setTimeout(updateTyping, deleting ? 100 : 150));
}

updateTyping();

const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
const overlay = document.getElementById('enter-overlay');
const bgVideo = document.getElementById('bg-video');

const updateMusicIcon = (isPlaying) => {
  toggle.src = isPlaying
    ? 'assets/pause.png?v=' + new Date().getTime()
    : 'assets/play.png?v=' + new Date().getTime();
};

toggle.addEventListener('click', () => {
  if (music.paused) {
    music.muted = false;
    music.play().catch(e => console.log("Music autoplay blocked:", e));
    if (bgVideo) bgVideo.play().catch(e => console.log("Video play blocked:", e));
    updateMusicIcon(true);
  } else {
    music.pause();
    if (bgVideo) bgVideo.pause();
    updateMusicIcon(false);
  }
});

overlay.addEventListener('click', () => {
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.add('hidden');
  }, 600);

  music.muted = false;
  music.play().catch(e => console.log("Music play blocked:", e));

  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.play().catch(e => console.log("Video play blocked:", e));
  }

  updateMusicIcon(true);
});
