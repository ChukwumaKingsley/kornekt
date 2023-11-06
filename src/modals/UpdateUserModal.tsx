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
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import useUpdateUser from "../hooks/useUpdateUser";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { UserProfile } from "../hooks/useMyProfile";


interface UpdateProps {
    profile_pic: undefined | string
    name: undefined | string
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<UserProfile, Error>>
}

export default function UpdateUserModal({profile_pic, name, onClose, isOpen, refetch}: UpdateProps) {

  const toast = useToast()
  const [newName, setNewName] = useState(name)
  const [isLoading, setIsLoading] = useState(false)
  const [picture, setPicture] = useState<File | null>(null)

  const handleUpdate = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    updateMutation.mutate({name: newName, profile_pic: picture})
    refetch
  }
  const onUpdateSuccess = () => {
    toast({
      title: "Name Update successful!",
      status: "success",
      position: "top",
      duration: 3000
    });
    setIsLoading(false)
    refetch()
    onClose()
    setNewName('')
  }

  const onUpdateFail =() => {
    setIsLoading(false)
  }

  const updateMutation = useUpdateUser({onUpdateSuccess, onUpdateFail});
  
  const handleChange = (e: any) => {
    setNewName(e.target.value)
  }

  const uploadImage = async (files: FileList | null) => {
    if (files) {
      setPicture(files[0])
    }
  }
  
  
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleUpdate}>
          <ModalHeader textAlign={'center'}>Update user information</ModalHeader>
          <ModalBody>
          <Flex flexDir={'column'} alignContent={'center'}>
              <Avatar size={'xl'} src={profile_pic} name={name} alignSelf={'center'}/>
              <Input 
                type='file' 
                accept='image/*' 
                alignSelf={'center'} 
                width={'250px'}
                onChange={(e) => {uploadImage(e.target.files)}}
              />

            </Flex>
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
