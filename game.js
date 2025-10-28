const player = document.getElementById("player");
const heartsContainer = document.getElementById("hearts-container");
const scoreDisplay = document.getElementById("score");
const giftBox = document.getElementById("gift-box");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

let score = 0;
let playerX = window.innerWidth / 2 - 30;
const playerSpeed = 15;

// Gerak player pakai panah kiri-kanan
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed;
  } else if (e.key === "ArrowRight" && playerX < window.innerWidth - 60) {
    playerX += playerSpeed;
  }
  player.style.left = playerX + "px";
});

// Spawn heart secara acak
function createHeart() {
  const heart = document.createElement("img");
  heart.src = "assets/heart.png";
  heart.classList.add("heart");
  heart.style.left = Math.random() * (window.innerWidth - 30) + "px";
  heartsContainer.appendChild(heart);

  let heartFall = setInterval(() => {
    let heartTop = parseInt(window.getComputedStyle(heart).top) || -50;
    heart.style.top = heartTop + 5 + "px";

    // Cek tabrakan
    const playerRect = player.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    if (
      heartRect.bottom >= playerRect.top &&
      heartRect.top <= playerRect.bottom &&
      heartRect.left <= playerRect.right &&
      heartRect.right >= playerRect.left
    ) {
      heart.remove();
      clearInterval(heartFall);
      score++;
      scoreDisplay.textContent = `Love: ${score}`;

      // Setiap 10 love muncul foto
      if (score % 10 === 0 && score < 50) {
        showPhoto();
      }

      // Pas 50 love munculkan gift box
      if (score === 50) {
        giftBox.classList.remove("hidden");
      }
    }

    // Hapus kalau udah keluar layar
    if (heartTop > window.innerHeight) {
      heart.remove();
      clearInterval(heartFall);
    }
  }, 50);
}

// Munculkan love setiap 800ms
setInterval(createHeart, 800);

// Munculkan foto sementara (placeholder)
function showPhoto() {
  const img = document.createElement("img");
  img.src = "assets/photo1.png"; // ganti sesuai urutan foto lo
  img.style.position = "absolute";
  img.style.width = "120px";
  img.style.left = "50%";
  img.style.top = "50%";
  img.style.transform = "translate(-50%, -50%)";
  img.style.border = "3px solid #ff3b3b";
  img.style.borderRadius = "10px";
  img.style.boxShadow = "0 0 10px #ff3b3b";
  document.body.appendChild(img);

  setTimeout(() => img.remove(), 2000);
}

// Gift box diklik → munculkan popup
giftBox.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

// Tutup popup (berlaku kapan pun popup muncul)
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});
