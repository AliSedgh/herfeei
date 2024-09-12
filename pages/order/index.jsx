import { useEffect, useState, useRef } from "react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { EmptyOrderList } from "../../components/emptyOrderList/EmptyOrderList";
import { UserOrderCard } from "../../components/userOrderCard/UserOrderCard";
import { useGetUserOrderList } from "../../core/hooks/useOrderApi";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { FullSkeleton } from "../../components/loadingSkeleton/LoadingSkeleton";
import { FixedHelpDeposit } from "../../components/orderCards/OrderCards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useInfiniteQuery } from "react-query";
import { getUserOrderList } from "../../core/api/orderApi";
import InProgressOrder from "../../components/inProgressOrder/InProgressOrder";
import FinishedOrderList from "../../components/finishedOrderList/FinishedOrderList";
import CanceledOrderList from "../../components/canceledOrderList/CanceledOrderList";

const Theme = createTheme({
  palette: {
    primary: { main: "#0361FF" },
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="w-full h-full px-[1px]"
    >
      {value === index && (
        <Box>
          <Box className="flex flex-col items-center gap-[32px]">
            {children}
          </Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Index() {
  const theme = useTheme();
  const interval = useRef();
  const [value, setValue] = useState(0);
  const [isOrderList, setIsOrderList] = useState();
  const [isCanceledOrderList, setIsCanceledOrderList] = useState();
  const [isFinishedOrderList, seIsFinishedOrderList] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (!isLoading) {

  //     allData?.length === 0 ? setIsOrderList(false) : setIsOrderList(true);
  //     allData?.filter((order) => order?.status === "CANCELED").length === 0
  //       ? setIsCanceledOrderList(false)
  //       : setIsCanceledOrderList(true);
  //     allData?.filter((order) => order?.status === "FINISHED").length === 0
  //       ? seIsFinishedOrderList(false)
  //       : seIsFinishedOrderList(true);
  //   }
  // }, [isLoading, data, allData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    console.log(index);
    setValue(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    afterChange: (current) => handleChangeIndex(current),
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box className="w-full xl:w-[1242px] mx-auto min-h-[calc(100vh-212px)] mt-[20px] pb-[110px] flex flex-col items-center">
        <Tabs
          value={value}
          onChange={handleChange}
          className="bg-transparent w-full"
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab
            sx={{ borderBottom: "2px solid #ccc" }}
            className="w-1/3 text-[13px] sm:text-[16px]"
            label="جاری"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ borderBottom: "2px solid #ccc" }}
            className="w-1/3 text-[13px] sm:text-[16px]"
            label="پایان یافته"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ borderBottom: "2px solid #ccc" }}
            className="w-1/3 text-[13px] sm:text-[16px]"
            label="لغو شده"
            {...a11yProps(2)}
          />
        </Tabs>
        <FixedHelpDeposit isOpen={isOpen} handleClick={handleClick} />
        <div className="w-full pt-5">
          <TabPanel value={value} index={0} dir={theme.direction}>
            <InProgressOrder />

            <Button
              variant="contained"
              className="bg-[#0361FF] w-[173px] h-[46px] rounded-[8px] mx-auto block md:hidden"
            >
              <Link href="/services" className="w-full h-full">
                درخواست سرویس
              </Link>
            </Button>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FinishedOrderList />
            <Button
              variant="contained"
              className="bg-[#0361FF] w-[173px] h-[46px] rounded-[8px] mx-auto block md:hidden p-0"
            >
              <Link
                href="/services"
                className="w-full h-full flex items-center justify-center"
              >
                درخواست سرویس
              </Link>
            </Button>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <CanceledOrderList />
            <Button
              variant="contained"
              className="bg-[#0361FF] w-[173px] h-[46px] p-0 rounded-[8px] mx-auto block md:hidden"
            >
              <Link
                href="/services"
                className="w-full h-full flex items-center justify-center"
              >
                درخواست سرویس
              </Link>
            </Button>
          </TabPanel>
        </div>
        <div className="w-[100vw] h-[110px] fixed right-0 bottom-0 hidden md:flex justify-center items-center [box-shadow:0px_-5px_10.3px_0px_rgba(97,100,117,0.10)] bg-white">
          <Button
            variant="contained"
            className="bg-[#0361FF] w-[173px] h-[46px] rounded-[8px] p-0"
          >
            <Link
              href="/services"
              className="w-full h-full flex items-center justify-center"
            >
              درخواست سرویس
            </Link>
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
}
export default Index;
