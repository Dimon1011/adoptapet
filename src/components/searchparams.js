import React, { useState, useEffect, useContext } from 'react';
import pet, {ANIMALS} from '@frontendmasters/pet';
import Results from './results';
import useDropdown from './usedropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
    //this is a hook, all hooks beging with "USE"
    const [location, setLocation] = useState('Seattle, WA');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);
    
    async function requestPets(){
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });

        setPets(animals || []);
    }

    useEffect (() => {
        setBreeds([]);
        setBreed('');

       pet.breeds(animal).then(({breeds}) => {
           const breedStrings = breeds.map(({name}) => name);
           setBreeds(breedStrings);
       })
    }, [animal, setBreed, setBreeds]);

    return (
        <div className='search-params'>
            <h3>{location}</h3>
            <form onSubmit={(event) => {
                event.preventDefault();
                requestPets();
            }}>
                <label htmlFor='location'>Location <input 
                id='location' 
                value={location} 
                placeholder="Enter location"
                onChange={event => setLocation(event.target.value)}
                />
                </label>
                <div className='pad1'></div>
                <AnimalDropdown/>
                <div className='pad1'></div>
                <BreedDropdown/>
                <div className='pad1'></div>
                <label htmlFor='theme'>
                Theme {" "}
                <select value={theme} 
                        onChange={event => setTheme(event.target.value)}>
                <option value='peru'>Peru</option>
                <option value='darkblue'>Dark Blue</option>
                <option value='mediumorchid'>Medium Orchid</option>
                <option value='chartreuse'>Chartreuse</option>
                </select>
                </label>
                <button style={{backgroundColor: theme}}> Submit</button>
                
            </form>
            <Results pets={pets}/>
        </div>
    )
}


                // {/* <label htmlFor='animal'>Animal <select 
                // id='animal' 
                // value={animal} 
                // onChange={event => setAnimal(event.target.value)}>
                //     <option>All</option>
                //     {ANIMALS.map(animal => (<option key={animal} value={animal}>{animal}</option>))}
                // </select>
                // </label>
                // <label htmlFor='breed'>Breed <select 
                // id='breed' 
                // value={breed} 
                // onChange={event => setBreed(event.target.value)}
                // disabled={!breeds.length}>
                //     <option>All</option>
                //     {breeds.map(breed => (<option key={breed} value={breed}>{breed}</option>))}
                // </select>
                // </label> */}
export default SearchParams;