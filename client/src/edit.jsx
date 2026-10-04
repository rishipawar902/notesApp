import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const Edit = ()=>{
    const location  = useLocation();
    const note = location.state?.note;

    const navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const objData = Object.fromEntries(formData)
    objData.id = note.ID
    await fetch('http://127.0.0.1:3000/edit/submit', {method:'PUT', body:JSON.stringify(objData), headers:{"Content-Type": "application/json"}})
    navigate('/')
}

    return (
      <div className="trello-form-wrapper">
        <div className="trello-form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="title">
              <Form.Label>Note Title</Form.Label>
              <Form.Control className="trello-dark-input" defaultValue={note?.Title} type="text" name='Title' placeholder="e.g., Weekly Goals" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="body">
              <Form.Label>Note Details</Form.Label>
              <Form.Control className="trello-dark-input" defaultValue={note?.Body} as="textarea" name='Body' rows={6} placeholder="What needs to get done?" />
            </Form.Group>
            <Button className="trello-submit-btn" type="submit">Save Changes</Button>
          </Form>
        </div>
      </div>
    )
}


export default Edit