(function() {
    
buttonBasket(); 

function buttonBasket() { 
const headerMenu = document.getElementById("float_elem"); 
const basketButton = document.getElementsByClassName( 
"button-basket-outside" 
)[0]; 
$('.button-basket-outside  .cartReplacerTotalSum').text(String($.Cart.computeTotalCost()).replace(/(\d(?=\d{4,})|\d\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

$('.container-with-total-cost  .cartReplacerTotalSum').text(String($.Cart.computeTotalCost()).replace(/(\d(?=\d{4,})|\d\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

// document.querySelector('.button-basket-outside .cartReplacerCount').innerHTML = $.Cart.getCount();
if (window.matchMedia("(min-width: 992px)").matches){
document.querySelector('.button-basket-outside .cartReplacerCount').innerText = ($.Cart.getCount() === 0) ? 'Нет' : $.Cart.getCount() ;
}





if (window.matchMedia("(min-width: 992px)").matches) { 
headerMenu.querySelector(".container").appendChild(basketButton); 

let observer = new MutationObserver(function(mutations) { 
mutations.forEach(function(mutation) { 
if (parseFloat(headerMenu.style.top) === 0) 
basketButton.classList.add("active"); 
else basketButton.classList.remove("active"); 
}); 
}); 

observer.observe(headerMenu, { 
attributes: true, 
childList: false, 
characterData: false 
}); 
} 
}
    
    
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


function handleAddToCart(event) { 
event.target.classList.toggle('active'); 
setTimeout(() => $('.cartReplacerTotalSum').text(String($.Cart.computeTotalCost()).replace(/(\d(?=\d{4,})|\d\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')), 3000);
}



function handleProductCounter(event, actionType, sumValueAttribute = 'content') {
const plusButton = event.target;
const counter = plusButton.parentNode.querySelector('.cartGetCount');
if (actionType === '-' && +counter.value - 1 === 0) return;
const sumElem = plusButton.closest('.counter-with-sum').querySelector('.counter-sum');
const counterValue = +counter.value + (actionType === '+' ? 1 : -1);
const newSumValue = counterValue * +sumElem.getAttribute(sumValueAttribute);
sumElem.innerHTML = newSumValue.toString().replace(/(\d(?=\d{4,})|\d\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
} 


//массив из элементов, содержимое которых необходимо своевременно обновлять на значение суммы всех товаров в корзине 
const sumReplaceElements = [ 
document.querySelector(".button-basket-outside .cartReplacerTotalSum"), 
document.querySelector(".container-with-total-cost .cartReplacerTotalSum") 
]; 

const postifxRepleaceElement =document.querySelector(".button-basket-outside .counter-value .counter-postfix");


const handleMutations = throttle(mutation => { 
sumReplaceElements.forEach(el => handleSumReplacer(el)); 
postifxRepleaceElement.innerHTML = wordDecline($.Cart.getCount(), ['товар','товара','товаров'])
}, 1000); 

const handleObserver = mutations => mutations.forEach(handleMutations); 

let observer = new MutationObserver(handleObserver); 

const observeElem = document.getElementById("dropdown__content"), 
observeConfig = { 
attributes: false, 
childList: true, 
characterData: false, 
subtree: true 
}; 

//при каждом изменении observeElem (либо его доч. элементов) будет вызывать handleMutations (но не чаще раза в 1000 миллисекунд) 
observer.observe(observeElem, observeConfig); 

//при вызове заменит текст в элементе elem на актуальное и отформатированное значение суммы всех товаров в корзине 
function handleSumReplacer(elem) { 
elem.innerHTML = $.Cart.computeTotalCost() 
.toString() 
.replace(/(\d(?=\d{4,})|\d\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "); 
} 

//вернёт улучшенный вариант функции fn, которая игнорирует все вызовы чаще раза в interval миллисекунд 
function throttle(fn, interval) { 
let lastTime; 
return function throttled() { 
let timeSinceLastExecution = Date.now() - lastTime; 
if (!lastTime || timeSinceLastExecution >= interval) { 
fn.apply(this, arguments); 
lastTime = Date.now(); 
} 
}; 
}





function scrollSliderPictures(event, actionType = 'plus') { 
// const slidePictures = document.querySelector('.product-slider > .product-slider-nav-images'); 
// slidePictures.querySelector('.glide__bullet--active').scrollIntoView(false);
const container = document.querySelector('.product-slider-nav-images-container');

const button = container.querySelector('.product-slider-nav-img-button');

const buttonHeight = getComputedStyle(button).getPropertyValue('height');

const buttonGap = getComputedStyle(container).getPropertyValue('row-gap'); 

// console.log(buttonHeight, buttonGap, parseFloat(buttonHeight) + parseFloat(buttonGap));
// container.style.transform = "translateY(-114px)";
// const valueTranslateY = actionType === 'plus' ? (-1*(
// parseFloat(buttonHeight)+parseFloat(buttonGap)
// )+parseFloat(container.dataset.translate)) :(1*(
// parseFloat(buttonHeight)+parseFloat(buttonGap)
// )+parseFloat(container.dataset.translate)) ;
// container.style.transform = `translateY(${valueTranslateY}px)`;
// container.setAttribute("data-translate", valueTranslateY <= (6*96 + (6-1)*18)-376 ? 0 : valueTranslateY );
let valueTranslateY =
parseFloat(container.dataset.translate)
+
(actionType === 'plus' ? -1 : 1)*(
parseFloat(buttonHeight)+parseFloat(buttonGap)
);

const minTranslateY =
container.children.length*parseFloat(buttonHeight) + (container.children.length - 1)*parseFloat(buttonGap) -
parseFloat(getComputedStyle(container.closest('.product-slider-nav-images')).getPropertyValue('max-height'));
if (valueTranslateY <= -minTranslateY)
valueTranslateY = 0;
else if (valueTranslateY >= 0)
valueTranslateY = -minTranslateY;
container.style.transform = `translateY(${valueTranslateY}px)`;
container.setAttribute("data-translate", valueTranslateY);

} 


function wordDecline(num, expressions) { 
var result; 
count = num % 100; 
if (count >= 5 && count <= 20) { 
result = expressions['2']; 
} else { 
count = count % 10; 
if (count == 1) { 
result = expressions['0']; 
} else if (count >= 2 && count <= 4) { 
result = expressions['1']; 
} else { 
result = expressions['2']; 
} 
} 
return result; 

}


