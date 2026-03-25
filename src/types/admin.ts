// src/types/admin.ts

export interface ApplicantRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  employment_count: number;
  education_count: number;
  reference_count: number;
}

export interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  contact: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  urgency: string;
  expires: string;
}

export interface WeatherConditions {
  temperature: number | null;
  temperatureUnit: string;
  humidity: number | null;
  windSpeed: string | null;
  windDirection: string | null;
  shortForecast: string;
  icon: string | null;
  timestamp: string;
}

export interface WeatherData {
  alerts: WeatherAlert[];
  conditions: WeatherConditions | null;
}
