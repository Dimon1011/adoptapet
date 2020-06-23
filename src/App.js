import React, { useState } from 'react';
import './App.css';
import SearchParams from './components/searchparams';
import {Router, Link} from '@reach/router';
import Details from './components/details';
import ThemeContext from './components/ThemeContext';
import 'animate.css';



// class App extends Component {

//   // constructor(){
//   //   super()
//   // }
//   render ()
const App = () => {
  const themehook = useState('darkblue');
  return (
    <ThemeContext.Provider value={themehook}>
    <div>
    <Link to='/'><h1 id='anim' 
    className="animate__animated animate__headShake animate__repeat-3">Adopt Me!</h1></Link>
    <Router>
      <SearchParams path='/'/>
      <Details path='/details/:id'/>
     </Router> 
    </div>
    </ThemeContext.Provider>
  );
}


export default App;
