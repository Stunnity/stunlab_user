function statisticsCounter() {
  try {
    $(".num").counterUp({});

  } catch (error) {
    console.log("ok")
  }
}
function bookSwiper() {
  setTimeout(() => {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 4,
      centeredSlides: false,
      spaceBetween: 30,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, 500)

}
