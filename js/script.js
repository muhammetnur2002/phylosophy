// Анимация появления при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для счетчиков на главной странице
    const timerNumbers = document.querySelectorAll('.timer-number');
    
    if (timerNumbers.length > 0) {
        timerNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    number.textContent = target;
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
    
    // Анимация для кнопки принятия клятвы
    const pledgeBtn = document.getElementById('pledge-btn');
    const pledgeConfirmation = document.getElementById('pledge-confirmation');
    
    if (pledgeBtn && pledgeConfirmation) {
        pledgeBtn.addEventListener('click', function() {
            pledgeConfirmation.classList.add('show');
            pledgeBtn.style.display = 'none';
            
            // Анимация появления
            setTimeout(() => {
                pledgeConfirmation.style.opacity = '1';
                pledgeConfirmation.style.transform = 'translateY(0)';
            }, 10);
            
            // Добавляем визуальный эффект
            const pledgeText = document.getElementById('pledge-text');
            pledgeText.style.animation = 'none';
            setTimeout(() => {
                pledgeText.style.animation = 'text-pulse 3s infinite';
            }, 10);
        });
    }
    
    // Управление видео фоном
    const videoToggle = document.getElementById('video-toggle');
    const videoSound = document.getElementById('video-sound');
    const videoElement = document.querySelector('.video-bg video');
    
    if (videoToggle && videoElement) {
        videoToggle.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play();
                videoToggle.innerHTML = '<i class="fas fa-pause"></i> Пауза видео';
            } else {
                videoElement.pause();
                videoToggle.innerHTML = '<i class="fas fa-play"></i> Воспроизвести';
            }
        });
    }
    
    if (videoSound && videoElement) {
        videoSound.addEventListener('click', function() {
            if (videoElement.muted) {
                videoElement.muted = false;
                videoSound.innerHTML = '<i class="fas fa-volume-up"></i> Выкл. звук';
            } else {
                videoElement.muted = true;
                videoSound.innerHTML = '<i class="fas fa-volume-mute"></i> Вкл. звук';
            }
        });
    }
    
    // Анимация для карточек при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Добавляем дополнительную анимацию для элементов с задержкой
                if (entry.target.classList.contains('aspect-card') || 
                    entry.target.classList.contains('solution-card') ||
                    entry.target.classList.contains('plan-step')) {
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с анимацией
    const animatedElements = document.querySelectorAll('.aspect-card, .aspect-detail-card, .solution-card, .plan-step, .timer-item, .future-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
            navToggle.style.transition = 'transform 0.3s ease';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.style.transform = 'rotate(0)';
            });
        });
    }
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, является ли ссылка якорем (начинается с #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
            // Если это обычная ссылка на страницу, не перехватываем
        });
    });
    
    // Эффект параллакса для элементов при прокрутке
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Параллакс для статуй
        const statues = document.querySelectorAll('.statue');
        statues.forEach((statue, index) => {
            const speed = index === 0 ? 0.1 : 0.15;
            statue.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Параллакс для листьев
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            const speed = 0.05 * (index + 1);
            leaf.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Эффект при наведении на карточки аспектов
    const aspectCards = document.querySelectorAll('.aspect-card');
    aspectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.aspect-icon i');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.aspect-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
    
    // Добавляем случайную анимацию для элементов природы
    setInterval(() => {
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach(leaf => {
            if (Math.random() > 0.7) {
                leaf.style.transform = `translateY(${Math.random() * 10}px) rotate(${Math.random() * 10}deg)`;
            }
        });
    }, 3000);
});
