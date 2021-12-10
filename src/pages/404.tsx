import "focus-visible/dist/focus-visible";
import { Link, Box, Heading, Text } from "@chakra-ui/react";
import { Button, Flex, Center, Stack } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
      <Flex mt={"350px"} alignItems="center" justifyContent="center">
        <Flex direction="column" width={["360px", "400px", "auto", "auto"]}>
          <Box
            __css={{ cursor: "default" }}
            width={["350px", "320px", "720px", "300px", "350px", "450px"]}
            transition="1s"
            _hover={{
              transform: "translateY(-4px)",
              transition: ".5s",
              bg: "#3B4252",
            }}
            px="20px"
            py="30px"
            rounded="10px"
          >
            <Center>
              <Flex>
                <Heading
                  fontSize={["40px", "40px", "40px", "40px"]}
                  alignContent="center"
                >
                  Kythi - 404.
                </Heading>
              </Flex>
            </Center>
            <Center>
              <Text
                color="gray.400"
                fontSize={"18px"}
                mb={2}
                alignContent="center"
              >
                {"Error, invalid page."}
              </Text>
            </Center>
            <Center>
              <Link href="/" _hover={{}}>
                <Button
                  transition=".6s"
                  _hover={{
                    transform: "translateY(-4px)",
                    transition: ".5s",
                    bg: "#4C566A",
                  }}
                  w="210px"
                  h="33px"
                  colorScheme="blue"
                  variant="outline"
                >
                  Return Home
                </Button>
              </Link>
            </Center>
          </Box>
        </Flex>
      </Flex>
  );
};
