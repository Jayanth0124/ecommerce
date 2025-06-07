import React from 'react';
import { useStore } from '../store/useStore';
import { signOutUser } from '../firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Profile: React.FC = () => {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 text-white p-6 pt-20 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Not Logged In</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white p-6 pt-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center space-x-6 mb-6">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
      >
        Logout
      </button>
    </div>
  );
};
