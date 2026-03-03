document.addEventListener("DOMContentLoaded", () => {
  // --- Load Flat Details ---
  const params = new URLSearchParams(window.location.search);
  const flat = params.get("flat");

  const videoFrame = document.getElementById("videoFrame");
  const flatPrice = document.getElementById("flatPrice");
  const slotPrice = document.getElementById("slotPrice");
  const location = document.getElementById("location");
  const description = document.getElementById("description");

  const flatsData = {
    "Happy Homes": {
      video: "https://www.youtube.com/embed/OtRWAI7eSFo",
      price: "₹80,00,000/-",
      slot: "₹3000/-",
      location: "D/N 5-2, Food Street, Indore",
      description:
        "Fully furnished house with handmade furniture. Built-up area: 1600 sq.ft.",
      image:
        "https://www.gbdarchitects.com/wp-content/uploads/2013/09/Kiln-Apartments-1-2500x1406.jpg",
    },
    "Elite Homes": {
      video: "https://www.youtube.com/embed/L0PSxBh31NI",
      price: "₹90,00,000/-",
      slot: "₹4000/-",
      location: "D/N 6-2, Food Street, Indore",
      description:
        "Minimalist house for modern families. Built-up area: 1200 sq.ft.",
      image:
        "https://media.bizj.us/view/img/4641221/memorial-green-rendering*1200xx1509-849-246-0.jpg",
    },
    "Glass House": {
      video: "https://www.youtube.com/embed/DHSLvSU7HjU",
      price: "₹1,00,00,000/-",
      slot: "₹5000/-",
      location: "D/N 5-2, Food Street, Indore",
      description:
        "Contemporary home with vibrant interiors. Built-up area: 3600 sq.ft.",
      image:
        "https://zumpermedia.s3.amazonaws.com/blog/wp-content/uploads/2022/02/10162607/mixed-use-apartments-1.jpg",
    },
    "Sunrise Villas": {
      video: "https://www.youtube.com/embed/bpd9kmECZ3w?si=67DbHM0tpYj1yoJ_",
      price: "₹1,20,00,000/-",
      slot: "₹6000/-",
      location: "Plot 12, Green Valley, Indore",
      description:
        "Luxury villas with private garden and pool. Built-up area: 2500 sq.ft.",
      image:
        "https://cdn.fantasiavillas.com/media/2021/03/51_VillaSunrise-min.jpg",
    },
    "Lakeview Residency": {
      video: "https://www.youtube.com/embed/Imq3rWsPlAE?si=xDz5rPDF2H8n5Goe",
      price: "₹75,00,000/-",
      slot: "₹2500/-",
      location: "Near Lake Road, Indore",
      description:
        "Apartments with scenic lake view and modern amenities. Built-up area: 1400 sq.ft.",
      image:
        "https://housing-images.n7net.in/4f2250e8/9a3000e8da9837317e91e4ced9d6e5ad/v0/medium/sri_fortune_one-banjara_hills-hyderabad-sri_sreenivasa_infra.jpeg",
    },
    "Royal Heights": {
      video: "https://www.youtube.com/embed/Ry_cszRPquY?si=ZC4OyNUZRLMj1JSs",
      price: "₹1,50,00,000/-",
      slot: "₹7000/-",
      location: "Main City Center, Indore",
      description:
        "Premium apartments with rooftop lounge and gym. Built-up area: 3000 sq.ft.",
      image:
        "https://img.poehalisnami.ua/static/hotels/greciya/iraklion-o-krit/h10416/orig/booking10416_110416_637378704809747158.jpg",
    },
  };

  if (flat && flatsData[flat]) {
    const data = flatsData[flat];
    videoFrame.src = data.video;
    flatPrice.textContent = `Flat Price: ${data.price}`;
    slotPrice.textContent = `Slot Booking Price: ${data.slot}`;
    location.textContent = data.location;
    description.textContent = data.description;
  }

  // --- Form Handling ---
  const form = document.querySelector("form");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const downloadBtn = document.getElementById("downloadReceipt");

  let bookingData = {};

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const date = document.getElementById("date").value;

      // Validation
      if (!name || !email || !phone || !date) {
        alert("Please fill out all fields.");
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email.");
        return;
      }

      // Save booking data for receipt
      bookingData = {
        name,
        email,
        phone,
        date,
        flat,
        image: flatsData[flat].image,
        price: flatsData[flat].price,
        slot: flatsData[flat].slot,
      };

      // --- Save to Local Storage ---
      let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
      history.push(bookingData);
      localStorage.setItem("bookingHistory", JSON.stringify(history));

      // Build success message
      confirmationMessage.textContent = `Thank you, ${name}! Your booking for ${flat} on ${date} has been received. Our team will contact you soon.`;

      // Show modal
      $("#confirmationModal").modal("show");

      // Reset form
      form.reset();
    });

    // --- Download Receipt ---
    downloadBtn.addEventListener("click", () => {
      if (!bookingData.flat) return;

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Branded header bar
      doc.setFillColor(241, 145, 22);
      doc.rect(0, 0, 210, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text("Sunrise Avenue - Booking Receipt", 10, 14);

      // Reset text color for body
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);

      // Booking details
      doc.text(`Flat: ${bookingData.flat}`, 20, 40);
      doc.text(`Flat Price: ${bookingData.price}`, 20, 50);
      doc.text(`Slot Booking Price: ${bookingData.slot}`, 20, 60);
      doc.text(`Name: ${bookingData.name}`, 20, 70);
      doc.text(`Email: ${bookingData.email}`, 20, 80);
      doc.text(`Phone: ${bookingData.phone}`, 20, 90);
      doc.text(`Booking Date: ${bookingData.date}`, 20, 100);

      doc.text("Thank you for choosing Sunrise Avenue!", 20, 120);

      // Add flat image thumbnail
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = bookingData.image;
      img.onload = function () {
        doc.addImage(img, "JPEG", 20, 130, 80, 60);

        // Generate QR code as canvas
        const qrContainer = document.createElement("div");
        new QRCode(qrContainer, {
          text: `Flat: ${bookingData.flat}\nName: ${bookingData.name}\nEmail: ${bookingData.email}\nPhone: ${bookingData.phone}\nDate: ${bookingData.date}`,
          width: 128,
          height: 128,
        });

        const qrCanvas = qrContainer.querySelector("canvas");
        if (qrCanvas) {
          const qrDataUrl = qrCanvas.toDataURL("image/png");
          doc.addImage(qrDataUrl, "PNG", 120, 130, 60, 60);
        }

        doc.save(`Booking_${bookingData.flat}.pdf`);
      };
    });
  }

  // --- Apartment Filters ---
  const searchBar = document.getElementById("searchBar");
  const filterSize = document.getElementById("filterSize");
  const filterPrice = document.getElementById("filterPrice");
  const apartmentsList = document.getElementById("apartmentsList");

  if (searchBar && filterSize && filterPrice && apartmentsList) {
    const apartments = apartmentsList.getElementsByClassName("apartment-card");

    function applyFilters() {
      const searchText = searchBar.value.toLowerCase();
      const size = filterSize.value;
      const price = filterPrice.value;

      Array.from(apartments).forEach((card) => {
        const name = card.dataset.name.toLowerCase();
        const location = card.dataset.location.toLowerCase();
        const cardSize = card.dataset.size;
        const cardPrice = parseInt(card.dataset.price);

        let matchesSearch =
          !searchText ||
          name.includes(searchText) ||
          location.includes(searchText);
        let matchesSize = !size || cardSize === size;
        let matchesPrice = !price || cardPrice <= parseInt(price);

        if (matchesSearch && matchesSize && matchesPrice) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    // Attach event listeners
    searchBar.addEventListener("input", applyFilters);
    filterSize.addEventListener("change", applyFilters);
    filterPrice.addEventListener("change", applyFilters);
  }
});
