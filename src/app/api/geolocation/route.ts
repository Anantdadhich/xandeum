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

// ... existing imports
// Keep existing GET ...

export async function POST(request: Request) {
  try {
    const { ips } = await request.json();
    if (!Array.isArray(ips) || ips.length === 0) {
      return NextResponse.json({ error: "IP array required" }, { status: 400 });
    }

    // Deduplicate IPs
    const uniqueIps = Array.from(new Set(ips));
    const results: any[] = [];
    const missingIps: string[] = [];

    // Check cache first
    uniqueIps.forEach(ip => {
      const cached = geoCache.get(ip as string);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        results.push({ query: ip, ...cached.data });
      } else {
        missingIps.push(ip as string);
      }
    });

    // Fetch missing IPs in batches
    if (missingIps.length > 0) {
      // ip-api batch allows up to 100 per request
      const chunkSize = 100;
      for (let i = 0; i < missingIps.length; i += chunkSize) {
        const chunk = missingIps.slice(i, i + chunkSize);

        try {
          const apiRes = await fetch('http://ip-api.com/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chunk.map(ip => ({
              query: ip,
              fields: "status,lat,lon,city,country,regionName,isp,org,query"
            })))
          });

          if (apiRes.ok) {
            const data = await apiRes.json();
            if (Array.isArray(data)) {
              data.forEach((item: any) => {
                if (item.status === 'success') {
                  const geoData = {
                    lat: item.lat,
                    lng: item.lon,
                    city: item.city,
                    country: item.country,
                    regionName: item.regionName,
                    isp: item.isp,
                    org: item.org
                  };
                  // Update cache
                  geoCache.set(item.query, {
                    data: geoData,
                    timestamp: Date.now()
                  });
                  results.push({ ...geoData, query: item.query });
                }
              });
            }
          }

          // Rate limit niceness
          await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
          console.error("Batch fetch error", e);
        }
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Batch processing failed" }, { status: 500 });
  }
}

export const revalidate = 604800; 
