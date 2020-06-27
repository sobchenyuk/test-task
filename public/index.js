const controlsBoxes = {
    init() {
        this.controls = document.querySelector('#controls');
        this.boxes = document.querySelector('#boxes');
        this.input = document.querySelector('.js-input');
        this.amount = 1;
        this.widthHeight = 30;

        this.handler();
    },
    destroyBoxes() {
        this.boxes.innerHTML = ''

    },
    createBoxes(amount) {
        this.amount = Number(amount)
        const count = 10 * this.boxes.childNodes.length;
        const countWidthHeight = this.widthHeight + count;
        const color = this.getRandomArbitrary(1)
        const cssText = `width: ${countWidthHeight}px;height: ${countWidthHeight}px;background: rgb(${color}, ${color}, ${color});`;

        const div = document.createElement('div');
        div.style.cssText = cssText;

        this.boxes.appendChild(div)
    },
    getRandomArbitrary(min) {
        return Math.random() * (255 - min) + min;
    },
    handler() {
        this.controls.addEventListener('click', e => {
            const target = e.target;
            const data = target.getAttribute('data-action');

            !!data && this[`${data}Boxes`](this.input.value || this.amount)
        })
    }
}

controlsBoxes.init();
