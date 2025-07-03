import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapUpdater = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, zoom, {
        animate: true,
        duration: 1.5,
      });
    }
    else{
      console.log("no position");
    }
  }, [position, zoom, map]);

  return null;
};

const MapSection = ({ position, zoom, style, markers = [] }) => {
  if (!position || position.length !== 2) return null;
  console.log("aa", markers);
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      dragging={true}
      tap={true}
      className={style}
      style={{ zIndex: 0 }}
    >
      <MapUpdater position={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {Array.isArray(markers) && markers.map((marker, index) => {
      
        if (!marker.lat || !marker.lon) return null;

        return (
          <Marker key={index} position={[parseFloat(marker.lat), parseFloat(marker.lon)]}>
            <Popup>
              <strong>{marker.address}</strong><br />
              Price: {marker.price}₺<br />
              {marker.bedroom} Bed, {marker.bathroom} Bath
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapSection;
