import React, { useEffect, useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Button,
  InputAdornment,
} from "@mui/material";
import {
  useGetExpertsAvailableNeighborhoods,
  useGetExpertsNeighborhoodsList,
  usePutUpdateNeighborhoodExpert,
} from "../../../core/hooks/useExpertApi";
import Image from "next/image";
import LocationSvg from "../../../public/icons/deskCityLocation.svg";
import SearchSvg from "../../../public/icons/search.svg";
import RTLTextField from "../../RTLTextField";

const NeighborhoodLocation = ({ cityName }) => {
  const [editMode, setEditMode] = useState(false);
  const [availableAddresses, setAvailableAddresses] = useState();
  const [addresses, setAddresses] = useState();
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const { data } = useGetExpertsNeighborhoodsList();
  const { data: getExpertsAvailableNeighborhoods } =
    useGetExpertsAvailableNeighborhoods();

  let commonIds = availableAddresses
    ?.filter((availableAddressesItem) =>
      addresses?.some(
        (addressesItem) => addressesItem.id === availableAddressesItem.id
      )
    )
    ?.map((availableAddressesItem) => availableAddressesItem.id);

  useEffect(() => {
    setSelectedAddresses([]);
    data?.data && setAddresses(data?.data);
    getExpertsAvailableNeighborhoods?.data &&
      setAvailableAddresses(getExpertsAvailableNeighborhoods?.data);
    data?.data &&
      commonIds &&
      getExpertsAvailableNeighborhoods?.data &&
      setSelectedAddresses((prevState) => [...prevState, ...commonIds]);
  }, [
    getExpertsAvailableNeighborhoods?.data,
    data?.data,
    availableAddresses,
    addresses,
  ]);

  return (
    <div
      className={`w-full h-full ${
        editMode ? "bg-white" : "md:bg-white"
      } rounded-xl p-3`}
    >
      {!editMode ? (
        <div className="w-full md:w-[85%] mx-auto bg-transparent md:bg-white p-3 flex flex-col">
          <div className="w-full md:w-fit bg-white md:bg-transparent px-9 py-6 mb-4 md:[border:1px_solid_#EBEBEB] rounded-lg flex gap-3 items-center justify-center mx-auto">
            <div>
              <div className="w-[40px] h-[40px] relative">
                <Image
                  className="object-contain"
                  src={LocationSvg.src}
                  alt="Location"
                  fill
                />
              </div>
            </div>
            <div className="text-center">
              <p className="m-0 text-[14px] mb-1">شهر محل فعالیت شما</p>
              <p className="m-0 text-[18px] font-bold">{cityName}</p>
            </div>
          </div>
          <div className="w-full bg-white md:bg-transparent flex flex-col px-4 rounded-lg md:rounded-none py-2 md:px-0 md:py-0">
            <h4 className="text-[16px] text-[#212121]">محله های فعالیت شما</h4>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
              {getExpertsAvailableNeighborhoods?.data &&
              availableAddresses?.length > 0 ? (
                availableAddresses?.map((item) => (
                  <div
                    className="bg-[#F9F9F9] rounded-lg py-4 px-3"
                    key={item.id}
                  >
                    <p className="m-0">{item.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-red-500">محله فعالی انتخاب نشده است.</p>
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              className="rounded-lg w-fit mx-auto"
              onClick={() => setEditMode(true)}
            >
              ویرایش
            </Button>
          </div>
        </div>
      ) : (
        <AddressList
          availableAddresses={availableAddresses}
          addresses={addresses}
          setAddresses={setAddresses}
          selectedAddresses={selectedAddresses}
          setSelectedAddresses={setSelectedAddresses}
          data={data}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export { NeighborhoodLocation };

const AddressList = ({
  availableAddresses,
  addresses,
  setAddresses,
  selectedAddresses,
  setSelectedAddresses,
  data,
  setEditMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const putUpdateNeighborhoodExpert = usePutUpdateNeighborhoodExpert();

  const handleCheckboxChange = (id) => {
    setSelectedAddresses((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((addressId) => addressId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAddresses = addresses?.filter((address) =>
    address.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    putUpdateNeighborhoodExpert.mutate({ neighborhood_ids: selectedAddresses });
    setSelectedAddresses([]);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col w-full md:w-[80%] mx-auto p-4 h-fit md:[border:1px_solid_#EFEFEF] rounded-lg">
      <h3 className="text-[16px] text-[#212121] m-0">محله های فعالیت شما</h3>
      <p className="text-[14px] text-[#999CA0]">حداقل یک محله انتخاب کنید.</p>
      <RTLTextField
        sx={{
          "& .MuiOutlinedInput-input::placeholder": {
            fontSize: "16px !important",
            color: "#999CA0 !important",
            opacity: "1 !important",
          },
          "& .MuiInputBase-root": {
            height: "40px",
            borderRadius: "8px",
            border: "none !important",
          },
          "& .MuiOutlinedInput-root": {
            border: "none !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #EBEBEB !important",
          },
          "@media (max-width: 340px)": {
            "& .MuiOutlinedInput-input::placeholder": {
              fontSize: "12px !important",
            },
          },
        }}
        placeholder="جست و جو در محله ها"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className="relative w-[24px] h-[25px] rounded-lg">
                <Image
                  className="object-contain"
                  src={SearchSvg.src}
                  alt="edit icon"
                  fill
                />
              </div>
            </InputAdornment>
          ),
        }}
      />
      <List className="[border-top:1px_solid_#EFEFEF]">
        {data?.data &&
          filteredAddresses?.map((address) => (
            <ListItem
              className="text-right text-[#000000] [border-bottom:1px_solid_#EFEFEF]"
              key={address.id}
            >
              <ListItemText primary={address.name} />
              <Checkbox
                checked={selectedAddresses.includes(address.id)}
                onChange={() => handleCheckboxChange(address.id)}
              />
            </ListItem>
          ))}
      </List>
      <div className="flex m-0 p-0 w-fit gap-1 mt-5 mr-auto">
        <Button
          variant="outlined"
          className="rounded-lg w-fit text-[black] border-[black]"
          onClick={() => setEditMode(false)}
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="rounded-lg w-fit"
          onClick={handleSubmit}
        >
          تایید
        </Button>
      </div>
    </div>
  );
};

export default AddressList;
