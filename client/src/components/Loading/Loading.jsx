import React from 'react';
import loading from '../../styles/cargando.gif';
import '../Loading/Loading.css';


export default function Loading() {
    return (
        <div className="box_loading">
            <img src={loading} alt="Loading"/>
        </div>
    )
}