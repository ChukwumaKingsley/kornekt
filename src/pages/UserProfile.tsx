import { Box, Flex, Text } from "@chakra-ui/react";
import useMyProfile from "../hooks/useMyProfile";
import { useEffect } from "react";

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
    <Flex flexDirection="column" alignItems="center">
      <Box p={4} bg="white" borderRadius="md" boxShadow="md">
        <Text>Email: {data?.email}</Text>
        <Text>User ID: {data?.id}</Text>
        <Text>Name: {data?.name}</Text>
        <Text>Created At: {data?.created_at}</Text>
      </Box>
    </Flex>
  );
}

export default UserProfile;
