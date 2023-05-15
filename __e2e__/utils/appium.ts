/**
 * App statuses docs: https://appium.io/docs/en/commands/device/app/app-state/)
 */
export const AppState = {
  IsNotInstalled: 0,
  IsNotRunning: 1,
  IsRunningInBackgroundOrSuspended: 2,
  IsRunningInBackground: 3,
  IsRunningInForeground: 4,
} as const
