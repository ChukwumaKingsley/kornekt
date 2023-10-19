import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";

// import UserAvartar from './UserAvartar'

export default function Header() {
  return (
    <Flex width={'100%'} justifyItems='center' alignItems={'center'} bg={'blue.100'} p={5} boxShadow={'0px 0px 4px rgba(0, 0, 0, 0.2)'} color={'blue.900'} marginBottom={10}>
        <Heading as={'h1'} justifySelf={'center'} >
        Kornekt
        </Heading>
        <Spacer />
        <Box bg={'pink'} justifyItems={'center'} minWidth='70px' alignItems={'center'}>
          {/* <UserAvartar size='xl' show={false} /> */}
        </Box>

        <Text as={Link} to="/" cursor="pointer" textAlign="center" marginRight={'auto'}>
            Logout
        </Text>
    </Flex>
  )
}
