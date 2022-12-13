import { styled } from "@mui/system";

export const Frame = styled("div")({
  width: "900px",
  border: "1px solid lightgrey",
  boxShadow: "2px 2px 2px #eee",
  margin: "0 auto",
});

export const Header = styled("div")(({ theme }) => ({
  fontSize: "17px",
  fontWeight: "bold",
  padding: "10px 10px 5px 10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  color: "white",
}));

export const Body = styled("div")({
  width: "100%",
  padding: "20px",
  display: "flex",
  flexWrap: "wrap",
});

export const WeekDays = styled("div")(({ theme }) => ({
  width: "14%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "1px",
  color: theme.palette.primary.main,
}));
export const Day = styled("button")(({ theme }) => ({
  width: "14%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "1px",
  color: theme.palette.primary.main,
  "&:hover": {
    opacity: 0.7,
  },
}));

export const HeaderBox = styled("div")(({ theme }) => ({
  width: "900px",
  margin: "0 auto",
  height: "40px",
  display: "flex",
  alignItems: "center",
}));

export const ColorPoint = styled("div")(({ theme }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50px",
  margin: "0px 7px 0px 30px",
}));
