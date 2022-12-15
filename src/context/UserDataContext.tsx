import { Dayjs } from "dayjs";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";

export interface IDataVacation {
  type: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  notes: string;
  id: string;
}

type filterType = "actual" | "history";

interface IContext {
  data: IDataVacation[] | [];
  setData: Dispatch<SetStateAction<IDataVacation[]>>;
  filterType: filterType;
  setFilterType: Dispatch<SetStateAction<filterType>>;
  isCalendarVisible: boolean;
  setIsCalendarVisible: Dispatch<SetStateAction<boolean>>;
}

export const UserData = createContext<IContext>({} as IContext);

const UserDataContext: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IDataVacation[]>([]);
  const [filterType, setFilterType] = useState<filterType>("actual");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  return (
    <UserData.Provider
      value={{
        data,
        setData,
        filterType,
        setFilterType,
        isCalendarVisible,
        setIsCalendarVisible,
      }}
    >
      {children}
    </UserData.Provider>
  );
};

export default UserDataContext;
