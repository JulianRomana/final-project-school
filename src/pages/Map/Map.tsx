import { CRS, Icon, LatLngBoundsExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { ImageOverlay, MapContainer, MapContainerProps, Marker } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import { MapAlertMenu, MapFilterMenu, MapHistoryMenu } from './components'
import AlarmIcon from '/@/assets/alarmIcon.svg'
import DetectorOffline from '/@/assets/detector-offline.svg'
import DetectorOnline from '/@/assets/detector-online.svg'
import ExtinguisherOffline from '/@/assets/extinguisher-offline.svg'
import ExtinguisherOnline from '/@/assets/extinguisher-online.svg'
import ExtinguisherIcon from '/@/assets/extinguisherIcon.svg'
import AlertIcon from '/@/assets/images/alert.svg'
import ClockIcon from '/@/assets/images/clock.svg'
import map from '/@/assets/map.png'
import { Button, ButtonIcon } from '/@/components/Button'
import axios from '/@/config/axios'
import { NodeType } from '/@/types'

const bounds: LatLngBoundsExpression = [
  [0, 0],
  [500, 500],
]

const mapConfig: MapContainerProps = {
  className: 'h-full',
  center: [250, 250],
  zoom: 1,
  crs: CRS.Simple,
  maxZoom: 3,
  scrollWheelZoom: false,
  maxBounds: bounds,
}

const icons: Record<string, string> = {
  Flexibility: ExtinguisherIcon,
  Luminosity: AlarmIcon,
  FlexibilityOnline: ExtinguisherOnline,
  FlexibilityOffline: ExtinguisherOffline,
  LuminosityOnline: DetectorOnline,
  LuminosityOffline: DetectorOffline,
}

const ICON_SIZE = 25

const generateIcon = (name: string): Icon =>
  new Icon({
    iconUrl: icons[name],
    iconSize: [ICON_SIZE, ICON_SIZE],
  })

const alerts = [
  { name: 'Extincteur déplomber', location: 'Centre sportif', date: 'Thu Jul 22 2021 10:12:56' },
  { name: 'Extincteur déplomber', location: 'Centre sportif', date: 'Thu Jul 22 2021 10:12:56' },
  { name: 'Extincteur déplomber', location: 'Centre sportif', date: 'Thu Jul 22 2021 10:12:56' },
]

const filterList = [
  { name: 'offline', label: 'Hors service', color: 'bg-cloud' },
  { name: 'online', label: 'En service', color: 'bg-evergreen' },
  { name: 'extinguisher', label: 'Extincteur', icon: ExtinguisherIcon },
  { name: 'detector', label: 'Detecteur', icon: AlarmIcon },
]

const MapPage: FC = () => {
  const [filters, setFilters] = useState<string[]>([])
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showAlertMenu, setShowAlertMenu] = useState(false)
  const [showHistoryMenu, setShowHistoryMenu] = useState(false)
  const [filterTimeline, setFilterTimeline] = useState<gsap.core.Timeline>()
  const [alertTimeline, setAlertTimeline] = useState<gsap.core.Timeline>()
  const [historyTimeline, setHistoryTimeline] = useState<gsap.core.Timeline>()
  const [isLoading, setIsLoading] = useState(false)
  const [nodes, setNodes] = useState<NodeType[]>([])
  const filterButton = useRef<HTMLDivElement>(null)
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('/influx')
        setNodes(data.data)
      } catch (err) {
        history.push('/map')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [history])

  const makers = useMemo(() => {
    let filtered: NodeType[] = []

    if (filters.length > 0) {
      if (filters.includes('offline')) {
        filtered = [...filtered, ...nodes.filter((node) => node.isActive === false)]
      }
      if (filters.includes('online')) {
        filtered = [...filtered, ...nodes.filter((node) => node.isActive == true)]
      }
      if (filters.includes('extinguisher')) {
        filtered = [...filtered, ...nodes.filter((node) => node._measurement === 'Flexibility')]
      }
      if (filters.includes('detector')) {
        filtered = [...filtered, ...nodes.filter((node) => node._measurement === 'Luminosity')]
      }

      return filtered
    } else {
      return nodes
    }
  }, [filters, nodes])

  const handleFilterMenu = (): void => {
    closeAlertMenu()
    closeHistoryMenu()

    if (showFilterMenu) closeFilterMenu()
    else setShowFilterMenu(!showFilterMenu)
  }

  const handleAlertMenu = (): void => {
    closeFilterMenu()
    closeHistoryMenu()

    if (showAlertMenu) closeAlertMenu()
    else setShowAlertMenu(!showAlertMenu)
  }

  const handleHistoryMenu = (): void => {
    closeAlertMenu()
    closeFilterMenu()

    if (showHistoryMenu) closeHistoryMenu()
    else setShowHistoryMenu(!showHistoryMenu)
  }

  const closeFilterMenu = (): void => {
    if (filterTimeline) filterTimeline.timeScale(4).reverse()
    setShowFilterMenu(false)
  }

  const closeAlertMenu = (): void => {
    if (alertTimeline) alertTimeline.timeScale(4).reverse()
    setShowAlertMenu(false)
  }

  const closeHistoryMenu = (): void => {
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

  const goToPage = (node: NodeType) => {
    const { _measurement, nodeId } = node

    if (['Flexibility', 'Proximity'].includes(_measurement)) {
      history.push(`/extinguisher/${nodeId}`, node)
      return
    }

    history.push(`/detector/${nodeId}`, node)
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
            {makers.map((node) => (
              <Marker
                key={node.topic}
                position={[node.coordinates.y + ICON_SIZE / 3, node.coordinates.x - ICON_SIZE / 4]}
                icon={generateIcon(`${node._measurement}${node.isActive ? 'Online' : 'Offline'}`)}
                eventHandlers={{
                  click: () => goToPage(node),
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
            filterList={filterList}
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
            histories={nodes}
            setHistoryTimeline={setHistoryTimeline}
            closeHistoryMenu={closeHistoryMenu}
          />
        </div>
      )}
    </>
  )
}

export default MapPage
