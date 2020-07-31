//Big object for all js work
export default {
    direction() {
        var doc = document.documentElement;
        var docLang = doc.getAttribute('lang');
        if (docLang == 'en') {
            doc.setAttribute('dir', 'ltr');
        } else {
            doc.setAttribute('dir', 'rtl');
        }
    },
    //burger
    burger() {
        var trigger = document.getElementsByClassName('header-burger');
        var triggerWrap = [];

        for (var i = 0; i < trigger.length; i++) {
            triggerWrap.push(trigger[i]);
        }

        triggerWrap.forEach(function (item) {
            var parentTrigger = item.parentNode;
            var NextOfTrigger = parentTrigger.nextElementSibling;
            var state = false;
            item.onclick = function () {

                if (!state) {
                    state = true;
                    NextOfTrigger.style.height = NextOfTrigger.scrollHeight + 'px';
                    parentTrigger.classList.add('active');
                } else {
                    state = false;
                    NextOfTrigger.style.height = 0 + 'px';
                    parentTrigger.classList.remove('active');
                }
            }
        })
    },

    //slider
    sliderInit() {
        //ingradients
        var sliderNext = document.getElementsByClassName('slider-next');
        var sliderPrev = document.getElementsByClassName('slider-prev');
        var sliderAuto = document.querySelectorAll('[slider-auto]');
        var sliderIndicator = document.getElementsByClassName('slider-indicator-wrap')
        var sliderNextWrap = [];
        var sliderPrevWrap = [];
        var sliderIndexWrap = [];
        var sliderAutoWrap = [];
        var sliderIndicatorWrap = [];
        var autoSlideState;




        //instructions

        //Pushing
        for (var i = 0; i < sliderNext.length; i++) {
            sliderNextWrap.push(sliderNext[i]);
            sliderPrevWrap.push(sliderPrev[i]);
            sliderAutoWrap.push(sliderAuto[i]);
            sliderIndexWrap.push(0);
            sliderIndicatorWrap.push(sliderIndicator[i])
        }



        var autoSlideInterval = function (item, index, array) {

            var interval = 5000;
            autoSlideState = true

            if (item) {
                var parent = item.children[1];
                var slides = parent.children;
                var indicators = parent.nextElementSibling
                item.onmouseover = function () {
                    autoSlideState = false
                }
                item.onmouseout = function () {
                    autoSlideState = true
                }
            }



            cc()

            function cc() {

                var timer = setInterval(function () {
                    if (autoSlideState && item) {
                        if (sliderIndexWrap[index] === slides.length - 1) {
                            sliderIndexWrap[index] = 0
                            parent.style.left = '-' + (sliderIndexWrap[index] * 100) + '%';
                            if (indicators) {
                                for (var i = 0; i < indicators.children.length; i++) {
                                    indicators.children[i].classList.remove('active')
                                }
                                indicators.children[sliderIndexWrap[index]].classList.add('active')
                            }
                        } else {
                            sliderIndexWrap[index]++
                            parent.style.left = '-' + (sliderIndexWrap[index] * 100) + '%';
                            if (indicators) {
                                for (var i = 0; i < indicators.children.length; i++) {
                                    indicators.children[i].classList.remove('active')
                                }
                                indicators.children[sliderIndexWrap[index]].classList.add('active')
                            }
                        }
                    }
                }, interval)

            }


        }

        var nextCallback = function (item, index, array) {
            var parent = item.parentNode;
            var sibling = parent.nextElementSibling;
            var slides = parent.nextElementSibling.children;
            var indicators = sibling.nextElementSibling
            item.addEventListener('click', function () {
                if (sliderIndexWrap[index] === slides.length - 1) {
                    sliderIndexWrap[index] = 0
                    sibling.style.left = '-' + (sliderIndexWrap[index] * 100) + '%';
                    if (indicators) {
                        for (var i = 0; i < indicators.children.length; i++) {
                            indicators.children[i].classList.remove('active')
                        }
                        indicators.children[sliderIndexWrap[index]].classList.add('active')
                    }
                } else {
                    sliderIndexWrap[index]++
                    sibling.style.left = '-' + (sliderIndexWrap[index] * 100) + '%';
                    if (indicators) {
                        for (var i = 0; i < indicators.children.length; i++) {
                            indicators.children[i].classList.remove('active')
                        }
                        indicators.children[sliderIndexWrap[index]].classList.add('active')
                    }
                }

            })

        }

        var prevCallback = function (item, index, array) {
            var parent = item.parentNode
            var sibling = parent.nextElementSibling
            var slides = parent.nextElementSibling.children
            var indicators = sibling.nextElementSibling
            item.addEventListener('click', function () {
                if (sliderIndexWrap[index] === 0) {
                    sliderIndexWrap[index] = slides.length - 1;
                    sibling.style.left = '-' + (sliderIndexWrap[index] * 100) + '%'
                    if (indicators) {
                        for (var i = 0; i < indicators.children.length; i++) {
                            indicators.children[i].classList.remove('active')
                        }
                        indicators.children[sliderIndexWrap[index]].classList.add('active')
                    }

                } else {
                    sliderIndexWrap[index]--;
                    sibling.style.left = '-' + (sliderIndexWrap[index] * 100) + '%';
                    if (indicators) {
                        for (var i = 0; i < indicators.children.length; i++) {
                            indicators.children[i].classList.remove('active')
                        }
                        indicators.children[sliderIndexWrap[index]].classList.add('active')
                    }
                }
            })

        }

        var itemChildrenCallback = function (e, c, d) {
            if (e) {
                var sibling = e.parentNode.previousElementSibling
                var slides = sibling.children.length
            }
            e.onclick = function () {
                for (var i = 0; i < d.length; i++) {
                    d[i].classList.remove('active')

                }
                e.classList.add('active')

                sibling.style.left = '-' + (c * 100) + '%';
            }
        }

        var indiCallback = function (item, index, array) {
            var itemChildrenWrap = []
            if (item) {

                for (var i = 0; i < item.children.length; i++) {
                    itemChildrenWrap.push(item.children[i])
                }

                itemChildrenWrap.forEach(itemChildrenCallback)
            }

        }


        sliderNextWrap.forEach(nextCallback)
        sliderPrevWrap.forEach(prevCallback)
        sliderAutoWrap.forEach(autoSlideInterval)
        sliderIndicatorWrap.forEach(indiCallback)


    },

    dropdown(type) {
        var trigger = document.getElementsByClassName('header-dropdown');
        var triggerWrap = [];

        for (var i = 0; i < trigger.length; i++) {
            triggerWrap.push(trigger[i]);
        }
        triggerWrap.forEach(function (item) {
            console.log(item)
            item.children[0].addEventListener(type, function (e) {
                e.preventDefault()
            })
            item.addEventListener(type, function (e) {

                if (item.className == "header-dropdown") {
                    item.classList.add('active');
                } else if (item.className == "header-dropdown active") {
                    item.classList.remove('active');
                }
                item.parentNode.parentNode.style.height = 'auto';// for responsive
            })
            document.body.addEventListener(type, function () {
                item.classList.remove('active');
            }, true)

        })
    },

    //Dom Manipulation
    addClass(item, className) {
        var el = document.querySelector(item);
        el.className += ' ' + className;
    },
    removeClass(item, className) {
        var el = document.querySelector(item);
        el.classList.remove(className);
    },
    append(item, txt) {
        var el = document.querySelector(item);
        el.innerHTML += txt;
    },
    before(item, target) {
        var el = document.querySelector(item);
        var parentEl = el.parentNode;
        var tgt = document.querySelector(target);
        parentEl.insertBefore(el, tgt);
    },
    create(item, parent) {
        var parentEl = document.querySelector(parent);
        var newEl = document.createElement(item);
        parentEl.appendChild(newEl);
    }
}

