export interface navItem {
  path: string;
  icon: string;
  label: string;
  isVisibile: boolean;
}

export const NAV_ITEMS: navItem[] = [
  { path: "/dashboard", icon: "dashboard", label: "Dashboard", isVisibile: true },
  { path: "/transactions", icon: "receipt_long", label: "Transakce", isVisibile: true },
  { path: "/statistics", icon: "bar_chart", label: "Statistiky", isVisibile: true },
]
