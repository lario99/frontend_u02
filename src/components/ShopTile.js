import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default class ShopTile extends React.Component {


    constructor(props) {
        super(props);
        let shop = props.shop;
        this.state = {
            value: shop.initValue,
            title: shop.title,
            maxValue: shop.maxValue,
            enabled: props.enabled ?? true,
            openHours: props.shop.openHours,
            closeHours: props.shop.closeHours,
            textColor: shop.initValue < shop.maxValue ? '#000000' : '#ed2b2b'
        };
        this.add = this.add.bind(this);
    }


    add() {
        if (!this.state.enabled) {
            this.props.showDialog();
            return;
        }
        var date = new Date();
        if (date.getHours() >= this.state.closeHours || date.getHours() < this.state.openHours) {
            this.props.showDialog('Obchod je zavreny', `Oteviraci doba: ${this.state.openHours}:00-${this.state.closeHours}:00`);
            return;
        }
        if (this.state.value >= this.state.maxValue) {
            return;
        }
        let newValue = this.state.value + 1;
        this.setState({
            value: newValue,
            textColor: newValue < this.state.maxValue ? '#000000' : '#ed2b2b'
        });
        this.props.update();
    }

    forceUpdateCount(count) {
        this.setState({
            value: count,
            textColor: count < this.state.maxValue ? '#000000' : '#ed2b2b'
        });
    }








    render() {
        return <Card variant="elevation" elevation={3} style={{ margin: 25 }}>
            <Grid container spacing={1} style={{ padding: 25 }}
                direction='row'
                alignItems='center'
                justifyContent='center'>
                <Grid item xs={7} md={8} >
                    <Typography gutterBottom variant='h9' component='div' style={{ color: this.state.textColor }}  >
                        {this.state.title ?? ''}
                    </Typography>
                    <Typography variant='h7' component='div' style={{ color: this.state.textColor }}>
                        {this.state.enabled ? this.state.value : `${this.state.value} / ${this.state.maxValue}`}
                    </Typography>
                </Grid>

                <Grid item xs={3} md={3}
                >
                    <div style={{ height: '50px', width: '100px', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="50%" height="100%">
                            <PieChart >
                                <Pie
                                    data={[
                                        { name: 'current', value: this.state.value },
                                        { name: 'max', value: this.state.maxValue - this.state.value },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={25}
                                    animationDuration={200}
                                    animationBegin={0}
                                    dataKey="value"
                                >
                                    {
                                        [1, 2].map((entry, index) => <Cell key={`cell_${index}`} fill={index % 2 == 0 ? '#eb4034' : '#55d92e'} />)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer >
                    </div>
                </Grid>

                {this.state.enabled ? <Grid item xs={2} md={1} >
                    <IconButton
                        color='primary'
                        disabled={this.state.value >= this.state.maxValue}
                        onClick={this.add}
                        size='large'
                    >
                        <AddCircleIcon fontSize='large' />
                    </IconButton>
                </Grid> : <Grid item xs={2} md={1} >
                    <IconButton
                        color='primary'
                        onClick={this.add}
                        size='large'
                    >
                        <AddCircleIcon fontSize='large' />
                    </IconButton>
                </Grid>
                }

            </Grid>
        </Card>
    }
}