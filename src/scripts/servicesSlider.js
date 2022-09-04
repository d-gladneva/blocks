const sliderServices = () => {
    const mainElement = document.querySelector('.service-wrapper');
    const sliderWrapper = mainElement.querySelector('.services-slider');
    const sliderItems = mainElement.querySelectorAll('.slide');
    const sliderControlLeft = mainElement.querySelector('.prev');
    const sliderControlRight = mainElement.querySelector('.next');
    const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
    const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
    const sliderControls = mainElement.querySelectorAll(
        '.services-slider_controls'
    );
    let positionLeftItem = 0;
    let transform = 0;
    let step = (itemWidth / wrapperWidth) * 300;
    let items = [];
    sliderItems.forEach((item, index) => {
        items.push({item: item, position: index, transform: 0});
    });

    let position = {
        getMin: 0,
        getMax: items.length - 6,
    };

    const slider = {
        transformItem(direction) {
            if (direction === 'right') {
                if (
                    positionLeftItem + wrapperWidth / itemWidth - 1 >=
                    position.getMax
                ) {
                    return;
                }
                if (!sliderControlLeft.classList.contains('active')) {
                    sliderControlLeft.classList.add('active');
                }
                if (
                    sliderControlRight.classList.contains('active') &&
                    positionLeftItem + wrapperWidth / itemWidth >= position.getMax
                ) {
                    sliderControlRight.classList.remove('active');
                }
                positionLeftItem++;
                transform -= step;
            }
            if (direction === 'left') {
                if (positionLeftItem <= position.getMin) {
                    return;
                }
                if (!sliderControlRight.classList.contains('active')) {
                    sliderControlRight.classList.add('active');
                }
                if (
                    sliderControlLeft.classList.contains('active') &&
                    positionLeftItem - 1 <= position.getMin
                ) {
                    sliderControlLeft.classList.remove('active');
                }
                positionLeftItem--;
                transform += step;
            }
            sliderWrapper.style.transform = 'translateX(' + transform + '%)';
        },
        controlClick(item) {
            if (item.classList.contains('services-slider_controls')) {
                let direction = item.classList.contains('next') ? 'right' : 'left';
                this.transformItem(direction);
            }
        },

        setUpListeners() {
            sliderControls.forEach((item) => {
                item.addEventListener('click', () => {
                    this.controlClick(item);
                });
            });
        },
        right() {
            this.transformItem('right');
        },
        left() {
            this.transformItem('left');
        },
    };

    slider.setUpListeners();
};

sliderServices();
