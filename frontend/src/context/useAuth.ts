import { useContext } from 'react';
import { UserContext } from './UserContext';
import { UserContextType } from '../types';

export const useAuth = () => useContext<UserContextType | null>(UserContext);
