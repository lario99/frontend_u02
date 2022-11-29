import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default class CarTile extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {
        return <Card variant="elevation" elevation={3} style={{padding: 25}}>

            <Typography gutterBottom variant='h9' component='div'>
                {this.props.car.brand} -  {this.props.car.model} (
                {this.props.car.fuel})
            </Typography>
            <Typography variant='h7' component='div'>
                Cena: {this.props.car.price}
            </Typography>
            <Typography variant='h7' component='div'>
                KM: {this.props.car.tachometer}
            </Typography>
        </Card>
    }
}