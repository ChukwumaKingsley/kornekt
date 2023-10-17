// src/Header.js

import React from 'react';
import { Flex, Heading, Link } from '@chakra-ui/react';

function Header() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="blue.500"
      p={2}
    >
      <Heading as="h1" size="xl" color="white" fontWeight="bold">
        Kornekt
      </Heading>
      <Flex alignItems="center">
        <Link mr={2} color="white">
          Signup
        </Link>
        <Link mr={2} color="white">
          Login
        </Link>
        <Link color="white">About</Link>
      </Flex>
    </Flex>
  );
}

export default Header;
