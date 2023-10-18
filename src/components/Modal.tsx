import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const userDataFormat = {
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
}
function CustomModal({ isOpen, onClose }: CustomModalProps): JSX.Element {
  const [user, setUser] = useState(userDataFormat)


  const [isLoginState, setIsLoginState] = useState(true);

  const switchToLogin = () => {
    if (!isLoginState) {
      setIsLoginState(true);
    }
  };

  const switchToSignup = () => {
    if (isLoginState) {
      setIsLoginState(false);
    }
  };
  console.log(user)
  useEffect(() => {
    setUser(userDataFormat)
    return
  }, [isLoginState])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Button
            colorScheme="blue"
            variant={isLoginState ? 'solid' : 'outline'}
            onClick={switchToLogin}
            w="50%"
            borderRadius={0}
            >
            Login
          </Button>
          <Button
            colorScheme="blue"
            variant={!isLoginState ? 'solid' : 'outline'}
            onClick={switchToSignup}
            w="50%"
            borderRadius={0}
          >
            Signup
          </Button>
        </ModalHeader>
        <ModalBody>
          {isLoginState ? (
            <div>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input 
                  type="text" 
                  value={user.email} 
                  placeholder="Enter your username (email)" 
                  onChange={(e: any) => {
										setUser({
											...user,
											email: e.target.value,
										});
									}} 
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={user.password} 
                  onChange={(e: any) => {
										setUser({
											...user,
											password: e.target.value,
										});
									}}
                />
              </FormControl>
            </div>
          ) : (
            <div>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Enter your name"
                  value={user.name} 
                  onChange={(e: any) => {
										setUser({
											...user,
											name: e.target.value,
										});
									}}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Username (Email)</FormLabel>
                <Input 
                  type="text"
                  placeholder="Enter your username (email)"
                  value={user.email} 
                  onChange={(e: any) => {
										setUser({
											...user,
											email: e.target.value,
										});
									}}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={user.password} 
                  onChange={(e: any) => {
										setUser({
											...user,
											password: e.target.value,
										});
									}}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm new password" 
                  value={user.confirmPassword} 
                  onChange={(e: any) => {
										setUser({
											...user,
											confirmPassword: e.target.value,
										});
									}}
                />
              </FormControl>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            {isLoginState ? 'Login' : 'Signup'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
