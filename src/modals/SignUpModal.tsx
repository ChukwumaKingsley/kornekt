import { useState, useRef, useEffect } from 'react';
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
  Icon,
} from '@chakra-ui/react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSignUp from '../hooks/useSignUp';

const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

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

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState(userData)
  
  //name states
  // const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)
  
  //password states
  // const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  //password match
  // const [matchPassword, setMatchPassword] = useState('')
  const [validMatchPassword, setValidMatchPassword] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  //Error messages and success
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setValidName(user_regex.test(user.name))
  }, [user.name])
  
  useEffect(() => {
    setValidPassword(password_regex.test(user.password));
    setValidMatchPassword(user.password === user.confirmPassword)
  }, [user.password, user.confirmPassword])

  useEffect(() => {
    setErrMsg('')
  }, [user])
  
  
  //for the button
  const [isLoading, setIsLoading] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Track password matching
  
  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    setPasswordsMatch(true); // Reset the match state when input changes
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    if (user.password !== user.confirmPassword) {
      setPasswordsMatch(false); // Set the match state to false
      setIsLoading(false)
      return; // Don't proceed with the request
    } else {
      setPasswordsMatch(true); // Passwords match, reset the match state
      signUpMutation.mutate(user);
  }
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
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
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
                    ref={userRef}
                    autoComplete='off'
                    placeholder="Enter your name"
                    value={user.name}
                    name='name'
                    onChange={onChange}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  {userFocus && user.name && !validName && 
                  <Text id='uidnote' fontSize={'12px'} color={'blue.900'} p={'5px'}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, underscores, hyphens allowed.
                  </Text>}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type='email'
                    ref={emailRef}
                    placeholder="Enter your username (email)"
                    name='email'
                    autoComplete='off'
                    value={user.email} 
                    onChange={onChange}
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    {validPassword && <FontAwesomeIcon color='green' icon={faCheck} />}
                    {!(validPassword || !user.password) && <FontAwesomeIcon color='red' icon={faTimes} />}
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    name='password'
                    value={user.password}
                    onChange={onChange}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                  />
                  <Text fontSize="sm">
                    Password must contain at least one numerical digit, one lowercase letter,
                    one uppercase letter, and one of the following: @#$%&*
                  </Text>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm new password" 
                    name='confirmPassword'
                    value={user.confirmPassword} 
                    onChange={onChange}
                  />
                  {!passwordsMatch && (
                    <Text color="red" fontSize="sm">
                      Passwords do not match
                    </Text>
                  )}
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
