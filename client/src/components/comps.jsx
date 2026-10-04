import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'


const Get_Card = ({note, onDeleteRequest})=>{
const navigate = useNavigate()
  const handleEdit = () => {
  
  navigate(`/edit/${note.ID}`, {state:{note}})
}
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevents the card click (edit) from firing
    onDeleteRequest(note); // Tell the Home component to pop up the modal
  }

  return(
      <Card className="trello-card" onClick={handleEdit}>
      <Card.Body>
        <div className="delete-icon" onClick={handleDelete} title="Delete note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </div>
        <Card.Title>{note.Title}</Card.Title>
        <Card.Text>
          {note.Body}
        </Card.Text>
        <div className="trello-card-badges">
          <span className="badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 1</span>
        </div>
      </Card.Body>
    </Card>
    )
}



function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">NotesApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Button href='/create'>Create New</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export {NavBar}
export default Get_Card