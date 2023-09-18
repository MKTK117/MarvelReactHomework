import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../formChar/FormChar";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(1010732);


    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
        <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel information portal</title>
        </Helmet>
        <ErrorBoundary>
             <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <CharList 
            onCharSelected = {onCharSelected} 
            />
            <div>
                <ErrorBoundary>
                    <CharInfo charId = {selectedChar} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharSearchForm/>
                </ErrorBoundary>
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;