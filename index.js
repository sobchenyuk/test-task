const controlsBoxes = {
    init() {
        this.controls = document.querySelector('#controls');
        this.boxes = document.querySelector('#boxes');
        this.input = document.querySelector('.js-input');

        this.handler();
    },
    destroyBoxes: () => this.boxes.innerHTML = '',
    createBoxes: (amount = '') => {

    },
    handler() {
        this.controls.addEventListener('click', (e) => {
            const target = e.target;
            const data = target.getAttribute('data-action');

            !!data && this[`${data}Boxes`]()
        })
    }
}

controlsBoxes.init()
