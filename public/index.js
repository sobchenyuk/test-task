// задание 3

const API_KEY = '17249207-48a5b3f3cc751c0f0850b30ec';
let i = 1;

const imageSearch = {
    init() {
        this.search = document.querySelector('#search-form input')
        this.resultSearch = document.querySelector('#resultSearch');
        this.sentinel = document.querySelector('#sentinel');

        this.textNotFound = document.querySelector('.js-text-not-found');

        this.request = '';

        this.handler();
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

            let response = this.request ? await fetch(this.getRequest(request, page)) : { status: 0 };

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
                console.log(response.status, response.statusText);
            }

        } catch (err) {
            this.textNotFound.removeAttribute('hidden')
            this.clearItem();
            this.search.value = ''
            this.request = '';
            i = 1;
        }
    },
    async searchRequest($event) {
        this.request = $event.target.value;
        this.clearItem();
        i = 1

        await this.createItem(this.request, i)
    },
    handler() {
        this.resultSearch.addEventListener('click', this.modals) // делегирование
        this.search.addEventListener('input', _.debounce(this.searchRequest.bind(this), 150));

        this.intersectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                const { isIntersecting } = entry

                if(isIntersecting) {
                    if (this.request.trim().length) {
                        if (entries.some(entry => entry.intersectionRatio > 0)) {
                            this.createItem(this.request, i)
                            i++
                        }
                    }
                }
            });
        }, {
            rootMargin: '40px',
            threshold: 0.0
        })

        this.intersectionObserver.observe(this.sentinel);
    }
}

imageSearch.init();
