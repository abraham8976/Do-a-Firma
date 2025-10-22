// JavaScript para funcionalidades interactivas
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#FFFFFF';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    document.querySelectorAll('.category-card, .gallery-item, .contact-card, .step').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Efecto parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Contador animado para números (si se agregan estadísticas)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }
    
    // Mensaje de bienvenida personalizado
    function showWelcomeMessage() {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour < 12) {
            greeting = '¡Buenos días!';
        } else if (hour < 18) {
            greeting = '¡Buenas tardes!';
        } else {
            greeting = '¡Buenas noches!';
        }
        
        // Crear y mostrar mensaje de bienvenida
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <div class="welcome-content">
                <span class="welcome-text">${greeting} Bienvenido a Doña Firma</span>
                <button class="close-welcome">&times;</button>
            </div>
        `;
        
        document.body.appendChild(welcomeDiv);
        
        // Mostrar mensaje
        setTimeout(() => {
            welcomeDiv.style.opacity = '1';
            welcomeDiv.style.transform = 'translateY(0)';
        }, 1000);
        
        // Cerrar mensaje
        welcomeDiv.querySelector('.close-welcome').addEventListener('click', function() {
            welcomeDiv.style.opacity = '0';
            welcomeDiv.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                welcomeDiv.remove();
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (welcomeDiv.parentNode) {
                welcomeDiv.style.opacity = '0';
                welcomeDiv.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    welcomeDiv.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Mostrar mensaje de bienvenida
    showWelcomeMessage();
    
    // Efecto de hover mejorado para las tarjetas
    document.querySelectorAll('.category-card, .contact-card, .gallery-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Validación básica para formularios (si se agregan)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                input.style.borderColor = '#4CAF50';
            }
        });
        
        return isValid;
    }
    
    // Efecto de typing para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Inicializar efecto de typing en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Lazy loading para imágenes (cuando se agreguen)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Función para compartir en redes sociales
    function shareOnSocial(platform, url, text) {
        let shareUrl = '';
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);
        
        switch(platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/5498493890219?text=${encodedText}%20${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    // Botón de scroll to top
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createScrollToTopButton();
    
    // Efecto de partículas flotantes (opcional)
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-light);
                border-radius: 50%;
                opacity: 0.3;
                animation: float-particle ${Math.random() * 20 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 20}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Agregar CSS para la animación de partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Crear partículas flotantes
    createFloatingParticles();
    
    console.log('🍪 Doña Firma - Página web cargada correctamente!');
});

// Chatbot Functions
let chatbotOpen = false;
let conversationHistory = [];

// Base de conocimiento del chatbot
const chatbotResponses = {
    'productos': {
        message: '¡Perfecto! 🍪 Tenemos una gran variedad de productos caseros:\n\n• **Bizcochitos**: Vainilla, chocolate, limón\n• **Galletitas**: Manteca, avena, chocolate\n• **Comidas**: Pastel de carne, empanadas, milanesas\n• **Postres**: Flan casero, tortas, alfajores\n\n¿Te interesa algún producto específico?',
        actions: ['Ver más detalles', 'Hacer pedido', 'Consultar precios'],
        notifyOwner: false
    },
    'pedido': {
        message: '¡Perfecto! 📝 Veo que quieres hacer un pedido. Te voy a conectar directamente con Doña Firma para que puedan ayudarte personalmente.\n\n⏳ Un momento, estoy notificando a Doña Firma...',
        actions: ['Ver productos', 'Consultar precios', 'Horarios de entrega'],
        notifyOwner: true,
        priority: 'high'
    },
    'precios': {
        message: '💰 Los precios varían según el producto y cantidad. Te doy algunos ejemplos:\n\n• **Bizcochitos**: Desde $800 la docena\n• **Galletitas**: Desde $600 la docena\n• **Empanadas**: $200 c/u\n• **Tortas**: Desde $3000\n\nPara precios exactos, contactanos por WhatsApp: +1 809 323 8586',
        actions: ['Hacer pedido', 'Ver productos', 'Contactar'],
        notifyOwner: false
    },
    'horarios': {
        message: '🕒 **Horarios de atención:**\n\n• **Lunes a Sábado**: 9:00 - 18:00\n• **Domingos**: 10:00 - 15:00\n\n**Horarios de entrega:**\n• Zona CABA y GBA\n• Consultá por tu zona específica\n\n¿Necesitas hacer un pedido?',
        actions: ['Hacer pedido', 'Ver productos', 'Contactar'],
        notifyOwner: false
    },
    'contacto': {
        message: '📞 **Formas de contactarnos:**\n\n• **WhatsApp**: +1 809 323 8586\n• **Teléfono**: +1 809 323 8586\n• **Email**: donafirma@gmail.com\n• **Zona**: CABA y GBA\n\n¡Estamos aquí para ayudarte! 😊',
        actions: ['Hacer pedido', 'Ver productos', 'Consultar precios'],
        notifyOwner: false
    },
    'consulta_especifica': {
        message: '🤔 Veo que tienes una consulta específica. Te voy a conectar con Doña Firma para que puedan ayudarte de manera personalizada.\n\n⏳ Un momento, estoy notificando a Doña Firma...',
        actions: ['Ver productos', 'Hacer pedido', 'Consultar precios'],
        notifyOwner: true,
        priority: 'medium'
    },
    'default': {
        message: 'Hola! 😊 Soy el asistente de Doña Firma. Puedo ayudarte con:\n\n• Ver nuestros productos\n• Hacer un pedido\n• Consultar precios\n• Horarios de atención\n• Información de contacto\n\n¿En qué puedo ayudarte?',
        actions: ['Ver productos', 'Hacer pedido', 'Consultar precios', 'Horarios'],
        notifyOwner: false
    }
};

// Función para abrir/cerrar el chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    const notification = document.querySelector('.chatbot-notification');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbot.classList.add('active');
        toggle.style.display = 'none';
        if (notification) {
            notification.style.display = 'none';
        }
    } else {
        chatbot.classList.remove('active');
        toggle.style.display = 'flex';
    }
}

// Función para enviar mensaje del usuario
function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message) {
        addUserMessage(message);
        input.value = '';
        
        // Simular delay de respuesta
        setTimeout(() => {
            const response = getChatbotResponse(message);
            addBotMessage(response.message);
            
            // Si la respuesta requiere notificar al dueño
            if (response.notifyOwner) {
                notifyOwner(message, response.priority || 'medium');
            }
        }, 1000);
    }
}

// Función para manejar tecla Enter
function handleChatbotKeypress(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

// Función para respuestas rápidas
function quickResponse(type) {
    const response = chatbotResponses[type] || chatbotResponses['default'];
    addBotMessage(response.message);
    
    // Si la respuesta requiere notificar al dueño
    if (response.notifyOwner) {
        notifyOwner(`Consulta rápida: ${type}`, response.priority || 'medium');
    }
}

// Función para obtener respuesta del chatbot
function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Detectar intención del usuario
    if (message.includes('producto') || message.includes('bizcochito') || message.includes('galletita') || message.includes('comida') || message.includes('postre')) {
        return chatbotResponses['productos'];
    } else if (message.includes('pedido') || message.includes('pedir') || message.includes('comprar') || message.includes('ordenar') || message.includes('quiero') || message.includes('necesito')) {
        return chatbotResponses['pedido'];
    } else if (message.includes('precio') || message.includes('costo') || message.includes('cuanto') || message.includes('valor')) {
        return chatbotResponses['precios'];
    } else if (message.includes('hora') || message.includes('horario') || message.includes('cuando') || message.includes('disponible')) {
        return chatbotResponses['horarios'];
    } else if (message.includes('contacto') || message.includes('telefono') || message.includes('whatsapp') || message.includes('llamar')) {
        return chatbotResponses['contacto'];
    } else if (message.includes('hola') || message.includes('buenas') || message.includes('buenos')) {
        return {
            message: '¡Hola! 👋 ¡Qué gusto verte por aquí! Soy el asistente de Doña Firma. ¿En qué puedo ayudarte hoy?',
            actions: ['Ver productos', 'Hacer pedido', 'Consultar precios'],
            notifyOwner: false
        };
    } else if (message.includes('gracias') || message.includes('muchas gracias')) {
        return {
            message: '¡De nada! 😊 Es un placer ayudarte. ¿Hay algo más en lo que pueda asistirte?',
            actions: ['Ver productos', 'Hacer pedido', 'Contactar'],
            notifyOwner: false
        };
    } else {
        // Si no es una consulta básica, notificar al dueño
        return chatbotResponses['consulta_especifica'];
    }
}

// Función para agregar mensaje del usuario
function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Función para agregar mensaje del bot
function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Mostrar indicador de escritura
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
    
    // Reemplazar con mensaje real después de un delay
    setTimeout(() => {
        typingDiv.remove();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }, 1500);
}

// Función para hacer scroll al final
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para notificar al dueño
function notifyOwner(userMessage, priority = 'medium') {
    // Mostrar mensaje al cliente con el número de Doña Firma
    const clientMessage = `📱 **Contacta directamente a Doña Firma:**
    
**WhatsApp**: +1 809 323 8586
**Teléfono**: +1 809 323 8586

¡Ella te atenderá personalmente! 😊`;
    
    // Agregar mensaje al chatbot
    setTimeout(() => {
        addBotMessage(clientMessage);
    }, 2000);
    
    // NO abrir WhatsApp automáticamente - solo mostrar notificación visual
    showNotificationToOwner(priority);
    
    console.log('🚨 Cliente dirigido a contactar a Doña Firma:', userMessage);
}

// Función para mostrar notificación visual al dueño
function showNotificationToOwner(priority) {
    // Crear notificación visual
    const notification = document.createElement('div');
    notification.className = 'owner-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-bell"></i>
            </div>
            <div class="notification-text">
                <h4>¡Nueva consulta!</h4>
                <p>Un cliente necesita atención personalizada</p>
                <small>Prioridad: ${priority === 'high' ? 'ALTA' : 'MEDIA'}</small>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${priority === 'high' ? '#ff4444' : '#ff9800'};
        color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 10 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Mostrar notificación del chatbot después de 3 segundos
setTimeout(() => {
    const notification = document.querySelector('.chatbot-notification');
    if (notification) {
        notification.style.display = 'flex';
    }
}, 3000);
