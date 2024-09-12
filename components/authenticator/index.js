import { useContext, useEffect } from "react";
import { AlertContext, UserContext } from "../../pages/_app";

export default function Authenticator() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(AlertContext);

  const getCurrentUser = () => {
    // if (localStorage.getItem("access_token")) {
    //   if (!user) {
    //     ax.get("/api/account/current-user")
    //       .then((res) => {
    //         setUser(res.data);
    //       })
    //       .catch((e) => {
    //         setError(e.response?.data?.message || e.message);
    //         localStorage.removeItem("access_token");
    //         setUser(null);
    //       });
    //   }
    // }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  const { user } = useContext(UserContext);
}
