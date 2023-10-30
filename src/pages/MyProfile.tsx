import { Box, Center, Container, Divider, Link, Flex, HStack, Spinner, Text, Button, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useToast } from "@chakra-ui/react";
import useMyProfile from "../hooks/useMyProfile";
import UserAvartar from "../components/UserAvartar";
import UpdateUserModal from "../modals/UpdateUserModal";
import { useRef, useState } from "react";
import PassworResetModal from "../modals/PasswordResetModal";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";


export function formatJoinDate(joinDate: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return new Date(joinDate).toLocaleDateString('en-US', options);
  }

function MyProfile() {

  const toast = useToast()

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

  const [isOpen, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const cancelRef: any = useRef();

  const handleClickDelete = () => {
    setIsOpen(true);
  }

  const handleDeleteAcount = () => {
    setIsLoadingDelete(true)
    const { status } = useQuery({
      queryKey: ["deleteAccount"],
      queryFn: async () => {
        const accessToken = localStorage.getItem('accessToken')
        try {
          const res = await http.delete("/users", {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
          return res
        }
        catch (error: any) {
          throw Error
        }
        }
      })
      if (status === "success") {
        toast({title: "Acount deleted!"})
        window.location.href = "/";
      } else if (status === "error") {
        toast({title: "Cannot complete action at the moment."})
      }
      setIsLoadingDelete(false)
  }

  return (
    <div>
    <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} >
        {isLoading && <Spinner color='red.500' size={'xl'} thickness="5px" colorScheme="blue.400" speed="1s" />}
        {!isLoading && !isError &&
      <Box width='80%' bg="white" borderRadius="md" boxShadow="md">
        <Container  marginBottom={10}>
            <UserAvartar size={{base: 'lg', md: 'xl'}} show={true}/>
            <Flex alignItems={'center'} flexWrap={'wrap'}>
            <Text>{data?.email}</Text>
            <Box width={'100px'} marginLeft={'auto'} textAlign={'center'}>
                <Text fontSize={'12px'}>Joined since</Text>
                <Text>{formatJoinDate(data?.created_at)}</Text>
            </Box>
        </Flex>
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

    <center>
      <Button colorScheme="red" onClick={handleClickDelete}>Delete account</Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirm Account Delete</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete your account? This action cannot be undone!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" isLoading={isLoadingDelete} onClick={handleDeleteAcount} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </center>
    <UpdateUserModal isOpen={profileUpdateIsOpen} onOpen={onOpenProfileUpdate} onClose={onClose} refetch={refetch} />
    <PassworResetModal isOpen={passwordResetIsOpen} onOpen={onOpenPasswordReset} onClose={onClose} />
    </div>
  );
}

export default MyProfile;
