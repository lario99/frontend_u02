import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Grid from "@mui/material/Grid";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default class CarModelPicker extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedModels: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    getStyles(name, modelName, theme) {
        return {
            fontWeight:
                modelName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }


    handleChange(e){
        const {
            target: { value },
        } = e;
        this.setState({
            selectedModels: value
        })
        this.props.handleChange(this.props.title, value);
    }

    render() {
        return <Grid item xs={12} md={6} style={{ marginTop: 15}}>
            <FormControl fullWidth style={{width:'100%'}}>
                <InputLabel id="demo-multiple-chip-label" >{this.props.title}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    fullWidth
                    multiple
                    value={this.state.selectedModels}
                    onChange={this.handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={`${value}_model_chip`} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {this.props.models.map((model) => (
                        <MenuItem
                            key={`${model.name}_model_picker`}
                            value={model.name}
                        >
                            {model.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    }
}
