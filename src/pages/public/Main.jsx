import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import NotesContainer from '../../components/NotesContainer';


function Main() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState();


  useEffect(()=>{

    const getAllNotes = async ()=>{
      try {
        setLoading(true);

        const {data} = await axios.get("http://localhost:4000/notes/all");


        setNotes(data.notes);


      } catch (error) {
        setError(error.response.error.data)
      } finally {
        setLoading(false);
      }
    }

    getAllNotes();
  },[]);

  return (
    <>
      {loading ? <Spinner/> : null}
      {error ? <p>{error}</p> : null}
      {notes ? <NotesContainer notesData={notes}/> : null}
    </>
  )
}

export default Main