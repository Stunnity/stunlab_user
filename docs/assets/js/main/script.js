function statisticsCounter() {
  $(".num").counterUp({});
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
  }, 1000);
}
