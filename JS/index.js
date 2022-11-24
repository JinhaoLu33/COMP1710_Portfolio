// using gsap to build the logo animation

// customize the timelines
// control the animation base on how much of the screen has been scrolled down
// creating two timelines to make sure the two animation start at the same time

// timeline for the smaller logo"portfolio"
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.startPage', //start animating at the start page
        start: '0%',
        end: '70%',
        scrub: 1,
    },
});

// timeline for the smaller logo"Jinhao Lu"
let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.startPage',
        start: '0%',
        end: '70%', //end at 70% to avoid the clash between the logo and the second page
        scrub: 1,
    },
});

// make sure the navbar sticked int the same position during scrolling
let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: '.startPage',
        start: '0%',
        end: '500%',
        scrub: 1,
        pin:true,
        pinSpacing: false,//let the second page moving up during the animation
    },
});

let tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro',
        start: '88%',
        end: '100%',
        scrub: 1,
    },
});





// assign animation to the timeline
//use fromTo to set both starting position and end position

//moving the "portfolio"logo off the screen
tl.fromTo(".flying-logo", {y: 0}, {y: -200});

//move the "Jinhao Lu" logo to the top left corner and replace the old one
tl2.fromTo(".logo", {scale: 5}, {scale: 1, top: "0.5rem", left: "2rem", x: "50%", y: "50%"});
tl4.fromTo("nav",{background: "transparent"},{background: "#777777"});
tl4.fromTo(".startPage",{height:"100vh"},{height:"10vh"});


