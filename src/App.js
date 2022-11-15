import './App.css';
import WelcomePage from './pages/WelcomePage.js';
import DashboardPage from './pages/DashboardPage';
import {
  Routes,
  Route
} from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import ShopPage from './pages/ShopPage';
import { useNavigate } from 'react-router-dom';



function App() {

  const navigation = useNavigate()
  return (
    <div className="App">
      <NavigationBar navigation={navigation} content={
        <Routes >
          <Route exact path="/shops" element={<ShopPage  shops={initData.shops}  />} />
          <Route exact path="/dashboard" element={<DashboardPage  data={populationStatistics}  />} />
          <Route exact path="*" element={<WelcomePage />} />
        </Routes>
      } />
    </div>
  );
}


const initData = {
  shops: [
    {

      title: 'Shop_1',
      initValue: 0,
      maxValue: 2,
      openHours:6,
      closeHours: 22
    },
    {

      title: 'Shop_3',
      initValue: 0,
      maxValue: 12,
      openHours:6,
      closeHours: 22
    }
  ]
}

const populationStatistics = [
  {
    year:2015,
    population:10554,
    births:110734,
    deaths:111173
  },
  {
    year:2016,
    population:10578,
    births:112663,
    deaths:107705
  },
  {
    year:2017,
    population:10610,
    births:114405,
    deaths:111443
  },
  {
    year:2018,
    population:10650,
    births:114036,
    deaths:112920
  },
  {
    year:2019,
    population:10694,
    births:112231,
    deaths:112362
  },
  {
    year:2020,
    population:10702,
    births:110200,
    deaths:129289
  },
  {
    year:2021,
    population:10516,
    births:111893,
    deaths:139891
  }
]



export default App;
