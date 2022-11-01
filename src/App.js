import './App.css';
import WelcomePage from './pages/WelcomePage.js';
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

export default App;
