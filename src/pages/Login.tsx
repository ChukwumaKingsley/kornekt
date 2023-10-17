import { useState } from 'react';
import {
  Box,
  Button,
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
    <Box p={4} maxW="400px" m="auto" mt={8} bg="white" borderRadius="lg" boxShadow="lg">
      <Image src="your_image_url.jpg" alt="Meme Image" w="100%" maxH="200px" />
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
  );
}

export default Login;
