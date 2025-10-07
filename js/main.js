/**
 * Se ejecuta cuando el contenido del DOM está completamente cargado.
 * Inicializa todas las funcionalidades de la página.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZADORES ---
    setupDesktopNav();
    setupHeroSlider();
    setupMobileMenu();
    setupFilterModal();
    setupPriceModal();
    setupFilterInteraction();
    setupGlobalEventHandlers();

});

/**
 * Añade la lógica para el indicador de selección en la navegación de escritorio.
 */
function setupDesktopNav() {
    const navLinks = document.querySelectorAll('.header__nav--desktop a');

    if (navLinks.length > 0) {
        // Establece el primer enlace como activo por defecto
        navLinks[0].classList.add('is-active');

        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Previene que la página salte al hacer clic (opcional)
                event.preventDefault(); 
                
                // Quita la clase activa de todos los enlaces
                navLinks.forEach(navLink => navLink.classList.remove('is-active'));
                
                // Añade la clase activa solo al enlace que se ha clicado
                this.classList.add('is-active');
            });
        });
    }
}

/**
 * Configura la lógica y los eventos para el slider de la sección hero.
 */
function setupHeroSlider() {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    const nextButton = document.querySelector('.hero__nav-button--next');
    const prevButton = document.querySelector('.hero__nav-button--prev');

    if (slides.length === 0 || !nextButton || !prevButton) return;

    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        slides[currentSlide].classList.remove('is-active');
        dots[currentSlide].classList.remove('is-active');
        currentSlide = index;
        slides[currentSlide].classList.add('is-active');
        dots[currentSlide].classList.add('is-active');

        // Actualizar textos del hero según el slide actual
        const titleEl = document.querySelector('.hero__title');
        const subtitleEl = document.querySelector('.hero__subtitle');
        const titles = ['Ruta por Australia', 'Ruta por Camboya', 'Ruta por Marruecos'];
        const subtitles = [
            'Si te va la aventura, no te lo puedes perder',
            'Descubre templos y selvas en un viaje inolvidable',
            'Cruza desiertos y mercados en una ruta única'
        ];
        if (titleEl) titleEl.textContent = titles[currentSlide] || titles[0];
        if (subtitleEl) subtitleEl.textContent = subtitles[currentSlide] || subtitles[0];
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    let autoSlide = setInterval(nextSlide, slideInterval);

    function resetInterval() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    }

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.dataset.slide);
            showSlide(slideIndex);
            resetInterval();
        });
    });

    showSlide(0);
}

/**
 * Configura la lógica para abrir y cerrar el menú de navegación móvil.
 */
function setupMobileMenu() {
    const menuButton = document.querySelector('.header__menu-button');
    const mobileNav = document.getElementById('mobile-nav');

    if (!menuButton || !mobileNav) return;

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        const newExpanded = !isExpanded;
        
        menuButton.setAttribute('aria-expanded', newExpanded);
        mobileNav.classList.toggle('is-open');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (newExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Configura la apertura y cierre del panel de filtros.
 */
function setupFilterModal() {
    const openButton = document.getElementById('open-filters-button');
    const panel = document.getElementById('filters-panel');
    if (!openButton || !panel) return;

    const closeButton = panel.querySelector('.filters__close-button');
    if (!closeButton) return;
    
    openButton.addEventListener('click', () => openModal(panel));
    closeButton.addEventListener('click', () => closeModal(panel));
}

/**
 * Configura la apertura y cierre del modal de desglose de precios.
 */
function setupPriceModal() {
    const mainContent = document.querySelector('.main-content');
    const modal = document.getElementById('price-modal');
    if (!mainContent || !modal) return;
    
    const closeButton = modal.querySelector('.modal__close-button');
    if (!closeButton) return;

    mainContent.addEventListener('click', (event) => {
        if (event.target.matches('.card__breakdown-button')) {
            populatePriceModal(event.target);
            openModal(modal);
        }
    });

    closeButton.addEventListener('click', () => closeModal(modal));
}

/**
 * Rellena el modal de precios con la información de la tarjeta correspondiente.
 * @param {HTMLElement} button - El botón "Ver desglose" que fue presionado.
 */
function populatePriceModal(button) {
    const card = button.closest('.card');
    const meta = card.querySelector('.card__meta').textContent;
    const price = card.querySelector('.card__price strong').textContent;
    
    const modalBody = document.getElementById('price-modal').querySelector('.modal__body');
    modalBody.innerHTML = `
        <div class="modal__destination-info">
            <div class="modal__destination">Marruecos, África</div>
            <div class="modal__duration">9 días</div>
        </div>
        <div class="modal__price-details">
            <div class="modal__price-row">
                <span class="modal__price-label">Precio antes de impuestos</span>
                <span class="modal__price-amount">1.124,00 €</span>
            </div>
            <div class="modal__price-row">
                <span class="modal__price-label">Impuesto</span>
                <span class="modal__price-amount">4,43 €</span>
            </div>
            <div class="modal__price-row">
                <span class="modal__price-label">Lorem ipsum</span>
                <span class="modal__price-amount">150,42 €</span>
            </div>
        </div>
        <!-- Línea separadora y precio final para móvil -->
        <div class="modal__mobile-total">
            <div class="modal__separator"></div>
            <div class="modal__price-row modal__price-row--total">
                <span class="modal__price-label modal__price-label--total">Precio final</span>
                <span class="modal__price-amount modal__price-amount--total">2.455,00 €</span>
            </div>
        </div>
    `;
    
    // Actualizar el precio final en el footer
    const modalFooter = document.getElementById('price-modal').querySelector('.modal__footer');
    modalFooter.innerHTML = `
        <span class="modal__total-label">Precio final</span>
        <span class="modal__total-amount">2.455,00 €</span>
    `;
}

/**
 * Añade un listener para detectar cambios en los checkboxes de los filtros.
 */
function setupFilterInteraction() {
    const filterCheckboxes = document.querySelectorAll('.checkbox-list__input');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const filterId = event.target.id;
            const isChecked = event.target.checked;
        });
    });

    // Tooltips simples para iconos de info
    document.querySelectorAll('.checkbox-list__info').forEach((icon) => {
        icon.setAttribute('title', 'Lorem ipsum');
    });

    // Rotación manejada via CSS en details[open]
}

/**
 * Configura manejadores de eventos globales, como la tecla 'Escape' para cerrar modales.
 */
function setupGlobalEventHandlers() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.is-open, .filters.is-open');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });
}

// --- FUNCIONES REUTILIZABLES (Helpers) ---
let lastActiveElement;

function openModal(modalElement) {
    if (!modalElement) return;
    lastActiveElement = document.activeElement;
    modalElement.hidden = false;
    setTimeout(() => {
        modalElement.classList.add('is-open');
        const firstFocusableEl = modalElement.querySelector('button, [href], input, select, textarea');
        if (firstFocusableEl) {
            firstFocusableEl.focus();
        }
        trapFocus(modalElement);
    }, 10);
}

function closeModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.remove('is-open');
    if (lastActiveElement) {
        lastActiveElement.focus();
    }
    setTimeout(() => {
        modalElement.hidden = true;
    }, 300);
}

function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])');
    if (focusableEls.length === 0) return;
    
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
        const isTabPressed = e.key === 'Tab';
        if (!isTabPressed) return;

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
}