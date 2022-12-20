import React from 'react';
import '../Paginado/Paginado.css';

export default function Paginado({dogsPerPage, allDogs, paginado}) { //destruturamos perros por pag todos los doguis y constante paginado
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {// este ciclo for dividimos a todos los personajes por la cantidad de personajes por parginas
        pageNumbers.push(i + 1);//lo que genera este push es egregar al arreglo vacio que generamos arriba.. con el resultado del for es lo que metemos en pagNumbers
    }

    return (
        <nav>
            <ul className='paginado'>
                {pageNumbers.length > 1 && 
                pageNumbers.map(number => ( 
                    <li key={number}>
                        <button onClick={() => paginado(number)}><strong>{number}</strong></button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}//aca nos renderizaos todos los numeros en si