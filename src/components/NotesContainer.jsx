import { Flex } from "@chakra-ui/react";
import Card from "./Card";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function NotesContainer({ notesData }) {

  const [notes, setNotes] = useState([...notesData]);
  const [loading, setLoading] = useState(false)


  const handleDelete = async(id)=>{

    try {

      setLoading(true);

      const {data} = await axios.delete(`http://localhost:4000/notes/delete/${id}`);

      toast.success(data.message);

      setNotes(notes.filter(note => note._id !== id));
      
    } catch (error) {
      toast.error(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Flex 
      flexWrap="wrap">
        {notes.map((note) => {
          return (
            <Card
              key={note._id}
              note={note}
              deleteFunction={handleDelete}
              loading={loading}
            />
          );
        })}
      </Flex>
    </>
  );
}

export default NotesContainer;
