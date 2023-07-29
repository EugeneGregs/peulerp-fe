import { error } from "jquery";
import { API_PRIVATE } from "../service/api";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToke";
import { useEffect } from "react";

const usePrivateAxios = () => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = API_PRIVATE.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.user.token}`;
      }

      return config;
    });

    const responseIntercept = API_PRIVATE.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalResponse = error?.config;
        if (error?.response?.status === 401) {
          if (originalResponse.sent) {
            setAuth(null);
            return Promise.reject(error);
          }
          originalResponse.sent = true;
          try {
            refresh()
              .then((token) => {
                originalResponse.headers["Authorization"] = `Bearer ${token}`;
                return API_PRIVATE(originalResponse);
              })
              .catch((error) => {
                return Promise.reject(error);
              });
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      API_PRIVATE.interceptors.request.eject(requestIntercept);
      API_PRIVATE.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return API_PRIVATE;
};

export default usePrivateAxios;
