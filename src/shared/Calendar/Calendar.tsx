import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { green, red, orange } from "@mui/material/colors";
import { UserData } from "../../context/UserDataContext";
import { IconButton, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";

const Frame = styled("div")({
  width: "900px",
  border: "1px solid lightgrey",
  boxShadow: "2px 2px 2px #eee",
  margin: "0 auto",
});

const Header = styled("div")(({ theme }) => ({
  fontSize: "17px",
  fontWeight: "bold",
  padding: "10px 10px 5px 10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  color: "white",
}));

const Body = styled("div")({
  width: "100%",
  padding: "20px",
  display: "flex",
  flexWrap: "wrap",
});

const WeekDays = styled("div")(({ theme }) => ({
  width: "14%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "1px",
  color: theme.palette.primary.main,
}));
const Day = styled("button")(({ theme }) => ({
  width: "14%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "1px",
  color: theme.palette.primary.main,
}));

const HeaderBox = styled("div")(({ theme }) => ({
  width: "900px",
  margin: "0 auto",
  height: "40px",
  display: "flex",
  alignItems: "center",
}));

const ColorPoint = styled("div")(({ theme }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50px",
  margin: "0px 7px 0px 30px",
}));

const Calendar = () => {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const today = dayjs();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.get("date"));
  const [month, setMonth] = useState(date.get("month"));
  const [year, setYear] = useState(date.get("year"));
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const { data } = useContext(UserData);
  const navigate = useNavigate();

  useEffect(() => {
    setDay(date.get("date"));
    setMonth(date.get("month"));
    setYear(date.get("year"));
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Dayjs) {
    return dayjs(new Date(date.get("year"), date.get("month"), 1)).get("day");
  }

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const activeVacation = (dayInfo: Date): any => {
    const equal = {
      backgroundColor: "",
      color: "",
      border: "",
    };
    if (dayInfo) {
      data.map((activeDay) => {
        const start = dayjs(activeDay.startDate).unix();
        const end = dayjs(activeDay.endDate).unix();
        const calendarDay = dayjs(dayInfo).unix();
        const today = dayjs().startOf("date").unix();

        if (calendarDay >= start && calendarDay <= end) {
          equal.backgroundColor = green[200];
          equal.color = "white";
          equal.border = `1px solid ${green[400]}`;
        }
        if (calendarDay >= start && calendarDay <= end && calendarDay < today) {
          equal.backgroundColor = red[200];
          equal.border = `1px solid ${red[400]}`;
        }
        if (calendarDay === today) {
          equal.backgroundColor = orange[200];
          equal.border = `1px solid ${orange[400]}`;
        }
      });
    }
    return equal;
  };

  const vacationHandler = (dayInfo: Date) => {
    const myData = data.find((vacation) => {
      const start = dayjs(vacation.startDate).unix();
      const end = dayjs(vacation.endDate).unix();
      const calendarDay = dayjs(dayInfo).unix();

      if (calendarDay >= start && calendarDay <= end) {
        return vacation;
      }
    });
    if (myData) {
      navigate(`/vacation/${myData.id}`);
    } else {
      navigate("/vacation");
    }
  };

  const days = isLeapYear(date.get("year")) ? DAYS_LEAP : DAYS;

  return (
    <>
      <HeaderBox>
        <Box display={"flex"} alignItems={"center"}>
          <ColorPoint sx={{ backgroundColor: orange[200] }} />
          Today
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <ColorPoint sx={{ backgroundColor: green[200] }} />
          Active vacation
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <ColorPoint sx={{ backgroundColor: red[200] }} />
          Inactive vacation
        </Box>
      </HeaderBox>
      <Frame>
        <Header>
          <IconButton
            onClick={() => setDate(dayjs(new Date(year, month - 1, day)))}
          >
            <ArrowBackIosIcon sx={{ color: "white" }} />
          </IconButton>

          <Box>
            {MONTHS[month]} {year}
          </Box>
          <IconButton
            onClick={() => setDate(dayjs(new Date(year, month + 1, day)))}
          >
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </IconButton>
        </Header>
        <Body>
          {DAYS_OF_THE_WEEK.map((d) => (
            <WeekDays key={d}>
              <strong>{d}</strong>
            </WeekDays>
          ))}
          {Array(days[month] + (startDay === 0 ? 6 : startDay - 1))
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay === 0 ? startDay + 5 : startDay - 2);

              return (
                <Day
                  sx={{
                    backgroundColor: activeVacation(new Date(year, month, d)),
                    visibility: d - 1 < 0 ? "hidden" : "visible",
                  }}
                  key={index}
                  onClick={() => vacationHandler(new Date(year, month, d))}
                >
                  {d > 0 ? d : ""}
                </Day>
              );
            })}
        </Body>
      </Frame>
    </>
  );
};

export default Calendar;
