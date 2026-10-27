document.addEventListener("DOMContentLoaded", () => {

  //
  // ScrollTrigger を登録
  //
  gsap.registerPlugin(ScrollTrigger);

  // DOM を取得
  const accessBg = document.querySelector(".background_img");


  //
  // 初期設定 (非表示)
  //
  gsap.set(accessBg, { opacity: 0 });

  /*
    toggleActions について
    toggleActions: "① ② ③ ④"
    ① onEnter     下方向にスクロールして、トリガー範囲に入ったら
    ② onLeave     下方向にスクロールして、トリガー範囲から出たら
    ③ onEnterBack 上方向にスクロールして、トリガー範囲に入ったら
    ④ onLeaveBack 上方向にスクロールして、トリガー範囲から出たら
  */
  gsap.to(accessBg, {
    opacity:  1.0,
    duration: 0.4,
    scrollTrigger: {
      trigger:       "#access",
      start:         "top 100%",
      endTrigger:    "#contact",
      end:           "top bottom",
      toggleActions: "play reverse play reverse"
    }
  });

});