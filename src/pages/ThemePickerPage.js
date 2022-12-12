import React from 'react';
import { BlockPicker } from 'react-color';


class ThemePickerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color:props.theme.palette.primary.main
        }
        this.handleChangeComplete= this.handleChangeComplete.bind(this);
    }


    handleChangeComplete (color)  {
        this.setState({
            color:color
        })
        this.props.change(color.hex);
    };


    render() {
        return (
            <BlockPicker  color={this.state.color} onChangeComplete={
                this.handleChangeComplete
            }/>
        );
    }
}

export default ThemePickerPage;