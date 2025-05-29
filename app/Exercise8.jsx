import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const formStyle = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  toggle: {
    display: 'block',
    margin: '20px auto',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '6px',
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginTop: '4px',
  },
};

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);

  const {
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState: { errors: errorsReg },
    reset: resetReg,
  } = useForm();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm();

  const onRegisterSubmit = (data) => {
    console.log('Register data:', data);
    resetReg();
  };

  const onLoginSubmit = (data) => {
    console.log('Login data:', data);
    resetLogin();
  };

  return (
    <div style={formStyle.container}>
      <button onClick={() => setIsRegister(!isRegister)} style={formStyle.toggle}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>

      {isRegister ? (
        <form onSubmit={handleSubmitReg(onRegisterSubmit)}>
          <h2 style={formStyle.title}>Register</h2>

          <label style={formStyle.label}>Name</label>
          <input
            {...registerReg('name', { required: 'Name is required' })}
            placeholder="Your full name"
            style={formStyle.input}
          />
          {errorsReg.name && <p style={formStyle.error}>{errorsReg.name.message}</p>}

          <label style={formStyle.label}>Email</label>
          <input
            {...registerReg('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="Your email"
            style={formStyle.input}
          />
          {errorsReg.email && <p style={formStyle.error}>{errorsReg.email.message}</p>}

          <label style={formStyle.label}>Password</label>
          <input
            type="password"
            {...registerReg('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Password"
            style={formStyle.input}
          />
          {errorsReg.password && <p style={formStyle.error}>{errorsReg.password.message}</p>}

          <button type="submit" style={formStyle.button}>Register</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
          <h2 style={formStyle.title}>Login</h2>

          <label style={formStyle.label}>Email</label>
          <input
            {...registerLogin('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="Your email"
            style={formStyle.input}
          />
          {errorsLogin.email && <p style={formStyle.error}>{errorsLogin.email.message}</p>}

          <label style={formStyle.label}>Password</label>
          <input
            type="password"
            {...registerLogin('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Password"
            style={formStyle.input}
          />
          {errorsLogin.password && <p style={formStyle.error}>{errorsLogin.password.message}</p>}

          <button type="submit" style={formStyle.button}>Login</button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;