import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Text,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSignUp from '../hooks/useSignUp';

const user_regex = /^[a-zA-Z\s][a-zA-Z0-9\s-_]{3,23}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const email_regex = /^.+@.+\..+$/


interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLoginModal: () => void;
}


function SignUpModal({ isOpen, onClose, openLoginModal }: SignUpModalProps): JSX.Element {

  const userData = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  }

  const [user, setUser] = useState(userData)
  
  //Input validation states
  const [validName, setValidName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validMatchPassword, setValidMatchPassword] = useState(false)


  useEffect(() => {
    setValidName(user_regex.test(user.name))
  }, [user.name])

  useEffect(() => {
    setValidEmail(email_regex.test(user.email))
  }, [user.email])
  
  
  useEffect(() => {
    setValidPassword(password_regex.test(user.password));
    setValidMatchPassword(user.password === user.confirmPassword)
  }, [user.password, user.confirmPassword])
  
  //for the button
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    signUpMutation.mutate(user);
}

const onSignUpSuccess = () => {
  onClose();
  openLoginModal()
  setIsLoading(false)
  setUser(userData)
};
const onSignUpFail = () => {
  setIsLoading(false)
}

const signUpMutation = useSignUp({onSignUpSuccess, onSignUpFail});
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>
            <Button
              colorScheme="blue"
              variant={'outline'}
              onClick={openLoginModal}
              w="50%"
              borderRadius={0}
              >
              Login
            </Button>
            <Button
              colorScheme="blue"
              variant={'solid'}
              w="50%"
              borderRadius={0}
            >
              Signup
            </Button>
          </ModalHeader>
          <ModalBody>
                <FormControl>
                  <FormLabel>
                    {validName && <FontAwesomeIcon color='green' icon={faCheck} />}
                    {!(validName || !user.name) && <FontAwesomeIcon color='red' icon={faTimes} />}
                    Name:
                  </FormLabel>
                  <Input 
                    type="text" 
                    autoComplete='off'
                    placeholder="Enter your name"
                    value={user.name}
                    name='name'
                    onChange={onChange}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                  />
                  {user.name && !validName && 
                  <Text id='uidnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, spaces, underscores, hyphens allowed.
                  </Text>}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    {validEmail && <FontAwesomeIcon color='green' icon={faCheck} />}
                    {!(validEmail || !user.email) && <FontAwesomeIcon color='red' icon={faTimes} />}
                    Email
                  </FormLabel>
                  <Input 
                    type='email'
                    placeholder="Enter your username (email)"
                    name='email'
                    autoComplete='off'
                    value={user.email} 
                    onChange={onChange}
                    required
                  />
                  {user.email && !validEmail && 
                  <Text id='uidnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /><br/>Please enter a valid email: example@domain.con
                  </Text>}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    {validPassword && <FontAwesomeIcon color='green' icon={faCheck} />}
                    {!(validPassword || !user.password) && <FontAwesomeIcon color='red' icon={faTimes} />}
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    name='password'
                    value={user.password}
                    onChange={onChange}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby='pwdnote'
                  />
                  {user.password && !validPassword && 
                  <Text id='pwdnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters.<br/>
                    Must include a number. <br/>
                    Must includ special characters: !, @, #, $, %
                  </Text>}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    {validMatchPassword && user.confirmPassword && <FontAwesomeIcon color='green' icon={faCheck} />}
                    {!(validMatchPassword || !user.confirmPassword) && <FontAwesomeIcon color='red' icon={faTimes} />}
                    Confirm Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm password" 
                    name='confirmPassword'
                    value={user.confirmPassword} 
                    onChange={onChange}
                    required
                    aria-invalid={validMatchPassword ? "false" : "true"}
                    aria-describedby='confirmnote'
                  />
                  {!validMatchPassword && user.confirmPassword &&
                  <Text id='pwdnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /><br/>Must match previous password
                  </Text>}
                </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button 
            type='submit'
            colorScheme="blue"
            isLoading={isLoading}
            isDisabled = {!validName || !validEmail || !validPassword || !validMatchPassword ? true : false}
          >
            {'Signup'}
          </Button>
          
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default SignUpModal;
