document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const menu         = document.querySelector(".global-nav");

  if (!toggleButton || !menu) return;

  const lines = toggleButton.querySelectorAll("span");

  // 初期状態
  gsap.set(lines, {
    rotation: 0,
    x: 0,
    y: 0,
  });

  gsap.set(menu, {
    yPercent: -100,
  });

  // メニューアニメーション
  const menuAnimation = gsap.timeline({
    paused: true,
    reversed: true,
  });

  menuAnimation
    .to(menu, {
      yPercent: 0,
      duration: 0.5,
      ease: "power1.out",
    }, 0)

    // 上の線
    .to(lines[0], {
      y: 10,
      rotation: 45,
      duration: 0.5,
      ease: "power1.out",
    }, 0)

    // 中央の線
    .to(lines[1], {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power1.out",
    }, 0)

    // 下の線
    .to(lines[2], {
      y: -10,
      rotation: -45,
      duration: 0.5,
      ease: "power1.out",
    }, 0);

  // ボタンのクリック
  toggleButton.addEventListener("click", () => {
    if (menuAnimation.reversed()) {
      toggleButton.classList.add("is-active");
      menuAnimation.play();
    } else {
      toggleButton.classList.remove("is-active");
      menuAnimation.reverse();
    }
  });

  // メニュー内リンクを押したら閉じる
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleButton.classList.remove("is-active");
      menuAnimation.reverse();
    });
  });
});