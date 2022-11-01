import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { ThirteenMpSharp } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class AddShopDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopName: '',
            shopNameError: false,
            maxValue: 0,
            maxValueError: false,
            openHours: 0,
            openHoursError: false,
            closeHours: 0,
            closeHoursError: false,
        }
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }



    save() {
        let maxValue = parseInt(this.state.maxValue);
        let openHours = parseInt(this.state.openHours);
        let closeHours = parseInt(this.state.closeHours);

        let shopNameError = this.state.shopName.length < 1;
        let maxValueError = isNaN(maxValue) || maxValue <= 0;
        let openHoursError = isNaN(openHours) || openHours >= 24;
        let closeHoursError = isNaN(closeHours) || (this.state.openHours === this.state.closeHours) || (openHours >= closeHours) || closeHours >= 24;

        this.setState({
            shopNameError: shopNameError,
            maxValueError: maxValueError,
            openHoursError: openHoursError,
            closeHoursError: closeHoursError
        })
        if (shopNameError || maxValueError || openHoursError || closeHoursError) {
            return;
        }

        this.props.save(
            {

                title: this.state.shopName,
                initValue: 0,
                maxValue: maxValue,
                openHours: openHours,
                closeHours: closeHours
            }
        );
        this.setState({
            shopName: '',
            shopNameError: false,
            maxValue: 0,
            maxValueError: false,
            openHours: 0,
            openHoursError: false,
            closeHours: 0,
            closeHoursError: false,
        });
        this.props.handleDialogClose();
    }


    render() {

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.handleDialogClose}
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                >
                    <DialogTitle>Pridat obchod</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="shopName"
                            label="Nazev"
                            type="text"
                            fullWidth
                            value={this.state.shopName}
                            variant="standard"
                            error={this.state.shopNameError}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="maxValue"
                            label="Maximalni pocet osob"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={this.state.maxValue}
                            error={this.state.maxValueError}
                            onChange={this.handleChange}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="openHours"
                            label="Oteviraci doba"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={this.state.openHours}
                            error={this.state.openHoursError}
                            onChange={this.handleChange}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="closeHours"
                            label="Zaviraci doba"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.closeHours}
                            error={this.state.closeHoursError}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.save}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}
