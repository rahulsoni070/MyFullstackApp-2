import useFetch from "../useFetch";

export default function NewHotel({name}) {
    const {data, loading, error} = useFetch(`http://localhost:4444/hotels/${name}`)

    console.log(data)

    return (
        <div>
            {loading && <p>Loading........</p>}
            {data?.error && <p>{data.error}</p>}
            {data && !data.error && (
                <div>
                    <h1>{data.name}</h1>
                    <p><b>Location: </b>{data.location}</p>
                    <p><b>Rating: </b>{data.rating}</p>
                    <p><b>Price Range: </b>{data.priceRange}</p>
                </div>
            )}
        </div>
    )
}