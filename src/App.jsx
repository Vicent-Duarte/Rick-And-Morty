import { useEffect, useRef, useState } from 'react';
import './App.css';
import UseFetch from './Hooks/UseFetch';
import LocationData from './components/LocationData';
import ResidentCard from './components/ResidentCard';

function App() {

  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);

  const [location, getLocation, isLoading, hasError] = UseFetch();

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;

    getLocation(url);

  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    const newInputValue = textInput.current.value.toLowerCase().trim()

    if (!isNaN(newInputValue) && parseInt(newInputValue) > 0) {
      setInputValue(newInputValue)
    } else {
      console.log('Debes proporcionar un número válido y positivo')
    }
    textInput.current.value = ''
  }

  console.log(location);

  return (
    <>
      {
        isLoading ?
          <h2>Loading...</h2>
          :
          <div className='app'>
            <img className='app__fondo' src="./img-fondo.webp" alt="imagen" />
            <form className='app__form' onSubmit={handleSubmit}>
              <input className='app__input' type="number" min={1} max={126} ref={textInput} />
              <button className='app__btn'>Search</button>
            </form>
            {
              hasError || inputValue === '0' ?
                <h2> Hey! You must provide an id from 1 to 126</h2>
                :
                <>
                  <LocationData
                    location={location}
                  />
                  <div className='app__container'>
                    {
                      location?.residents.map(resident => (
                        <ResidentCard
                          key={resident}
                          info={resident}
                        />
                      ))
                    }
                  </div>
                </>
            }
          </div>
      }
    </>
  )
}

export default App
