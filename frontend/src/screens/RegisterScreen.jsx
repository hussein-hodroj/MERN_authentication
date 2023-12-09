import { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import { useRegisterMutation } from '../slices/userApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
      if (userInfo){
        navigate('/')
      }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('passwords do not match')
      }else { 
        try {
          const res = await register({name, email, password}).unwrap(); // unwrap: we will return a promise this basically does is it unwraps that promise 
          dispatch(setCredentials({...res})) //setting the user info to local storage into our state
          navigate('/')

        }catch(err){
        toast.error(err?.data?.message || err.error); // hek l error using toast badal ma tal3o aal console bbayenle aa shakel toast 
      }
      }
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={ submitHandler }>
        <Form.Group className='my-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type = 'name'
        placeholder='Enter Your Name'
        value = {name}
        onChange = { (e) => setName(e.target.value)}
        >  
        </Form.Control>
</Form.Group>

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
        <Form.Group className='my-2' controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
        type = 'confirmPassword'
        placeholder='Confirm Password'
        value = {confirmPassword}
        onChange = { (e) => setConfirmPassword(e.target.value)}
        >
          
        </Form.Control>
        </Form.Group>
        { isLoading && <Loader /> }
    <Button type = 'submit' variant = 'primary' className='mt-3'>
      Sign Up
    </Button>
    <Row className='py-3'>
      <Col>
     Already have an account?<Link to = '/login'>Login</Link>
      </Col>
    </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen