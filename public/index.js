const controlsBoxes = {
    init() {
        this.controls = document.querySelector('#controls');
        this.boxes = document.querySelector('#boxes');
        this.input = document.querySelector('.js-input');
        this.widthHeight = 30;
        this.counter = 0;
        this.rgbMaxColor = 225;
        this.incrementParameter = 10;
        this.defaultAmount = 1;

        this.handler();
    },
    destroyBoxes() {
        /**
         * @type {string}
         * Функция destroyBoxes(), которая очищает div#boxes.
         */
        this.boxes.innerHTML = ''
        this.input.value = this.defaultAmount;
        this.counter = 0;
    },
    createBoxes(amount) {
        /**
         * @type {number}
         * функция объявляет 1 параметр amount - число. Функция
         * создает столько div, сколько указано в amount и добавляет их в div#boxes.
         */

        const amountCount = Number(amount) + this.boxes.childNodes.length
        while (this.counter  < amountCount) {
            const color = this.getRandomArbitrary(1)
            const count = this.counter * this.incrementParameter;
            const countWidthHeight = this.widthHeight + count;
            const cssText = `width: ${countWidthHeight}px;height: ${countWidthHeight}px;background: rgb(${color}, ${color}, ${color});`;

            const div = document.createElement('div');
            div.style.cssText = cssText;
            this.boxes.appendChild(div)

            this.counter++
        }
    },
    getRandomArbitrary(min) {
        return Math.random() * (this.rgbMaxColor - min) + min;
    },
    handler() {
        this.controls.addEventListener('click', e => {
            const target = e.target;
            const data = target.getAttribute('data-action');

            !!data && this[`${data}Boxes`](this.input.value || this.defaultAmount)
        })
    }
}

controlsBoxes.init();
