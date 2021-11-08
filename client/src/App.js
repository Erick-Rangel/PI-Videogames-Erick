import './App.css';

import {Provider} from 'react-redux';
import {store} from './store';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loading from './components/Loading';
import PaginaPrinc from "./components/PaginaPrinc";
import VideogameCreate from './components/Form';
import Detalle from './components/detalle';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/videogame" component={VideogameCreate} />
          <Route exact path="/home" component={PaginaPrinc} />
          <Route exact path="/:id" component={Detalle} />

          <Route exact path="/" component={Loading} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
