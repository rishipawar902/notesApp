import express from 'express'
import {createClient} from '@supabase/supabase-js'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors({origin:'http://localhost:5173'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const tableName = 'Notes'
let notes = []

async function fetchData() {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log('Fetched data',data);
  notes = data
}

app.delete('/note/:id', async(req,res)=>{
  const noteId = req.params.id
  console.log('Recieved Delete request for ID', noteId)
  const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('ID', noteId); 
    if (error) {
      console.error('Supabase Delete error:', error);
      return res.status(500).send('Error deleting database');
    }
    console.log('Successfully deleted in database!');
    await fetchData();
    res.send('Success');
})


app.put('/edit/submit', async(req,res)=>{
  let newNote = req.body
  console.log(newNote)
  const { error } = await supabase
      .from(tableName)
      .update({
        Title: newNote.Title,
        Body: newNote.Body
      })
      .eq('ID', newNote.id); 
    if (error) {
      console.error('Supabase update error:', error);
      return res.status(500).send('Error updating database');
    }
    console.log('Successfully updated in database!');
    await fetchData();
    res.send('Success');
})

app.post('/create/submit', async (req,res)=>{
  
  console.log("Recieved Values:",req.body)
    try {
    
    // 2. Insert the data into your Supabase table
    // Map 'Title' and 'Body' to whatever your actual column names are in Supabase (usually lowercase)
    const { error } = await supabase
      .from(tableName) 
      .insert([
        { 
          Title: req.body.Title, // Supabase column : Form value
          Body: req.body.Body 
        }
      ])
    console.log('pushed to database')

    // 3. Handle Supabase errors
    if (error) {
      console.error('Supabase insertion error:', error);
    }

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).send('Error');
  }
  await fetchData();
  res.send('Success');

});

app.get('/getNotes', (req,res)=>{
  res.send(notes)
})

app.listen(3000,()=>{
    console.log('server running, fetching Data')
    fetchData()
})
