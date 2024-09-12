import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";

const AddressItem = forwardRef(
  (
    {
      title,
      details,
      default: defaultAddress,
      neighborhood,
      id,
      onAddressToggle,
      defaultAddressId,
      active,
      onSelect,
    },
    ref
  ) => {
    const [isClicked, setIsClicked] = useState(false);
    const addressId = localStorage.getItem("address_id");
    const addressRef = useRef(null);

    useEffect(() => {
      setIsClicked(true);
      if (defaultAddressId) {
        onAddressToggle(true);
      } else {
        onAddressToggle(false);
      }
    }, []);

    // Expose the toggle function using useImperativeHandle
    useImperativeHandle(ref, () => ({
      toggle: () => setIsClicked((prevState) => !prevState),
    }));
    // useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (addressRef.current && !addressRef.current.contains(event.target)) {
    //     setIsClicked(false); // Click occurred outside the address item, untoggle the border
    //   }
    // };

    // document.body.addEventListener("click", handleClickOutside);

    // return () => {
    //   document.body.removeEventListener("click", handleClickOutside);
    // };
    // }, []);

    const handleAddressClick = (e) => {
      localStorage.setItem("address_id", id);
      setIsClicked(true); // Always set to true when clicked
      onAddressToggle(true);
      // Call the parent callback function when the address is toggled
      // setSelected(id)
      onSelect(e, id);
    };

    return (
      <div
        ref={addressRef}
        onClick={handleAddressClick}
        className={`flex items-center m-2 border-[#EBEBEB] border-2 border-solid rounded-xl basis-[100%] cursor-pointer hover:scale-105 transition-all duration-500 relative 
      ${active ? "[border:2px_solid_#0361FF]" : ""}`}
      >
        {defaultAddress && (
          <p className="absolute top-[-2px] left-[-24px] font-bold text-white px-6 custom-trapezoid -rotate-45">
            پیشفرض
          </p>
        )}

        <Image
          className=" rounded-lg m-4"
          src="/icons/address-icon.svg"
          alt={title}
          width={32}
          height={32}
        />
        <h1 className="text-lg ml-4">{title}</h1>
        <h2 className="text-sm font-medium text-[#999CA0] m-2">{details}</h2>
        <h2 className="text-sm font-medium text-[#999CA0] m-2">
          محله : {neighborhood}
        </h2>

        <Image
          className=" rounded-lg m-4 mr-auto"
          src="/images/map.jpg"
          alt={title}
          width={74}
          height={74}
        />
      </div>
    );
  }
);

AddressItem.displayName = "AddressItem";
export default AddressItem;
