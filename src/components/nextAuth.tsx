import React from 'react'
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  useColorModeValue,
  Icon,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const UserLinks = ['Profile'];

const PopoverLink = ({ children }: { children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.200', 'orange.700'),
    }}
    href={`/${children.toLowerCase()}`}
  >
    {children}
  </Link>
);

const loggedOutIcon = () => {
  return <FontAwesomeIcon icon={faUserCircle} size='3x' />
}

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function NextAuth() {
  const [session, loading] = useSession()

  return (
    <PopoverContent bg={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('orange.200', 'orange.700')}>
      {!session &&
        <>
          <PopoverHeader>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent="flex-start">
                <p><strong>You're not signed in</strong></p>
              </Box>
              <Box justifyContent="flex-end">
                <Icon as={loggedOutIcon} />
              </Box>
            </Flex>
          </PopoverHeader>
          <PopoverFooter>
            <Link
              px={2}
              py={1}
              rounded={'md'}
              href={`/api/auth/signin`}
            >
              <Button
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
              >
                Sign In
              </Button>
            </Link>
          </PopoverFooter>
        </>}
      {session &&
        <>
          <PopoverHeader>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent="flex-start">
                <p><small>Signed in as</small></p>
                <p><strong>{session.user.email || session.user.name}</strong></p>
                {console.log(session.user)}
              </Box>
              <Box justifyContent="flex-end">
                {session.user.image ?
                  <Avatar
                    name={session.user.name}
                    size={'md'}
                    src={session.user.image}
                  />
                  :
                  <Icon as={loggedOutIcon} />}
              </Box>
            </Flex>
          </PopoverHeader>
          <PopoverBody>
            {UserLinks.map((link) => (
              <PopoverLink key={link}>{link}</PopoverLink>
            ))}
          </PopoverBody>
          <PopoverFooter>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
              >
                Sign Out
              </Button>
          </PopoverFooter>
        </>
      }
    </PopoverContent>
  )
}
