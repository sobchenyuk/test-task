// задание 3

const API_KEY = '17249207-48a5b3f3cc751c0f0850b30ec';

const imageSearch = {
    init() {
        this.search = document.querySelector('#search-form input')
        this.resultSearch = document.querySelector('#resultSearch');
        this.sentinel = document.querySelector('#sentinel');

        this.textNotFound = document.querySelector('.js-text-not-found');

        this.handler();
        this.errorResponse = false;
    },
    createTemplateGallery: props => { // построение галереии
        return `<a href="${props.pageURL}" target="_blank">
                     <img 
                         src="${props.webformatURL}" 
                         class="img-responsive"
                         data-source="${props.largeImageURL}"
                         alt="${props.tags}"
                     
                 </a>`
    },
    modals: $event => { // модальное окно
        $event.preventDefault();
        const src = $event.target.getAttribute('data-source');

        basicLightbox.create(
            `<img src="${src}" />`
        ).show()
    },
    getRequest(request, page = 1) {
        return `https://pixabay.com/api/?key=${API_KEY}&q=${request}&page=${page}&image_type=photo`;
    },
    clearItem() {
        const childrenList = this.resultSearch.querySelectorAll('.boxes__list-item');
        if ( childrenList ) {
            for ( let item of childrenList) {
                item.remove()
            }
        }
    },
    createItem: async function (request, page) {
        try {

            let response = await fetch(this.getRequest(request, page));

            if (response.status >= 200 && response.status <= 299) {

                let data = await response.json()

                const {hits, totalHits} = data;

                if (!totalHits) {
                    this.textNotFound.removeAttribute('hidden');
                } else {
                    this.textNotFound.setAttribute('hidden', 'hidden')

                    // Карточка
                    for (let props of hits) {
                        const li = document.createElement('li')
                        li.className = 'boxes__list-item';
                        li.insertAdjacentHTML('afterBegin', `${this.createTemplateGallery(props)}`);
                        this.resultSearch.appendChild(li)
                    }
                }
            } else {
                this.errorResponse = true
                console.log(response.status, response.statusText);
            }

        } catch (err) {
            this.textNotFound.removeAttribute('hidden')
            this.clearItem();
            this.search.value = ''
        }
    },
    async searchRequest($event) {
        const request = $event.target.value;
        this.clearItem();
        let i = 1

        this.intersectionObserver = new IntersectionObserver(entries => {

            if (request.trim().length && !this.errorResponse) {
                if (entries.some(entry => entry.intersectionRatio > 0)) {
                    this.createItem(request, i)
                    this.resultSearch.appendChild(this.sentinel);
                    i++
                }
            } else {
                this.textNotFound.removeAttribute('hidden');
                this.clearItem();
                this.search.value = ''
            }
        })

        await this.intersectionObserver.observe(this.sentinel);
    },
    handler() {
        this.resultSearch.addEventListener('click', this.modals) // делегирование
        this.search.addEventListener('input', _.debounce(this.searchRequest.bind(this), 150));
    }
}

imageSearch.init();
