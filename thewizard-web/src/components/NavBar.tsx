import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
  }
  // user is not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }
  //user is logged in
  else {
    body = (
      <Flex>
        <Box mr="4">{data.me.username}</Box>
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
