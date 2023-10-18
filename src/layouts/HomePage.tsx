import { Flex, Grid, GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function HomePage() {

  
    return (
        <SimpleGrid columns={6}>
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
                    <NavLink to='/home/post'>Post</NavLink>
                </Text>
            </Flex>
            <Flex flexDir={'column'} height={"100svh"} gridColumn={'span 5'}>
                <Grid 
                    gridTemplateColumns={'4fr 1fr'}
                    width={'100%'}
                    p={4}
                    bg="blue.500"
                    color="white"
                    justifyContent="space-between"
                    alignItems="center"
                    height="20"
                >
                    <GridItem justifySelf={'center'} >
                        <Heading as={'h1'} justifySelf={'center'}>Kornekt</Heading>
                    </GridItem>
                    <GridItem justifySelf={'end'}>
                        <Text
                            mx={2}
                            cursor="pointer"
                            // onClick={openModal}
                        >
                            Logout
                        </Text>
                    </GridItem>
                    <GridItem gridColumn={'span 2'}>
                        <Outlet />
                    </GridItem>
                </Grid>
            </Flex>
        </SimpleGrid>
    );
  }