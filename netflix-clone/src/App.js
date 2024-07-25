import React from 'react'
import './App.css'
import Row from './Row'
import requests from './Requests'
import Banner from './Banner'
import Nav from './Nav'

function App() {

  const baseURL = 'https://api.themoviedb.org/3'

  return (
    <div className="app">
      <Nav />
      <Banner/>
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchurl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchurl={baseURL + requests.fetchTrending}/>
      <Row title="Top Rated" fetchurl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchurl={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchurl={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchurl={requests.fetchHorrorMovies}/>
      <Row title="Documentaries" fetchurl={requests.fetchDocumentaries}/>
      <Row title="Romance Movies" fetchurl={requests.fetchRomanceMovies}/>
    
    </div>
  );
}

export default App;
