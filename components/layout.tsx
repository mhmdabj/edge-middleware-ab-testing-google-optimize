import { FC } from 'react'
import Script from 'next/script'
import { Layout, Page } from '@vercel/examples-ui'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { GaProvider } from '@lib/useGa'

function throwIfSSR() {
  throw new Error('Using GA during SSR is not allowed')
}

function gaHandler() {
  const dataLayer = ((window as any).dataLayer =
    (window as any).dataLayer || [])

  dataLayer.push(arguments)
}

const OptimizeLayout: FC<LayoutProps> = ({ children, ...props }) => {
  const ga = typeof window === 'undefined' ? throwIfSSR : gaHandler

  return (
    <Layout {...props}>
      <Page>
        <Script
            src={`https://www.googleoptimize.com/optimize.js?id=OPT-NWMTS95`}
        />
        <Script async id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0J1JT61M1G');
        `}
        </Script>
        <GaProvider value={ga}>{children}</GaProvider>
      </Page>
    </Layout>
  )
}

export default OptimizeLayout
