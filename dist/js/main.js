"use strict";


let menuBar = document.querySelector('.menu-bars');

// let navDisplay = document.querySelector('.navigation').style.display;

let navDisplay = document.querySelector('.navigation');

navDisplay.style.display = "none";


menuBar.addEventListener('click', function () {

    // alert('clicked');



    if (navDisplay.style.display === "none") {
        navDisplay.style.display = "block";
    } else {
        navDisplay.style.display = "none";
    }


});