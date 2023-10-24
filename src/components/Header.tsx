import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import CreatePostModal from '../modals/CreatePostModal';
import { useState } from 'react';

export default function Header() {
  const [postCreateIsOpen, setPostCreateIsOpen] = useState(false)

  const onOpenProfileUpdate = () => {
    setPostCreateIsOpen(true)
  }
  const onClose = () => {
    setPostCreateIsOpen(false)
  }
  return (
    <Flex
      width={'100%'}
      justifyContent='center'
      alignItems={'center'}
      bg={''}
      p={5}
      boxShadow={'0px 0px 4px rgba(0, 0, 0, 0.2)'}
      color={'blue.900'}
      marginBottom={10}
    >
      <Heading as={'h1'} textAlign={'center'} alignSelf={'center'} justifySelf={'center'} ml={2}>
        <Text as={NavLink} to="/home" cursor="pointer" >Kornekt</Text>
      </Heading>
      <Flex marginLeft={'auto'} alignItems={'center'} cursor={'pointer'} onClick={onOpenProfileUpdate}>
        <Icon as={AddIcon} w={'20px'} h={'20px'} color="blue.500" />
        <Text ml={2} fontSize="xl">
          Create Post
        </Text>
      </Flex>
      <CreatePostModal isOpen={postCreateIsOpen} onOpen={onOpenProfileUpdate} onClose={onClose} />
    </Flex>
  );
}
