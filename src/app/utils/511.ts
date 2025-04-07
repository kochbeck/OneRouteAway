import axios from 'axios';

interface Stop {
  StopCode: string;
  StopId: string;
  StopName: string;
  Latitude: number;
  Longitude: number;
}

interface Arrival {
  LineName: string;
  ExpectedArrivalTime: string;
  VehicleNumber: string;
}

interface NearestStopsAndArrivals {
  stops: Stop[];
  arrivals: Arrival[];
}

export const getNearestStopsAndArrivals = async (latitude: number, longitude: number): Promise<NearestStopsAndArrivals> => {
  const apiKey = process.env.API_511_ORG_KEY;
  if (!apiKey) {
    throw new Error('API_511_ORG_KEY is not defined in the environment variables.');
  }

  try {
    const stopsResponse = await axios.get('https://api.511.org/transit/StopsByLatLon', {
      params: {
        api_key: apiKey,
        latitude: latitude,
        longitude: longitude,
        format: 'json',
      },
    });

    const stopsData = stopsResponse.data.Stops as Stop[];
    const stops = stopsData.slice(0,5);
    let arrivals: Arrival[] = [];
    for (const stop of stops) {
      const arrivalsResponse = await axios.get('https://api.511.org/transit/StopMonitoring', {
      params: {
        api_key: apiKey,
        stopCode: stop.StopCode,
        format: 'json',
      },
    });
    const responseArrivals = arrivalsResponse.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit as Arrival[];
      arrivals = [...arrivals, ...responseArrivals];
    }
    return { stops, arrivals };
  } catch (error) {
    console.error('Error fetching nearest stops and arrivals:', error);
    throw error;
  }
};