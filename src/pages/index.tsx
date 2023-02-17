import { Inter } from '@next/font/google'
import Home from '@/views/home'
import { PageMeta } from '@/components/Layout/Page'

const inter = Inter({ subsets: ['latin'] })

export default function IndexPage() {
  
  return (
    <>
      <PageMeta />
      <Home />
    </>
  )
}


export async function getStaticProps() {
  
  return {
    props: {
    }, // will be passed to the page component as props
  }
}