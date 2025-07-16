// simple-slider.js
// A simple product card slider with bullet point navigation
const slider = document.querySelector('.product-slider');
const navDots = document.querySelectorAll('.nav-dot');
const cards = document.querySelectorAll('.product-card');

// --- Navigation by clicking the dots ---
navDots.forEach(dot => {
    dot.addEventListener('click', (event) => {
    const index = event.target.dataset.index;
    // Use scrollIntoView, which is designed to work with scroll-snap
    cards[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    });
});

// --- Update the active dot using IntersectionObserver ---
const observerOptions = {
    root: slider,
    rootMargin: '0px',
    threshold: 0.7 // A high threshold ensures it only triggers when the card is mostly in view
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeIndex = entry.target.dataset.cardIndex;
                    
                // Remove active class from all dots
                navDots.forEach(dot => dot.classList.remove('active'));
                    
                // Add active class to the current dot
                if (navDots[activeIndex]) {
                        navDots[activeIndex].classList.add('active');
                }
            }
    });
}, observerOptions);

// Tell the observer to watch each card
cards.forEach(card => {
    observer.observe(card);
});
        
// On initial load, set the first dot as active
if (navDots.length > 0) {
    navDots[0].classList.add('active');
}
