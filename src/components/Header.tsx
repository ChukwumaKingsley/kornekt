import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex width={'100%'} alignItems={'center'} bg={'blue.100'} p={5} boxShadow={'0px 0px 4px rgba(0, 0, 0, 0.2)'} color={'blue.900'} marginBottom={10}>
        <Heading as={'h1'} justifySelf={'center'} >
        Kornekt
        </Heading>
        <Spacer />
        <Text cursor="pointer" marginRight={'auto'}>
        Logout
        </Text>
    </Flex>
  )
}
