import { NextResponse } from "next/server";


const geoCache = new Map<
  string,
  {
    data: any;
    timestamp: number;
  }
>();

const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip");

  if (!ip) {
    return NextResponse.json({ error: "IP address required" }, { status: 400 });
  }


  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {

    return NextResponse.json(cached.data);
  }


  try {


    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,lat,lon,city,country,regionName,isp,org`
    );

    if (!response.ok) {
      if (response.status === 429) {

        return NextResponse.json({ error: "Rate limited" }, { status: 429 });
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success" && data.lat && data.lon) {
      const geoData = {
        lat: data.lat,
        lng: data.lon,
        city: data.city,
        country: data.country,
        regionName: data.regionName,
        isp: data.isp,
        org: data.org,
      };


      geoCache.set(ip, {
        data: geoData,
        timestamp: Date.now(),
      });

      return NextResponse.json(geoData);
    }

    return NextResponse.json(
      { error: "Geolocation not found" },
      { status: 404 }
    );
  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch geolocation" },
      { status: 500 }
    );
  }
}

export const revalidate = 604800; 
