function statisticsCounter() {
  try {
    $(".num").counterUp({});

  } catch (error) {
  }
}
function bookSwiper(centered = false) {
  const config = {
    slidesPerView: 4,
    centeredSlides: centered,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  }
  setTimeout(() => {
    var swiper = new Swiper(".swiper-container", config);
  }, 500)
}
