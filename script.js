document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.display = 'none';
    });


// Agrega esto al inicio de tu archivo JavaScript
window.onload = function() {
    // Forzar scroll al inicio cuando la página se carga
    window.scrollTo(0, 0);
    
    // También puedes usar smooth scroll para un efecto más suave
    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    // });
};

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close Mobile Menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Project Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialsSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimonialsSlider.offsetLeft;
        scrollLeft = testimonialsSlider.scrollLeft;
    });

    testimonialsSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    testimonialsSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    testimonialsSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsSlider.scrollLeft = scrollLeft - walk;
    });

    // Clients Slider (Autoplay)
    const clientsSlider = document.querySelector('.clients-slider');
    let clientScrollInterval;
    
    function startClientSlider() {
        clientScrollInterval = setInterval(() => {
            if (clientsSlider.scrollLeft + clientsSlider.clientWidth >= clientsSlider.scrollWidth) {
                clientsSlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                clientsSlider.scrollBy({
                    left: 150,
                    behavior: 'smooth'
                });
            }
        }, 3000);
    }
    
    startClientSlider();
    
    // Pause slider on hover
    clientsSlider.addEventListener('mouseenter', () => {
        clearInterval(clientScrollInterval);
    });
    
    clientsSlider.addEventListener('mouseleave', startClientSlider);

    // Scroll Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for Stats Animation
    const statsSection = document.querySelector('.stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);

    // Contact Form Submission
    const contactForm = document.getElementById('formContacto');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form data:', data);
            
            // Show success message
            alert('Gracias por su mensaje. Nos pondremos en contacto con usted pronto.');
            
            // Reset form
            this.reset();
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('formNewsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Gracias por suscribirse a nuestro boletín.');
            
            // Reset form
            this.reset();
        });
    }

    // Hero Banner Parallax Effect
    const hero = document.querySelector('.hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    window.addEventListener('scroll', function() {
        const scrollValue = window.scrollY;
        hero.style.backgroundPositionY = scrollValue * 0.5 + 'px';
        heroOverlay.style.opacity = 1 - (scrollValue / 500);
    });

    // Initialize Google Maps (you would need to add your API key)
    function initMap() {
        // This is just a placeholder - you would need to implement actual Google Maps integration
        console.log('Google Maps would be initialized here with your API key');
    }
    
    // Call the initMap function when the window loads
    window.initMap = initMap;
});

// Modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Verifica si hay un tema guardado en localStorage
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
}

// Escucha el cambio en el interruptor
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Asegúrate de que el interruptor esté en la posición correcta al cargar
document.addEventListener('DOMContentLoaded', function() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeToggle.checked = true;
    }
});