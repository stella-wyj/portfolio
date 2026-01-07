// -------- hello language change animation ---------- //
// introduction section animation
const textElement = document.getElementById("intro");

const intro1 = "Hi👋!  I'm Stella.";
const intro2 = "您好👋!  我的名字是Stella。";
let showing = true;

function flipText(text) {
    textElement.innerHTML = '';

    const chars = Array.from(text);

    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.07}s`;
        textElement.appendChild(span);
    });
}
// call animation
flipText(intro1);
// swtich between en cn 
setTimeout(() => {
    showing = !showing;
    flipText(showing ? intro1 : intro2);

    setInterval(() => {
        showing = !showing;
        flipText(showing ? intro1 : intro2);
    }, 7000);
}, 4000);

// fade out the intro sectiom when scrolling to next section
const introContainer = document.querySelector('.intro-container');
const contentSection = document.querySelector('.content-section1');


// -------------- about me section ------------- //
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const introSectionHeight = document.querySelector('.intro-section').offsetHeight;

    // fade starts at 40% of intro section, fully faded at 80%
    const fadeStart = introSectionHeight * 0.4;
    const fadeEnd = introSectionHeight * 0.8;

    let opacity = 1;
    if (scrollPosition > fadeStart) {
        const fadeProgress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        opacity = Math.max(0, 0.6 - fadeProgress);
    }

    introContainer.style.opacity = opacity;
});


//---------------------- have the sections slide in animation ------------------------ //

// Scroll-based slide-in animations
const slideLeftElements = document.querySelectorAll('.tech, .others1, .location');
const slideRightElements = document.querySelectorAll('.skills, .code-section, .others2');

function handleScrollSlide() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Slide in from left
    slideLeftElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + scrollY;
        const elementHeight = element.offsetHeight;
        
        // Start animation when element is about to enter viewport
        const triggerPoint = elementTop - windowHeight*1.5;
        const endPoint = elementTop - windowHeight*0.5;
        
        if (scrollY > triggerPoint && scrollY < endPoint + elementHeight) {
            // Calculate progress (0 to 1)
            const progress = Math.min(Math.max((scrollY - triggerPoint) / (endPoint - triggerPoint), 0), 1);
            
            // Ease out function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            // Slide from -100% to 0%
            const translateX = -100 + (easeProgress * 100);
            const opacity = easeProgress;
            
            element.style.transform = `translateX(${translateX}%)`;
            element.style.opacity = opacity;
        } else if (scrollY >= endPoint + elementHeight) {
            // Fully visible
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        } else {
            // Not yet visible
            element.style.transform = 'translateX(-100%)';
            element.style.opacity = '0';
        }
    });

    // Slide in from right
    slideRightElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + scrollY;
        const elementHeight = element.offsetHeight;
        
        const triggerPoint = elementTop - windowHeight*1.6;
        const endPoint = elementTop - windowHeight*0.5;
        
        if (scrollY > triggerPoint && scrollY < endPoint + elementHeight) {
            const progress = Math.min(Math.max((scrollY - triggerPoint) / (endPoint - triggerPoint), 0), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            // Slide from 100% to 0%
            const translateX = 100 - (easeProgress * 100);
            const opacity = easeProgress;
            
            element.style.transform = `translateX(${translateX}%)`;
            element.style.opacity = opacity;
        } else if (scrollY >= endPoint + elementHeight) {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        } else {
            element.style.transform = 'translateX(100%)';
            element.style.opacity = '0';
        }
    });
}
handleScrollSlide();
window.addEventListener('scroll', handleScrollSlide);

// ------------------ the code snippet upload, i have it in a separate txt file ---------- //
// its not working rn idk why ill figure out later

fetch('./resources/code-snippet.txt')
    .then(response => response.text())
    .then(code => {
        const codeDisplay = document.getElementById('code-display');
        codeDisplay.innerText = code;
        Prism.highlightElement(codeDisplay);
    })
    .catch(error => console.error('Error loading code file:', error));


//----------------------------- timeline fill ------------------------------- //



// ---------------------------------- PROJECT SETCION -------------------------------------- //
const projectBoxes = document.querySelectorAll('.project-box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentProject = 0;

function showProject(index) {
    // Remove all classes
    projectBoxes.forEach(box => {
        box.classList.remove('active', 'prev');
    });

    // Add active class to current project
    projectBoxes[index].classList.add('active');
    
    currentProject = index;
}

function nextProject() {
    let next = (currentProject + 1) % projectBoxes.length;
    projectBoxes[currentProject].classList.add('prev');
    showProject(next);
}

function prevProject() {
    let prev = (currentProject - 1 + projectBoxes.length) % projectBoxes.length;
    projectBoxes[currentProject].classList.remove('active');
    projectBoxes[currentProject].classList.add('prev');
    showProject(prev);
}

// Event listeners
nextBtn.addEventListener('click', nextProject);
prevBtn.addEventListener('click', prevProject);

showProject(0);