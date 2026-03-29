// src/app/api/weather/route.ts
import { NextResponse } from "next/server";
import type { WeatherAlert, WeatherConditions, WeatherData } from "@/types/admin";

const ALERTS_URL = "https://api.weather.gov/alerts/active/zone/INZ090";
const CONDITIONS_URL = "https://api.weather.gov/stations/KSDF/observations";

export const revalidate = 600; // 10 minutes

export async function GET() {
  const headers = {
    "User-Agent": "(Emergency Electric Inc, contact@emergencyelectric.com)",
    Accept: "application/geo+json",
  };

  const [alertsResult, conditionsResult] = await Promise.allSettled([
    fetch(ALERTS_URL, { headers, next: { revalidate: 600 } }),
    fetch(CONDITIONS_URL, { headers, next: { revalidate: 600 } }),
  ]);

  // Parse alerts
  let alerts: WeatherAlert[] = [];
  if (alertsResult.status === "fulfilled" && alertsResult.value.ok) {
    try {
      const alertsData = await alertsResult.value.json();
      alerts = (alertsData.features ?? []).map(
        (feature: { properties: Record<string, unknown> }) => ({
          id: feature.properties.id as string,
          event: feature.properties.event as string,
          headline: feature.properties.headline as string,
          description: feature.properties.description as string,
          severity: feature.properties.severity as string,
          urgency: feature.properties.urgency as string,
          expires: feature.properties.expires as string,
        })
      );
    } catch {
      // If parsing fails, leave alerts empty
    }
  }

  // Parse conditions — use the most recent observation
  let conditions: WeatherConditions | null = null;
  if (conditionsResult.status === "fulfilled" && conditionsResult.value.ok) {
    try {
      const conditionsData = await conditionsResult.value.json();
      const latest = conditionsData.features?.[0]?.properties;
      if (latest) {
        const tempC = latest.temperature?.value;
        const tempF = tempC != null ? Math.round((tempC * 9) / 5 + 32) : null;
        conditions = {
          temperature: tempF,
          temperatureUnit: "F",
          humidity: latest.relativeHumidity?.value != null
            ? Math.round(latest.relativeHumidity.value)
            : null,
          windSpeed: latest.windSpeed?.value != null
            ? `${Math.round(latest.windSpeed.value * 0.621371)} mph`
            : null,
          windDirection: latest.windDirection?.value != null
            ? degreesToCardinal(latest.windDirection.value)
            : null,
          shortForecast: latest.textDescription ?? "",
          icon: latest.icon ?? null,
          timestamp: latest.timestamp ?? new Date().toISOString(),
        };
      }
    } catch {
      // If parsing fails, leave conditions null
    }
  }

  const data: WeatherData = { alerts, conditions };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
    },
  });
}

function degreesToCardinal(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
