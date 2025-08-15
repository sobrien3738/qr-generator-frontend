export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  limits: {
    maxQRCodes: number;
    maxScansPerMonth: number;
    canCustomize: boolean;
    canTrackAnalytics: boolean;
    canExportData: boolean;
  };
  usage?: {
    qrCodesCreated: number;
    monthlyScans: number;
    lastResetDate: string;
  };
  subscription?: {
    isActive: boolean;
    currentPeriodEnd?: string;
  };
}

export interface QRCode {
  id: string;
  qrCodeData: string;
  shortUrl: string;
  shortId: string;
  originalUrl: string;
  title?: string;
  description?: string;
  createdAt: string;
  customization: {
    size: number;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    foregroundColor: string;
    backgroundColor: string;
    logoUrl?: string;
  };
  analytics?: {
    totalScans: number;
    lastScanned?: string;
  };
  isActive?: boolean;
}

export interface QRCodeAnalytics {
  totalScans: number;
  lastScanned?: string;
  createdAt: string;
  recentScans: Array<{
    timestamp: string;
    userAgent?: string;
    location?: {
      country?: string;
      city?: string;
    };
  }>;
  dailyScans: Array<{
    date: string;
    scans: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  locationStats: Array<{
    country: string;
    count: number;
  }>;
}

export interface DashboardAnalytics {
  overview: {
    totalQRCodes: number;
    activeQRCodes: number;
    totalScans: number;
    scansThisMonth: number;
  };
  recentActivity: Array<{
    qrCodeId: string;
    title: string;
    shortId: string;
    timestamp: string;
  }>;
  topPerforming: Array<{
    id: string;
    title: string;
    shortId: string;
    totalScans: number;
    lastScanned?: string;
    createdAt: string;
  }>;
  chartData: {
    dailyScans: Array<{
      date: string;
      scans: number;
    }>;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    count: number;
    totalItems: number;
  };
}