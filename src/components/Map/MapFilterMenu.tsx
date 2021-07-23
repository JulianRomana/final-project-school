import { gsap } from 'gsap'
import 'leaflet/dist/leaflet.css'
import React, { FC, useEffect, useRef } from 'react'
import CloseWhiteIcon from '../../assets/images/close-white.svg'
import DetectorIcon from '../../assets/images/detector.svg'
import ExtinguisherIcon from '../../assets/images/extinguisher.svg'
import ButtonFilter from '../../components/Button/ButtonFilter'

const filterList = [
  { name: 'offline', label: 'Hors-service', color: 'bg-cloud' },
  { name: 'in-alert', label: 'En alert', color: 'bg-yellow' },
  { name: 'in service', label: 'En service', color: 'bg-evergreen' },
  { name: 'extinguisher', label: 'Extincteur', icon: ExtinguisherIcon },
  { name: 'detector', label: 'Detecteur', icon: DetectorIcon },
]

interface MapFilterMenuProps {
  readonly active: boolean
  readonly filters: string[]
  readonly handFilter: (value: string) => void
  readonly setFilterTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline | undefined>>
  readonly closeFilterMenu: () => void
}

const MapFilterMenu: FC<MapFilterMenuProps> = ({ active, filters, handFilter, closeFilterMenu, setFilterTimeline }) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const background = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const closeButton = useRef<HTMLDivElement>(null)

  const handleAnimation = (): void => {
    const tl = gsap.timeline({ defaults: { delay: 0, ease: 'Power3.inOut' } })
    tl.to(wrapper.current, { duration: 0, translateY: 0 })
    tl.to(background.current, { duration: 0.5, scaleY: 1, transformOrigin: 'bottom' })
    tl.to(title.current, { duration: 0.6, opacity: 1 })
    tl.to('.button__item', { duration: 0.4, delay: -0.3, opacity: 1, translateY: 0, stagger: { amount: 0.4 } })
    tl.to(closeButton.current, { duration: 0.4, opacity: 1 })
    setFilterTimeline(tl)
  }

  useEffect(() => {
    if (active) {
      handleAnimation()
    }
  }, [active])

  return (
    <div
      ref={wrapper}
      className='fixed p-4 text-cloud bottom-0 left-0 right-0 transform translate-y-full before:('
      style={{ zIndex: 9999999999 }}
    >
      <div className='relative z-20'>
        <div className='mb-4 flex justify-between'>
          <h3 ref={title} className='font-bold uppercase opacity-0'>
            Filtres :
          </h3>
          <div ref={closeButton} className='opacity-0'>
            <img src={CloseWhiteIcon} alt='Close white icon' className='h-6 cursor-pointer' onClick={closeFilterMenu} />
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
      <div ref={background} className='bg-blue absolute inset-0 z-10 transform scale-y-0' />
    </div>
  )
}

export default MapFilterMenu
