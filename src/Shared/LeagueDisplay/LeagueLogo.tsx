import AVESLogo from "../../images/logos/leagues/AVESLogo.svg";
import NHLLogo from "../../images/logos/leagues/NHLLogo.svg";
import NBALogo from "../../images/logos/leagues/NBALogo.svg";
import NCAALogo from "../../images/logos/leagues/NCAALogo.svg";
import NFLLogo from "../../images/logos/leagues/NFLLogo.svg";

interface LeagueLogoProps {
  value: string;
}

export default function LeagueLogo({ value }: LeagueLogoProps) {
  const leagueLogo = getLeagueLogo(value);
  return leagueLogo ? <img src={leagueLogo} alt="Team Logo" /> : <span />;
}

function getLeagueLogo(value: string) {
  switch (value) {
    case "AVES":
      return AVESLogo;
    case "NHL":
      return NHLLogo;
    case "NBA":
      return NBALogo;
    case "NCAA":
      return NCAALogo;
    case "NFL":
      return NFLLogo;
    default:
      return undefined;
  }
}
