document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')
    const items = document.querySelectorAll('.item')
    const dots = document.querySelectorAll('.dot')
    const numberIndicator = document.querySelector('.numbers')

    let active = 0;
    const total = items.length
    let timer;

    function update(direction){
        // Remove active class from current item and dot
        const currentActiveItem = document.querySelector('.item.active')
        const currentActiveDot = document.querySelector('.dot.active')
        
        if(currentActiveItem) currentActiveItem.classList.remove('active')
        if(currentActiveDot) currentActiveDot.classList.remove('active')

        if(direction > 0){
            active = active + 1
            if(active === total){
                active = 0
            }
        } else if(direction < 0){
            active = active - 1
            if(active < 0){
                active = total - 1
            }
        }

        // Add active class to new item and dot
        if(items[active]) items[active].classList.add('active')
        if(dots[active]) dots[active].classList.add('active')

        // Update number indicator
        if(numberIndicator) {
            numberIndicator.textContent = String(active + 1).padStart(2,'0')
        }
    }

    // Clear any existing timer
    if(timer) clearInterval(timer)
    
    // Set up auto-rotation
    timer = setInterval(() => {
        update(1)
    }, 5000);

    // Add event listeners
    if(prevButton) {
        prevButton.addEventListener('click', () => {
            clearInterval(timer)
            update(-1)
            timer = setInterval(() => {
                update(1)
            }, 5000);
        })
    }

    if(nextButton) {
        nextButton.addEventListener('click', () => {
            clearInterval(timer)
            update(1)
            timer = setInterval(() => {
                update(1)
            }, 5000);
        })
    }

    // Initialize the carousel
    update(0)
})