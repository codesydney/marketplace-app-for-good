'use client'

// Must have the mapbox-gl custom styling to make the map work nicely
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useMemo, useState } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

import MapPin from '@/components/map/MapPin'
// import MapControlPanel from '@/components/map/MapControlPanel'

// TODO: Move those to it's own directory later on
type MapData = {
  id: number
  title: string
  status: string
  date: Date
  location: string
  suburb: string
  latitude: number
  longitude: number
}

const mapData: MapData[] = [
  {
    id: 111111,
    title: 'Offer name 1',
    status: 'open',
    date: new Date(),
    location: '100 Sydney St',
    suburb: 'Sydney',
    latitude: -33.8651,
    longitude: 151.2099,
  },
  {
    id: 222222,
    title: 'Offer name 2',
    status: 'open',
    date: new Date(),
    location: '200 Green Square St',
    suburb: 'Green Square',
    latitude: -33.9058,
    longitude: 151.2014,
  },
  {
    id: 333333,
    title: 'Offer name 3',
    status: 'open',
    date: new Date(),
    location: '300 Chatswood St',
    suburb: 'Chatswood',
    latitude: -33.796,
    longitude: 151.1831,
  },
  {
    id: 444444,
    title: 'Offer name 4',
    status: 'open',
    date: new Date(),
    location: '400 Bondi St',
    suburb: 'Bondi',
    latitude: -33.894,
    longitude: 151.264,
  },

  {
    id: 555555,
    title: 'Offer name 5',
    status: 'open',
    date: new Date(),
    location: '500 Marrickville St',
    suburb: 'Marrickville',
    latitude: -33.9106,
    longitude: 151.1564,
  },
]

export default function Dashboard() {
  const [popupInfo, setPopupInfo] = useState<MapData | null>(null)

  const pins = useMemo(
    () =>
      mapData.map((map, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={map.longitude}
          latitude={map.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            setPopupInfo(map)
          }}
        >
          <MapPin />
        </Marker>
      )),
    [],
  )
  return (
    <>
      <Map
        initialViewState={{
          latitude: -33.8651,
          longitude: 151.2099,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        attributionControl
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pins}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div className=" flex min-w-[250px] flex-col gap-2">
              <span className=" font-semibold">Task: {popupInfo.title}</span>
              <span>Address: {popupInfo.location}</span>
              <span className=" font-semibold">{popupInfo.suburb}</span>
              <a target="_new" href={popupInfo.id.toString()}>
                Link to task
              </a>
            </div>
          </Popup>
        )}
      </Map>
      {/* In case we need to have a fancy custom control panel */}
      {/* <MapControlPanel /> */}
    </>
  )
}
