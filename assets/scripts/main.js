
document.addEventListener("DOMContentLoaded", () => {

  const toggleButton = document.querySelector(".toggle-button");
  const menu = document.querySelector(".global-nav");

  const lines = toggleButton.querySelectorAll("span");


  // =========================
  // GSAP 初期化
  // =========================

  // ScrollTrigger プラグインを登録
  gsap.registerPlugin(ScrollTrigger);


  // =========================
  // 初期状態
  // =========================

  // 3 本線の初期位置
  gsap.set([lines[0], lines[1], lines[2]], {
    rotation: 0,
    x: 0,
    y: 0,
  });

  // メニューの初期位置
  gsap.set(menu, {
    yPercent: -100,
  });

  // =========================
  // アニメーションの構築
  // =========================

  const menuAnimation = gsap.timeline({
    paused:   true,
    reversed: true
  });

  // メニューを上から降ろす
  menuAnimation
    .to(menu, {
      yPercent: 0,
      duration: 0.5,
      ease: "power1.out"
    }, 0)

    // 上の線を中央に移動して回転
    .to(lines[0], {
      y: 10,
      rotation: 45,
      duration: 0.5,
      ease: "power1.out"
    }, 0)
    // 中央の線を消す
    .to(lines[1], {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power1.out"
    }, 0)
    // 下の線を中央に移動して回転
    .to(lines[2], {
      y: -10,
      rotation: -45,
      duration: 0.5,
      ease: "power1.out"
    }, 0);


  // =========================
  // ボタンのクリック処理
  // =========================

  toggleButton.addEventListener("click", () => {
    if (menuAnimation.reversed()) {
      // メニューを開く
      toggleButton.classList.add("is-active");
      menuAnimation.play();
    } else {
      // メニューを閉じる
      toggleButton.classList.remove("is-active");
      menuAnimation.reverse();
    }
  });

  // =========================
  // メニュー内リンクのクリック処理
  // =========================

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleButton.classList.remove("is-active");
      menuAnimation.reverse();
    });
  });
});
