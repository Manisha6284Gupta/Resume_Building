// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import validateEmail from '../utils/helper';
// import axiosInstance from '../utils/axiosInstance';
// import { API_PATHS } from '../utils/apiPaths';
// import { authStyles as styles } from '../assets/dummystyle';
//  import { Inputs } from './Inputs';
//  import SignUp from './SignUp';



// const Login = ({setCurrentPage}) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const {updateUser} = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault() ;
//         if(!validateEmail(email)){
//             setError('Please enter a valid email address')
//             return;
//         }
//         if(!password){
//             setError('Please enter password')
//             return;
//         }
//         setError('');
//         try{
//             const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email, password})
//             const {token} = response.data;

//             if(token){
//                 localStorage.setItem('token', token)
//                 updateUser(response.data);
//                 navigate('/dashboard')
//             }
//         }
//         catch(error){
//             setError(error.response?.data?.message || 'Something went Wrong. try again.')

//         }
//     }
//   return (
//       <div className={styles.signupContainer}>
//           <div className={styles.headerWrapper}>
//               <h3 className={styles.title}>Welcome Back</h3>
//               <p className={styles.subtitle}>Sign in to building amazing resume</p>
  
//           </div>
//           {/* form */}
//           <form onSubmit={handleLogin} className={styles.form}>            
              
//               <Inputs value={email} onChange={(e) => setEmail(e.target.value)}
//               label='Email'
//               placeholder='email@example.com'
//               type='email'/>
  


//              <Inputs value={password} onChange={(e) => setPassword(e.target.value)}
//               label='Password'
//               placeholder='Enter your password'
//               type='password'/> 
  
//               {error && <div className={styles.errorMessage}> {error}</div>}
//               <button className={styles.submitButton}>
//                   Login
//               </button>
  
//               {/* Footer */}
//               <p className={styles.switchText}>
//                   Don't have an account?{''}
//                   <button onClick={() => setCurrentPage('SignUp')}
//                   type='button' className={styles.switchButton}>
//                       Sign Up
  
//                   </button>
  
//               </p>
//           </form>
  
        
//       </div>
//     )
//   }


// export default Login






import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {validateEmail} from '../utils/helper.js';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';
import { authStyles as styles } from '../assets/dummystyle';
import { Inputs } from './Inputs';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ Fix here

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sign in to build an amazing resume</p>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <Inputs
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="email@example.com"
          type="email"
        />

        <Inputs
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button className={styles.submitButton}>Login</button>

        <p className={styles.switchText}>
          Don't have an account?{' '}
          <button
           
            type="button"
            onClick={() => setCurrentPage('signup')}
            className={styles.switchButton}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

