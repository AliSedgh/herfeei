import { useEffect } from "react";

function useOutsideClick(menuRef, triggerRef, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      const isOutsideClick =
        menuRef.current && !menuRef.current.contains(event.target);
      const isNotTriggerClick =
        triggerRef.current && !triggerRef.current.contains(event.target);

      if (isOutsideClick && isNotTriggerClick) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, triggerRef, callback]);
}

export default useOutsideClick;
