import { Container, Row} from 'react-bootstrap'
import './App.css';
import FamilyList from './components/FamilyList'
import {Provider} from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
    <Container className="App">
      <Row>
        <FamilyList/>
      </Row>
    </Container>
    </Provider>
  );
}

export default App;
