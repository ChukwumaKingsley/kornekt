import { SimpleGrid, Text, chakra } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const StyledNavLink = chakra(NavLink, {
  baseStyle: {
    // Define your active link styles here
    color: "blue.500", // Change this to your preferred style
  },
});

export default function Activity() {
  return (
    <SimpleGrid mt='20px' textAlign='center' columns={3}>
      <StyledNavLink as={Text} to={'/home/activity'}>Posts</StyledNavLink>
      <StyledNavLink as={Text} to={'/home/activity'}>Likes</StyledNavLink>
      <StyledNavLink as={Text} to={'/home/activity'}>Dislikes</StyledNavLink>
    </SimpleGrid>
  )
}
