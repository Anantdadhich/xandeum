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
        const loadLocations = async () => {
            const activeNodes = nodes.filter(n => n.status !== 'offline')
            if (activeNodes.length === 0) return

            const uniqueIps = Array.from(new Set(activeNodes.map(n => n.ip)))

            // Filter out IPs we already have
            const missingIps = uniqueIps.filter(ip => !locations.some(l => l.ip === ip))

            if (missingIps.length === 0) return

            try {
                // Send all missing IPs to backend - it handles batching
                const res = await fetch('/api/geolocation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ips: missingIps })
                })

                if (res.ok) {
                    const data = await res.json()
                    if (Array.isArray(data)) {
                        setLocations(prev => {
                            const existing = new Map(prev.map(l => [l.ip, l]))
                            data.forEach((item: any) => {
                                if (item.lat && item.lng) {
                                    existing.set(item.query, { ...item, ip: item.query })
                                }
                            })
                            return Array.from(existing.values())
                        })
                    }
                }
            } catch (e) {
                console.error("Failed to load map locations", e)
            }
        }

        // Debounce slightly to allow node list to settle
        const timer = setTimeout(() => {
            loadLocations()
        }, 500)

        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes.length])

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
