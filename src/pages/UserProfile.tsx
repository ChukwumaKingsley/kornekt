import { Box, Button, Center, Container, Flex, HStack, Text } from "@chakra-ui/react";
import useMyProfile from "../hooks/useMyProfile";
import { useEffect } from "react";
import UserAvartar from "../components/UserAvartar";
import UpdateUser from "../components/UpdateUser";


function formatJoinDate(joinDate: any) {
    const options = { year: 'numeric', month: 'long' };
    return new Date(joinDate).toLocaleDateString('en-US', options);
  }


function UserProfile() {
  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem("token");

  const { data, isLoading, isError, error } = useMyProfile(accessToken);

  useEffect(() => {
    if (!accessToken) {
      // Handle the case where the token is not found in local storage
      console.log("Access token not found in local storage");
    }
  }, [accessToken]);

  // ... Handle loading and error states as before

  if (isLoading) {
    return <Text>Loading profile...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <div>
    <Flex flexDirection="column" alignItems="center" p={'10px'} >
      <Box width='80%'p={'10px'} bg="white.100" borderRadius="md" boxShadow="md">
        <Container borderBottom={'1px'} marginBottom={10}>
            <UserAvartar size='xl' show={true}/>
            <HStack alignItems={'center'} p={'5px'}>
            <Text>{data?.email}</Text>
            <Box width={'100px'} marginLeft={'auto'} textAlign={'center'}>
                <Text fontSize={'12px'}>Joined since</Text>
                <Text>{formatJoinDate(data?.created_at)}</Text>
            </Box>
        </HStack>
            
        </Container>
        <HStack justifyContent="space-between" padding={'10px'}>
            <Text>0 posts</Text>
            <Text>1 likes</Text>
            <Text>4 likes</Text>
        </HStack>

      </Box>
    </Flex>
    <Center>
        <Button colorScheme="blue">
            Edit Profile
        </Button>
    </Center>
    {true && <UpdateUser />}
    </div>
  );
}

export default UserProfile;
