import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
} from '@chakra-ui/react';
import SignUpModal from '../modals/SignUpModal';
import LoginModal from '../modals/LoginModal';

function Login(): JSX.Element {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsSignUpModalOpen(false);
    };
    
    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
        setIsLoginModalOpen(false);
    };
  
    const closeModal = () => {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(false);
    };
  

  return (
    <div>
    <Box p={4} minW="400px" maxW="400px" m="auto" mt={8} bg="white" borderRadius="lg" boxShadow="lg">
      <Image src="/connect-pic.jpg" alt="Meme Image" w="100%" h="350px" />
      <Flex justifyContent="center" mt={4}>
        <Button colorScheme="blue" variant="outline" mx={2} onClick={openLoginModal}>
          Login
        </Button>
        <Button colorScheme="blue" mx={2} onClick={openSignUpModal}>
          Signup
        </Button>
      </Flex>

      <SignUpModal isOpen={isSignUpModalOpen} openLoginModal={openLoginModal} onClose={closeModal} />
      <LoginModal isOpen={isLoginModalOpen} openSignUpModal={openSignUpModal} onClose={closeModal} />
    </Box>
    <Container marginTop={'10px'}>Want to conect with others around the globe? Hop on to this stuff then!!!</Container>
    </div>
  );
}

export default Login;
