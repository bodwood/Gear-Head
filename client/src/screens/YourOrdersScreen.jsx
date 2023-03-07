import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  TBody,
  Tr,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Wrap
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../redux/actions/userActions'
import { useDebugValue, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const YourOrdersScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)
  const {loading, error, orders, userInfo} = user;
  const location = useLocation();

  useEffect(() => {
    if(userInfo) {
      dispatch(getUserOrders())
    }
  })
  return (
    userInfo ? (<p>Orders</p>) : (<Navigate to='/login' replace={true} state={{from: location}} />)
  )
}
export default YourOrdersScreen