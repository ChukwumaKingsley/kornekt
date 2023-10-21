import {
    Box,
    Input,
    Button,
    Modal,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormLabel,
    useToast,
    FormControl,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { password_regex } from "./SignUpModal";
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
  interface UpdateProps {
      onOpen: () => void,
      onClose: () => void,
      isOpen: boolean
  }

  export interface ResetData {
        oldPassword: string;
        newPassword: string;
        confirmNewPassowrd: string;
    }


  export default function PassworResetModal({onClose, isOpen}: UpdateProps) {
  
    const accessToken = localStorage.getItem('token')
    const toast = useToast();
    // const navigate = useNavigate()
    
    const [resetData, setResetData] = useState<ResetData>({oldPassword: '', newPassword: '', confirmNewPassowrd: ''})
    const { isLoading } = useUpdatePassword(accessToken, resetData);
    const [validPassword, setValidPassword] = useState(false)
    const [validMatchPassword, setValidMatchPassword] = useState(false)


    useEffect(() => {
        setValidPassword(password_regex.test(resetData.newPassword));
        setValidMatchPassword(resetData.newPassword === resetData.confirmNewPassowrd)
      }, [resetData.newPassword, resetData.confirmNewPassowrd])
  
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
        setResetData({
          ...resetData,
          [e.target.name]: e.target.value
        });
      }

    return (
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleUpdate}>
            <ModalHeader textAlign={'center'}>Update user information</ModalHeader>
            <ModalBody>
              <Box p={4}>
                <FormControl>
                    <FormLabel>
                        {resetData.oldPassword && <FontAwesomeIcon color='green' icon={faCheck} />}
                        Old password:
                    </FormLabel>
                    <Input placeholder="Enter old password" size="lg" mb={4} value={resetData?.oldPassword} onChange={handleChange} required/>
                    {!resetData.newPassword && 
                    <Text fontSize={'12px'} color={'blue.900'} p={'5px'}>
                        <FontAwesomeIcon icon={faInfoCircle} /><br/>
                        Input your old password
                    </Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>
                    {validPassword && <FontAwesomeIcon color='green' icon={faCheck} />}
                    {!(validPassword || !resetData.newPassword) && <FontAwesomeIcon color='red' icon={faTimes} />}
                        New password:
                    </FormLabel>
                    <Input placeholder="Enter new password" size="lg" mb={4} value={resetData?.newPassword} onChange={handleChange} required/>
                    {resetData.newPassword && !validPassword && 
                    <Text fontSize={'12px'} color={'blue.900'} p={'5px'}>
                        <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.<br/>
                        Must include uppercase and lowercase letters.<br/>
                        Must include a number. <br/>
                        Must includ special characters: !, @, #, $, %
                    </Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>
                        {validMatchPassword && resetData.confirmNewPassowrd && <FontAwesomeIcon color='green' icon={faCheck} />}
                        {!(validMatchPassword || !resetData.confirmNewPassowrd) && <FontAwesomeIcon color='red' icon={faTimes} />}
                        Confirm new password:
                    </FormLabel>
                    <Input placeholder="Confirm new password" size="lg" mb={4} value={resetData?.confirmNewPassowrd} onChange={handleChange} required/>
                    {!validMatchPassword && resetData.confirmNewPassowrd &&
                  <Text id='pwdnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /><br/>Must match previous password
                  </Text>}
                </FormControl>
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
  