; (function () {

    window.matchMedia("(min-width: 768px)").matches &&
        new Glide('.ofd-slider', {
            type: 'carousel', //после последнего слайда показывать первый
            startAt: 0, //первый показываемый
            perView: 1, //число слайдов на экране
            // focusAt: 'center'
            gap: 0, //отступ между слайдами
            // peek:  { before: 100, after: 50 }, //позволяет показать часть предыдущего/следущего слайдов 
            autoplay: 3000, //интервал между перемоткой
            hoverpause: true, //stop autoplay when hover
            keyboard: true, //добавляет управление клавишами
            direction: 'ltr', //промотка слева направо
            breakpoints: { //изменения для разных размеров экрана
                320: {
                    // perView: 0
                },
                1600: {
                    // perView: 1
                }
            },
            animationDuration: 500, //продолжительность анимации переключения на следующий слайд
            rewindDuration: 1000, //продолжительность анимации переключения между последним и первым слайдами 
            animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', //функция анимации 
        }).mount()
}());  