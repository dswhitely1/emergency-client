import type { WeatherData, WeatherAlert, WeatherConditions } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ALERTS_URL = "https://api.weather.gov/alerts/active/zone/INZ090";
const CONDITIONS_URL = "https://api.weather.gov/stations/KSDF/observations";

function degreesToCardinal(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

async function getWeather(): Promise<WeatherData> {
  const headers = {
    "User-Agent": "(Emergency Electric Inc, contact@emergencyelectric.com)",
    Accept: "application/geo+json",
  };

  try {
    const [alertsResult, conditionsResult] = await Promise.allSettled([
      fetch(ALERTS_URL, { headers, next: { revalidate: 600 } }),
      fetch(CONDITIONS_URL, { headers, next: { revalidate: 600 } }),
    ]);

    let alerts: WeatherAlert[] = [];
    if (alertsResult.status === "fulfilled" && alertsResult.value.ok) {
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
    }

    let conditions: WeatherConditions | null = null;
    if (conditionsResult.status === "fulfilled" && conditionsResult.value.ok) {
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
    }

    return { alerts, conditions };
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
