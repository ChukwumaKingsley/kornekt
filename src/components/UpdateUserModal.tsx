import {
  Box,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUpdateUser from "../hooks/useUpdateUser";

interface UpdateProps {
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean
}

export default function UpdateUserModal({onClose, isOpen}: UpdateProps) {

  const accessToken = localStorage.getItem('token')
  const [newName, setNewName] = useState('')
  const toast = useToast();
  const navigate = useNavigate()


  const { isLoading } = useUpdateUser(accessToken, newName);

  const handleUpdate = (e: any) => {
    e.preventDefault()
    toast({
      title: "Profile update successful!",
      status: "success",
      position: "top"
    })
    // onClose()
    // navigate("/home/my_profile")
  }
  const handleChange = (e: any) => {
    setNewName(e.target.value)
  }
  console.log(newName)
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleUpdate}>
          <ModalHeader textAlign={'center'}>Update user information</ModalHeader>
          <ModalBody>
            <Box p={4}>
              <FormLabel>Name:</FormLabel>
              <Input placeholder="Enter new name" size="lg" mb={4} value={newName} onChange={handleChange} required/>
            </Box>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme="red"  width={'90px'}  onClick={onClose} marginRight={'10px'}>
              Cancel
            </Button>
            <Button colorScheme="blue" width={'90px'} type="submit" isLoading={isLoading}>
              Update
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
