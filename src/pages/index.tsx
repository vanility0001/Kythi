import API from "../api";
import * as React from "react";
import { NextSeo } from "next-seo";
import "focus-visible/dist/focus-visible";
import { BsImages } from "react-icons/bs";
import { GiPartyHat } from "react-icons/gi";
import { SiSpeedtest } from "react-icons/si";
import { SiMaildotru } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import styles from "../styles/index.module.css";
import { RiFingerprint2Line } from "react-icons/ri";
import { FaUserAltSlash, FaUserAlt, FaLock, FaLockOpen } from "react-icons/fa";
import {
  MdSettingsInputComposite,
  MdOutlineSlowMotionVideo,
  MdSystemUpdateAlt,
} from "react-icons/md";
import {
  Box,
  Text,
  Link,
  Flex,
  Modal,
  Input,
  Stack,
  Center,
  HStack,
  chakra,
  Button,
  Heading,
  Divider,
  useToast,
  ModalBody,
  InputGroup,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Homepage() {
  const {
    isOpen: registerOpened,
    onClose: registerClose,
    onOpen: registerOpen,
  } = useDisclosure();
  const {
    isOpen: loginOpened,
    onClose: loginClose,
    onOpen: loginOpen,
  } = useDisclosure();
  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = React.useState({
    username: "",
    password: "",
    email: "",
    invite: "",
  });
  const RegPassword = () => setShow(!show);
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const modals = useColorModeValue("white", "#2E3440");

  const handleRegisterChange = (e) => {
    switch (e.target.placeholder) {
      case "Username":
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          username: e.target.value,
        }));
        break;
      case "Password":
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          password: e.target.value,
        }));
        break;
      case "Email-Address":
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          email: e.target.value,
        }));
        break;
      case "Invite-Code":
        setRegisterInfo((prevInfo) => ({
          ...prevInfo,
          invite: e.target.value,
        }));
        break;
      default:
        return;
    }
  };
  const handleLoginChange = (e) => {
    switch (e.target.placeholder) {
      case "Username/Email":
        setLoginInfo((prevInfo) => ({
          ...prevInfo,
          username: e.target.value,
        }));
        break;
      case "Password":
        setLoginInfo((prevInfo) => ({
          ...prevInfo,
          password: e.target.value,
        }));
        break;
      default:
        return;
    }
  };

  function registerSubmit() {
    API.register(
      registerInfo.username,
      registerInfo.email,
      registerInfo.password,
      registerInfo.invite
    )
      .then((data) => {
        setRegisterInfo({
          username: "",
          password: "",
          email: "",
          invite: "",
        });

        toast({
          title: "Success!",
          description: data.message,
          status: "success",
          position: "top-right",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
        });
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          return toast({
            title: "You seemed to have encountered an error!",
            description:
              "The API is unfortunately down please check back later.",
            status: "error",
            position: "top-right",
            duration: 9000,
            isClosable: true,
            variant: "left-accent",
          });
        }

        return toast({
          title: "You seemed to have encountered an error!",
          description: err.data.message,
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
        });
      });
  }

  return (
    <>
      <NextSeo
        title="Kythi.com"
        description="Kythi.com is a new service currently being made."
        additionalMetaTags={[
          {
            property: "theme-color",
            content: "#2E3440",
          },
        ]}
        openGraph={{
          title: "",
          description: "Kythi.com is a new service currently being made.",
        }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#434C5E"
          fillOpacity="1"
          d="M0,288L80,288C160,288,320,288,480,250.7C640,213,800,139,960,122.7C1120,107,1280,149,1360,170.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>

      <Flex
        mt={["100px", "100px", "28px", "-80px", "-100px", "-160px"]}
        mb="100px"
        alignItems="center"
        justifyContent="center"
      >
        <Flex direction="column" width={["360px", "400px", "auto", "auto"]}>
          <Center>
            <Flex>
              <Heading
                className={styles.nord}
                fontSize={["50px", "60px", "50px", "50px"]}
                alignContent="center"
              >
                Kythi.
              </Heading>
            </Flex>
          </Center>
          <Center>
            <Text
              color="gray.400"
              fontSize={["18px", "18px", "18px", "18px"]}
              mb={2}
              alignContent="center"
            >
              {"Personalized digital services for You."}
            </Text>
          </Center>
          <Divider mb={5} />
          <Stack justify="true" direction="row" spacing={2}>
            <Button
              w="100%"
              h="33px"
              onClick={loginOpen}
              colorScheme="blue"
              variant="outline"
            >
              Login
            </Button>
            <Button
              w="100%"
              h="33px"
              onClick={registerOpen}
              colorScheme="blue"
              variant="outline"
            >
              Register
            </Button>
          </Stack>
          <Modal isCentered isOpen={registerOpened} onClose={registerClose}>
            <ModalOverlay />
            <ModalContent
              bg={modals}
              width={["350px", "350px", "450px", "500px"]}
            >
              <ModalHeader> {"Register"} </ModalHeader>
              <Center>
                <Divider borderColor="#81A1C1" w="90%" mb={3} />
              </Center>
              <ModalCloseButton />
              <ModalBody>
                <InputGroup>
                  <InputLeftElement mt="-4px" size="sm">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: "1px",
                      borderColor: "#81A1C1",
                      transition: ".5s",
                      bg: "#3B4252",
                    }}
                    transition="1s"
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    mb={3}
                    onChange={handleRegisterChange}
                    value={registerInfo.username}
                    placeholder="Username"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="-4px">
                    <RiFingerprint2Line size="20" />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: "1px",
                      borderColor: "#81A1C1",
                      transition: ".5s",
                      bg: "#3B4252",
                    }}
                    transition="1s"
                    type={show ? "text" : "password"}
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    onChange={handleRegisterChange}
                    value={registerInfo.password}
                    placeholder="Password"
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      ml="5"
                      variant="ghost"
                      h="1.5rem"
                      mb="2"
                      __css={{}}
                      _hover={{ color: "#D8DEE9" }}
                      size="sm"
                      onClick={RegPassword}
                    >
                      {show ? <FaLockOpen /> : <FaLock />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="9px" size="sm">
                    <SiMaildotru size="18" />
                  </InputLeftElement>
                  <Input
                    _hover={{
                      border: "1px",
                      borderColor: "#81A1C1",
                      transition: ".5s",
                      bg: "#3B4252",
                    }}
                    transition="1s"
                    isRequired
                    focusBorderColor="blue.300"
                    size="sm"
                    mt={3}
                    rounded={6}
                    variant="filled"
                    onChange={handleRegisterChange}
                    value={registerInfo.email}
                    placeholder="Email-Address"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="8px" size="sm">
                    <GiPartyHat size="20" />
                  </InputLeftElement>
                  <Input
                    _hover={{
                      border: "1px",
                      borderColor: "#81A1C1",
                      transition: ".5s",
                      bg: "#3B4252",
                    }}
                    transition="1s"
                    isRequired
                    focusBorderColor="blue.300"
                    size="sm"
                    mt={3}
                    rounded={6}
                    variant="filled"
                    onChange={handleRegisterChange}
                    value={registerInfo.invite}
                    placeholder="Invite-Code"
                  />
                </InputGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  height="33px"
                  width="100%"
                  colorScheme="blue"
                  variant="outline"
                  onClick={registerSubmit}
                >
                  Register
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isCentered isOpen={loginOpened} onClose={loginClose}>
            <ModalOverlay />
            <ModalContent
              boxShadow="0px"
              width={["350px", "350px", "auto", "500px"]}
              bg={modals}
            >
              <ModalHeader>
                {" "}
                <Flex>{"Login"} </Flex>
              </ModalHeader>
              <Center>
                <Divider borderColor="#81A1C1" w="90%" mb={3} />
              </Center>
              <ModalCloseButton />
              <ModalBody>
                <InputGroup>
                  <InputLeftElement mt="-4px">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: "1px",
                      borderColor: "#81A1C1",
                      transition: ".5s",
                      bg: "#3B4252",
                    }}
                    transition="1s"
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    mb={3}
                    onChange={handleLoginChange}
                    value={loginInfo.username}
                    placeholder="Username/Email"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement mt="-4px">
                    <RiFingerprint2Line size="20" />
                  </InputLeftElement>
                  <Input
                    isRequired
                    _hover={{
                      border: "1px",
                      borderColor: "#81A1C1",
                      transition: ".5s",
                      bg: "#3B4252",
                    }}
                    transition="1s"
                    focusBorderColor="blue.300"
                    size="sm"
                    rounded={6}
                    variant="filled"
                    type={show ? "text" : "password"}
                    onChange={handleLoginChange}
                    value={loginInfo.password}
                    placeholder="Password"
                  />
                </InputGroup>
              </ModalBody>
              <ModalFooter>
                <Stack align="center" justify="true" direction="column">
                  <Link
                    href="/reset-password"
                    color="gray.400"
                    cursor="default"
                    mt="-15px"
                    _hover={{ color: "gray.200" }}
                  >
                    Forgotten your password?
                  </Link>
                  <Button
                    colorScheme="blue"
                    width={["300px", "300px", "400px", "400px"]}
                    h="35px"
                    rounded="5px"
                    variant="outline"
                    onClick={function () {}}
                  >
                    Login
                  </Button>
                  <chakra.button
                    __css={{ cursor: "default" }}
                    width={["300px", "300px", "400px", "400px"]}
                    h="35px"
                    bg="#5865F2"
                    rounded="5px"
                    _hover={{ bg: "#7289da" }}
                    onClick={function () {}}
                  >
                    Login with Discord
                  </chakra.button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Text
          fontSize={["37px", "43px", "60px", "50px"]}
          mb={3}
          color={"#d8dee9"}
          alignContent="center"
        >
          {"Statistics"}
        </Text>
      </Flex>
      <Flex mb="15px" alignItems="center" justifyContent="center">
        <Stack direction={["column", "row"]}>
          <Box
            __css={{ cursor: "default" }}
            transition="1s"
            _hover={{
              transform: "translateY(-4px)",
              transition: ".5s",
              bg: "#4C566A",
            }}
            bg={"#3B4252"}
            width={["350px", "230px", "350px", "350px"]}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="13px"
          >
            <HStack>
              <BsImages size="23px" />
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Total Uploads
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              Loading...
            </Heading>
          </Box>
          <Box
            __css={{ cursor: "default" }}
            w="350px"
            transition="1s"
            _hover={{
              transform: "translateY(-4px)",
              transition: ".8s",
              bg: "#4C566A",
            }}
            width={["350px", "230px", "350px", "350px"]}
            bg={"#3B4252"}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="13px"
          >
            <HStack>
              <BiUserCircle size="25px">
                <Box />
              </BiUserCircle>
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Total Users.
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              Loading...
            </Heading>
          </Box>
        </Stack>
      </Flex>
      <Flex mb="150px" alignItems="center" justifyContent="center">
        <Stack direction={["column", "row"]}>
          <Box
            __css={{ cursor: "default" }}
            transition="1s"
            _hover={{
              transform: "translateY(-4px)",
              transition: ".5s",
              bg: "#4C566A",
            }}
            bg={"#3B4252"}
            width={["350px", "230px", "350px", "350px"]}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="13px"
          >
            <HStack>
              <FaUserAltSlash size="25px" />
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Banned Users
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              Loading...
            </Heading>
          </Box>
          <Box
            __css={{ cursor: "default" }}
            w="350px"
            transition="1s"
            _hover={{
              transform: "translateY(-4px)",
              transition: ".8s",
              bg: "#4C566A",
            }}
            width={["350px", "230px", "350px", "350px"]}
            bg={"#3B4252"}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="13px"
          >
            <HStack>
              <MdSettingsInputComposite size="25px" />
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Total Domains.
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              Loading...
            </Heading>
          </Box>
        </Stack>
      </Flex>

      <Flex className={styles.center}>
        <Text
          fontSize={["37px", "43px", "60px", "60px"]}
          mb={3}
          color="#d8dee9"
          alignContent="center"
        >
          {"Features"}
        </Text>
      </Flex>

      <Flex mb="50px" alignItems="center" justifyContent="center">
        <Stack
          spacing={["4", "4", "4", "2", "2"]}
          direction={["column", "column", "column", "row", "row"]}
        >
          <Box
            __css={{ cursor: "default" }}
            width={["350px", "320px", "720px", "300px", "350px", "450px"]}
            transition="1s"
            _hover={{
              transform: "translateY(-10px)",
              transition: ".5s",
              bg: "#4C566A",
            }}
            bg={"#3B4252"}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="10px"
          >
            <HStack>
              <MdSystemUpdateAlt size="25">
                <Box />
              </MdSystemUpdateAlt>
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Personalisation.
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              {
                "We allow you to customise your Files, embeds, profile and more, so get started!"
              }
            </Heading>
          </Box>
          <Box
            __css={{ cursor: "default" }}
            width={["350px", "320px", "720px", "300px", "350px", "450px"]}
            transition="1s"
            _hover={{
              transform: "translateY(-10px)",
              transition: ".8s",
              bg: "#4C566A",
            }}
            bg={"#3B4252"}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="13px"
          >
            <HStack>
              <SiSpeedtest size="24px">
                <Box />
              </SiSpeedtest>
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Fast Uploads.
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              {
                "When making our host, we strived to make it as user-accessible and a great experience to use! That is why we focused on the upload speed first."
              }
            </Heading>
          </Box>
          <Box
            __css={{ cursor: "default" }}
            width={["350px", "320px", "720px", "300px", "350px", "450px"]}
            transition="1s"
            _hover={{
              transform: "translateY(-10px)",
              transition: ".5s",
              bg: "#4C566A",
            }}
            bg={"#3B4252"}
            px="20px"
            py="30px"
            shadow="xl"
            rounded="13px"
          >
            <HStack>
              <MdOutlineSlowMotionVideo size="25px">
                <Box />
              </MdOutlineSlowMotionVideo>
              <Heading size="md" fontWeight="medium" color={"gray.400"}>
                Various File-Types.
              </Heading>
            </HStack>

            <Heading as="h4" size="sm" mt="2" fontWeight="medium">
              {
                "We, support many File Types, for example we allow .mp4, .mp3, .png, .jpg and more!"
              }
            </Heading>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
