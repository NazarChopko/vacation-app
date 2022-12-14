import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Frame,
  Day,
  WeekDays,
  ColorPoint,
  Header,
  HeaderBox,
  Body,
} from "./style";
import { DAYS, DAYS_LEAP, DAYS_OF_THE_WEEK, MONTHS } from "./data";
import { green, red, orange } from "@mui/material/colors";
import { UserData } from "../../context/UserDataContext";
import { IconButton, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";

const Calendar = () => {
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

  const memoIsLeapYear = useMemo(() => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }, [year]);

  const activeVacation = (dayInfo: Date): object => {
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

  const daysOfSimpleOrLeapYear = memoIsLeapYear ? DAYS_LEAP : DAYS;

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
            onClick={() =>
              setDate(
                dayjs(new Date(year, month >= 1 ? month - 1 : month, day))
              )
            }
          >
            <ArrowBackIosIcon sx={{ color: "white" }} />
          </IconButton>

          <Box>
            {MONTHS[month]} {year}
          </Box>
          <IconButton
            onClick={() =>
              setDate(
                dayjs(new Date(year, month >= 11 ? month : month + 1, day))
              )
            }
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
          {Array(
            daysOfSimpleOrLeapYear[month] + (startDay === 0 ? 6 : startDay - 1)
          )
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay === 0 ? startDay + 5 : startDay - 2);

              return (
                <Day
                  sx={{
                    ...(d > 0
                      ? activeVacation(new Date(year, month, d))
                      : null),
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
