import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [user, setUser, removeUser] = useLocalStorage('talentforge_user', null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('talentforge_auth', false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeUser();
    setIsAuthenticated(false);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return { user, isAuthenticated, login, logout, updateUser };
}
