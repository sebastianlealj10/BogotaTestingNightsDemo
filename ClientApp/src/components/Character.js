import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CharacterCard from './CharacterCard'
import Button from '@material-ui/core/Button';

export class Character extends Component {
    static displayName = Character.name;

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            status: null,
            species: null,
            type: null,
            gender: null,
        }
        this.state = {character: [], loading: true}
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.searchCharacter();
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState(
            {
                [event.target.name]: event.target.value
            })
    }

    static renderCard(character) {
        if (character[0].name != "badRequest") {
            return (

                <Grid container>
                    {character.map(charact =>
                        <Grid item xs={12} sm={6} md={3} spacing={5} style={{ padding: '10px', height: "100%" }} >
                            <CharacterCard key={charact.name} id={charact.id} name={charact.name} status={charact.status} species={charact.species}
                                type={charact.type} gender={charact.gender} location={charact.location} image={charact.image} episode={charact.episode} created={charact.created} />
                        </Grid>)
                    }
                </Grid>
            );
        }
        else {
            return (
                <p><b>Not results for this search</b></p>
            );
        }
    }

    render()
    {
       let contents = this.state.loading
              ? <p></p>
              : Character.renderCard(this.state.character);
      return (
          <div>
              <h1>Characters</h1>
              <div style={{ display: "inline-block" }}>
                <form className="root" style={{ width: '200px' }} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <Grid container>
                      <TextField label="Name" name="name" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                      <TextField label="Status" name="status" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                      <TextField label="Species" name="species" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                      <TextField label="Type" name="type" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                      <TextField label="Gender" name="gender" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                      <Button style={{ marginTop: '20px' }} type="submit" variant="contained" color="primary">Search</Button>
                  </Grid>
              </form>
                  <div style={{ marginTop: '20px' }}>
                  {contents}
                  </div>
              </div>
          </div>
          );
    }

    async searchCharacter() {
        const response = await fetch('Character', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                status: this.state.status,
                species: this.state.species,
                type: this.state.type,
                gender: this.state.gender
            })
        });
        const data = await response.json();
        console.log(data);
        this.setState({ character: data, loading: false });
    }
}
