//Custom .js

import functions from './give';

const { direction, burger, sliderInit, dropdown } = functions

import '../sass/style-en.sass';


//Calling all functions on load events
window.addEventListener('load', function () {
    direction();
    burger();
    sliderInit();
    dropdown('click');
})