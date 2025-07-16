// import React from 'react'
// import { authStyles as styles } from '../assets/dummystyle'
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import { useContext } from 'react';
// import { useState } from 'react';
// import validateEmail from '../utils/helper.js'
// import axiosInstance from '../utils/axiosInstance';
// import { API_PATHS } from '../utils/apiPaths.js';
//  import { Inputs } from './Inputs';



// function SignUp({setCurrentPage}) {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const { updateUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if(!fullName) {
//         setError('Please enter FullName')
//         return;
//     }
//     if(!validateEmail(email)){
//          setError('Please enter a valid email address')
//         return;

//     }
//     if(!password)
//     {
//         setError('Please enter the password')
//         return;
//     }
//     setError('');

//     try{
//         const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,
//             {
//                 name:fullName,
//                 email,
//                 password
//             });
//             const {token} = response.data;
//             if(token){
//                 localStorage.setItem('token', token);
//                 updateUser(response.data);
//                 navigate('/dashboard')

//             }
//         }

     
         
//     catch(error){
//         setError(error.response?.data?.message || 'Something went wrong. Please try again')

//     }
//   }


//   return (
//     <div className={styles.signupContainer}>
//         <div className={styles.headerWrapper}>
//             <h3 className={styles.signupTitle}>Create Account</h3>
//             <p className={styles.signupSubtitle}>Join thousands of professionals today</p>

//         </div>
// {/* form */}
//         {/* <form onSubmit={handleSingUp} className={styles.signupForm}>
//             <Inputs value={fullName} onChange={(target) => setFullName(target.value)}
//             label='Full Name'
//             placeholder='John Deo'
//             type='text'/> */}

//              <form onSubmit={handleSignUp} className={styles.signupForm}>
//             <Inputs value={fullName} onChange={(e) => setFullName(e.target.value)}
//             label='Full Name'
//             placeholder='John Deo'
//             type='text'/>



           
 
//             <Inputs value={email} onChange={(e) => setEmail(e.target.value)}
//             label='Email'
//             placeholder='email@example.com'
//             type='email'/> 





//                <Inputs value={password} onChange={(e) => setPassword(e.target.value)}
//             label='Password'
//             placeholder='Enter your password'
//             type='password'/> 
            
             




// {/* WE */}


//             {error && <div className={styles.errorMessage}> {error}</div>}
//             <button className={styles.signupSubmit}>
//                 Create Account
                 
//             </button>

//             {/* Footer */}
//             <p className={styles.switchText}>
//                 Already have an accout?{''}
//                 <button onClick={() => setCurrentPage('login')}
//                 type='button' className={styles.signupSwitchButton}>
//                     Login

//                 </button>

//             </p>
//         </form>

      
//     </div>
//   )
// }

// export default SignUp






import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStyles as styles } from '../assets/dummystyle';
import { UserContext } from '../context/UserContext';
import validateEmail from '../utils/helper.js';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths.js';
import { Inputs } from './Inputs';

function SignUp({ setCurrentPage }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) return setError('Please enter Full Name');
    if (!validateEmail(email)) return setError('Please enter a valid email address');
    if (!password) return setError('Please enter the password');
    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
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
      setError(error.response?.data?.message || 'Something went wrong. Please try again');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>

      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Inputs
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

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

        <button type="submit" className={styles.signupSubmit}>
          Create Account
        </button>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            type="button"
            className={styles.signupSwitchButton}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
