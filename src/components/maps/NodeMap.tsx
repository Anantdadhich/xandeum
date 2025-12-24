'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface NodeMapProps {
    nodes: Array<{
        ip: string
        pubkey: string
        status: 'healthy' | 'degraded' | 'offline'
    }>
}

interface NodeLocation {
    ip: string
    lat: number
    lng: number
    city: string
    country: string
}

export default function NodeMap({ nodes }: NodeMapProps) {
    const [locations, setLocations] = useState<NodeLocation[]>([])

    useEffect(() => {
        // Progressive loading of locations to avoid spamming the API
        const loadLocations = async () => {
            const activeNodes = nodes.filter(n => n.status !== 'offline').slice(0, 50) // Limit to 50 active nodes for demo to avoid rate limits
            const loaded: NodeLocation[] = []

            for (const node of activeNodes) {
                try {
                    const res = await fetch(`/api/geolocation?ip=${node.ip}`)
                    if (res.ok) {
                        const data = await res.json()
                        if (data.lat && data.lng) {
                            loaded.push({ ...data, ip: node.ip })
                        }
                    }
                } catch (e) {
                    // Silent fail
                }
                // Small delay to be nice to the API/cache
                await new Promise(r => setTimeout(r, 100))
            }
            setLocations(loaded)
        }

        if (nodes.length > 0) {
            loadLocations()
        }
    }, [nodes.length]) // Only re-run if node count changes drastically

    return (
        <div className="h-full w-full rounded-xl overflow-hidden glass-card border border-[var(--card-border)] relative z-0">
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {locations.map((loc, idx) => (
                    <CircleMarker
                        key={`${loc.ip}-${idx}`}
                        center={[loc.lat, loc.lng]}
                        radius={4}
                        fillColor="#00FFAA"
                        color="#00FFAA"
                        weight={1}
                        opacity={0.5}
                        fillOpacity={0.8}
                    >
                        <Popup className="glass-popup">
                            <div className="text-black text-xs">
                                <strong>{loc.city}, {loc.country}</strong><br />
                                IP: {loc.ip}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            <div className="absolute top-4 right-4 z-[1000] glass-card px-3 py-1 text-xs text-[var(--accent)]">
                Active Map Nodes: {locations.length}
            </div>
        </div>
    )
}
