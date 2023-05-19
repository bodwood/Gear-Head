import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, resetErrorAndRemoval } from '../redux/actions/adminActions';

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, userList } = admin;
  const { userInfo } = user;
  const toast = useToast();

  useEffect(() => {
    dispatch(getallUsers());
    dispatch(resetErrorAndRemoval());
    if (userRemoval) {
      toast({ description: 'User has been removed.', status: 'success', isClosable: true });
    }
  }, [userRemoval]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    onOpen();
  };
  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Uh Oh!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='grey.200' color='orange.500' size='xl' />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Registered</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user.id}>
                      {/* Shows logged in user their info */}
                      <Td>
                        {user.name} {user._id === userInfo._id ? '(You)' : ''}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{new Date(user.createdAt).toDateString()}</Td>
                      <Td>{user.isAdmin === 'true' ? <CheckCircleIcon color='orange.500' /> : ''}</Td>
                      <Td>
                       {/* Button allows user to delete other users */}
                        <Button
                          disabled={user._id === userInfo.id}
                          variant='outline'
                          onClick={() => openDeleteConfirmBox(user)}
                        >
                          <DeleteIcon mr='5px' />
                          Remove User
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default UsersTab;
