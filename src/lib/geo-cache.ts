
interface GeoData {
  lat: number;
  lng: number;
  city?: string;
  country?: string;
  regionName?: string;
  isp?: string;
  org?: string;
}

class GeoCache {
  private cache = new Map<string, { data: GeoData; timestamp: number }>();
  private readonly CACHE_TTL = 7 * 24 * 60 * 60 * 1000; 

  async get(ip: string): Promise<GeoData | null> {
    const cached = this.cache.get(ip);

    if (cached) {
      
      if (Date.now() - cached.timestamp < this.CACHE_TTL) {
        console.log(`[GeoCache] Hit for ${ip}`);
        return cached.data;
      } else {
       
        this.cache.delete(ip);
      }
    }

    return null;
  }

  set(ip: string, data: GeoData): void {
    this.cache.set(ip, {
      data,
      timestamp: Date.now(),
    });
    console.log(`[GeoCache] Cached ${ip}`);
  }

  size(): number {
    return this.cache.size;
  }
}

export const geoCache = new GeoCache();


export async function getGeoLocation(ip: string): Promise<GeoData | null> {
 
  const cached = await geoCache.get(ip);
  if (cached) return cached;

  try {
    console.log(`[GeoCache] Fetching from API for ${ip}`);

    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,lat,lon,city,country,regionName,isp,org`,
      { next: { revalidate: 604800 } }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.error(`[GeoCache] Rate limited for ${ip}`);
        return null;
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success" && data.lat && data.lon) {
      const geoData: GeoData = {
        lat: data.lat,
        lng: data.lon,
        city: data.city,
        country: data.country,
        regionName: data.regionName,
        isp: data.isp,
        org: data.org,
      };

      
      geoCache.set(ip, geoData);

      return geoData;
    }
  } catch (error) {
    console.error(`[GeoCache] Error fetching ${ip}:`, error);
  }

  return null;
}
