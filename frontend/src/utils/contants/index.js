import {
  BlocksIcon,
  FormIcon,
  SearchIcon,
  SettingIcon,
} from "~/components/Icons";

export const NAV_ITEMS = [
  { name: "Dashboard", icon: BlocksIcon, path: "/" },
  { name: "Searcher", icon: SearchIcon, path: "/searcher" },
  { name: "Reports", icon: FormIcon, path: "/reports" },
  { name: "Settings", icon: SettingIcon, path: "/settings" },
];

export const SCORE_LABELS = {
  toan: "Math",
  ngu_van: "Literature",
  vat_li: "Physic",
  hoa_hoc: "Chemistry",
  dia_li: "Geography",
  gdcd: "Civic education",
  lich_su: "History",
  sinh_hoc: "Biology",
  english: "English",
  french: "French",
  russian: "Russian",
  chinese: "Chinese",
  korean: "Korean",
  german: "German",
  japanese: "Japanese",
};

export const REVERSED_SCORE_LABELS = Object.fromEntries(
  Object.entries(SCORE_LABELS).map(([key, value]) => [value, key])
);
