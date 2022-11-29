import React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CarModelPicker from "../components/CarModelPicker";
import RangeSlider from "../components/RangeSlider";
import CarTile from "../components/CarTile";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

class CarsPage extends React.Component {


    constructor(props) {
        super(props);
        let result = {
            brands: [],
            minPrice: props.data[0].price,
            maxPrice: props.data[0].price,
            minTachometer: props.data[0].tachometer,
            maxTachometer: props.data[0].tachometer,

            selectedMinPrice: props.data[0].price,
            selectedMaxPrice: props.data[0].price,
            selectedMinTachometer: props.data[0].tachometer,
            selectedMaxTachometer: props.data[0].tachometer,
            selectedFuel: 'Benzín',

            cars: props.data,
            filteredCars: []
        };
        props.data.forEach((element) => {
            if (element.price > result.maxPrice)
                result.maxPrice = element.price;
            if (element.price < result.minPrice)
                result.minPrice = element.price;
            if (element.tachometer > result.maxTachometer)
                result.maxTachometer = element.tachometer;
            if (element.tachometer < result.minTachometer)
                result.minTachometer = element.tachometer;


            if (result.brands === undefined) {
                result.brands = [{
                    name: element.brand,
                    selected: false,
                    models: [{
                        name: element.model,
                        selected: false
                    }]
                }];
            } else {
                let brand = result.brands.findIndex(e => e.name === element.brand);
                if (brand > -1) {
                    let model = result.brands[brand].models.findIndex(e => e.name === element.model);
                    if (model === -1) {
                        result.brands[brand].models.push({
                            name: element.model,
                            selected: false
                        });
                    }

                } else {
                    result.brands.push({
                        name: element.brand,
                        selected: false,
                        models: [{
                            name: element.model,
                            selected: false
                        }]
                    });
                }
            }
        });
        result.selectedMinTachometer = result.minTachometer;
        result.selectedMaxTachometer = result.maxTachometer;
        result.selectedMinPrice = result.minPrice;
        result.selectedMaxPrice = result.maxPrice;
        this.state = result;
        this.carModelChange = this.carModelChange.bind(this);
        this.filterCars = this.filterCars.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.tachometerChange = this.tachometerChange.bind(this);
        this.fuelChange = this.fuelChange.bind(this);
    }

    filterCars(fuel = this.state.selectedFuel) {
        let selected = [];
        this.state.brands.forEach((brand) => {
            if (brand.selected) {
                brand.models.forEach((model) => {
                    if (model.selected) {
                        selected.push(`${brand.name}_${model.name}`);
                    }
                });
            }
        });
        let newCars = [];
        this.state.cars.forEach((car) => {
            if (selected.includes(`${car.brand}_${car.model}`)) {
                if ((this.state.selectedMinPrice <= car.price && car.price <= this.state.selectedMaxPrice) && (
                    this.state.selectedMinTachometer <= car.tachometer && car.tachometer <= this.state.selectedMaxTachometer
                ) && car.fuel === fuel) {
                    newCars.push(car);
                }
            }
        });
        this.setState({
            filteredCars: newCars
        });
    }

    priceChange(values) {
        this.setState({
            selectedMaxPrice: values[1],
            selectedMinPrice: values[0]
        })
        this.filterCars();
    }

    tachometerChange(values) {
        this.setState({
            selectedMaxTachometer: values[1],
            selectedMinTachometer: values[0]
        });
        this.filterCars();
    }

    fuelChange(event){
        this.setState({
            selectedFuel:event.target.value
        });
        this.filterCars(event.target.value);
    }


    carModelChange(brand, models) {
        let brandIndex = this.state.brands.findIndex(e => e.name === brand);
        if (brandIndex > -1) {
            this.state.brands[brandIndex].models.forEach((model) => {
                model.selected = !!models.includes(model.name);
            })
        }
        this.filterCars();
    }

    render() {
        return (
            <div>
                <Grid container spacing={1} style={{padding: 25}}
                      direction='column'
                      alignItems='start'
                      justifyContent='center'>
                    <h3>Palivo:</h3>
                    <FormControl>
                        <RadioGroup
                            row
                            defaultValue="petrol"
                            onChange={this.fuelChange}
                            value={this.state.selectedFuel}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Benzín" control={<Radio/>} label="Benzín" />
                            <FormControlLabel value="Nafta" control={<Radio/>} label="Nafta"/>
                            <FormControlLabel value="Elektro" control={<Radio/>} label="Elektro"/>
                        </RadioGroup>
                    </FormControl>
                    <h3>Značka:</h3>
                    <Grid container spacing={1}
                          direction='row'
                          alignItems='start'
                          justifyContent='start'>
                        {
                            this.state.brands.map((b) => <Grid item xs={6} md={3} key={`${b.name}_brand`}>
                                <FormControlLabel style={{display: 'flex', justifyContent: 'start'}}
                                                  control={<Checkbox onChange={(value) => {
                                                      b.selected = value.target.checked;
                                                      if (!value.target.checked) {
                                                          b.models.forEach((m) => {
                                                              m.selected = false;
                                                          });
                                                          this.filterCars();
                                                      }
                                                      this.setState({})
                                                  }}/>}
                                                  label={b.name}/>
                            </Grid>)
                        }
                    </Grid>
                    <Grid container spacing={5}
                          direction='row'
                          alignItems='start'
                          justifyContent='start'>
                        {
                            this.state.brands.filter(
                                b => b.selected
                            ).map(e => <CarModelPicker models={e.models} title={e.name} key={`${e.name}_model`}
                                                       handleChange={this.carModelChange}/>)
                        }
                    </Grid>

                    <Grid container spacing={5}
                          direction='row'
                          alignItems='start'
                          style={{marginTop: 15}}
                          justifyContent='start'>
                        <RangeSlider values={[this.state.minPrice, this.state.maxPrice]} title='Cena'
                                     onChange={this.priceChange}/>
                        <RangeSlider values={[this.state.minTachometer, this.state.maxTachometer]}
                                     title='Počet kilometrů' onChange={this.tachometerChange}/>
                    </Grid>


                    <Grid container spacing={5}
                          direction='row'
                          alignItems='start'
                          style={{marginTop: 15}}
                          justifyContent='start'>
                        {this.state.filteredCars.map((e, index) => <Grid item xs={12} md={6} key={`car_${index}`}>
                            <CarTile car={e}/>
                        </Grid>)}
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default CarsPage;