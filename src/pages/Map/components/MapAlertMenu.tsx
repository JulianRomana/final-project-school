import { gsap } from 'gsap'
import React, { FC, useEffect, useRef } from 'react'
import AlertIcon from '/@/assets/images/alert.svg'
import CloseBlackIcon from '/@/assets/images/close-black.svg'
import ToastAlert from '/@/components/Toast/ToastAlert'

interface MapAlertMenuProps {
  readonly active: boolean
  readonly alerts: any[]
  readonly setAlertTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline | undefined>>
  readonly closeAlertMenu: () => void
}

const MapAlertMenu: FC<MapAlertMenuProps> = ({ active, alerts, setAlertTimeline, closeAlertMenu }) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const background = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const closeButton = useRef<HTMLHeadingElement>(null)

  const handleAnimation = (): void => {
    const tl = gsap.timeline({ defaults: { delay: 0, ease: 'Power3.inOut' } })
    tl.to(wrapper.current, { duration: 0, translateX: 0 })
    tl.to(background.current, { duration: 0.5, scaleX: 1, transformOrigin: 'right' })
    tl.to(title.current, { duration: 0.5, opacity: 1 })
    tl.to('.alert__item', { duration: 0.5, delay: -0.3, translateY: 0, opacity: 1, stagger: { amount: 0.4 } })
    tl.to(closeButton.current, { duration: 0.4, opacity: 1 })
    setAlertTimeline(tl)
  }

  useEffect(() => {
    if (active) {
      handleAnimation()
    }
  }, [active])

  return (
    <div
      ref={wrapper}
      className='absolute inset-0 left-auto w-[85%] p-4 transform translate-x-full'
      style={{ zIndex: 9999999999 }}
    >
      <div className='relative z-20'>
        <div className='flex justify-between items-center'>
          <h1 ref={title} className='flex mt-2 opacity-0'>
            <img src={AlertIcon} alt='Alert title icon' className='mr-2' />
            <span className='text-onyx text-2xl tracking-[-2%]'>Alertes</span>
          </h1>
          <div ref={closeButton} className='opacity-0'>
            <img
              src={CloseBlackIcon}
              alt='Close back icon'
              className='h-6 w-6 cursor-pointer'
              onClick={closeAlertMenu}
            />
          </div>
        </div>
        <div className='my-4 space-y-4'>
          {alerts.map((alert, index) => (
            <div key={`Alert_${index}`} className='alert__item transform translate-y-8 opacity-0'>
              <ToastAlert name={alert.name} location={alert.location} date={alert.date} />
            </div>
          ))}
        </div>
      </div>
      <div ref={background} className='bg-cyan absolute inset-0 z-10 transform scale-x-0'></div>
    </div>
  )
}

export default MapAlertMenu
