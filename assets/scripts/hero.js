
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const [leftImage, centerImage, rightImage] =
    gsap.utils.toArray("#top img");

  if (!leftImage || !centerImage || !rightImage) return;

  // 初期位置：3列
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

  // 3枚すべての幅を同時に広げる
  heroTimeline.to([leftImage, centerImage, rightImage], {
    width: "100%",
    ease: "none",
    duration: 1,
  }, 0);

  // 左右の画像を外側へ移動
  heroTimeline.to(leftImage, {
    x: () => -window.innerWidth,
    ease: "none",
    duration: 1,
  }, 0);

  heroTimeline.to(rightImage, {
    left: "0%",
    x: () => window.innerWidth,
    ease: "none",
    duration: 1,
  }, 0);
});
