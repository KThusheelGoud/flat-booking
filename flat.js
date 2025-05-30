function showBooking(flatType) {
    let data = {
        "Happy Homes": {
            video: "https://www.youtube.com/embed/OtRWAI7eSFo",
            flatPrice: "RS 80,00,000/-",
            bookingPrice: "RS 3000/-",
            location: "D/N 5-2, Food Street, Indore",
            description: "Fully furnished with luxury en-suite facilities, 1600sq.ft."
        },
        "Elite Homes": {
            video: "https://www.youtube.com/embed/L0PSxBh31NI",
            flatPrice: "RS 90,00,000/-",
            bookingPrice: "RS 4000/-",
            location: "D/N 6-2, Food Street, Indore",
            description: "Minimalist modern home, furnished with trending furniture, 1200sq.ft."
        },
        "Glass House": {
            video: "https://www.youtube.com/embed/DHSLvSU7HjU",
            flatPrice: "RS 1,00,00,000/-",
            bookingPrice: "RS 5000/-",
            location: "D/N 5-2, Food Street, Indore",
            description: "Contemporary vibrant home with elegant furnishings, 3600sq.ft."
        }
    };

    document.getElementById("videoFrame").src = data[flatType].video;
    document.getElementById("flatPrice").textContent = data[flatType].flatPrice;
    document.getElementById("bookingPrice").textContent = data[flatType].bookingPrice;
    document.getElementById("location").textContent = data[flatType].location;
    document.getElementById("description").textContent = data[flatType].description;

    display("sectionBookpage");
}