import { Box, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import './App.css'
import Login from './pages/Login'
import Header from './pages/Header'

function App() {

  return (
    <div>
      <Header />
      <Login />
    </div>
    // <Container bgColor={'blue.700'} width={'100svw'} height={'100svh'} margin={'0'} p={0}>
    //   <SimpleGrid   
    //     backgroundColor={'blue.800'} 
    //     columns={12} 
    //     color={'white'} 
    //     p={'10px'} >
    //     <SimpleGrid gridColumn={'span 12'} columns={2} bgColor={'blue.600'} height={'50px'} alignItems={'center'} >
    //       <Text gridColumn={'span 1'} marginLeft={'40px'}>Kornekt</Text>
    //       <Flex gap={'10px'} justifyItems={'right'} marginLeft={'auto'} marginRight={'10px'}>
    //         <Text>Login</Text>
    //         <Text>Signup</Text>
    //       </Flex>
    //     </SimpleGrid>
    //     <Box>Lover</Box>
    //   </SimpleGrid>
    // </Container>
  )
}

export default App
