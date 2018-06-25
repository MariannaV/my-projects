(function() {
  new Glide(".product-slider", {
    type: "carousel", //после последнего слайда показывать первый
    startAt: 0, //первый показываемый
    perView: 1, //число слайдов на экране
    // focusAt: 'center'
    gap: 0, //отступ между слайдами
    // peek:  { before: 100, after: 50 }, //позволяет показать часть предыдущего/следущего слайдов
    // autoplay: 3000, //интервал между перемоткой
    hoverpause: true, //stop autoplay when hover
    keyboard: true, //добавляет управление клавишами
    direction: "ltr", //промотка слева направо
    breakpoints: {
      //изменения для разных размеров экрана
      320: {
        // perView: 0
      },
      1600: {
        // perView: 1
      }
    },
    animationDuration: 500, //продолжительность анимации переключения на следующий слайд
    rewindDuration: 1000, //продолжительность анимации переключения между последним и первым слайдами
    animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)" //функция анимации
  }).mount();

  // new Glide(".product-slider-nav-images", {
  //   type: "carousel",
  //   startAt: 0, //первый показываемый
  //   perView: 3, //число слайдов на экране
  //   gap: 18, //отступ между слайдами
  //   peek: { before: 100, after: 50 }, //позволяет показать часть предыдущего/следущего слайдов
  //   keyboard: true, //добавляет управление клавишами
  //   animationDuration: 500,
  //   rewindDuration: 1000,
  //   animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
  // }).mount();
})();

function accordionNavigation(event) {
  const labels = document.querySelectorAll(
    ".container-with-details > .details-navigation label"
  );
  const newLabelId = event.target.getAttribute("for");

  [...labels].forEach((el, index) => {
    if (el.getAttribute("for") === newLabelId) {
      el.classList.add("active-label");
    } else if (el.classList.contains("active-label")) {
      el.classList.remove("active-label");
    }
  });
}
