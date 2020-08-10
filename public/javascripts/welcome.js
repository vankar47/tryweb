const hero = document.querySelector('.hero');
const slider = document.querySelector('.slider');
const logo = document.querySelector('.logo');
const titlee = document.querySelector('.titlee');
const headline = document.querySelector('.headline');

const tl = new TimelineMax();

tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut })
    .fromTo(hero, 1.2, { width: "100%" }, { width: "80%", ease: Power2.easeInOut })
    .fromTo(slider, 1.2, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut },"-=1.2")
    .fromTo(titlee, 0.8, { x: 30,opacity:0 }, { x:0,opacity:1, ease: Power2.easeInOut },"-=0.8")
    .fromTo(logo, 0.8, { x: 30,opacity:0 }, { x:0,opacity:1, ease: Power2.easeInOut },"-=0.8")
    .fromTo(headline, 0.8, { x: 30,opacity:0 }, { x:0,opacity:1, ease: Power2.easeInOut },"-=0.8");
