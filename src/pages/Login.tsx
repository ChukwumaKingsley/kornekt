import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
} from '@chakra-ui/react';
import CustomModal from '../components/Modal';

function Login(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    <Box p={4} minW="400px" maxW="400px" m="auto" mt={8} bg="white" borderRadius="lg" boxShadow="lg">
      <Image src="../public/connect-pic.jpg" alt="Meme Image" w="100%" h="350px" />
      <Flex justifyContent="center" mt={4}>
        <Button colorScheme="blue" variant="outline" mx={2} onClick={openModal}>
          Login
        </Button>
        <Button colorScheme="blue" mx={2} onClick={openModal}>
          Signup
        </Button>
      </Flex>

      <CustomModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
    <Container marginTop={'10px'}>Want to conect with others around the globe? Hop on to this stuff then!!!</Container>
    </div>
  );
}

export default Login;
