import './App.scss';
import Home from './pages/Home/Home.jsx';
import Ads from './pages/Ads/Ads.jsx';
import Ad from './pages/Ad/Ad.jsx';
import AddClassifiedAd from './pages/AddAd/AddAd';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import UserProfile from './pages/UserProfile/UserProfile'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ads' element={<Ads/>}/>
          <Route path='/ads/:id' element={<Ad/>}/>
          <Route path='/addad' element={<AddClassifiedAd/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/users/:id" element={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
