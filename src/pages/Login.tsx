import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, onAuthStateChangedListener } from '../firebase';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
          name: user.displayName || '',
          avatar: user.photoURL || '',
          isAuthenticated: true,
        });
        navigate('/profile');
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [navigate, setUser]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error('Failed to login. Please try again.');
      console.error(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login. Please try again.');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      setIsRegistering(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white p-6 pt-20 max-w-md mx-auto flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">{isRegistering ? 'Register' : 'Login'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      {isRegistering ? (
        <button
          onClick={handleRegister}
          className="w-full mb-4 px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-colors"
        >
          Create Account
        </button>
      ) : (
        <button
          onClick={handleEmailLogin}
          className="w-full mb-4 px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-colors"
        >
          Login
        </button>
      )}
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="mb-6 text-sm text-primary-400 hover:underline"
      >
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  );
};
