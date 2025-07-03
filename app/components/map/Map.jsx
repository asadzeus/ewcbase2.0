
"use client"
import dynamic from 'next/dynamic';

const MapSection = dynamic(() => import('./MapSection'), {
  ssr: false
});

const Map = ({position, zoom, style, markers=[]}) => {

  return (
    <div>
      <MapSection position={position} zoom={zoom} style={style} markers={markers}/>
    </div>
  )
}

export default Map;
