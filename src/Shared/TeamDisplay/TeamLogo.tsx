import HummingbirdLogo from "../../images/logos/teams/aves/HummingbirdLogo.svg";
import SparrowLogo from "../../images/logos/teams/aves/SparrowLogo.svg";
import GoldfinchLogo from "../../images/logos/teams/aves/GoldfinchLogo.svg";
import ChickadeeLogo from "../../images/logos/teams/aves/ChickadeeLogo.svg";
import CardinalLogo from "../../images/logos/teams/aves/CardinalLogo.svg";
import OrioleLogo from "../../images/logos/teams/aves/OrioleLogo.svg";
import RobinLogo from "../../images/logos/teams/aves/RobinLogo.svg";
import WoodpeckerLogo from "../../images/logos/teams/aves/WoodpeckerLogo.svg";
import CanaryLogo from "../../images/logos/teams/aves/CanaryLogo.svg";
import BluebirdLogo from "../../images/logos/teams/aves/BluebirdLogo.svg";
import WarblerLogo from "../../images/logos/teams/aves/WarblerLogo.svg";
import BlueJayLogo from "../../images/logos/teams/aves/BlueJayLogo.svg";
import PurpleMartinLogo from "../../images/logos/teams/aves/PurpleMartinLogo.svg";
import MourningDoveLogo from "../../images/logos/teams/aves/MourningDoveLogo.svg";
import KilldeerLogo from "../../images/logos/teams/aves/KilldeerLogo.svg";
import MockingbirdLogo from "../../images/logos/teams/aves/MockingbirdLogo.svg";
import MallardLogo from "../../images/logos/teams/aves/MallardLogo.svg";
import SeaGullLogo from "../../images/logos/teams/aves/SeaGullLogo.svg";
import PenguinLogo from "../../images/logos/teams/aves/PenguinLogo.svg";
import SwanLogo from "../../images/logos/teams/aves/SwanLogo.svg";
import FlamingoLogo from "../../images/logos/teams/aves/FlamingoLogo.svg";
import OstrichLogo from "../../images/logos/teams/aves/OstrichLogo.svg";
import ParrotLogo from "../../images/logos/teams/aves/ParrotLogo.svg";
import OwlLogo from "../../images/logos/teams/aves/OwlLogo.svg";

import HurricanesLogo from "../../images/logos/teams/nhl/HurricanesLogo.svg";
import BlueJacketsLogo from "../../images/logos/teams/nhl/BlueJacketsLogo.svg";
import ScoutsLogo from "../../images/logos/teams/nhl/ScoutsLogo.svg";
import IslandersLogo from "../../images/logos/teams/nhl/IslandersLogo.svg";
import RangersLogo from "../../images/logos/teams/nhl/RangersLogo.svg";
import FlyersLogo from "../../images/logos/teams/nhl/FlyersLogo.svg";
import PenguinsLogo from "../../images/logos/teams/nhl/PenguinsLogo.svg";
import CapitalsLogo from "../../images/logos/teams/nhl/CapitalsLogo.svg";
import BruinsLogo from "../../images/logos/teams/nhl/BruinsLogo.svg";
import SabresLogo from "../../images/logos/teams/nhl/SabresLogo.svg";
import RedWingsLogo from "../../images/logos/teams/nhl/RedWingsLogo.svg";
import PanthersLogo from "../../images/logos/teams/nhl/PanthersLogo.svg";
import CanadiensLogo from "../../images/logos/teams/nhl/CanadiensLogo.svg";
import SenatorsLogo from "../../images/logos/teams/nhl/SenatorsLogo.svg";
import LightningLogo from "../../images/logos/teams/nhl/LightningLogo.svg";
import MapleLeafsLogo from "../../images/logos/teams/nhl/MapleLeafsLogo.svg";
import CoyotesLogo from "../../images/logos/teams/nhl/CoyotesLogo.svg";
import BlackhawksLogo from "../../images/logos/teams/nhl/BlackhawksLogo.svg";
import AvalancheLogo from "../../images/logos/teams/nhl/AvalancheLogo.svg";
import StarsLogo from "../../images/logos/teams/nhl/StarsLogo.svg";
import WildLogo from "../../images/logos/teams/nhl/WildLogo.svg";
import PredatorsLogo from "../../images/logos/teams/nhl/PredatorsLogo.svg";
import BluesLogo from "../../images/logos/teams/nhl/BluesLogo.svg";
import JetsLogo from "../../images/logos/teams/nhl/JetsLogo.svg";
import DucksLogo from "../../images/logos/teams/nhl/DucksLogo.svg";
import FlamesLogo from "../../images/logos/teams/nhl/FlamesLogo.svg";
import OilersLogo from "../../images/logos/teams/nhl/OilersLogo.svg";
import KingsLogo from "../../images/logos/teams/nhl/KingsLogo.svg";
import SharksLogo from "../../images/logos/teams/nhl/SharksLogo.svg";
import KrakenLogo from "../../images/logos/teams/nhl/KrakenLogo.svg";
import CanucksLogo from "../../images/logos/teams/nhl/CanucksLogo.svg";
import GoldenKnightsLogo from "../../images/logos/teams/nhl/GoldenKnightsLogo.svg";

