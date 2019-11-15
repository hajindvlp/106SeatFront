import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Select from './components/choose';
import Seat from './components/seat';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <h2> <Link to="/select"> 내 자리 입력하기 </Link> </h2>
      <h2> <Link to="/seat"> 자리 보기 </Link> </h2>
      <Route path="/select"> <Select /> </Route>
      <Route path="/seat"> <Seat /> </Route>
      <footer>
        <p>18기 정하진 제작</p>
        <i className="fa fa-github" aria-hidden="true"></i>
      </footer>
    </div>
    </Router>
  );
}

export default App;
