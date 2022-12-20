import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "../DogCreate/DogCreate.css";



//PROBAR ACERLO CON PROMESAS TAMBIEN
function validate(input) {
  let errors = {};
   if (!input.heightMin) {
    errors.heightMin = "mandatory minimum height";} //altura minima obligatoria.
    else if (isNaN(parseInt(input.heightMin))) {
    errors.heightMin = "they have to be numbers"; //tienen que ser obligatoriamente numeros.


  } else if (input.heightMin <= 0) {
    errors.heightMin = "your minimum height cannot be '0'"; //tu altura mínima no puede ser '0'
  } else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
    errors.heightMin = "your minimum height must be less than your maximum height"; //tu altura minima debe se inferior a tu altura maxima.

  } else if (!input.heightMax) {
    errors.heightMax = "a maximum height is required";//se necesita una altura maxima obligatoriamente.
  } else if (isNaN(parseInt(input.heightMax))) {
    errors.heightMax = "your height should be typed by numbers"; // tu altura debe ser tipeado por numeros.



  } else if (!input.weightMin) {
    errors.weightMin = "mandatory minimum weight"; //pero minimo obligatorio
  } else if (isNaN(parseInt(input.weightMin))) {
    errors.weightMin = "they have to be numbers"; ////tienen que ser obligatoriamente numeros.



  } else if (!input.weightMax) {
    errors.weightMax = "mandatory minimum weight"; //pero minimo obligatorio
  } else if (isNaN(parseInt(input.weightMax))) {
    errors.weightMax = "your weight must be typed by numbers"; // tu peso debe ser tipeado por numeros.
  } else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
    errors.weightMax = "your maximum weight must be higher than the minimum weight"; //tu peso maximo debe ser superir que el peso minimo
  


  } else if (!input.life_span) {
    errors.life_span = "life expectancy is required"; // se requiere una expetativa de vida 
  } else if (isNaN(parseInt(input.life_span))) {
    errors.life_span = "they have to be numbers"; // tienen que ser obligatoriamente numeros 
  } else if (input.life_span <= 0) {
    errors.life_span = "life expectancy must be greater than '0'"; //la expetativa de vida debe ser mayor que 0


  }else if(!input.image) {
    errors.image = "required image field"; //campo imagen obligatorio
  } else if (input.image.length !== 0 &&
    !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)) {//regular expresion
     errors.image = "invalid URL";
    }
    return errors;
  
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();// lo que hace es redirigirme a la ruta que yo le diga
  const allTemperaments = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());//lo hago porque si o si voy a necesitar renderizar los temperamentos
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // Esta función hace lo siguiente:
    // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
    // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
    // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    
  }

  function handleSelect(e) {
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],//traeme todo lo que ya habia y anda guardandome o concatenandome todo lo que yo vaya guardando
      });
      
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(errors);
    if (
      !Object.getOwnPropertyNames(errors).length &&
      input.name &&
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.life_span &&
      input.image &&
      input.temperaments.length
    ) {
      dispatch(postDog(input));
      alert("Doggie created ");
      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        origen: "",
        temperaments: [],
      });
      history.push("/home");//aca redirigimos al home una vez creado el dogui
    } else {
      alert("El dogui no se puede crear con estos datos. ");
    }
  }

  function handleDeleteTemperament(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== el), //con este filter filtramos por todo lo que no sea ese elemento. digamos que nos devuelve un nuevo estado sin los que clikeamoss
    });
  }

  return (
    <div className="divCreate">
      <Link to="/home">
        <button className="buttonHome">
          Home 
        </button>
      </Link>
    
      <h1 className="title"> Create your own dog </h1> 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            <strong>Name: </strong>
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className="error">
              <strong>{errors.name}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Minimum height: </strong>
          </label>
          <input
            type="text"
            value={input.heightMin}
            name="heightMin"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> cm</strong>
          </label>
          {errors.heightMin && (
            <p className="error">
              <strong>{errors.heightMin}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Maximum height: </strong>
          </label>
          <input
            type="text"
            value={input.heightMax}
            name="heightMax"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> cm</strong>
          </label>
          {errors.heightMax && (
            <p className="error">
              <strong>{errors.heightMax}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Minimum weight: </strong>
          </label>
          <input
            type="text"
            value={input.weightMin}
            name="weightMin"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> kg</strong>
          </label>
          {errors.weightMin && (
            <p className="error">
              <strong>{errors.weightMin}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Maximum weight: </strong>
          </label>
          <input
            type="text"
            value={input.weightMax}
            name="weightMax"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> kg</strong>
          </label>
          {errors.weightMax && (
            <p className="error">
              <strong>{errors.weightMax}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Life expectancy: </strong>
          </label> 
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> years</strong>
          </label>
          {errors.life_span && (
            <p className="error">
              <strong>{errors.life_span}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Image: </strong>
          </label>
          {errors.image && (
            <p className="error"><strong>{errors.image}</strong></p>
          )}
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="Sin_filtro" hidden>
              Temperaments
            </option>
            {allTemperaments
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((temp) => {
                return (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                );
              })}
          </select>

          {input.temperaments.map((el) => {
            return (
              <ul className="allTemps" key={el}>
                <li>
                  <p className="temp">
                    <strong>{el}</strong>
                  </p>
                  <button
                    onClick={() => handleDeleteTemperament(el)} /*cuando hagamos click va a borrar el elemento que yo este ckickando en temp*/
                    className="x"
                  >
                    X
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
        <button type="submit" className="boop"><strong> To create! </strong></button>
      </form>
    </div>
  );
}