import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from './Screen/loginScreen';
import RegisterScreen from './Screen/registerScreen';
import PationDetailsScreen from './Screen/pationDetailsScreen';
import PationHistoryScreen from './Screen/pationHistoryScreen';
import PationDetailsResultScreen from './Screen/pationDetailsResultScreen';
import PationHistoryScreenResult from './Screen/pationHistoryScreenResult';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path='/' element={ <LoginScreen/>}/>
          <Route path='/register' element={ <RegisterScreen/>}/>
          <Route path='/detaills' element={ <PationDetailsScreen/>}/>
          <Route path='/detaillsR/:phone_no' element={ <PationDetailsResultScreen/>}/>
          <Route path='/history/:phone_no' element={ <PationHistoryScreen/>}/>
          <Route path='/historyR' element={ <PationHistoryScreenResult/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
