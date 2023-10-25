import { Flex, Spacer, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import UserAvartar from "./UserAvartar";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {

  const { pathname } = useLocation()

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
        pl={0}
        pr={0}
      >

        <UserAvartar size='lg' show={false} />
        <Flex textAlign="center" flexDirection={{base: 'row', md: "column"}} gap={0} width={'100%'}>
          <Text 
            as={NavLink}
            background={pathname === '/home' ? 'blue.600' : ''}
            to="/home" 
            p={'10px'} 
            fontSize={{base: '18px', md: '20px'}}
            borderBottomWidth={{base: 0, md: "1px"}}
            borderColor={'blue.200'}
            cursor="pointer"
            boxShadow={'1px grey'}
          >
            Posts
          </Text>
          <Text 
            as={NavLink} 
            to="/home/activity"
            background={pathname.includes('/home/activity') ? 'blue.600' : ''}
            p={'10px'} 
            fontSize={{base: '18px', md: '20px'}}
            borderBottomWidth={{base: 0, md: "1px"}}
            borderColor={'blue.200'}
            cursor="pointer"
            boxShadow={'1px grey'}
          >
            Activity
          </Text>
          <Text 
            as={NavLink} 
            to="/home/my_profile"
            background={pathname === '/home/my_profile' ? 'blue.600' : ''}
            p={'10px'} 
            fontSize={{base: '18px', md: '20px'}}
            borderBottomWidth={{base: 0, md: "1px"}}
            borderColor={'blue.200'}
            cursor="pointer"
            boxShadow={'1px grey'}
          >
            Profile
          </Text>
          <Text 
            as={NavLink} 
            to="/home/users"
            background={pathname === '/home/users' ? 'blue.600' : ''} 
            p={'10px'} 
            fontSize={{base: '18px', md: '20px'}}
            borderBottomWidth={{base: 0, md: "1px"}}
            borderColor={'blue.200'}
            cursor="pointer"
            boxShadow={'1px grey'}
          >
            Users
          </Text>
        </Flex>
        <Spacer />
        <LogoutButton />
      </Flex>
  )
}
