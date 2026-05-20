export interface NavItem {
  path: string;
  icon: string;
  label: string;
  isVisible: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/dashboard", icon: "dashboard", label: "DASHBOARD", isVisible: true },
  { path: "/transactions", icon: "receipt_long", label: "TRANSACTIONS", isVisible: true },
  { path: "/statistics", icon: "bar_chart", label: "STATISTICS", isVisible: true },
]
