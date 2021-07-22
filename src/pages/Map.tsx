import { gsap } from 'gsap'
import { CRS, LatLngBoundsExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { FC, useRef, useState } from 'react'
import { ImageOverlay, MapContainer, MapContainerProps, Marker, Popup } from 'react-leaflet'
import DetectorIcon from '../assets/images/detector.svg'
import ExtinguisherIcon from '../assets/images/extinguisher.svg'
import FilterCloseIcon from '../assets/images/filter-close.svg'
import map from '../assets/map.png'
import Button from '../components/Button/Button'
import ButtonFilter from '../components/Button/ButtonFilter'
const bounds: LatLngBoundsExpression = [
  [0, 0],
  [1000, 1000],
]

const mapConfig: MapContainerProps = {
  className: 'h-full',
  center: [700, 500],
  zoom: 1,
  crs: CRS.Simple,
  maxZoom: 3,
  scrollWheelZoom: false,
  maxBounds: bounds,
}

const filterList = [
  { name: 'offline', label: 'Hors-service', color: 'bg-cloud' },
  { name: 'in-alert', label: 'En alert', color: 'bg-yellow' },
  { name: 'in service', label: 'En service', color: 'bg-evergreen' },
  { name: 'extinguisher', label: 'Extincteur', icon: ExtinguisherIcon },
  { name: 'detector', label: 'Detecteur', icon: DetectorIcon },
]

const MapPage: FC = () => {
  const [filters, setFilters] = useState<string[]>([])
  const [timeline, setTimeline] = useState<gsap.core.Timeline>()
  const [showFilter, setShowFilter] = useState(false)
  const filterWrapper = useRef<HTMLDivElement>(null)
  const filterBackground = useRef<HTMLDivElement>(null)
  const filterButton = useRef<HTMLDivElement>(null)
  const filterTitle = useRef<HTMLHeadingElement>(null)
  const filterClose = useRef<HTMLDivElement>(null)

  const handleFilterAnimation = (): void => {
    const tl = gsap.timeline({ defaults: { delay: 0, ease: 'Power3.inOut' } })
    tl.to(filterButton.current, { duration: 0.4, translateY: '100%', opacity: 0 })
    tl.to(filterWrapper.current, { duration: 0, translateY: 0 })
    tl.to(filterBackground.current, { duration: 0.5, scaleY: 1, transformOrigin: 'bottom' })
    tl.to(filterTitle.current, { duration: 0.6, opacity: 1 })
    tl.to('.button__item', { duration: 0.4, delay: -0.3, opacity: 1, translateY: 0, stagger: { amount: 0.4 } })
    tl.to(filterClose.current, { duration: 0.4, opacity: 1 })
    setTimeline(tl)
    setShowFilter(!showFilter)
  }

  const handFilter = (f: string): void => {
    if (filters.includes(f)) {
      setFilters(filters.filter((filter) => filter !== f))
    } else {
      setFilters([...filters, f])
    }
  }

  const closeFilter = (): void => {
    if (timeline) timeline.timeScale(3).reverse()
    handleFilterAnimation
  }

  return (
    <div className='w-full h-[calc(100vh - 56px)]' style={{ height: 'calc(100vh - 56px)' }}>
      <MapContainer {...mapConfig}>
        <ImageOverlay url={map} bounds={bounds} />
        <Marker position={[0, 0]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div
        ref={filterButton}
        className='fixed bottom-4 transform -translate-x-1/2 left-1/2'
        style={{ zIndex: 9999999999 }}
      >
        <Button onClick={handleFilterAnimation}>Filtrer</Button>
      </div>
      <div
        ref={filterWrapper}
        className='fixed p-4 text-cloud bottom-0 left-0 right-0 transform translate-y-full'
        style={{ zIndex: 9999999999 }}
      >
        <div className='relative z-20'>
          <div className='mb-4 flex justify-between'>
            <h3 ref={filterTitle} className='font-bold uppercase opacity-0'>
              Filtres :
            </h3>
            <div ref={filterClose} className='opacity-0'>
              <img src={FilterCloseIcon} alt='Filter close icon' className='h-6 cursor-pointer' onClick={closeFilter} />
            </div>
          </div>
          <div className='flex flex-wrap gap-4 overflow-hidden'>
            {filterList.map((filter, index) => (
              <div key={`Filter_${index}`} className='button__item opacity-0 transform translate-y-8'>
                <ButtonFilter
                  color={filter.color}
                  icon={filter.icon}
                  onClick={() => handFilter(filter.name)}
                  active={filters.includes(filter.name)}
                >
                  {filter.label}
                </ButtonFilter>
              </div>
            ))}
          </div>
        </div>
        <div ref={filterBackground} className='bg-blue absolute inset-0 z-10 transform scale-y-0' />
      </div>
    </div>
  )
}

export default MapPage
