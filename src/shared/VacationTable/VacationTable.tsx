import React, { FC, useContext, useLayoutEffect, useState } from "react";
import { IDataVacation, UserData } from "../../context/UserDataContext";
import dayjs from "dayjs";
import { useAuth } from "../../hooks/useAuth";
import { CustomTableContainer } from "./CustomTableContainer";

const getDataFromStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

const VacationTable: FC = () => {
  const { data, setData, filterType } = useContext(UserData);
  const [filteredActualVacation, setFilteredActualVacation] = useState<
    IDataVacation[]
  >([]);
  const [filteredHistoryVacation, setFilteredHistoryVacation] = useState<
    IDataVacation[]
  >([]);
  const { user } = useAuth();

  useLayoutEffect(() => {
    const getVacationDataFromStorage = getDataFromStorage("data");
    const user = getDataFromStorage("user");
    if (user && getVacationDataFromStorage) {
      for (let key in getVacationDataFromStorage) {
        if (user.email === key) {
          setData(getVacationDataFromStorage[key]);
        }
      }
    }
  }, [user]);

  useLayoutEffect(() => {
    const today = dayjs().unix();
    if (filterType === "actual") {
      const actualVacation = data.filter(
        (vacation) => dayjs(vacation.endDate).unix() >= today
      );
      setFilteredActualVacation(actualVacation);
    }
    if (filterType === "history") {
      const historyVacation = data.filter(
        (vacation) => dayjs(vacation.endDate).unix() < today
      );
      setFilteredHistoryVacation(historyVacation);
    }
  }, [data, filterType]);

  return (
    <CustomTableContainer
      vacationData={
        filterType === "actual"
          ? filteredActualVacation
          : filteredHistoryVacation
      }
    />
  );
};

export default VacationTable;
