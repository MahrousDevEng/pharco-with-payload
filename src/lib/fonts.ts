import localFont from 'next/font/local'

export const titleFont = localFont({
  src: '../../public/fonts/DMSerifDisplay-Regular.ttf',
  weight: '600',
  variable: '--titleFont',
  display: 'swap',
})

export const textFont = localFont({
  src: '../../public/fonts/Ubuntu-Light.ttf',
  weight: '400',
  variable: '--textFont',
  display: 'swap',
})
