import { useState, useEffect } from 'react'
import Get_Card from './components/comps';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Home = ()=>{
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);
  
  useEffect(()=>{async function getNotes() {
      try {
        const response = await axios.get('http://127.0.0.1:3000/getNotes');
        setNotes(response.data); 
      } catch (error) {
        console.error("3. Error caught:", error.message)
      }
    }
    getNotes();
  },[])

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await fetch('http://127.0.0.1:3000/note/' + noteToDelete.ID, { method: 'DELETE' });
      // Instantly remove it from the screen without reloading!
      setNotes(notes.filter(n => n.ID !== noteToDelete.ID));
      setNoteToDelete(null); // Close the modal
    } catch (e) {
      console.error(e);
    }
  }

  return(
    <div className="trello-board-container">
      <div className="trello-list">
        <div className="trello-list-header">All Notes</div>
        <div className="trello-list-cards">
          {notes.map(mf=><Get_Card note={mf} key={mf.ID} onDeleteRequest={setNoteToDelete}/>)}
        </div>
      </div>
      
      {/* The Single Shared Modal */}
      <Modal show={!!noteToDelete} onHide={() => setNoteToDelete(null)} contentClassName="trello-dark-modal">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Delete Note?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{noteToDelete?.Title}"? This cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNoteToDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Home