import { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';     //useDispatch to dispatch an action and the other is to select from globat state
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/userApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //the function that we want to call isLoading krml ma n3ml handle lal loading
    const [login, { isLoading }] = useLoginMutation();

    //get the user data
    const { userInfo } = useSelector((state) => state.auth);
    //if we have user info so we will login : 
    useEffect(() => {
      if (userInfo){
        navigate('/')
      }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();
      try{
        //calling l login l bhe lsafha l hiye mn mutation yaane l mawjude bl userApiSlice yaane aam e3mal l post request l honik 
        const res = await login({email, password}).unwrap(); // unwrap: we will return a promise this basically does is it unwraps that promise 
        dispatch(setCredentials({...res})) //setting the user info to local storage into our state
        navigate('/')
      }catch(err){
        toast.error(err?.data?.message || err.error); // hek l error using toast badal ma tal3o aal console bbayenle aa shakel toast 

      }
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={ submitHandler }>
          <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control 
        type = 'email'
        placeholder='Enter Your Email'
        value = {email}
        onChange = { (e) => setEmail(e.target.value)}
        >  
        </Form.Control>
</Form.Group>

<Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type = 'password'
        placeholder='Enter Your Password'
        value = {password}
        onChange = { (e) => setPassword(e.target.value)}
        >
          
        </Form.Control>
        </Form.Group>
       { isLoading && <Loader /> }
    <Button type = 'submit' variant = 'primary' className='mt-3'>
      Sign In
    </Button>
    <Row className='py-3'>
      <Col>
     New Customer?<Link to = '/register'>Register</Link>
      </Col>
    </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen