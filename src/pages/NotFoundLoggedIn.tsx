import { Container, Heading, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <Container>
        <Heading as={'h2'} mb={10}>Page not found!</Heading>
        <Text>Seems like you searched the wrong thing.</Text>

        <Text>Go to the <NavLink to='/home/posts'>Home Page</NavLink>.</Text>
    </Container>
  )
}

export default NotFound