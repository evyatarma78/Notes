import React from "react";
import { Box, Button, Heading, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Fix import

const Card = ({ note, deleteFunction, loading }) => {
  const { user } = useAuth();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-around"}
      alignItems={"center"}
      width={"250px"}
      height={"300px"}
      backgroundColor={"#748E63"}
      boxShadow=" 10px 8px 10px 0px rgba(135,135,135,0.52)"
      borderRadius="10px"
      margin={"20px"}
      _hover={{ position: "relative", bottom: "5px" }}
    >
      <Heading fontWeight="bold" fontSize="lg">
        {note.title}
      </Heading>
      <Text mt={2}>{note.text}</Text>

      {user && (
        <Box mt={4}>
          <Button
            as={Link}
            to={`edit/${note._id}`}
            fontSize={"md"}
            padding=".5em"
            borderRadius="10px"
            margin="10px"
            _hover={{
              color: "black",
              borderRadius: "10px",
              backgroundColor: "rgb(3, 194, 252,.5)",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              deleteFunction(note._id);
            }}
            fontSize={"md"}
            padding=".5em"
            borderRadius="10px"
            margin="10px"
            _hover={{
              color: "black",
              borderRadius: "10px",
              backgroundColor: "rgb(3, 194, 252,.5)",
            }}
          >
            {loading ? <Spinner /> : "Delete"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Card;
