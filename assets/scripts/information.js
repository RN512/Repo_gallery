document.addEventListener("DOMContentLoaded", () => {

  //
  // ScrollTrigger を登録
  //
  gsap.registerPlugin(ScrollTrigger);

  // DOM を取得
  const infoItems = gsap.utils.toArray("#information > *");

  // 表示前の位置を設定
  gsap.set(infoItems, {
    y:         180, // 文字の位置を下げる距離 (px 単位)
    autoAlpha: 0.0, // 透明度
  });

/*
  toggleActions -->> イベントトリガー
  toggleActions: "① ② ③ ④"
  ① onEnter     下方向にスクロールして、トリガー範囲に入ったら
  ② onLeave     下方向にスクロールして、トリガー範囲から出たら
  ③ onEnterBack 上方向にスクロールして、トリガー範囲に入ったら
  ④ onLeaveBack 上方向にスクロールして、トリガー範囲から出たら
*/
  const infoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger:       "#information",
      start:         "top 80%",
      toggleActions: "play none none none",
    },
  });

  // 下から上への移動
  infoTimeline.to(infoItems, {
    y:        0.0, // 透明度
    duration: 2.5, // 完了までの時間
    stagger:  0.2, // 要素毎に 0.2 秒ずつ開始を遅らせる
    ease:     "power2.out",
  }, 0);

  // フェードイン
  infoTimeline.to(infoItems, {
    autoAlpha: 1.0, // 透明度
    duration:  4.0, // 完了までの時間
    stagger:   0.2, // 要素毎に 0.2 秒ずつ開始を遅らせる
    ease:      "power2.out",
  }, 0);
});