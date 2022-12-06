export interface IControl {
  isBackButton: boolean;
  title: DashboardTitle;
}

export type DashboardTitle = "Dashboard" | "Add vacation" | "Edit vacation";
