import { ReactNode } from 'react';
import {
  Box,
} from '@chakra-ui/react';
import NavBar from '../components/Navbar';

export default function withAction() {
  return (
    <>
      <NavBar />
      <Box p={4}>Main Content Here</Box>
    </>
  );
}
