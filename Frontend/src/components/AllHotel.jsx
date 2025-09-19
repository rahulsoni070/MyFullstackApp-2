import { useState } from "react";
import useFetch from "../useFetch";

export default function AllHotel(){
    const [successMessage, setSuccessMessage] = useState("")
    const { data, loading, error } = useFetch("http://localhost:4444/hotels")

    // console.log(data)

    const deleteHandler = async (hotelId) => {
        try {
            const response = await fetch(`http://localhost:4444/hotels/${hotelId}`, 
                {
                    method: "DELETE"
                }
            )
            if(!response.ok){
                throw "Failed to delete hotel"
            }
            
            const data = await response.json()
            if(data) {
                setSuccessMessage("Hotel deleted successfully.")
                window.location.reload()
            }
        } catch (error){
            console.log(error)
        }
    }

    return (
    <div>
        {loading && <p>Loading...</p>}
        {data?.error && <p>{data.error}</p>}
        {data && !data.error && (
            <div>
                <h1>All Hotels</h1>
                <ul>{data?.map((hotel) => (
                    <li key={hotel._id}>{hotel.name}{" "}<button onClick={() => deleteHandler(hotel._id)}>Delete</button></li>
                ))}
                </ul>
                <p>{successMessage}</p>      
            </div>
        )}
    </div>
)}