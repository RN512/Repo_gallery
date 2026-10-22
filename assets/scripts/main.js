document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // トグルボタン
  // ==================================================
  const toggleButton = document.querySelector(".toggle-button");
  const menu         = document.querySelector(".global-nav");
  const lines        = toggleButton.querySelectorAll("span");

  //
  // ボタンのクリック処理
  //
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

  //
  // メニュー内リンクのクリック処理
  //
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleButton.classList.remove("is-active");
      menuAnimation.reverse();
    });
  });

  //
  // 初期状態
  //
  // トグルボタン
  gsap.set([lines[0], lines[1], lines[2]], {
    rotation: 0,
    x: 0,
    y: 0,
  });

  // メニューの初期位置
  gsap.set(menu, {
    yPercent: -100,
  });

  //
  // アニメーションの構築
  //

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


  // ==================================================
  // メインビジュアル : スクロール連動で画像を拡大・縮小
  // ==================================================


  //
  // ScrollTrigger プラグインを登録
  //
  gsap.registerPlugin(ScrollTrigger);

  // DOM を取得する
  const images = gsap.utils.toArray("#top img");
  const [leftImage, centerImage, rightImage] = images;

  // 真ん中の画像の中心 = 画面中央
  gsap.set(centerImage, {
    xPercent: -50,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#top",
      start: "top top",
      end: "+=800",
      scrub: true,
      pin: false,
      invalidateOnRefresh: true,
    },
  });

  //
  // 3 枚の画像幅を広げる
  //
  tl.to(images, {
    width: "100%",
    duration: 1,
    ease: "none",
  }, 0);

  // 左の画像を左方向へ移動
  tl.to(leftImage, {
    xPercent: -100,
    duration: 1,
    ease: "none",
  }, 0);

  // 右の画像を右方向へ移動
  tl.to(rightImage, {
    xPercent: 100,
    duration: 1,
    ease: "none",
  }, 0);

});
