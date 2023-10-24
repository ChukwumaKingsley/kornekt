import { Flex, Spacer, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import UserAvartar from "./UserAvartar";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {

  return (
    <Flex
        gridColumn={{ base: "span 5", md: "span 1" }}
        height={{base: '100px', md:'100vh'}}
        background={'blue.400'}
        borderRight={'0.0025px solid rgba(0, 0, 0, 0.05)'}
        flexDirection={{base: 'row', md: "column"}}
        justifyContent={{md:"space-between"}} // To align items at the top and bottom
        alignItems={{base: 'center'}}
        color={'white'}
        p={'10px'}
      >

        <UserAvartar size='md' show={false} />
        <Flex textAlign="center" flexDirection={{base: 'row', md: "column"}} gap={0}>
          <Text as={NavLink} to="/home" p={'10px'} fontSize={{base: '18px', md: '20px'}} borderBottomWidth={{base: 0, md: "1px"}} borderColor={'blue.700'} cursor="pointer" boxShadow={'1px grey'}>
            Posts
          </Text>
          <Text as={NavLink} to="/home/my_posts" p={'10px'} fontSize={{base: '18px', md: '20px'}} borderBottomWidth={{base: 0, md: "1px"}} borderColor="blue.700"  cursor="pointer">
            Activity
          </Text>
          <Text as={NavLink} to="/home/my_profile" p={'10px'} fontSize={{base: '18px', md: '20px'}} borderBottomWidth={{base: 0, md: "1px"}} borderColor="blue.700" cursor="pointer">
            Profile
          </Text>
          <Text as={NavLink} to="/home/users" p={'10px'} fontSize={{base: '18px', md: '20px'}} borderBottomWidth={{base: 0, md: "1px"}} borderColor="blue.700" cursor="pointer">
            Users
          </Text>
        </Flex>
        <Spacer />
        <LogoutButton />
      </Flex>
  )
}
