import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';


const CharInfo =(props)=> {

    const [char, setChar] = useState(null);



    const {getCharacter, clearError, process, setProcess} = MarvelService();

    // loading, error,  // theese two is no longer needed from MarvelService - loading and error is read by 'setContet'

    useEffect(() => {
        updateChar()
    }, [props.charId])
    
   

    const onCharLoaded =  (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        console.log('updated')
  
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    // This function could be here.
    // But it's much better to make it as util, what we can bring and use in any part of our app

    // const setContent = (process, char) => {
    //     switch (process) {
    //         case "waiting":
    //             return <Skeleton/>;
                
    //         case "loading":
    //             return <Spinner/>;
                
    //         case "confirmed":
    //             return <View char = {char}/>;
                
    //         case "error":
    //             return <ErrorMessage/>;
                
    //         default:
    //             throw new Error('Unexpected process statement')
    //     }
    // }
        
    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char = {char}/> : null; /// left old code for example how to not to do

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage} /// old stuff from above
            {spinner}
            {content} */}

            {setContent(process, View, char)}
        </div>
        
    )
    
    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
       <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style = {imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Subguidance system cannot find any comics"}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key = {i} className="char__comics-item">
                            {item.name}
                            </li>
                        )
                    })
                }
            </ul>
       </>
    )
}

export default CharInfo;
