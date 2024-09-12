import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { DeskDashboard } from "../../components/deskDashboard/DeskDashboard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ExpertOrderList from "../../components/expertOrderList/ExpertOrderList";

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
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (
  //       expertOrder?.response?.data?.message === "سفارشی برا شما وجود ندارد" ||
  //       (expertOrder?.length > 0 &&
  //         expertOrder
  //           ?.filter((canceledOrder) => canceledOrder?.status !== "CANCELED")
  //           .filter((finishedOrder) => finishedOrder?.status !== "FINISHED")
  //           ?.length === 0)
  //     ) {
  //       setIsExpertList(false);
  //     } else {
  //       setIsExpertList(true);
  //     }
  //   }
  // }, [isLoading, expertOrder]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   afterChange: (current) => setValue(current),
  // };

  return (
    <ThemeProvider theme={Theme}>
      <Box className=" w-full xl:w-[1242px]  mx-auto min-h-[calc(100vh-82px)] flex flex-col items-center">
        <Tabs
          style={{ backgroundColor: "#f1f5f9" }}
          value={value}
          onChange={handleChange}
          className="bg-transparent fixed md:top-[80px] top-0 z-[2] bg-slate-100  w-full mb-6"
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab
            sx={{ borderBottom: "2px solid #ccc" }}
            className="w-1/2 text-[13px] sm:text-[16px]"
            label="سفارشات"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ borderBottom: "2px solid #ccc" }}
            className="w-1/2 text-[13px] sm:text-[16px]"
            label="داشبورد"
            {...a11yProps(1)}
          />
        </Tabs>
        <div className=" mt-28 w-full">
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ExpertOrderList />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="w-full xl:w-[1242px] p-5 md:p-[0] md:pr-[1px] flex flex-col md:flex-row-reverse gap-[24px] flex-wrap">
              <div dir="rtl" className="w-full ">
                <DeskDashboard />
              </div>
            </div>
          </TabPanel>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default Index;
