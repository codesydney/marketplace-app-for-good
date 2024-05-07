import React from 'react'

// TODO: Leaving it here just as reference, it shall be removed or updated later on when we decide if we need a custom control panel or not on the map
function MapControlPanel() {
  return (
    <div className=" absolute right-0 top-0 m-[20px] max-w-[320px] bg-white px-[12px] py-[24px] text-[12px] uppercase text-blue-500 shadow-md outline-none">
      <h3>Marker, Popup, NavigationControl and FullscreenControl </h3>
      <p>
        Map showing top 20 most populated cities of the United States. Click on
        a marker to learn more.
      </p>
      <p>
        Data source:{' '}
        <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
          Wikipedia
        </a>
      </p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.1-release/examples/controls"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  )
}

export default React.memo(MapControlPanel)
