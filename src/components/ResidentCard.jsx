import React, { useEffect } from 'react';
import UseFetch from '../Hooks/UseFetch';
import './styles/ResidentCard.css';

const ResidentCard = ({ info }) => {

    const [resident, getResident] = UseFetch();

    useEffect(() => {
        getResident(info);
    }, [])

    return (
        <article className='resident'>
            <figure className='resident__img'>
                <img src={resident?.image} alt="resident photo" />
                <figcaption className='resident__status'>
                    <div className={`resident__circle ${resident?.status}`}></div>
                    <span>{resident?.status}</span>
                </figcaption>
            </figure>
            <h3 className='resident__name'>{resident?.name}</h3>
            <hr className='resident__line' />
            <ul className='resident__list'>
                <li className='resident__item'><span>Especie: </span><span>{resident?.species}</span></li>
                <li className='resident__item'><span>Origin: </span><span>{resident?.origin.name}</span></li>
                <li className='resident__item'><span>Eppisodes where appear: </span><span>{resident?.episode.length}</span></li>
            </ul>
        </article>
    )
}

export default ResidentCard;