// задание 3

const imageSearch = {
    init() {
        this.search = document.querySelector('#search-form input')
        this.resultSearch = document.querySelector('#resultSearch');
        this.textNotFound = document.querySelector('.js-text-not-found');
        this.page = 1;

        this.search.addEventListener('input', _.debounce(this.searchRequest.bind(this), 150));
        this.resultSearch.addEventListener('click', this.modals) // делегирование
    },
    createTemplateGallery: props => { // построение галереии
        return `<li class="boxes__list-item">
                    <a href="${props.pageURL}" target="_blank">
                        <img 
                            src="${props.webformatURL}" 
                            class="img-responsive"
                            data-source="${props.largeImageURL}"
                            alt="${props.tags}"
                        />
                    </a>
                </li>`
    },
    modals: $event => { // модпльное окно
        $event.preventDefault();
        const src = $event.target.getAttribute('data-source');

        basicLightbox.create(
            `<img src="${src}" />`
        ).show()
    },
    getRequest(request) {
        return `https://pixabay.com/api/?key=17249207-48a5b3f3cc751c0f0850b30ec&q=${request}&page=${this.page}&image_type=photo`;
    },
    async searchRequest($event) {
        const request = $event.target.value;
        this.resultSearch.innerHTML = '';

        if (request.trim().length) {
            const url = this.getRequest(request)

            try {
                const { data: { hits:data } } = await axios.get(url);

                // Карточка
                for (let props of data) {
                    this.resultSearch.innerHTML += this.createTemplateGallery(props)
                }

                if (!data.length) {
                    this.textNotFound.removeAttribute('hidden')
                } else {
                    this.textNotFound.setAttribute('hidden', 'hidden')
                }

            } catch (err) {
                this.textNotFound.removeAttribute('hidden')
                this.resultSearch.innerHTML = '';
            }
        }
    }
}

imageSearch.init();
