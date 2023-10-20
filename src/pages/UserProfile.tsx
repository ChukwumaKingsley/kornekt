import { Box, Button, Center, Container, Divider, Flex, HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import useMyProfile from "../hooks/useMyProfile";
import { useEffect } from "react";
import UserAvartar from "../components/UserAvartar";
import UpdateUserModal from "../components/UpdateUserModal";
import { useUser } from "../contexts/UserContext";


function formatJoinDate(joinDate: string | undefined) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return new Date(joinDate).toLocaleDateString('en-US', options);
  }
  


function UserProfile() {
  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem("accessToken");

  const {user} = useUser()
  console.log('happy')
  console.log(user?.user)

  const { data, isLoading, isError, error } = useMyProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!accessToken) {
      // Handle the case where the token is not found in local storage
      console.log("Access token not found in local storage");
      window.location.href = "/";
      return

    }
  }, [user?.token]);

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
    <Center>
        <Button colorScheme="blue" marginTop={'20px'} onClick={onOpen}>
            Edit Profile
        </Button>
    </Center>
    <UpdateUserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
}

export default UserProfile;
