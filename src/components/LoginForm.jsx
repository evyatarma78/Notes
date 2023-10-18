import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    user_name: "",
    user_password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("http://localhost:4000/users/login", values);

      toast.success(data.message);
      setCookie("token", data.token, { path: "/", maxAge: 10800 });
      setUser(data.user);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={16} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}> Log in Please </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as="form" spacing={4} onSubmit={handleLoginSubmit}>
            <FormControl id="username">
              <FormLabel>User Name</FormLabel>
              <Input
                name="user_name"
                onChange={handleChange}
                type="text"
                placeholder="Enter User Name"
                _hover={{ bg: "blue.100" }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="user_password"
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
                _hover={{ bg: "blue.100" }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {loading ? <Spinner /> : "Log in"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
