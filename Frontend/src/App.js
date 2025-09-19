import './App.css';
import AllHotel from './components/AllHotel';
import NewHotel from './components/NewHotel';
import AddHotel from './components/AddHotel';

export default function App(){
  return(
    <main>
      <AddHotel/>
      <AllHotel/>
      <NewHotel name={"New Hotel 1"}/> 
    </main>
  )
}