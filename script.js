// Countdown Timer
const targetDate = new Date("October 17, 2026 17:30:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<h3>¡El día ha llegado!</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Form Submission to WhatsApp
const rsvpForm = document.getElementById('rsvp-form');
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const guests = document.getElementById('guests').value;
    
    // WhatsApp contact number (Mariana's RSVP)
    const whatsappNumber = "15618914552";
    
    const message = `¡Hola! Confirmo mi asistencia a los 15 años de Mariana.\n\n` +
                    `*Nombre:* ${name}\n` +
                    `*Teléfono:* ${phone}\n` +
                    `*Acompañantes:* ${guests}\n\n` +
                    `¡Nos vemos pronto!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

// Scroll Reveal Animation (Simple implementation)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('gallery-item-magic')) {
                // Staggered effect for items in the same grid
                setTimeout(() => {
                    entry.target.classList.add('reveal-magic');
                }, 100);
            } else {
                entry.target.classList.add('reveal');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.details-card, .timeline-item, .dress-code-container, .dress-content-left, .dress-content-right').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

document.querySelectorAll('.gallery-item-magic').forEach(el => {
    observer.observe(el);
});

// Adding reveal class style dynamically
const style = document.createElement('style');
style.innerHTML = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .butterfly-container {
        position: fixed;
        z-index: 1000;
        pointer-events: none;
        animation: fly linear infinite;
        will-change: transform;
    }

    .butterfly {
        width: 35px;
        height: 35px;
        background-image: url('butterfly.svg');
        background-size: contain;
        background-repeat: no-repeat;
        animation: flap 0.4s ease-in-out infinite;
        opacity: 0.9;
        filter: drop-shadow(0 0 8px rgba(244, 207, 223, 1));
    }

    @keyframes fly {
        0% { transform: translate(0, 0) rotate(-10deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(calc(var(--target-x) * 1px), calc(var(--target-y) * 1px)) rotate(10deg); opacity: 0; }
    }

    @keyframes flap {
        0%, 100% { transform: scaleX(1); }
        50% { transform: scaleX(0.2); }
    }
`;
document.head.appendChild(style);

function createButterflies() {
    const butterflyCount = 50; 
    for(let i=0; i<butterflyCount; i++) {
        spawnButterfly(true);
    }
}

function spawnButterfly(isInitial = false) {
    const container = document.createElement('div');
    container.className = 'butterfly-container';
    
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    
    // Add random size variation
    const scale = 0.5 + Math.random() * 1.5;
    butterfly.style.transform = `scale(${scale})`;
    
    container.appendChild(butterfly);
    
    // Choose a side to start from (left, right, top, bottom)
    const side = Math.floor(Math.random() * 4);
    let startX, startY, endX, endY;
    
    if (side === 0) { // Left
        startX = -100; startY = Math.random() * window.innerHeight;
        endX = window.innerWidth + 500; endY = startY + (Math.random() - 0.5) * 1000;
    } else if (side === 1) { // Right
        startX = window.innerWidth + 100; startY = Math.random() * window.innerHeight;
        endX = -500; endY = startY + (Math.random() - 0.5) * 1000;
    } else if (side === 2) { // Top
        startX = Math.random() * window.innerWidth; startY = -100;
        endX = startX + (Math.random() - 0.5) * 1000; endY = window.innerHeight + 500;
    } else { // Bottom
        startX = Math.random() * window.innerWidth; startY = window.innerHeight + 100;
        endX = startX + (Math.random() - 0.5) * 1000; endY = -500;
    }
    
    const targetX = endX - startX;
    const targetY = endY - startY;
    
    container.style.left = startX + 'px';
    container.style.top = startY + 'px';
    container.style.setProperty('--target-x', targetX);
    container.style.setProperty('--target-y', targetY);
    
    const duration = 12 + Math.random() * 25;
    const delay = isInitial ? Math.random() * 20 : 0;
    
    container.style.animationDuration = duration + 's';
    if(isInitial) container.style.animationDelay = delay + 's';
    
    document.body.appendChild(container);
    
    setTimeout(() => {
        container.remove();
        spawnButterfly(false);
    }, (duration + (isInitial ? delay : 0)) * 1000);
}

createButterflies();
