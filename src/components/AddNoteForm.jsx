
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

import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddNoteForm() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    text: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const {data} = await axios.post("http://localhost:4000/notes/add", values);
      
      toast.success(data.message);
      setValues({
        title: "",
        text: ""
      });

      navigate("/")
      
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }

  }

  return (
   <Center>
   <Box
    
   mt={6}
   maxW={"400px"}
   maxH={"750px"}
   padding={"80px"}
   border="2px"
   borderColor="blue.200"
   borderRadius={10}
   mr={10}
 >
   <Flex>
     <Stack as="form" onSubmit={handleSubmit}>
       <Heading mb={3} size="lg">
       
         <Center color="green.600">Add New Note</Center>
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

       <Button type="submit" bg="blue.800" color="white">
         {loading ? <Spinner /> : <AddIcon boxSize={4} ml={5} mr={0.2}></AddIcon>}
       </Button>
     </Stack>
   </Flex>
 </Box>
   </Center>
  );
}
