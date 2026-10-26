document.addEventListener("DOMContentLoaded", () => {

  /* ============================== *
   * @ 説明
   * スクロール時のコンテンツの、
   * アニメーション設定を行う。
   * ============================== */
  /*
    toggleActions -->> イベントトリガー
    toggleActions: "① ② ③ ④"
    ① onEnter     下方向にスクロールして、トリガー範囲に入ったら
    ② onLeave     下方向にスクロールして、トリガー範囲から出たら
    ③ onEnterBack 上方向にスクロールして、トリガー範囲に入ったら
    ④ onLeaveBack 上方向にスクロールして、トリガー範囲から出たら
  */

  //
  // ScrollTrigger を登録
  //
  gsap.registerPlugin(ScrollTrigger);


  //////////////////////////////////////////////////
  //  ロゴとトグルメニューを表示
  //////////////////////////////////////////////////

  /*
    DOM を取得
  */
  const _headerLogo = document.querySelector("#header .logo");
  const _toggleMenu = document.querySelector("#header .toggle-button");

  /*
    表示前の初期設定
  */
  // ヘッダーロゴ
  gsap.set(_headerLogo, {
    y:           0, // 要素の位置 (px 単位)
    autoAlpha: 0.0, // 透明度
  });
  /* トグルメニュ */
  gsap.set(_toggleMenu, {
    y:           0, // 要素の位置 (px 単位)
    autoAlpha: 0.0, // 透明度
  });

  /*
    アニメーション設定
  */
  // ヘッダーロゴ
  const logoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger:       "#information",
      start:         "top 30%",
      end:           "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  logoTimeline.to(_headerLogo, {
    autoAlpha: 1.0,
    duration:  1,
    ease:      "power2.out",
  });

  // トグルメニュー
  const togglemenuTimeline = gsap.timeline({
    scrollTrigger: {
      trigger:       "#information",
      start:         "top 30%",
      end:           "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  togglemenuTimeline.to(_toggleMenu, {
    autoAlpha: 1.0,
    duration:  1,
    ease:      "power2.out",
  });


  //////////////////////////////////////////////////
  // INFORMATION を表示
  //////////////////////////////////////////////////

  // DOM を取得
  const _infoContents = gsap.utils.toArray("#information > *");

  // 表示前の初期設定
  gsap.set(_infoContents, {
    y:         180, // 文字の位置を下げる距離 (px 単位)
    autoAlpha: 0.0, // 透明度
  });

  /*
    スクロール連動のアニメーション
  */
  const infoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger:       "#information",
      start:         "top 80%",
      toggleActions: "play none none none",
    },
  });
  // 下から上への移動
  infoTimeline.to(_infoContents, {
    y:        0.0, // 透明度
    duration: 2.5, // 完了までの時間
    stagger:  0.2, // 要素毎に 0.2 秒ずつ開始を遅らせる
    ease:     "power2.out",
  }, 0);
  // フェードイン
  infoTimeline.to(_infoContents, {
    autoAlpha: 1.0, // 透明度
    duration:  4.0, // 完了までの時間
    stagger:   0.2, // 要素毎に 0.2 秒ずつ開始を遅らせる
    ease:      "power2.out",
  }, 0);


  //////////////////////////////////////////////////
  // GALLERY を表示
  //////////////////////////////////////////////////

  /*
    DOM を取得
  */
  const _subhead         = document.querySelector("#gallery h2");
  const _galleryContents = gsap.utils.toArray("#gallery .gallery-images img");

  /*
    表示前の初期設定
  */
  // 表題
  gsap.set(_subhead, {
    y: 180,
    autoAlpha: 0,
  });
  // 画像
  gsap.set(_galleryContents, {
    y: 180,
    autoAlpha: 0,
  });

  /*
    スクロール連動のアニメーション
  */
  // 表題を表示
  const subheadTimeline = gsap.timeline({
    scrollTrigger: {
      trigger:       "#gallery",
      start:         "top 80%",
      toggleActions: "play none none none",
    },
  });
  // 下から上への移動
  subheadTimeline.to(_subhead, {
    y:        0.0, // 透明度
    duration: 2.5, // 完了までの時間
    stagger:  0.0, // 要素毎に遅延表示設定を無しにする
    ease:     "power2.out",
  }, 0);
  // フェードイン
  subheadTimeline.to(_subhead, {
    autoAlpha: 1.0, // 透明度
    duration:  4.0, // 完了までの時間
    stagger:   0.2, // 要素毎に 0.2 秒ずつ開始を遅らせる
    ease:      "power2.out",
  }, 0);

  // 画像毎にスクロールを監視して表示
  ScrollTrigger.batch(_galleryContents, {

    start: "top 80%", // 画像の上端が画面上から80%の位置に来たら開始

    // 画面内に入った画像にアニメーションを適用する
    onEnter: (images) => {
      gsap.to(images, {
        y:           0,          // 画像を本来の位置まで移動
        autoAlpha: 1.0,          // 透明度
        duration:  1.5,          // アニメーションに 1.5 秒かける
        stagger:   0.2,          // 複数画像が対象なら 0.2秒 ずつ開始をずらす
        ease:      "power2.out", // 動きの終わりを滑らかにする
      });
    },
  });


});