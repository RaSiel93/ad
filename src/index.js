import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Advert = ({ match }) => (
  <div>
    <h3>{match.params.advertId}</h3>
  </div>
);

const Adverts = ({ match }) => (
  <div>
    <h2>Adverts</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:advertId`} component={Advert} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a advert.</h3>}
    />
  </div>
);

class NewAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.text);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type='text' value={this.state.text} onChange={this.handleChange}/>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/adverts">Adverts</Link>
        </li>
        <li>
          <Link to="/adverts/new">New Advert</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/adverts" component={Adverts} />
      <Route path="/adverts/new" component={NewAdvert} />
    </div>
  </Router>
);

export default BasicExample;

ReactDOM.render(
  <BasicExample />,
  document.getElementById('root')
);
