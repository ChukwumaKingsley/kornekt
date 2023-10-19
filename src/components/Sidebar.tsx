import { Flex, Spacer, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import UserAvartar from "./UserAvartar";

export default function Sidebar() {

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
        <UserAvartar size='xl' show={true} />
        {/* Navigation Links with borders and white text */}

        <Flex textAlign="center" flexDirection="column" gap={0}>
          <Text as={NavLink} to="/home/posts" p={2} borderBottomWidth="1px" borderColor={'blue.700'} cursor="pointer" boxShadow={'1px grey'}>
            Posts
          </Text>
          <Text as={NavLink} to="/home/my_posts" p={2} borderBottomWidth="1px" borderColor="blue.700"  cursor="pointer">
            Activity
          </Text>
          <Text as={NavLink} to="/home/my_profile" p={2} borderBottomWidth="1px" borderColor="blue.700" cursor="pointer">
            Profile
          </Text>
          <Text as={NavLink} to="/home/reset_password" p={2} borderBottomWidth="1px" borderColor="blue.700"  cursor="pointer">
            Reset Password
          </Text>
          <Text as={NavLink} to="/home/reset_password" p={2} borderBottomWidth="1px" borderColor="blue.700" cursor="pointer">
            Users
          </Text>
        </Flex>
        <Spacer />
        <Text as={Link} to="/" cursor="pointer" textAlign="center" pb={5}>
          Logout
        </Text>
      </Flex>
  )
}
