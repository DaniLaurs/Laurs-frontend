import {
  createContext,
  useContext,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(() => {
  const storedUser = localStorage.getItem("user");

  return storedUser
    ? JSON.parse(storedUser)
    : null;
});

const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
});


function login(user: User, token: string) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  setUser(user);
  setToken(token);
}

  function logout() {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}