import {useFetch} from "../../utils/fetch";
import {useLocation, useParams} from "react-router-dom";

import Error from "../../components/Error";

import Slideshow from "../../components/Slideshow";
import Rating from "../../components/Rating";
import Tag from "../../components/Tags";
import Profile from "../../components/Profile";
import Collapse from "../../components/Collapse";

import "./style.scss";
import {useEffect, useState} from "react";

function Annonce() {
    // const annonces = useFetch(window.location.origin + "/annonces.json");
    const {annonceId} = useParams();
    const location = useLocation();
    const initialAnnonce = location.state || null;
    const [thisAnnonce, setThisAnnonce] = useState(initialAnnonce);

    // const { data, isLoading, error } = useFetch(thisAnnonce ? null : `${window.location.origin}/annonces.json`);
    //
    // useEffect(() => {
    //     // console.log('Fetched data in Annonce:', data);  // Log the fetched data
    //     if (thisAnnonce === null && data) {
    //         const fetchedAnnonce = data.find((annonce) => annonce.id === annonceId);
    //         console.log('Found annonce:', fetchedAnnonce);  // Log the found annonce
    //         setThisAnnonce(fetchedAnnonce);
    //     } else {
    //         console.log(thisAnnonce)
    //     }
    // }, [data, annonceId, thisAnnonce]);

    const { fetchedData, isLoading, error } = useFetch(thisAnnonce ? null : `${window.location.origin}/annonces.json`);

    useEffect(() => {
        if (!thisAnnonce && fetchedData) {
            const fetchedAnnonce = fetchedData.find((annonce) => annonce.id === annonceId);
            setThisAnnonce(fetchedAnnonce);
        }
    }, [fetchedData, annonceId, thisAnnonce]);


    if (error || !thisAnnonce) {
        return <Error />
    }

    document.title = thisAnnonce.title + ' - Kasa';
    return (
        <section>
            <Slideshow images={thisAnnonce.pictures}/>
            <div className="annonce-info-rating-host-wrapper">
                <div className="annonce-info-wrapper">
                    <h1 className="annonce-title">{thisAnnonce.title}</h1>
                    <p className="annonce-location">
                        {thisAnnonce.location}
                    </p>
                    <div className="tag-wrapper">
                        {thisAnnonce.tags.map((tag, index) => (
                            <Tag tagName={tag} key={`${tag}-${index}`}/>
                        ))}
                    </div>
                </div>
                <div className="rating-host-wrapper">
                    <Rating rating={thisAnnonce.rating}/>
                    <Profile name={thisAnnonce.host.name} picture={thisAnnonce.host.picture}/>
                </div>
            </div>
            <div className="description-equipments-wrapper">
                <Collapse title="Description" content={thisAnnonce.description}/>
                <Collapse title="Équipements" content={thisAnnonce.equipments}/>
            </div>
        </section>
    )
}

export default Annonce;