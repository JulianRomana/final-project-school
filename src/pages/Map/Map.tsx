import { CRS, Icon, LatLngBoundsExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { FC, useEffect, useRef, useState } from 'react'
import { ImageOverlay, MapContainer, MapContainerProps, Marker } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import { MapAlertMenu, MapFilterMenu, MapHistoryMenu } from './components'
import alarmIcon from '/@/assets/alarmIcon.svg'
import extinguisherIcon from '/@/assets/extinguisherIcon.svg'
import AlertIcon from '/@/assets/images/alert.svg'
import ClockIcon from '/@/assets/images/clock.svg'
import map from '/@/assets/map.png'
import { Button, ButtonIcon } from '/@/components/Button'
import axios from '/@/config/axios'

const bounds: LatLngBoundsExpression = [
  [0, 0],
  [500, 500],
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

const icons: Record<string, string> = {
  Flexibility: extinguisherIcon,
  Luminosity: alarmIcon,
  Proximity: extinguisherIcon,
}

const generateIcon = (name: string): Icon =>
  new Icon({
    iconUrl: icons[name],
    iconSize: [25, 25],
  })

const alerts = [
  {
    name: 'Extincteur déplomber',
    location: 'Centre sportif',
    date: 'Thu Jul 22 2021 10:12:56',
  },
  {
    name: 'Extincteur déplomber',
    location: 'Centre sportif',
    date: 'Thu Jul 22 2021 10:12:56',
  },
  {
    name: 'Extincteur déplomber',
    location: 'Centre sportif',
    date: 'Thu Jul 22 2021 10:12:56',
  },
]

const histories = [
  {
    id: 22,
    name: 'Extincteur déplomber',
    date: 'Thu Jul 22 2021 10:12:56',
    isExtinguisher: true,
  },
  {
    id: 22,
    name: 'Extincteur déplomber',
    date: 'Thu Jul 22 2021 10:12:56',
    isExtinguisher: true,
  },
  {
    id: 22,
    name: 'Extincteur déplomber',
    date: 'Thu Jul 22 2021 10:12:56',
    isExtinguisher: true,
  },
  {
    id: 22,
    name: 'Extincteur déplomber',
    date: 'Thu Jul 22 2021 10:12:56',
    isExtinguisher: true,
  },
  {
    id: 22,
    name: 'Le détecteur a était enclanché',
    date: 'Thu Jul 22 2021 10:12:56',
    isExtinguisher: false,
  },
]

interface nodeType {
  coordinates: {
    x: number
    y: number
  }
  _measurement: string
  topic: string
  name: string
  _time: string
}

const MapPage: FC = () => {
  const [filters, setFilters] = useState<string[]>([])
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showAlertMenu, setShowAlertMenu] = useState(false)
  const [showHistoryMenu, setShowHistoryMenu] = useState(false)
  const [filterTimeline, setFilterTimeline] = useState<gsap.core.Timeline>()
  const [alertTimeline, setAlertTimeline] = useState<gsap.core.Timeline>()
  const [historyTimeline, setHistoryTimeline] = useState<gsap.core.Timeline>()
  const [isLoading, setIsLoading] = useState(false)
  const [nodes, setNodes] = useState<nodeType[]>([])
  const history = useHistory()
  const filterButton = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('/influx')
        setNodes(data.data)
      } catch (err) {
        history.push('map')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [history])

  const handleFilterMenu = (): void => {
    closeAlertMenu()
    closeHistoryMenu()

    if (showFilterMenu) closeFilterMenu()
    else setShowFilterMenu(!showFilterMenu)
  }

  const handleAlertMenu = () => {
    closeFilterMenu()
    closeHistoryMenu()

    if (showAlertMenu) closeAlertMenu()
    else setShowAlertMenu(!showAlertMenu)
  }

  const handleHistoryMenu = () => {
    closeAlertMenu()
    closeFilterMenu()

    if (showHistoryMenu) closeHistoryMenu()
    else setShowHistoryMenu(!showHistoryMenu)
  }

  const closeFilterMenu = () => {
    if (filterTimeline) filterTimeline.timeScale(4).reverse()
    setShowFilterMenu(false)
  }

  const closeAlertMenu = () => {
    if (alertTimeline) alertTimeline.timeScale(4).reverse()
    setShowAlertMenu(false)
  }

  const closeHistoryMenu = () => {
    if (historyTimeline) historyTimeline.timeScale(4).reverse()
    setShowHistoryMenu(false)
  }

  const handFilter = (f: string): void => {
    if (filters.includes(f)) {
      setFilters(filters.filter((filter) => filter !== f))
    } else {
      setFilters([...filters, f])
    }
  }

  const goToPage = (node: Partial<nodeType>) => {
    const { _measurement, topic } = node

    if (_measurement && ['Flexibility', 'Proximity'].includes(_measurement)) {
      history.push(`extinguisher`, node)
      return
    }
    history.push(`detector`, node)
  }

  return (
    <>
      {!isLoading && (
        <div
          className='w-full h-[calc(100vh - 56px)] relative overflow-hidden'
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <MapContainer {...mapConfig}>
            <ImageOverlay url={map} bounds={bounds} />
            {nodes.map(({ coordinates, topic, _measurement, name, _time }) => (
              <Marker
                key={topic}
                position={[coordinates.y, coordinates.x]}
                icon={generateIcon(_measurement)}
                eventHandlers={{
                  click: () => goToPage({ name, _time, _measurement, topic }),
                }}
              />
            ))}
          </MapContainer>
          <div className='absolute top-4 right-4 flex flex-col space-y-4' style={{ zIndex: 9999999999 }}>
            <ButtonIcon icon={AlertIcon} onClick={handleAlertMenu} />
            <ButtonIcon icon={ClockIcon} onClick={handleHistoryMenu} />
          </div>
          <div
            ref={filterButton}
            className='fixed bottom-4 transform -translate-x-1/2 left-1/2'
            style={{ zIndex: 9999999999 }}
          >
            <Button onClick={handleFilterMenu}>Filtrer</Button>
          </div>
          <MapFilterMenu
            active={showFilterMenu}
            filters={filters}
            handFilter={handFilter}
            setFilterTimeline={setFilterTimeline}
            closeFilterMenu={closeFilterMenu}
          />
          <MapAlertMenu
            active={showAlertMenu}
            alerts={alerts}
            setAlertTimeline={setAlertTimeline}
            closeAlertMenu={closeAlertMenu}
          />
          <MapHistoryMenu
            active={showHistoryMenu}
            histories={histories}
            setHistoryTimeline={setHistoryTimeline}
            closeHistoryMenu={closeHistoryMenu}
          />
        </div>
      )}
    </>
  )
}

export default MapPage
