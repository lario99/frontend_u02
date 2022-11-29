import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from "@mui/material/Grid";

export default class RangeSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: props.values
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue, activeThumb) {
        let oldValue = this.state.values;
        let newValues = this.state.values;
        if (activeThumb === 0) {
            newValues = [Math.min(newValue[0], oldValue[1] - 5), oldValue[1]];

        } else {
            newValues = [oldValue[0], Math.max(newValue[1], oldValue[0] + 5)];
        }
        this.props.onChange(newValues);
        this.setState({
            values: newValues
        })
    };

    render() {
        return (
            <Grid item xs={12} md={6}>
                <h3>{this.props.title}</h3>
                <Slider
                    value={this.state.values}
                    min={this.props.values[0]}
                    max={this.props.values[1]}
                    onChange={this.handleChange}
                    valueLabelDisplay="auto"
                />
            </Grid>
        );
    }
}