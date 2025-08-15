/// <reference types="react-scripts" />

declare global {
  interface Window {
    trackConversion?: (eventName: string, value?: number) => void;
    trackSignup?: () => void;
    trackUpgrade?: (planName: string, value: number) => void;
    trackQRCreation?: () => void;
  }
}
