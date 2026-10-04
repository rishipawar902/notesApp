import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'


const Create = () =>{
  const navigate = useNavigate()
  const handleSubmit = async (event) =>{
      event.preventDefault()
      const formData = new FormData(event.target)
      const formValues = Object.fromEntries(formData)
      await fetch('http://127.0.0.1:3000/create/submit', {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(formValues) 
    });
      navigate('/')
}
  
  
  
  return(
        
      <div className="trello-form-wrapper">
        <div className="trello-form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="title">
              <Form.Label>Note Title</Form.Label>
              <Form.Control className="trello-dark-input" type="text" name='Title' placeholder="e.g., Weekly Goals" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="body">
              <Form.Label>Note Details</Form.Label>
              <Form.Control className="trello-dark-input" as="textarea" name='Body' rows={6} placeholder="What needs to get done?" />
            </Form.Group>
            <Button className="trello-submit-btn" type="submit">Create Note</Button>
          </Form>
        </div>
      </div>
    )
}

export default Create