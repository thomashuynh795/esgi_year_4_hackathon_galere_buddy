import {
  Award,
  House,
  Settings2,
  UserRoundCog,
  Waypoints,
} from "@icons";

const navLinks = [
  { name: "Accueil", href: "/dashboard", icon: <House size={26} />, onDesktop: true},
  { name: "Favoris", href: "/dashboard/favoris", icon: <Award size={26} />, onDesktop: true},
  { name: "Initiative", href: "/dashboard/initiative", icon: <Waypoints size={26} />, onDesktop: true},
  { name: "Profil", href: "/dashboard/profil", icon: <UserRoundCog size={26} />, onDesktop: true},
  // {
  //   name: "Paramètres",
  //   href: "/dashboard/settings",
  //   icon: <Settings2 size={26} />,
  // },
];

export default [...navLinks];
