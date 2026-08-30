
import DestinationScroller from './components/DestinationScroller.tsx'
import DestinationScroller2 from './components/DestinationScroller2.tsx'
import DestinationHero from './components/Hero.tsx'
import DiscHero from './components/DiscHero.tsx'
import Navbar from './components/Navbar.tsx'
import VideoLoader from './components/VideoLoader.tsx'

function App() {

  return (
    <>
      <VideoLoader />
      <Navbar />
      <DestinationScroller/>
      {/* <DestinationScroller2/> */}
      {/* <DestinationHero/> */}
      {/* <DiscHero/> */}
    </>
    
  )
}

export default App
