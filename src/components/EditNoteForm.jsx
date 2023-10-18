// import { useState } from "react";

import {
    Input,
    Box,
    Stack,
    Flex,
    Button,
    Heading,
    Center,
    Spinner,
  } from "@chakra-ui/react";
  
  import { useState } from "react";
  import { toast } from "react-toastify";
  import axios from "axios";
import { useNavigate } from "react-router-dom";
  
  export default function EditNoteForm({note}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
      title: note.title,
      text: note.text
    });
  
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
  
        const {data} = await axios.put(`http://localhost:4000/notes/edit/${note._id}`, values);
        
        toast.success(data.message);
        setValues({
          title: "",
          text: ""
        });
        navigate("/");
        
      } catch (error) {
        toast.error(error)
      } finally {
        setLoading(false)
      }
  
    }
  
    return (
      <Box
        mt={5}
        maxW={"300px"}
        maxH={"450px"}
        padding={"40px"}
        border="2px"
        borderColor="gray.200"
        borderRadius={5}
        mr={10}
      >
        <Flex>
          <Stack as="form" onSubmit={handleSubmit}>
            <Heading size="md">
              <Center color="pink.600">Edit Note:  {note.title}</Center>
            </Heading>
  
            <Input
            value={values.title}
              name="title"
              onChange={handleChange}
              variant="outline"
              placeholder="Title"
              mb={3}
            />
            <Input
            value={values.text}
              name="text"
              onChange={handleChange}
              variant="filled"
              placeholder="Content"
              mb={3}
            />
  
            <Button type="submit" bg="blue.600" color="white">
              {loading ? <Spinner /> : "Save"}
            </Button>
          </Stack>
        </Flex>
      </Box>
    );
  }
  