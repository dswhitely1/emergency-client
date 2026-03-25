// src/components/admin/weather-display.tsx
import type { WeatherData } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getWeather(): Promise<WeatherData> {
  // Use absolute URL for server component fetch — in production this resolves correctly
  // During build, fall back to empty data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/weather`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error("Weather fetch failed");
    return res.json();
  } catch {
    return { alerts: [], conditions: null };
  }
}

export default async function WeatherDisplay() {
  const { alerts, conditions } = await getWeather();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Weather</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Conditions */}
        {conditions ? (
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-2xl font-bold">
                {conditions.temperature != null
                  ? `${conditions.temperature}°${conditions.temperatureUnit}`
                  : "N/A"}
              </p>
              <p className="text-muted-foreground">{conditions.shortForecast}</p>
            </div>
            <div className="text-right text-muted-foreground text-xs space-y-1">
              {conditions.humidity != null && <p>Humidity: {conditions.humidity}%</p>}
              {conditions.windSpeed && (
                <p>
                  Wind: {conditions.windSpeed}
                  {conditions.windDirection ? ` ${conditions.windDirection}` : ""}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Weather data unavailable
          </p>
        )}

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Active Alerts
            </p>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-md border p-2 text-sm space-y-1"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      alert.severity === "Extreme" || alert.severity === "Severe"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <span className="font-medium">{alert.event}</span>
                </div>
                <p className="text-muted-foreground text-xs">{alert.headline}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
