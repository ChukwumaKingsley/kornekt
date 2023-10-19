import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
    const currentUser = {
        name: 'John Doe',
        profilePicture: 'https://example.com/profile.jpg', // URL to the user's profile picture
      };
  return (
    <Flex
        gridColumn={'span 1'}
        height={'100vh'}
        background={'blue.400'}
        borderRight={'0.0025px solid rgba(0, 0, 0, 0.05)'}
        flexDirection="column"
        justifyContent="space-between" // To align items at the top and bottom
        color={'white'}
      >
        {/* User Profile Icon */}
        <Box p={4} textAlign="center" as={NavLink} to="/profile" mb={10}>
          <Avatar size="xl" src={currentUser.profilePicture} name={currentUser.name} />
          <Text>{currentUser.name}</Text>
        </Box>
        {/* Navigation Links with borders and white text */}
        <Flex textAlign="center" flexDirection="column" gap={0}>
          <Text as={NavLink} to="/home/posts" p={2} borderBottomWidth="1px" borderColor={'gray.200'} cursor="pointer" boxShadow={'1px grey'}>
            Posts
          </Text>
          <Text as={NavLink} to="/home/my_posts" p={2} borderBottomWidth="1px" borderColor="gray.200"  cursor="pointer">
            My Posts
          </Text>
          <Text as={NavLink} to="/profile" p={2} borderBottomWidth="1px" borderColor="gray.200" cursor="pointer">
            Profile
          </Text>
          <Text as={NavLink} to="/reset_password" p={2} borderBottomWidth="1px" borderColor="gray.200"  cursor="pointer">
            Reset Password
          </Text>
          <Text as={NavLink} to="/reset_password" p={2} borderBottomWidth="1px" borderColor="gray.200" cursor="pointer">
            Users
          </Text>
        </Flex>
        <Spacer />
        <Text as={Link} to="/profile" cursor="pointer" textAlign="center" pb={5}>
          Logout
        </Text>
      </Flex>
  )
}
