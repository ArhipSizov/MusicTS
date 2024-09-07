import { useState } from 'react'

import ImageUpload from './components/ImageUpload'

import './App.css'

function App() {

  const [croppedImage, setCroppedImage] = useState<string>();
  const [fullImage, setFullImage] = useState<string>();

  return (
    <>
      <ImageUpload setCroppedImage={setCroppedImage} setOriginalImage={setFullImage} round aspect={1} sizeLimit={520000}/>
    </>
  )
}

export default App
