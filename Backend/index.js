const { initializeDatabase } = require("./db/db.connect")
const Hotel = require("./models/hotel.models")
const express = require("express")
const app = express()
initializeDatabase()
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json())


// const newHotel = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
// };

async function createHotel(newHotel) {
    try {
        const hotel = new Hotel(newHotel)
        const saveHotel = await hotel.save()
        return saveHotel
    } catch (error) {
        throw error
    }
}

app.post("/hotels", async(req, res) => {
    try{
        const newHotel = await createHotel(req.body)
        res.status(201).json({ message: "Hotel added successfully.", hotel: newHotel })
    } catch(error){
        res.status(500).json({ error: "Failed to add hotel." })
    }
})

const newHotel2 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
};

// createHotel(newHotel2)

async function readAllHotel() {
    try {
        const allHotel = await Hotel.find()
        return allHotel
    } catch(error){
        console.log(error)
    }
}

app.get("/hotels", async(req, res) => {
    try {
        const hotel = await readAllHotel(req.params.hotels)
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({ error: "Hotel not found." })
        }
    } catch(error){
        res.status(500).json({ error: "Error in fetching Restaurant." })
    }
})


// function to read a hotel by its name ("Lake View")

async function readByName(hotelName) {
    try {
        const hotel = await Hotel.findOne({name: hotelName})
        return hotel
    } catch(error){
        console.log(error)
    }
}

app.get("/hotels/:hotelName", async(req, res) => {
    try{
        const hotel = await readByName(req.params.hotelName)
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({ error: "Hotel not found." })
        }
    } catch {
        res.status(500).json({ error: "Error in fetching hotel." })
    }
})



// function to read all hotels by category ("Mid-Range")

async function readByCategory(category){
    try{
        const hotel = await Hotel.findOne({category: {$in: category} })
        return hotel
    } catch(error){
        console.log(error)
    }
}

app.get("/hotels/category/:hotelCategory", async(req, res) => {
    try{
        const hotel = await readByCategory(req.params.hotelCategory)
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({ error: "Hotel not found." })
        }
    } catch(error){
        res.status(500).json({ error: "Error while fetching data." })
    }
})


// function to read all hotels with 4.0 rating

async function readByRating(rating){
    try{
        const hotel = await Hotel.findOne({rating: rating })
        return hotel
    } catch(error){
        console.log(error)
    }
}

app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try{
        const hotel = await readByRating(req.params.hotelRating)
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({ error: "Hotel not found." })
        }
    } catch {
        res.status(500).json({ error: "Error while fetching data."})
    }
})


// function to read a hotel by phone number ("+1299655890").

async function readyByPhoneNumber(phoneNumber){
    try{
        const hotel = await Hotel.findOne({phoneNumber: phoneNumber })
        return hotel
    } catch(error){
        console.log(error)
    }
}

app.get("/hotels/directory/:phoneNumber", async(req, res) => {
    try {
        const hotel = await readyByPhoneNumber(req.params.phoneNumber)
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({ error: "Hotel not found." })
        }
    } catch(error) {
        res.status(500).json({ error: "Error while feching hotels." })
    }
})

async function deleteHotel(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
        return deletedHotel
    } catch(error){
        console.log(error)
    }
}

app.delete("/hotels/:hotelId", async(req, res) => {
    try {
        const deletedHotel = await deleteHotel(req.params.hotelId)
        res.status(200).json({ message: "Hotel delete successfully", hotel: deletedHotel })
    } catch {
        res.status(500).json({ error: "Error in deletion of hotel." })
    }
})

async function updateHotel(hotelId, dataToUpdate){
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, { new: true })
        return updatedHotel
    } catch(error) {
        console.log(error)
    }
}

app.post("/hotels/:hotelId", async(req, res) => {
    try {
        const updatedHotel = await updateHotel(req.params.hotelId, req.body)
        if(updatedHotel){
            res.status(200).json({ message: "Hotel updated successfully", updatedHotel: updatedHotel })
        }
    } catch {
        res.status(500).json({ error: "Error in updaing hotel." })
    }
})


const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})