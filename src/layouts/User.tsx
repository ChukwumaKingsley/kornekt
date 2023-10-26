import { Grid, GridItem, Text } from "@chakra-ui/react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

export default function User() {
  const { pathname } = useLocation()
  const { id } = useParams()

  return (
    <Grid  
      templateColumns='repeat(4, 1fr)' 
      overflowY={"auto"}
      // height={'95svh'} 
      rowGap={'20px'}
    >
      <GridItem 
        textAlign='center' 
        colSpan={1} 
        background={pathname === `/home/user/${id}` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink} 
        to={`/home/user/${id}`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Profile</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === `/home/user/${id}/posts` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={`/home/user/${id}/posts`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Posts</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === `/home/user/${id}/likes` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={`/home/user/${id}/likes`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Liked</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === `/home/user/${id}/dislikes` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={`/home/user/${id}/dislikes`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Disliked</Text>
      </GridItem>
      <GridItem colSpan={4} justifyItems={'start'}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}
