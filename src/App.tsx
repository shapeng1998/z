import ImageViewer from './components/ImageViewer/ImageViewer'
import testImage from './assets/img.jpg'

function App() {
  return <ImageViewer src={testImage} type="use-gesture" />
}

export default App
