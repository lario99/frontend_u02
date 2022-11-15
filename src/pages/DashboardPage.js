import React from 'react';
import Grid from '@mui/material/Grid';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

class ShopPage extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Grid container spacing={1} style={{ padding: 25 }}
                    direction='column'
                    alignItems='center'
                    justifyContent='center'>
                    <h3>Population (x1000)</h3>
                    <Grid item xs={12} md={12} >

                        <BarChart
                            width={500}
                            height={300}
                            data={this.props.data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="year" height={40} stroke="#34996c" />
                            <Bar dataKey="population" fill="#34996c" />
                        </BarChart>
                    </Grid>

                    <h3>Births</h3>
                    <Grid item xs={12} md={12} >

                        <BarChart
                            width={500}
                            height={300}
                            data={this.props.data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="year" height={40} stroke="#3e93fa" />
                            <Bar dataKey="births" fill="#3e93fa" />
                        </BarChart>
                    </Grid>

                    
                    <h3>Deaths</h3>
                    <Grid item xs={12} md={12} >

                        <BarChart
                            width={500}
                            height={300}
                            data={this.props.data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="year" height={40} stroke="#db81c8" />
                            <Bar dataKey="deaths" fill="#db81c8" />
                        </BarChart>
                    </Grid>

                </Grid>
            </div>
        );
    }

}

export default ShopPage;