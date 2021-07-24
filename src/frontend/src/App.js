import './App.scss';
import { TeamPage } from './Pages/TeamPage';
import { MatchPage } from './Pages/MatchPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path='/team/:teamName/matches'>
            <MatchPage />
          </Route>
          <Route path='/team/:teamName'>
            <TeamPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
