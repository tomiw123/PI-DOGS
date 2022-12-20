import React from "react";
import { useState, useEffect } from "react";
//importo los hooks de react-redux (prev.. instalados)
import { useDispatch, useSelector } from 'react-redux';
//importo las actions que me interesa usar en este componente
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByName, sortByWeight } from "../../actions";
//importo los componentes que voy a usar.
import { Link } from 'react-router-dom';
//importo los hooks que uso de react
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Loading from '../Loading/Loading.jsx'
import '../Home/Home.css';


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);//aca trabajamos con hooks
    const allTemperaments = useSelector((state) => state.temperaments);
    
    // paginado:
    const [currentPage, setCurrentPage] = useState(1); // guardame en un estado local la pagina actual y comienza en uno porque siempre voy a comenzar desde la primer pagina 
    const dogsPerPage = 8; // me guardo cuantos dogs quiero por pagina
    const indexOfLastDog = currentPage * dogsPerPage; // el índice del último perro de cada página va a ser la pagina actual en la que estoy por la cantidad de perros por pagina
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // el índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // aca generamos una costante que nos guarde todos los perros de cada pagg con el allDogs(nuestro arreglo del estado) con el slice dividimos el array trayendosno 8 perros por paginas e ir dividiendolos 
    const [carga, setCarga] = useState(true);
    const [orden, setOrden] = useState(''); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber); //esta const nos ayuda al renderizado 
    }
    //ººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººººº

    // Ahora voy a traerme del estado los perros cuando el componente se monta:
    useEffect(() => { // useEffect simula los lifecycles de los estados locales.
        dispatch(getDogs()).then(()=> setCarga(false)) // Este dispatch es lo mismo que hacer el mapDispatchToProps
    }, [dispatch]) // El segundo parámetro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse y asi mismo para que no se genere un bucle infinito.
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage])

    useEffect(() => {

    },[orden])


    function handleClick(e) {
        e.preventDefault();//usamor por precausion para que no se rompa
        setCurrentPage(1);
        dispatch(getDogs())//con esto reseteamos.. porque si se buguea digamos volvemos a recargar la pag
    }

    function handleFilterTemperaments(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByTemperament(e.target.value))//con el e.target.value accedemos a nuestras funciones
    }

    function handleFilterOrigin(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByOrigin(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);//este set esta vacio pero para lo que lo utilizamos es para setear la pagina actual y se vuelva a renderizar para que me haga el ordenamiento 
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    if (carga) {
        return <Loading />;
      }

    return (
        
        <div className='home'>
            <div className="tom"></div> 
            <div className='divNB'>
                <ul className='navbar'>
                    <li >
                        <button onClick={e => { handleClick(e) }} className='elementNB' >
                            Home
                        </button>
                    </li>
                    <li>
                        <Link to='/dogs' ><button className='elementNB' >
                            Create pupper 
                        </button></Link>
                    </li>
                    <li className='content-select'>
                        <select onChange={e => handleSortByName(e)}  >
                            <option value='selected' hidden className='elementNB' >Sort breeds by name</option>
                            <option value='asc'  >A - Z</option>
                            <option value='desc'  >Z - A</option>
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleSortByWeight(e)}  >
                            <option value='selected' hidden>Sort by weight</option>
                            <option value='asc'>Lighter to heavier</option>
                            <option value='desc'>Heavier to lighter</option>
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleFilterTemperaments(e)}  >
                            <option key={0} value='all'>All temperaments</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(el => {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleFilterOrigin(e)}  >
                            <option value='all'>All breeds</option>
                            <option value='api'>Existent breeds</option>
                            <option value='created'>Created breeds</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                </ul>
            </div>

            
            <h1>  Dog Finder / Creator  </h1>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                            

            <div className='container'>
                {
                        currentDogs?.map((el) => {
                        return (
                            <div key={el.id} className='cardHome'>
                                <Link to={'/home/' + el.id} style={{ textDecoration: 'none' }} >
                                    <Card
                                        name={el.name}
                                        image={el.image}
                                        temperaments={el.temperaments}
                                        weightMin={el.weightMin}
                                        weightMax={el.weightMax}
                                        key={el.id}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />{/*sadasdasasada*/}
            <Link to='/' ><button className='welcome'><span>Back to top</span></button></Link>
        </div>
    )

}
