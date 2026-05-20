export interface navItem {
  path: string;
  icon: string;
  label: string;
  isVisibile: boolean;
}

export const NAV_ITEMS: navItem[] = [
  { path: "/dashboard", icon: "dashboard", label: "DASHBOARD", isVisibile: true },
  { path: "/transactions", icon: "receipt_long", label: "TRANSACTIONS", isVisibile: true },
  { path: "/statistics", icon: "bar_chart", label: "STATISTICS", isVisibile: true },
]
