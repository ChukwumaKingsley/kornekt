import { Box, Center, Container, Divider, Link, Flex, HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import useMyProfile from "../hooks/useMyProfile";
import UserAvartar from "../components/UserAvartar";
import UpdateUserModal from "../modals/UpdateUserModal";


function formatJoinDate(joinDate: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return new Date(joinDate).toLocaleDateString('en-US', options);
  }

function UserProfile() {

  const { data, isLoading, isError, error } = useMyProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <div>
    <Flex flexDirection="column" alignItems="center" p={'10px'} >
        {isLoading && <Spinner color='red.500' size={'xl'} thickness="5px" colorScheme="blue.400" speed="1s" />}
        {!isLoading &&
      <Box width='80%'p={'10px'} bg="white" borderRadius="md" boxShadow="md">
        <Container  marginBottom={10}>
            <UserAvartar size='xl' show={true}/>
            <HStack alignItems={'center'} p={'5px'}>
            <Text>{data?.email}</Text>
            <Box width={'100px'} marginLeft={'auto'} textAlign={'center'}>
                <Text fontSize={'12px'}>Joined since</Text>
                <Text>{formatJoinDate(data?.created_at)}</Text>
            </Box>
        </HStack>
        </Container>
        <Divider size={'5px'}/>
        <HStack justifyContent="space-between" padding={'10px'}>
            <Text>0 posts</Text>
            <Text>1 likes</Text>
            <Text>4 likes</Text>
        </HStack>

      </Box>
      }
    </Flex>
    <Center color="blue.500" marginTop="40px">
      <Link onClick={onOpen}>Edit Profile</Link>
      <Link marginLeft="40px" onClick={onOpen}>Edit Password</Link>
    </Center>
    <UpdateUserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
}

export default UserProfile;
