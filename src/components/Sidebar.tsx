import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <Flex 
        gridColumn={'span 1'} 
        height={'100svh'} 
        background={'blue.500'}
        borderRight={'1px solid rgba(0, 0, 0, 0.5)'}
        boxShadow={'10px'}
    >
        <Text
            mx={2}
            cursor="pointer"
          >
            <NavLink to='/about'>About</NavLink>
          </Text>
    </Flex>
  )
}
