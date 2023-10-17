import { Box, Text, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import CustomModal from '../components/Modal';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      p={4}
      bg="blue.500"
      color="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Kornekt
      </Text>
      <Box display="flex" alignItems="center">
        <Text
          mx={2}
          cursor="pointer"
          onClick={openModal}
        >
          Login
        </Text>
        <Spacer width="20px" />
        <Text
          mx={2}
          cursor="pointer"
          onClick={openModal}
        >
          Signup
        </Text>
      </Box>
      <CustomModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
}

export default Header;
