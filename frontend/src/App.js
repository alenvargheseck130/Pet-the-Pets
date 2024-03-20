/**
 * "StAuth10244: I Alen Varghese Cheruvally Kunjumon, 000837873 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 *
 */

import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TableContainer, Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@mui/material';
import petImage from './petshop.jpg';
import TextField from '@mui/material/TextField';

function Home() {
  return (
    <div>
    <h1>Pet the Pets</h1>
    <img width="100%" height="80%" src={petImage} alt="JDX Logo" />
    <p>"Welcome to our enchanting pet haven, where furry dreams come true! At our vibrant pet shop, we specialize in providing a delightful array of companionship. As you step into our inviting space, you'll be greeted by the cheerful chirps of birds, the soft purring of kittens, and the playful antics of puppies.</p>
    <br/>
    <p>Explore our carefully curated selection of pets, each one a unique personality waiting to bring joy to your life. From cuddly hamsters to majestic fish, from talkative parrots to elegant reptiles, we cater to every pet lover's heart. Our knowledgeable and friendly staff are here to guide you, offering expert advice on pet care, nutrition, and the perfect accessories to pamper your new friend.</p>
  </div>
  );
}

function Inventory() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [animal, setAnimal] = useState(''); // Add state hook for animal
  const [description, setDescription] = useState(''); // Add state hook for description
  const [age, setAge] = useState(''); // Add state hook for age
  const [price, setPrice] = useState(''); // Add state hook for price

  function fetchPets() {
    fetch('http://localhost:3001/api?act=getall')
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setPets(result);
      });
  }

  useEffect(fetchPets, []); 

  function addPet() {
    fetch('http://localhost:3001/api?act=add&animal=Dog&description=Dalmatian&age=3&price=103.45')
      .then((res) => res.json())
      .then((result) => {
        fetchPets();
      });
  }

  function deletePet(id) {
    fetch(`http://localhost:3001/api?act=delete&id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        fetchPets();
      });
  }

  function updatePet(id) {
    fetch(`http://localhost:3001/api?act=update&id=${id}&animal=Parrot&description=Green&age=6&price=550.95`)
      .then((res) => res.json())
      .then((result) => {
        fetchPets();
      });
  }

  function formSubmission(event) {
    event.preventDefault();


    fetch(`http://localhost:3001/api?act=add&animal=${animal}&description=${description}&age=${age}&price=${price}`)
      .then((res) => res.json())
      .then((result) => {
        fetchPets();

        setAnimal('');
        setDescription('');
        setAge('');
        setPrice('');
      });
  }

  return (
    <div>
      <h3>Inventory</h3>
      <div>
        <form onSubmit={formSubmission}>
        <TextField value={animal} onChange={(i) => setAnimal(i.target.value)}  type="text" id="standard-basic" label="Animal" variant="standard" required />
        <TextField value={description} onChange={(i) => setDescription(i.target.value)} type="text" id="standard-basic" label="Descripton" variant="standard" required/>
        <TextField value={age} onChange={(i) => setAge(i.target.value)} type="text" id="standard-basic" label="Age" variant="standard"required />
        <TextField value={price} onChange={(i) => setPrice(i.target.value)}  type="text" id="standard-basic" label="Price" variant="standard" required />
          
          <Button type="submit" variant="outlined">Submit</Button>
        </form>

        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Animal</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.animal}</TableCell>
                <TableCell>{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.price}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => deletePet(pet.id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => updatePet(pet.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>        </TableContainer>
      </div>
    </div>
  );
}
      {/* <TableContainer component={Paper}>
        
      </TableContainer> */}

      


function Search() {
  const [searchItem, setSearchItem] = useState(''); 
  const [searchResults, setSearchValue] = useState([]); 

  function searchPet() {
    fetch(`http://localhost:3001/api?act=search&term=${searchItem}`)
      .then((res) => res.json())
      .then((result) => {
        setSearchValue(result); 
      });
  }

  return (
    <div>
      <h2>Search Page</h2>

      {/* Search input and button */}
      <div>
      <TextField type="text" value={searchItem} onChange={(i) => setSearchItem(i.target.value)} id="outlined-basic" label="Search your Pet" variant="outlined" />
        <Button onClick={searchPet} variant="outlined">Search</Button>
      </div>

      {/* Display search results in a table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Animal</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.animal}</TableCell>
                <TableCell>{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
// Define About component
function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>"Welcome to 'Pet the Pets,' where passion meets paws! At Pet the Pets, we believe in creating a haven for all creatures great and small. Our commitment is to provide a warm and welcoming environment for both pets and their owners. With a team of dedicated animal enthusiasts, we strive to offer a curated selection of premium products and services that cater to the diverse needs of your furry, feathery, and scaly companions. From wholesome nutrition to delightful toys, grooming essentials, and expert advice, Pet the Pets is more than just a pet shop – it's a celebration of the extraordinary bond between pets and their human counterparts. Join us in fostering a world of wagging tails, purring cuddles, and happy hearts. Because at Pet the Pets, every pet is not just a friend; they're family."</p>

    </div>
  );
}

// Define the main App component
function App() {
  return (
    <div>
      <div className="NavButtons">
        {/* Navigation links using NavLink */}
        <Button variant="outlined">
          <NavLink to="/" underline="none">
            Home
          </NavLink>
        </Button>
        <Button variant="outlined">
          <NavLink to="/inventory" underline="none">
            Inventory
          </NavLink>
        </Button>
        <Button variant="outlined">
          <NavLink to="/search" underline="none">
            Search
          </NavLink>
        </Button>
        <Button variant="outlined">
          <NavLink to="/about" underline="none">
            About
          </NavLink>
        </Button>
      </div>

      {/* Define routes using React Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
