export function addLocation(currentLocation: string) {
  localStorage.setItem("currentLocation", currentLocation ?? "");
}

export function getCurrentLocation(): string {
  return localStorage.getItem("currentLocation") ?? "";
}
