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
import { useAuth } from "../hooks/useAuth";

export interface IDataVacation {
  type: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  notes: string;
  id: string;
}

interface IContext {
  data: IDataVacation[] | [];
  setData: Dispatch<SetStateAction<IDataVacation[]>>;
  edit: string;
  setEdit: Dispatch<SetStateAction<string>>;
}

export const UserData = createContext<IContext>({} as IContext);

const UserDataContext: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IDataVacation[] | []>([]);
  const [edit, setEdit] = useState<string>("");

  return (
    <UserData.Provider value={{ data, setData, edit, setEdit }}>
      {children}
    </UserData.Provider>
  );
};

export default UserDataContext;
