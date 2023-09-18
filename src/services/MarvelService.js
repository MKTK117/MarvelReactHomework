import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {

    const {request, clearError, process, setProcess} = useHttp();

     const  _apiBase = '',
            _apiKey = '',
            _baseOffset = 0;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: (char.description) || 'Missle know where it is...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    
   

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?titleStartsWith=Halo&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: (comics.description) || 'Missle know where it is...',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'SPNKR is incoming',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price + '$'
        }
    }

    return {
            clearError, 
            process,
            setProcess, 
            getAllCharacters, 
            getCharacter, 
            getComics, 
            getAllComics,
            getCharacterByName}
}

export default MarvelService;