import KansasCityChiefsLogo from "../../images/logos/teams/nfl/KansasCityChiefsLogo.svg";
import LosAngelesChargersLogo from "../../images/logos/teams/nfl/LosAngelesChargersLogo.svg";

import BaylorBearsLogo from "../../images/logos/teams/ncaa/BaylorBearsLogo.svg";
import IowaStateCyclonesLogo from "../../images/logos/teams/ncaa/IowaStateCyclonesLogo.svg";
import KansasJayhawksLogo from "../../images/logos/teams/ncaa/KansasJayhawksLogo.svg";
import KansasStateWildcatsLogo from "../../images/logos/teams/ncaa/KansasStateWildcatsLogo.svg";
import OklahomaSoonersLogo from "../../images/logos/teams/ncaa/OklahomaSoonersLogo.svg";
import OklahomaStateCowboysLogo from "../../images/logos/teams/ncaa/OklahomaStateCowboysLogo.svg";
import TCUHornedFrogsLogo from "../../images/logos/teams/ncaa/TCUHornedFrogsLogo.svg";
import TexasLonghornsLogo from "../../images/logos/teams/ncaa/TexasLonghornsLogo.svg";
import TexasTechRedRaidersLogo from "../../images/logos/teams/ncaa/TexasTechRedRaidersLogo.svg";
import WestVirginiaMountaineersLogo from "../../images/logos/teams/ncaa/WestVirginiaMountaineersLogo.svg";

interface TeamLogoProps {
  id: number;
}

export default function TeamLogo({ id }: TeamLogoProps) {
  const teamLogo = getTeamLogo(id);
  return !!teamLogo ? <img src={teamLogo} alt="Team Logo" /> : <span />;
}

