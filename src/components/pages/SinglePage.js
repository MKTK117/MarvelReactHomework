import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import setContent from '../../utils/setContent';
import MarvelService from '../../services/MarvelService';

import AppBanner from "../appBanner/AppBanner";




const SinglePage = ({component: Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {getComics, getCharacter, clearError, process, setProcess} = MarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comicId':
                    getComics(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'characterId':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break
                default: 
                    console.log('Nothing')
            } 
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error || !data) ? <Component data={data}/> : null;

        return (
            <>
                <AppBanner/>
                {setContent(process, Component, data)}
            </>
        )
}

export default SinglePage;