
const search = document.querySelector('#search-form input')
const resultSearch = document.querySelector('#resultSearch');
const textNotFound = document.querySelector('.js-text-not-found');

const setRequest = (request, page = 1) =>
    `https://pixabay.com/api/?key=17249207-48a5b3f3cc751c0f0850b30ec&q=${request}&page=${page}&image_type=photo`;

const modals = ( $event, { h, w, src } ) => {
    $event.preventDefault()
    basicLightbox.create(
        `<img width="${w}" height="${h}" src="${src}">`
    ).show()
}

const searchRequest = async $event => {
    const request = $event.target.value;
    resultSearch.innerHTML = '';

    if ( request.trim().length ) {
        const url = setRequest(request)
        
        try {
            const { data } = await axios.get(url);
            textNotFound.setAttribute('hidden', 'hidden')

            // Карточка
            for ( let key of data.hits) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                const img = document.createElement('img');

                li.className = 'boxes__list-item';

                // ссылка на большое изображение
                a.href = key.pageURL
                a.target = '_blank'

                // ссылка на маленькое изображение
                img.src = key.webformatURL;
                img.className = 'img-responsive'

                // ссылка на большое изображение
                img.setAttribute('data-source', key.largeImageURL)

                // описание
                img.alt = key.tags;

                // Набор элементов списка с карточками изображений
                a.appendChild(img)
                li.appendChild(a)
                resultSearch.appendChild(li)

                a.addEventListener('click', ev => modals(ev, {
                    h: key.imageHeight,
                    w: key.imageWidth,
                    src: key.largeImageURL
                }))
            }

            if (!data.hits.length) {
                textNotFound.removeAttribute('hidden')
            }

        } catch (err) {
            textNotFound.removeAttribute('hidden')
            resultSearch.innerHTML = '';
        }
    }
}

search.addEventListener('input', _.debounce(searchRequest, 150))
