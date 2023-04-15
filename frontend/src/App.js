import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import Ads from './pages/Ads/Ads.jsx';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
        links={['Ads', 'Contact us', 'Log In', 'Sign Up']}
        />
        <Routes>
          <Route path='/ads' element={<Ads/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
