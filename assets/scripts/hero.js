document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const [leftImage, centerImage, rightImage] =
    gsap.utils.toArray("#top img");

  if (!leftImage || !centerImage || !rightImage) return;

  const mm = gsap.matchMedia();

  //
  // 901px 以上の動作
  //
  mm.add("(min-width: 901px)", () => {

    gsap.set(leftImage, {
      left: "0%",
      width: "33.3333%",
      x: 0,
    });

    gsap.set(centerImage, {
      left: "50%",
      width: "33.3333%",
      xPercent: -50,
    });

    gsap.set(rightImage, {
      left: "66.6667%",
      width: "33.3333%",
      x: 0,
    });

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "+=800",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    heroTimeline.to(
      [leftImage, centerImage, rightImage],
      {
        width: "100%",
        ease: "none",
        duration: 1,
      },
      0
    );

    heroTimeline.to(
      leftImage,
      {
        x: () => -window.innerWidth,
        ease: "none",
        duration: 1,
      },
      0
    );

    heroTimeline.to(
      rightImage,
      {
        left: "0%",
        x: () => window.innerWidth,
        ease: "none",
        duration: 1,
      },
      0
    );

    return () => {
      heroTimeline.scrollTrigger?.kill();
      heroTimeline.kill();
    };
  });

  //
  // 901px 以下の動作 -->> 逆転
  //
  mm.add("(max-width: 900px)", () => {

    // 初期表示
    // 左右の画像は画面外、中央の画像は画面全体に表示
    gsap.set(leftImage, {
      left: "0%",
      width: "100%",
      x: "-100%",
    });

    gsap.set(centerImage, {
      left: "50%",
      width: "100%",
      xPercent: -50,
      x: 0,
    });

    gsap.set(rightImage, {
      left: "0%",
      width: "100%",
      x: "100%",
    });

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "+=800",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // 1 枚目 : 左側から画面内に入り、1/3 まで縮小
    heroTimeline.to(leftImage, {
      left: "0%",
      width: "33.3333%",
      x: 0,
      ease: "none",
      duration: 1,
    }, 0);

    // 2 枚目 : 画面中央を維持、幅のみ縮小
    heroTimeline.to(centerImage, {
      width: "33.3333%",
      ease: "none",
      duration: 1,
    }, 0);

    // 3枚目 : 右側から画面内に入り、1/3 まで縮小
    heroTimeline.to(rightImage, {
      left: "66.6667%",
      width: "33.3333%",
      x: 0,
      ease: "none",
      duration: 1,
    }, 0);

    // メディアクエリ解除時にアニメーションを破棄
    return () => {
      heroTimeline.scrollTrigger?.kill();
      heroTimeline.kill();
    };
  });


});