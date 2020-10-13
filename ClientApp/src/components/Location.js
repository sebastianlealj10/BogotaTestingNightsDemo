import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocationCard from './LocationCard'
import Button from '@material-ui/core/Button';

export class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            type: null,
            dimention: null,
        }
        this.state = { location: [], loading: true }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.searchLocation();
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState(
            {
                [event.target.name]: event.target.value
            })
    }

    static renderCard(location) {
        if (location[0].name != "badRequest") {
            return (
                <Grid container>
                    {location.map(loc =>
                        <Grid item xs={12} sm={6} md={3} spacing={5} style={{ padding: '10px', height: "100%" }} >
                            <LocationCard key={loc.name} id={loc.id} name={loc.name} type={loc.type}
                                dimention={loc.dimention} resident={loc.resident} image={loc.image} created={loc.created} />
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

    render() {
        let contents = this.state.loading
            ? <p></p>
            : Location.renderCard(this.state.location);
        return (
            <div>
                <h1>Locations</h1>
                <div style={{ display: "inline-block" }}>
                    <form className="root" style={{ width: '200px' }} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <Grid container>
                            <TextField label="Name" name="name" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                            <TextField label="Type" name="type" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
                            <TextField label="Dimention" name="dimention" inputProps={{ 'aria-label': 'description' }} onChange={this.handleChange} />
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

    async searchLocation() {
        const response = await fetch('location', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                type: this.state.type,
                dimention: this.state.dimention
            })
        });
        const data = await response.json();
        console.log(data);
        this.setState({ location: data, loading: false });
    }
}