function getTeamLogo(id: number) {
  switch (id) {
    case 1:
      return HummingbirdLogo;
    case 2:
      return SparrowLogo;
    case 3:
      return GoldfinchLogo;
    case 4:
      return ChickadeeLogo;
    case 5:
      return CardinalLogo;
    case 6:
      return OrioleLogo;
    case 7:
      return RobinLogo;
    case 8:
      return WoodpeckerLogo;
    case 9:
      return CanaryLogo;
    case 10:
      return BluebirdLogo;
    case 11:
      return WarblerLogo;
    case 12:
      return BlueJayLogo;
    case 13:
      return PurpleMartinLogo;
    case 14:
      return MourningDoveLogo;
    case 15:
      return KilldeerLogo;
    case 16:
      return MockingbirdLogo;
    case 17:
      return MallardLogo;
    case 18:
      return SeaGullLogo;
    case 19:
      return PenguinLogo;
    case 20:
      return SwanLogo;
    case 21:
      return FlamingoLogo;
    case 22:
      return OstrichLogo;
    case 23:
      return ParrotLogo;
    case 27:
      return OwlLogo;
    case 33:
      return HurricanesLogo;
    case 34:
      return BlueJacketsLogo;
    case 35:
      return ScoutsLogo;
    case 36:
      return IslandersLogo;
    case 37:
      return RangersLogo;
    case 38:
      return FlyersLogo;
    case 39:
      return PenguinsLogo;
    case 40:
      return CapitalsLogo;
    case 41:
      return BruinsLogo;
    case 42:
      return SabresLogo;
    case 43:
      return RedWingsLogo;
    case 44:
      return PanthersLogo;
    case 45:
      return CanadiensLogo;
    case 46:
      return SenatorsLogo;
    case 47:
      return LightningLogo;
    case 48:
      return MapleLeafsLogo;
    case 49:
      return CoyotesLogo;
    case 50:
      return BlackhawksLogo;
    case 51:
      return AvalancheLogo;
    case 52:
      return StarsLogo;
    case 53:
      return WildLogo;
    case 54:
      return PredatorsLogo;
    case 55:
      return BluesLogo;
    case 56:
      return JetsLogo;
    case 57:
      return DucksLogo;
    case 58:
      return FlamesLogo;
    case 59:
      return OilersLogo;
    case 60:
      return KingsLogo;
    case 61:
      return SharksLogo;
    case 62:
      return KrakenLogo;
    case 63:
      return CanucksLogo;
    case 64:
      return GoldenKnightsLogo;
    case 110:
      return KansasCityChiefsLogo;
    case 111:
      return LosAngelesChargersLogo;
    case 129:
      return BaylorBearsLogo;
    case 130:
      return IowaStateCyclonesLogo;
    case 131:
      return KansasJayhawksLogo;
    case 132:
      return KansasStateWildcatsLogo;
    case 133:
      return OklahomaSoonersLogo;
    case 134:
      return OklahomaStateCowboysLogo;
    case 135:
      return TCUHornedFrogsLogo;
    case 136:
      return TexasLonghornsLogo;
    case 137:
      return TexasTechRedRaidersLogo;
    case 138:
      return WestVirginiaMountaineersLogo;
    default:
      return undefined;
  }
}

/*const teamLogos = {
  5: CardinalLogo,
  6: OrioleLogo,
  7: RobinLogo,
  8: WoodpeckerLogo,
};

export default function getTeamLogos(id: any) {
  if (Object.keys(teamLogos).includes(id)) {
    return teamLogos[id];
  }
}*/

/*export interface TeamLogoProps {
  id: number;
}*/

/*export default function TeamLogo(props: TeamLogoProps) {
  if (props.id === 5) {
    return <img src={CardinalLogo} alt="Cardinal Logo" />;
  } else if (props.id === 6) {
    return <img src={OrioleLogo} alt="Oriole Logo" />;
  } else if (props.id === 7) {
    return <img src={RobinLogo} alt="Robin Logo" />;
  } else if (props.id === 8) {
    return <img src={WoodpeckerLogo} alt="Woodpecker Logo" />;
  } else if (props.id === 11) {
    return <img src={WarblerLogo} alt="Warbler Logo" />;
  } else if (props.id === 12) {
    return <img src={BlueJayLogo} alt="Blue Jay Logo" />;
  } else if (props.id === 16) {
    return <img src={MockingbirdLogo} alt="Mockingbird Logo" />;
  } else if (props.id === 19) {
    return <img src={PenguinLogo} alt="Penguin Logo" />;
  } else if (props.id === 27) {
    return <img src={OwlLogo} alt="Owl Logo" />;
  } else if (props.id === 36) {
    return <IslandersLogo />;
  } else if (props.id === 35) {
    return <img src={AngelsLogo} alt="Angels Logo" />;
  } else if (props.id === 43) {
    return <img src={RedWingsLogo} alt="Red Wings Logo" />;
  } else if (props.id === 44) {
    return <PanthersLogo />;
  } else if (props.id === 47) {
    return <img src={LightningLogo} alt="Lightning Logo" />;
  } else if (props.id === 53) {
    return <WildLogo />;
  } else if (props.id === 50) {
    return <img src={BlackhawksLogo} alt="Blackhawks Logo" />;
  } else if (props.id === 51) {
    return <img src={AvalancheLogo} alt="Avalanche Logo" />;
  } else if (props.id === 52) {
    return <img src={StarsLogo} alt="Stars Logo" />;
  } else if (props.id === 60) {
    return <KingsLogo />;
  } else if (props.id === 62) {
    return <KrakenLogo />;
  } else if (props.id === 64) {
    return <GoldenKnightsLogo />;
  } else {
    return <div />;
  }
}*/
