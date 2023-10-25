import { Container, Heading, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

function NotFound() {
  const style = {textDecoration: 'underline', color: 'blue'}
  return (
    <Container textAlign={'center'}>
        <Heading as={'h2'} mb={10} color={'blue.400'}>Page not found!</Heading>
        <Text>
          Page not found. Click <NavLink style={style} to='/home'>here</NavLink> return to Home Page.
        </Text>
    </Container>
  )
}

export default NotFound