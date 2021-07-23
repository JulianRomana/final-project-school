import { gsap } from 'gsap'
import React, { FC, useEffect, useRef } from 'react'
import CloseBlackIcon from '../../assets/images/close-black.svg'
import HistoryCard from '../HistoryCard/HistoryCard'

interface MapHistoryMenuProps {
  readonly active: boolean
  readonly histories: any[]
  readonly setHistoryTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline | undefined>>
  readonly closeHistoryMenu: () => void
}

const MapHistoryMenu: FC<MapHistoryMenuProps> = ({ active, histories, setHistoryTimeline, closeHistoryMenu }) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const background = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const closeButton = useRef<HTMLHeadingElement>(null)

  const handleAnimation = (): void => {
    const tl = gsap.timeline({ defaults: { delay: 0, ease: 'Power3.inOut' } })
    tl.to(wrapper.current, { duration: 0, translateY: 0 })
    tl.to(background.current, { duration: 0.5, scaleY: 1, transformOrigin: 'bottom' })
    tl.to(title.current, { duration: 0.5, opacity: 1 })
    tl.to('.alert__item', { duration: 0.5, delay: -0.3, translateY: 0, opacity: 1, stagger: { amount: 0.4 } })
    tl.to(closeButton.current, { duration: 0.5, opacity: 1 })
    setHistoryTimeline(tl)
  }

  useEffect(() => {
    if (active) {
      handleAnimation()
    }
  }, [active])

  return (
    <div
      ref={wrapper}
      className='fixed inset-0 top-auto h-1/2 w-full transform translate-y-full overflow-hidden'
      style={{ zIndex: 9999999999 }}
    >
      <div className='relative z-20 h-full'>
        <div className='flex justify-between items-center p-4'>
          <h1 ref={title} className='text-blue uppercase font-bold tracking-[-2%] opacity-0'>
            Historique d’événement
          </h1>
          <div ref={closeButton} className='opacity-0'>
            <img
              src={CloseBlackIcon}
              alt='Close back icon'
              className='h-6 w-6 cursor-pointer'
              onClick={closeHistoryMenu}
            />
          </div>
        </div>
        <div className='relative w-full p-4 overflow-scroll' style={{ height: 'calc(100% - 3.5rem)' }}>
          <div className='space-y-4 '>
            {histories.map((history, index) => (
              <div key={`Alert_${index}`} className='alert__item transform translate-y-8 opacity-0'>
                <HistoryCard
                  isExtinguisher={history.isExtinguisher}
                  id={history.id}
                  name={history.name}
                  date={history.date}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={background} className='bg-cloud absolute inset-0 z-10 transform scale-y-0'>
        <div className='absolute inset-0 bg-blue bg-opacity-20'></div>
      </div>
    </div>
  )
}

export default MapHistoryMenu
