import { Grid, GridItem, Text } from "@chakra-ui/react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Activity() {
  const { pathname } = useLocation()

  return (
    <Grid  
      templateColumns='repeat(4, 1fr)' 
      overflowY={"auto"}
      height={'95svh'} 
      rowGap={'20px'}
    >
      <GridItem 
        textAlign='center' 
        colSpan={1} 
        background={pathname === '/home/activity' ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink} 
        to={'/home/activity'}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Posts</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === '/home/activity/likes' ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={'/home/activity/likes'}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Likes</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === '/home/activity/dislikes' ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={'/home/activity/dislikes'}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Dislikes</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === '/home/activity/drafts' ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={'/home/activity/drafts'}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Drafts</Text>
      </GridItem>
      <GridItem colSpan={4}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}
