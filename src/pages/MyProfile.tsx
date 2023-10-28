import { Box, Center, Container, Divider, Link, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import useMyProfile from "../hooks/useMyProfile";
import UserAvartar from "../components/UserAvartar";
import UpdateUserModal from "../modals/UpdateUserModal";
import { useState } from "react";
import PassworResetModal from "../modals/PasswordResetModal";
import { NavLink } from "react-router-dom";


export function formatJoinDate(joinDate: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return new Date(joinDate).toLocaleDateString('en-US', options);
  }

function MyProfile() {

  const { data, isLoading, isError, refetch } = useMyProfile();
  const [passwordResetIsOpen, setPasswordResetIsOpen] = useState(false)
  const [profileUpdateIsOpen, setProfileUpdateIsOpen] = useState(false)

  const onOpenPasswordReset = () => {
    setPasswordResetIsOpen(true)
  }
  const onOpenProfileUpdate = () => {
    setProfileUpdateIsOpen(true)
  }
  const onClose = () => {
    setPasswordResetIsOpen(false)
    setProfileUpdateIsOpen(false)
  }

  if (isError) {
    return <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} ><Text fontSize={'24px'} alignSelf={"center"} justifySelf={'center'}>Server not reachable</Text></Flex>;
  }

  return (
    <div>
    <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} >
        {isLoading && <Spinner color='red.500' size={'xl'} thickness="5px" colorScheme="blue.400" speed="1s" />}
        {!isLoading && !isError &&
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
            <Text as={NavLink} to={'/home/activity'}>Posts: {data?.posts_count}</Text>
            <Text as={NavLink} to={'/home/activity/likes'}>Likes: {data?.votes_count}</Text>
            <Text as={NavLink} to={'/home/activity/dislikes'}>Dislikes: {data?.downvotes_count}</Text>
        </HStack>

      </Box>
      }
    </Flex>
    <Center color="blue.500" marginTop="40px">
      <Link onClick={onOpenProfileUpdate}>Edit Profile</Link>
      <Link marginLeft="40px" onClick={onOpenPasswordReset}>Edit Password</Link>
    </Center>
    <UpdateUserModal isOpen={profileUpdateIsOpen} onOpen={onOpenProfileUpdate} onClose={onClose} refetch={refetch} />
    <PassworResetModal isOpen={passwordResetIsOpen} onOpen={onOpenPasswordReset} onClose={onClose} />
    </div>
  );
}

export default MyProfile;
