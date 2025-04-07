export async function requestLocationPermission(): Promise<boolean> {
  if (!navigator.geolocation) {
    return false;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => {
        resolve(true);
      },
      () => {
        resolve(false);
      }
    );
  });
}