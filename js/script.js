window.addEventListener('load', function () {
  preloader();
  addListenerforScroll();
  burgerMenu();
  fullScreenImages();
});

function preloader() {
  const preloader = ge('.preload');
  preloader.classList.add('anim');
  setInterval(function () {
    preloader.classList.add('hidden');
  }, 1000);
}

function burgerMenu() {
  const burger = ge('.header__burger'),
    menu = ge('.header__menu'),
    overlay = ge('.overlay'),
    toTop = ge('#toTop');

  toTop.addEventListener('click', closeToggleClass);
  burger.addEventListener('click', toggleClass);
  menu.querySelectorAll('.header__menu-item').forEach(item => {
    item.addEventListener('click', () => {
      closeToggleClass();
    })
  })

  function toggleClass() {
    burger.classList.toggle('show');
    menu.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.classList.toggle('stop-scroll');
  }


  function closeToggleClass() {
    burger.classList.remove('show');
    menu.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('stop-scroll');
  }
}

function ge(className) {
  return document.querySelector(className)
}

function scrollToTop(to, duration = 700) {
  const
    element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    },
    animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}

function addListenerforScroll() {
  let btn = document.querySelector('#toTop');
  const btnList = document.querySelectorAll('.scroll-btn');

  btnList.forEach(btn => {
    const scrollElem = document.querySelector(`${btn.dataset.toscroll}`);
    if (!scrollElem) return;

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      if (window.innerWidth < 1200) {
        scrollToTop(scrollElem.offsetTop - 20, 500);
      } else {
        scrollToTop(scrollElem.offsetTop, 500);
      }
    })
  })

  window.addEventListener('scroll', function () {
    if (pageYOffset > 100) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.onclick = function (click) {
    click.preventDefault();
    scrollToTop(0, 400);
  }
}

function fullScreenImages() {
  const list = document.querySelectorAll('.section__img');

  list.forEach(item => {
   item.addEventListener('click', () => {
     item.classList.toggle('show');
     document.body.classList.toggle('stop-scroll');
   })
  })
}