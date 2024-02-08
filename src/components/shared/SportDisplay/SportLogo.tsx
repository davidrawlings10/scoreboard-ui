import {
  SportsHockey,
  SportsBasketball,
  SportsFootball,
} from "@mui/icons-material";

interface SportLogoProps {
  value: string;
}

export default function SportLogo({ value }: SportLogoProps) {
  switch (value) {
    case "HOCKEY":
      return <SportsHockey />;
    case "BASKETBALL":
      return <SportsBasketball />;
    case "FOOTBALL":
      return <SportsFootball />;
    default:
      throw Error("sport not allowed");
  }
}
