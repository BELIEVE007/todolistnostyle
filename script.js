var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ol = document.querySelector("ol");
var li = document.getElementsByTagName("li");
function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ol.appendChild(li);
	input.value = "";
	var btn=document.createElement('button');
       btn.appendChild(document.createTextNode('!Done'));
       li.appendChild(btn);
       var btn2=document.createElement('button');
       btn2.appendChild(document.createTextNode('Delete'));
       li.appendChild(btn2);
       btn2.onclick=removeParent;
       btn.onclick=UnderlineParent;

}

function UnderlineParent(event){
	event.target.parentNode.classList.toggle("done");
}

function removeParent(evt){
	evt.target.parentNode.remove();
} 
function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}


button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);





import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterDetails = ({ match }) => {
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${match.params.characterId}`);
        setCharacter(response.data);
        const filmRequests = response.data.films.map(filmUrl => axios.get(filmUrl));
        const filmResponses = await Promise.all(filmRequests);
        const filmData = filmResponses.map(response => response.data);
        setFilms(filmData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();
  }, [match.params.characterId]);

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <h3>Films</h3>
      <ul>
        {films.map((film, index) => (
          <FilmLink key={index} film={film} />
        ))}
      </ul>
    </div>
  );
};

const FilmLink = ({ film }) => {
  return (
    <li>{film.title}</li>
  );
};

export default CharacterDetails;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FilmDetails = ({ match }) => {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios.get(`https://swapi.dev/api/films/${match.params.filmId}`)
      .then(response => setFilm(response.data))
      .catch(error => console.error(error));
  }, [match.params.filmId]);

  if (!film) {
    return <div>Loading film details...</div>;
  }

  return (
    <div>
      <h2>{film.title}</h2>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <h3>Characters</h3>
      <ul>
        {film.characters.map((character, index) => (
          <li key={index}>
            <Link to={`/characters/${index}`}>{character}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmDetails;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
    const [films, setFilms] = useState([]);
  
    useEffect(() => {
      axios.get('https://swapi.dev/api/people')
        .then(response => setFilms(response.data.results))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div>
        <h1>Star Wars Films</h1>
        <ul>
          {films.map((film, index) => (
            <li key={index}>
              <Link to={`/films/${index}`}>{film.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default Home;
  
  import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import FilmDetails from './FilmDetails';
import CharacterDetails from './CharacterDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films/:filmId" element={<FilmDetails />} />
        <Route path="/characters/:characterId" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
