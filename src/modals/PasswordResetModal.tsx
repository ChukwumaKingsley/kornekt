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
import useUpdatePassword from "../hooks/useUpdatePassword";
  
  interface UpdateProps {
      onOpen: () => void,
      onClose: () => void,
      isOpen: boolean
  }
  
  export default function UpdateUserModal({onClose, isOpen}: UpdateProps) {
  
    const accessToken = localStorage.getItem('token')
    const [newPassword, setNewPassword] = useState('')
    const toast = useToast();
    // const navigate = useNavigate()
  
  
    const { isLoading } = useUpdatePassword(accessToken, newPassword);
  
    const handleUpdate = (e: any) => {
      e.preventDefault()
      toast({
        title: "Password update successful!",
        status: "success",
        position: "top"
      })
      // onClose()
      // navigate("/home/my_profile")
    }
    const handleChange = (e: any) => {
      setNewPassword(e.target.value)
    }
    console.log(newPassword)
    return (
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleUpdate}>
            <ModalHeader textAlign={'center'}>Update user information</ModalHeader>
            <ModalBody>
              <Box p={4}>
                <FormLabel>Password:</FormLabel>
                <Input placeholder="Enter new password" size="lg" mb={4} value={newPassword} onChange={handleChange} required/>
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
  