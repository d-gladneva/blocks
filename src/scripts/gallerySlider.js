const sliderGallery = () => {
    let slideIndex = 0;
    const nextBtn = document.querySelector('.gallery-slider .next');
    const prevBtn = document.querySelector('.gallery-slider .prev');
    const slider = document.querySelector('.gallery-slider');
    const slides = slider.querySelectorAll('.slide');

    let dots = slider.querySelectorAll('.gallery-slider__dots-item');

    const gallerySlider = {
        showSlides(n) {
            let i;
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.transform = 'translate(23px, 10px)';
                // slides[slideIndex - 1].style.transform = 'translate(50px, 10px)';
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            // slides[slideIndex - 1].style.display = 'block';
            slides[slideIndex - 1].style.transform = 'translate(50px, 80px)';
            slides[slideIndex - 1].style.transition='transform 0.6s ease';
            slides[slideIndex - 2].style.transform = 'translate(100px, 80px)';
            slides[slideIndex - 2].style.transition='transform 0.6s ease';
            slides[slideIndex - 3].style.transform = 'translate(50px, 80px)';
            slides[slideIndex - 3].style.transition='transform 0.6s ease';
            dots[slideIndex - 1].className += ' active';
        },
        nextSlide() {
            this.showSlides((slideIndex += 1));
        },
        prevSlide() {
            this.showSlides((slideIndex -= 1));
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

    nextBtn.addEventListener('click', () => {
        gallerySlider.nextSlide();
    });
    prevBtn.addEventListener('click', () => {
        gallerySlider.prevSlide();
    });
    dots.forEach((item, i) => {
        item.addEventListener('click', () => {
            gallerySlider.currentSlide(i + 1);
        });
    });
};

sliderGallery();
