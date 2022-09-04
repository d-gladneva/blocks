const textContainer = document.querySelector('.land8_slider-tooltip');
const pageContainer = document.querySelector('.land8_page__box');
let slideIndex = 1;

const slider = () => {

    const sliderBtn = document.querySelector('.land8_slider-btn');
    const slider = document.querySelector('.land8_main-slider');
    const slides = slider.querySelectorAll('.land8_slide');
    let dots = slider.querySelectorAll('.land8_dot-active');
    const renderPage = document.querySelector('.render-page');

    const gallerySlider = {
        showSlides(n) {

            const renderText = () => {
                if (textContainer.hasChildNodes()) {
                    while (textContainer.firstChild) {
                        textContainer.removeChild(textContainer.firstChild);
                    }
                }
                if (slideIndex === 1 || slideIndex === 5)
                    return `<p class="render-text">Создание клуба мечты</p>`;
                if (slideIndex === 2)
                    return `<p class="render-text">Популярные комментаторы</p>`;
                if (slideIndex === 3)
                    return `<p class="render-text">Собственная история побед</p>`;
                if (slideIndex === 4)
                    return `<p class="render-text">Прокачка футболистов</p>`;
            };
            const renderPage = () => {
                if (pageContainer.hasChildNodes()) {
                    while (pageContainer.firstChild) {
                        pageContainer.removeChild(pageContainer.firstChild);
                    }
                }
                if (slideIndex === 1 || slideIndex === 5) {
                    return `<p class="render-page">01</p>`;
                }
                return `<p class="render-page">0${slideIndex}</p>`;
            };

            textContainer.insertAdjacentHTML('beforeEnd', renderText());
            pageContainer.insertAdjacentHTML('beforeEnd', renderPage());

            let i;
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' land8_active', '');
            }
            slides[slideIndex - 1].style.display = 'flex';
            dots[slideIndex - 1].className += ' land8_active';

        },
        nextSlide() {
            this.showSlides((slideIndex += 1));
        },
        currentSlide(n) {
            this.showSlides((slideIndex = n));
        },
        init() {
            this.showSlides(slideIndex);
            // this.autoPlay();
        },

        autoPlay() {
            setInterval(() => {
                this.nextSlide();
            }, 2000);
        },
    };
    gallerySlider.init(slideIndex);

    sliderBtn.addEventListener('click', () => {
        gallerySlider.nextSlide();
    });

    dots.forEach((item, i) => {
        item.addEventListener('click', () => {
            gallerySlider.currentSlide(i + 1);
        });
    });
};

slider();