import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import { ILogEntry, ILogEntries } from '../services/FetchService';

import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { Marker } from '@adamscybot/react-leaflet-component-marker';
import { EditLocationAlt } from '@mui/icons-material';
import { useEffect, useRef } from 'react';

export default function EntriesList({
    entries,
    onEntrySelect,
}: {
    entries: ILogEntries;
    onEntrySelect: (id: string) => void;
}) {
    const mapRef = useRef();
    const bounds = new L.LatLngBounds(entries.data.map((entry) => { return entry.Where; }));


    useEffect(() => {
        console.log("update ", mapRef);
    }, [mapRef]);

    return (
        <div key="anotherkontainer" className="flex flex-col h-full p-6 md:p-8">
            <div
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ padding: '40px' }}
            >
                Einträge
            </div>
            <div key="conrainer" className="w-full grow">
                <MapContainer key="themap" className="w-full h-full" bounds={bounds} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {entries.data.map((entry: ILogEntry) => {
                        const position = entry.Where;
                        return (
                            <Marker icon={<EditLocationAlt />} position={position} key={entry.Id}>
                                <Popup>
                                    <button
                                        key={entry.Id}
                                        onClick={() => onEntrySelect(entry.Id)}
                                        className="w-full group"
                                    >
                                        <span className="text-lg font-medium">
                                            {entry.Location || 'Untitled'}
                                        </span><br />
                                        <span className="text-base text-gray-600">
                                            {entry.getDaysSinceStart()}. Tag | ≈{entry.km}km
                                        </span>
                                    </button>
                                </Popup>
                            </Marker>
                        );
                    })}

                </MapContainer>
            </div>
        </div>
    );
}
