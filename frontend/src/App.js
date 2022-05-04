import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Auth from './Components/Auth/Auth'
import OurMessenger from './Components/OurMessenger/OurMessenger'
import './App.css'

function App() {
  return (
 <div>
<BrowserRouter>
<Switch>
  <Route path='/ourmessager/:id' component={OurMessenger}/>
  <Route path='/' component={Auth} />
</Switch>
</BrowserRouter>
 </div> 
  );
}

export default App;
