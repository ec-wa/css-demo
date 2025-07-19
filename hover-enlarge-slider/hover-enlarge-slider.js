// Product Slider + Hover Enlarge with Navigation
const slider = document.querySelector('.product-slider');
const navDots = document.querySelectorAll('.nav-dot');
const cards = document.querySelectorAll('.product-card');

// Navigation by clicking the dots
navDots.forEach(dot => {
  dot.addEventListener('click', (event) => {
    const index = event.target.dataset.index;
    const targetCard = cards[index];

    // Calculate the position to scroll to
    // The offsetLeft of the card is its distance from the start of the scrollable container
    const scrollPosition = targetCard.offsetLeft;

    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  });
});

// Update the active dot as the user scrolls
function updateActiveDot() {
  const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;

    // A small buffer zone to make detection smoother
    const buffer = card.offsetWidth / 2;
    if (cardCenter > (sliderCenter - buffer) && cardCenter < (sliderCenter + buffer)) {
      navDots.forEach(dot => dot.classList.remove('active'));
      navDots[index].classList.add('active');
    }
  });
}

// Initial call and event listener for scrolling
updateActiveDot();
slider.addEventListener('scroll', updateActiveDot);
