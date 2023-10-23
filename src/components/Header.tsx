import { Flex, Heading } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex width={'100%'} justifyContent='center' alignItems={'center'} bg={''} p={5} boxShadow={'0px 0px 4px rgba(0, 0, 0, 0.2)'} color={'blue.900'} marginBottom={10}>
        <Heading as={'h1'} textAlign={'center'} alignSelf={'center'} justifySelf={'center'} >
        Kornekt
        </Heading>
    </Flex>
  )
}
