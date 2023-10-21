import { Flex, Spacer, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import UserAvartar from "./UserAvartar";
import LogoutButton from "./LogoutButton";

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
        p={'10px'}
      >

        {/* User Profile Icon */}
        <UserAvartar size='xl' show={true} />
        {/* Navigation Links with borders and white text */}

        <Flex textAlign="center" flexDirection="column" gap={0}>
          <Text as={NavLink} to="/home" p={2} borderBottomWidth="1px" borderColor={'blue.700'} cursor="pointer" boxShadow={'1px grey'}>
            Posts
          </Text>
          <Text as={NavLink} to="/home/my_posts" p={2} borderBottomWidth="1px" borderColor="blue.700"  cursor="pointer">
            Activity
          </Text>
          <Text as={NavLink} to="/home/my_profile" p={2} borderBottomWidth="1px" borderColor="blue.700" cursor="pointer">
            Profile
          </Text>
          <Text as={NavLink} to="/home/reset_password" p={2} borderBottomWidth="1px" borderColor="blue.700" cursor="pointer">
            Users
          </Text>
        </Flex>
        <Spacer />
        <LogoutButton />
      </Flex>
  )
}
