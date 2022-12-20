import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect, useState } from "react";
import Loading from '../Loading/Loading.jsx';
import '../Detail/Detail.css';


export default function Detail(props) {
    
    const [carga, setCarga] = useState(true);
    const dispatch = useDispatch();


    const id = props.match.params.id; // hooks params para acceder al id del Detail

    useEffect(() => {
        dispatch(getDetail(id)).then(() => setCarga(false));
    }, [dispatch, id]);//aca ya accedemos al id

    const myDog = useSelector((state) => state.detail);//aca nos traemos el datail del reducer

    if (carga) {
        return <Loading />;
      }

    return (
        <div className='divDetail'>
            <Link to='/home'><button className='buttonHome1' id='home' >Home </button></Link>
            <Link to='/dogs' >
                <button className='buttonHome1' >
                    Create pupper 
                </button>
            </Link>
            {
                myDog.length > 0 ?
                    <div>
                        <h1 className='name'>{myDog[0].name}</h1> {/*con el [0].name ingresamos al arreglo*/}
                        <ul className='asd'>
                            <li>
                                <div>
                                    <img src={myDog[0].image} alt={myDog[0].name} className='image' /> 
                                </div>

                            
                            </li>
                            <li>
                                <div>
                                    <h4 className='caracts'>Temperaments:</h4>
                                    <ul className='allTemps'>
                                        {myDog[0].createdInDb ?
                                            myDog[0].temperaments.map(el => {
                                                return <li key={el.race_temperament.temperamentId}><label>{el.name}</label></li>
                                            }) :
                                            myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(el => {
                                                    return <li key={el}><label>{el}</label></li>
                                                }) :
                                                ' No temperaments found for this breed '}
                                    </ul>
                                    <h4 className='caracts'>Height</h4>
                                    <p>{myDog[0].heightMin} - {myDog[0].heightMax} cm</p>
                                    <h4 className='caracts'>Weight</h4>
                                    <p>{myDog[0].weightMin} - {myDog[0].weightMax} kg</p>
                                    <h4 className='caracts'>Life span</h4>
                                    <p className='last'>{myDog[0].life_span}</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div className='loading'>
                        <h1><strong>Este i</strong></h1>
                    </div>
            }
        </div>
    )
}




