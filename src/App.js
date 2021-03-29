import { Container, Row} from 'react-bootstrap'
import './App.css';
import FamilyList from './components/FamilyList'

function App() {
  return (
    
    <Container className="App">
      <Row>
        <FamilyList/>
      </Row>
    </Container>
  );
}

export default App;
