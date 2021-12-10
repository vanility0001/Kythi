import { NextSeo } from 'next-seo';
import 'focus-visible/dist/focus-visible';
import { Link, Box, Heading, Text } from '@chakra-ui/react';
import { Input, Button, Flex, Center, Stack } from '@chakra-ui/react';

export default function ResetPassword() {
  return (
    <>
      <NextSeo
        title="Kythi.com | Reset Password"
        description="Reset-Password page for Kythi.com"
        additionalMetaTags={[
          {
            property: "theme-color",
            content: "#2E3440",
          },
        ]}
        openGraph={{
          title: "Kythi.com | Reset Password",
          description:
            "Reset-Password page for Kythi.com",
        }}
      />
      <Center>
        <Flex h="90vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            width={["360px", "400px", "auto", "auto"]}
          >
            <Box boxShadow="2xl" __css={{ bg: "#3B4252", cursor: "default" }}
              width={["350px", "320px", "720px", "300px", "350px", "450px"]}
              transition="1s"
              px="20px"
              py="30px"
              rounded="10px" >
              <Center>
                <Flex>
                  <Heading
                    fontSize={["30px", "20px", "30px", "30px"]}
                    alignContent="center"
                  >
                    Reset password.
                  </Heading>
                </Flex>
              </Center>
              <Center>
                <Input transition='.8s' focusBorderColor="#81A1C1" _hover={{ transition: '.6s', borderColor: '#D8DEE9', }} rounded="8px" placeholder="Email-Address" w="400px" mt="20px" mb="10px" size="sm" />

              </Center>
              <Center>
                <Button
                  mt="10px"
                  rounded="10px"
                  transition=".6s"
                  _hover={{
                    transition: ".5s",
                    bg: "#434C5E",
                  }}
                  w="400px"
                  h="33px"
                  colorScheme="red"
                  variant="outline"
                >
                  Send Request!
                </Button>
              </Center>

            </Box>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};