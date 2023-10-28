import { Flex, Spacer, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import UserAvartar from "./UserAvartar";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {

  const { pathname } = useLocation()

  return (
    <Flex
        gridColumn={{ base: "span 5", md: "span 1" }}
        height={{base: '70px', md:'100vh'}}
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

        <UserAvartar size={{base: 'sm', md:'lg'}} show={false} />
        <Flex 
          textAlign="center" 
          flexDirection={{base: 'row', md: "column"}} 
          width={'100%'} justifyItems={'center'} 
          gap={{base: '5px', md: 0}}
          flexWrap={{base: 'wrap'}}
          fontSize={{base: '12px', md: '20px'}}
        >
          <Text 
            as={NavLink}
            background={{lg: pathname === '/home' ? 'blue.600' : ''}}
            textDecoration={{base: pathname === '/home' ? 'underline' : ''}}
            to="/home" 
            p={'10px'} 
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
            background={{lg: pathname.includes('/home/activity') ? 'blue.600' : ''}}
            textDecoration={{base: pathname === '/home/activity' ? 'underline' : ''}}
            p={'10px'} 
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
            background={{lg: pathname === '/home/my_profile' ? 'blue.600' : ''}}
            textDecoration={{base: pathname === '/home/my_profile' ? 'underline' : ''}}
            p={'10px'} 
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
            background={{lg: pathname === '/home/users' ? 'blue.600' : ''}} 
            textDecoration={{base: pathname === '/home/users' ? 'underline' : ''}}
            p={'10px'} 
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
