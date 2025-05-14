import './App.css'
import { ToastContainer } from 'react-toastify'
import RoutesConfig from './routes/RouteConfig';

function App() {

  return (
    <div>
      <RoutesConfig />
      <ToastContainer autoClose={1000}/>
    </div>
  )
}

export default App