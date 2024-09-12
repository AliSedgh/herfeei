import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth); // Set initial width
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowWidth;
};

export default useWindowWidth;

// import { useEffect, useState } from "react";

// const useWindowWidth = () => {
//   const [windowWidth, setWindowWidth] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     if (typeof window !== "undefined") {
//       setWindowWidth(window.innerWidth);  // Set initial width
//       window.addEventListener("resize", handleResize);
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   return windowWidth;
// };

// export default useWindowWidth;
