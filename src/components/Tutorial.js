import React, { Component } from 'react';
import {Grid} from 'react-flexbox-grid';
import Card from '../widgets/Card';

class Tutorial extends Component {
    render() {
        return (
            <Grid fluid>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Grid>
        );
    }
}

export default Tutorial;