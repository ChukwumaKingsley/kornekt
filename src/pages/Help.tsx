import { Container, Heading, Text } from "@chakra-ui/react";

function Help() {
  return (
    <Container p={"10px"} width={'90%'} >
      <Heading as={'h6'}>Help</Heading>
      <Text>You don't need any help </Text>
      <Text fontSize={'40px'}>😂</Text>
    </Container>
  );
}

export default Help;
