import './App.css';
import WelcomePage from './pages/WelcomePage.js';
import DashboardPage from './pages/DashboardPage';
import {
    Routes,
    Route
} from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import ShopPage from './pages/ShopPage';
import CarsPage from './pages/CarsPage';
import {useNavigate} from 'react-router-dom';
import {createTheme, useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {green, purple} from "@mui/material/colors";
import {ThemeProvider} from "@emotion/react";
import ThemePickerPage from "./pages/ThemePickerPage";


function App() {

    const navigation = useNavigate()
    let theme = createTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, []);


    const changeTheme = (color) => {
        setSelectedTheme(
            createTheme({
                palette: {
                    primary: {
                        main: color,
                    },
                },
            })
        )
    }

    return (
        <div className="App">
            <ThemeProvider    theme={selectedTheme} >
                <NavigationBar navigation={navigation} content={
                    <Routes>
                        <Route exact path="/shops" element={<ShopPage shops={initData.shops}/>}/>
                        <Route exact path="/dashboard" element={<DashboardPage data={populationStatistics}/>}/>
                        <Route exact path="/cars" element={<CarsPage data={cars}/>}/>
                        <Route exact path="/theme" element={<ThemePickerPage change={changeTheme} theme ={selectedTheme}/>}/>
                        <Route exact path="*" element={<WelcomePage />}/>
                    </Routes>
                }/>
            </ThemeProvider>
        </div>
    );
}

const cars = [
    {
        brand: 'Ford',
        model: 'Kuga',
        price: 429000,
        tachometer: 75000,
        fuel: 'Nafta'
    },
    {
        brand: 'Audi',
        model: 'A4',
        price: 68000,
        tachometer: 366536,
        fuel: 'Nafta'
    },
    {
        brand: 'Škoda',
        model: 'Octavia',
        price: 630000,
        tachometer: 57021,
        fuel: 'Nafta'
    },
    {
        brand: 'BMW',
        model: 'X5',
        price: 759000,
        tachometer: 135000,
        fuel: 'Nafta'
    },
    {
        brand: 'Audi',
        model: 'A6',
        price: 359999,
        tachometer: 205900,
        fuel: 'Nafta'
    },
    {
        brand: 'Škoda',
        model: 'Octavia',
        price: 225000,
        tachometer: 197407,
        fuel: 'Nafta'
    },


    {
        brand: 'BMW',
        model: 'X5',
        price: 2249900,
        tachometer: 9422,
        fuel: 'Benzín'
    },
    {
        brand: 'Audi',
        model: 'A4',
        price: 899000,
        tachometer: 28364,
        fuel: 'Benzín'
    },
    {
        brand: 'Ford',
        model: 'Focus',
        price: 120000,
        tachometer: 141000,
        fuel: 'Benzín'
    },
    {
        brand: 'BMW',
        model: 'X6',
        price: 3799000,
        tachometer: 4001,
        fuel: 'Benzín'
    },
    {
        brand: 'Škoda',
        model: 'Fabia',
        price: 373000,
        tachometer: 22961,
        fuel: 'Benzín'
    },
    {
        brand: 'Škoda',
        model: 'Superb',
        price: 90000,
        tachometer: 219887,
        fuel: 'Benzín'
    },

    {
        brand: 'Tesla',
        model: 'Model 3',
        price: 1300000,
        tachometer: 12000,
        fuel: 'Elektro'
    },
    {
        brand: 'Hyundai',
        model: 'Kona',
        price: 899000,
        tachometer: 7000,
        fuel: 'Elektro'
    },
    {
        brand: 'Škoda',
        model: 'Enyaq iV',
        price: 1799000,
        tachometer: 1,
        fuel: 'Elektro'
    },
    {
        brand: 'BMW',
        model: 'i3',
        price: 1199000,
        tachometer: 13900,
        fuel: 'Elektro'
    },
];

const initData = {
    shops: [
        {

            title: 'Shop_1',
            initValue: 0,
            maxValue: 2,
            openHours: 6,
            closeHours: 22
        },
        {

            title: 'Shop_3',
            initValue: 0,
            maxValue: 12,
            openHours: 6,
            closeHours: 22
        }
    ]
}

const populationStatistics = [
    {
        year: 2015,
        population: 10554,
        births: 110734,
        deaths: 111173
    },
    {
        year: 2016,
        population: 10578,
        births: 112663,
        deaths: 107705
    },
    {
        year: 2017,
        population: 10610,
        births: 114405,
        deaths: 111443
    },
    {
        year: 2018,
        population: 10650,
        births: 114036,
        deaths: 112920
    },
    {
        year: 2019,
        population: 10694,
        births: 112231,
        deaths: 112362
    },
    {
        year: 2020,
        population: 10702,
        births: 110200,
        deaths: 129289
    },
    {
        year: 2021,
        population: 10516,
        births: 111893,
        deaths: 139891
    }
]


export default App;
