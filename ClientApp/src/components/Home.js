import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Bogota Testing Nights</h1>
        <p>Contract testing</p>
        <p>Rick And Morty</p>
            <img src="https://rtvc-assets-radionica3.s3.amazonaws.com/s3fs-public/styles/image_750x422/public/field/image/article/rick-morty-pelicula.jpg?itok=QATvbVxc" alt="RickandMortyHome"></img>
      </div>
    );
  }
}
