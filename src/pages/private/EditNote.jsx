import { useParams } from 'react-router-dom';
import EditNoteForm from '../../components/EditNoteForm';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
    
function EditNote() {



    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [note, setNote] = useState(null);

    useEffect(()=>{

        const getNoteById = async ()=>{

            try {
                setLoading(true);

                const {data} = await axios.get(`http://localhost:4000/notes/by-id/${id}`);

                setNote(data.note);
                
            } catch (error) {
                setError(error.response.data.error)
                
            } finally {
                setLoading(false)
            }
        }

        getNoteById();
    },[])
  return (
    
    <>
      {loading ? <Spinner /> : null}
      {error ? <Text>{error}</Text> : null}
      {note ? <EditNoteForm note={note} /> : null}

    </>
  )
}

export default EditNote