import { useState } from "react";

const AddNewHotel = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        location: "",
        rating: "",
        website: "",
        phoneNumber: "",
        checkInTime: "",
        checkOutTime: "",
        amenities: "",
        priceRange: "",
        reservationsNeeded: false,
        isParkingAvailable: false,
        isWifiAvailable: false,
        isPoolAvailable: false,
        isSpaAvailable: false,
        isRestaurantAvailable: false,
        photos: "",    
    })

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setFormData((prevState) => ({
            ...prevState, 
            [name]: type === "checkbox"
            ? checked : name === "rating"
            ? parseFloat(value) : value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const bodyToSend = {
        ...formData,
        amenities: formData.amenities ? formData.amenities.split(",") : [],
        photos: formData.photos ? formData.photos.split(",") : [],
        category: formData.category ? [formData.category] : []
    }

        try {
            const response = await fetch("https://my-fullstack-app-2-6h7m.vercel.app/hotels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyToSend)
            })

            if(!response.ok){
                throw "Failed to add hotel"
            }

            const data = await response.json()

            console.log("Added Hotel", data)

        } catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Add New Hotel</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <br/>
                <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Category:</label>
                <br/>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Budget">Budget</option>
                    <option value="Mid-Range">Mid-Range</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Boutique">Boutique</option>
                    <option value="Resort">Resort</option>
                    <option value="Other">Other</option>
                </select>
                <br/>
                <br/>
                <label>Location:</label>
                <br/>
                <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Rating:</label>
                <br/>
                <input 
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Website:</label>
                <br/>
                <input 
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Phone Number:</label>
                <br/>
                <input 
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Check In Time:</label>
                <br/>
                <input 
                type="text"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Check Out Time:</label>
                <br/>
                <input 
                type="text"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Amenities:</label>
                <br/>
                <input 
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Price Range:</label>
                <br/>
                <select name="priceRange" onChange={handleChange} value={formData.priceRange}>
                    <option value="$$ (11-30)">$$ (11-30)</option>
                    <option value="$$$ (31-60)" >$$$ (31-60)</option>
                    <option value="$$$$ (61+)" >$$$$ (61+)</option>
                    <option value="Other">Other</option>
                </select>
                <br/>
                <br/>
                <label>ReservationsNeeded:</label>
                <input 
                type="checkbox"
                name="reservationsNeeded"
                checked={formData.reservationsNeeded}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>IsParkingAvailable:</label>
                <input 
                type="checkbox"
                name="isParkingAvailable"
                checked={formData.isParkingAvailable}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>IsWifiAvailable:</label>
                <input 
                type="checkbox"
                name="isWifiAvailable"
                checked={formData.isWifiAvailable}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>IsPoolAvailable:</label>
                <input 
                type="checkbox"
                name="isPoolAvailable"
                checked={formData.isPoolAvailable}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>IsSpaAvailable:</label>
                <input 
                type="checkbox"
                name="isSpaAvailable"
                checked={formData.isSpaAvailable}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>IsRestaurantAvailable:</label>
                <input 
                type="checkbox"
                name="isRestaurantAvailable"
                checked={formData.isRestaurantAvailable}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <label>Photos:</label>
                <br/>
                <input 
                type="text"
                name="photos"
                value={formData.photos}
                onChange={handleChange}
                />
                <br/>
                <br/>                
                <button>Submit</button>
            </form>
        </div>
    )

}

export default AddNewHotel;