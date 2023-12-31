import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return  <Spinner/>;
            
        case "loading":
            return newItemLoading ? <Component/> : <Spinner/>;
            
        case "confirmed":
            return <Component/>;
            
        case "error":
            return <ErrorMessage/>;
            
        default:
            throw new Error('Unexpected process statement')
    }
}



const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(0),
          [comicsEnded, setComicsEnded] = useState(false);



    const {getAllComics, process, setProcess} = MarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if(newComicsList.length < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended)
    }


    function renderItems(arr) {
        const items =  arr.map((item) => {

            return (
                <li className= "comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        });
        
        return (
        <>
         
            <ul className="comics__grid">
                {items}
            </ul>
        </>
          
        )
    }

    return (
    <>
        
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    </>
        
    )
}

export default ComicsList;