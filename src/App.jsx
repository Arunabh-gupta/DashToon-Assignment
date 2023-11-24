import './App.css'
import './components/ImageDisplay'
import InputForm from './components/InputForm/InputForm'
import Header from './components/Header/Header'

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  
  return (
    <>
      <Header/>
      <InputForm/>
    </>
  )
}

export default App
