import { useState, useEffect } from "react";
import { getUserLogged, putAccessToken } from "../utils/network-data";

export default function useAuth() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
      } catch (error) {
        // kalau token tidak valid atau belum login
        setAuthedUser(null);
      } finally {
        setInitializing(false);
      }
    }

    fetchUser();
  }, []);

  const login = (user) => {
    setAuthedUser(user);
  };

  const logout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  return { authedUser, initializing, login, logout };
}
