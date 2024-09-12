import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const accessRules = {
  USER: {
    allowedRoutes: [
      "/",
      "/unauthorized",
      "/profile",
      "/services",
      "/services/[slug]",
      "/services/[slug]/[id]",
      "/services/[slug]/[id]",
      "/services/questions",
      "/services/questions/[id]",
      "/services/order-description",
      "/services/select-service-for-who",
      "/services/service-for-this-user",
      "/services/service-for-others",
      "/services/select-address",
      "/services/select-date",
      "/services/select-expert",
      "/services/submit-order",
      "/experts",
      "/experts/[id]",
      "/order",
      "/order/order-details",
      "/order/order-details/[id]",
      "/legal",
      "/legal/privacyPolicy",
    ],
  },
  EXPERT: {
    allowedRoutes: [
      "/",
      "/experts",
      "/experts/[id]",
      "/unauthorized",
      "/profile",
      "/services",
      "/services/[slug]",
      "/services/[slug]/[id]",
      "/services/[slug]/[id]",
      "/services/questions",
      "/services/questions/[id]",
      "/services/order-description",
      "/services/select-service-for-who",
      "/services/service-for-this-user",
      "/services/service-for-others",
      "/services/select-address",
      "/services/select-date",
      "/services/select-expert",
      "/services/submit-order",
      "/order",
      "/order/order-details",
      "/order/order-details/[id]",
      "/legal",
      "/legal/privacyPolicy",
    ],
  },
};
const publicRoutes = [
  "/",
  "/unauthorized",
  "/services",
  "/services/[slug]",
  "/services/[slug]/[id]",
  "/services/[slug]/[id]",
  "/services/questions",
  "/services/questions/[id]",
  "/legal",
  "/legal/privacyPolicy",
];

export default function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const [hasAccess, setHasAccess] = useState(false);
    const pathName = router.pathname;
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      const decodeToken = token && jwtDecode(token);
      if (!token) {
        if (publicRoutes.includes(pathName)) {
          // return undefined;
          setHasAccess(true);
        } else {
          router.replace("/unauthorized");
        }
      } else {
        const userRole = decodeToken?.role;

        const allowedRoutes = accessRules[userRole].allowedRoutes;

        if (allowedRoutes.includes(pathName)) {
          // return undefined;
          setHasAccess(true);
        } else {
          router.replace("/unauthorized");
        }
      }
      return () => setHasAccess(false);
    }, [pathName]);
    return hasAccess == true ? <Component {...props} /> : <div>loading...</div>;
  };
}
