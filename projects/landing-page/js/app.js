/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navs = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu(navs) {
    let menu = document.getElementById('navbar__list');
    navs.forEach(function(nav) {
        let menuItem = document.createElement('li');
        let link = document.createElement("a");
        link.innerText = nav.navText;
        link.href = '#'+nav.navId;
        link.classList.add(nav.navId);
        link.classList.add('menu__link');
        menuItem.appendChild(link);
        menu.appendChild(menuItem);
    });
}


// Add class 'active' to section when near top of viewport
function activateSection(sections) {
    for (const section of sections) {
        
        const box = section.getBoundingClientRect();
        const menuItem = document.getElementsByClassName(section.getAttribute('id'))[0]
        
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add("your-active-class");
            menuItem.classList.add('menu__active')
        } else {
            section.classList.remove("your-active-class");
            menuItem.classList.remove('menu__active')
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    event.preventDefault()
    location.hash = event.target.getAttribute('href');
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.onload = function(){
    const navHome = {
        navText: 'Home',
        navId: 'home'  
    }

    navs.push(navHome);

    [...document.getElementsByTagName('section')].map((section) => {
        let navItem = {
            navText: section.getAttribute('data-nav'),
            navId: section.getAttribute('id')  
        }
        navs.push(navItem)
    })
    
    buildMenu(navs);
}

// Scroll to section on link click
document.getElementById("navbar__list").addEventListener("click", scrollToSection);

// Set sections as active
document.addEventListener("scroll", function() {
    sections = document.getElementsByTagName('section')
    activateSection(sections);
});
