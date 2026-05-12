document.addEventListener("DOMContentLoaded", () => {
  // --- Load Flat Details ---
  const params = new URLSearchParams(window.location.search);
  const flat = params.get("flat");

  const videoFrame = document.getElementById("videoFrame");
  const flatPrice = document.getElementById("flatPrice");
  const slotPrice = document.getElementById("slotPrice");
  const locationText = document.getElementById("location");
  const description = document.getElementById("description");

  const flatsData = {
    "Happy Homes": {
      video: "https://www.youtube.com/embed/OtRWAI7eSFo",
      price: "₹80,00,000/-",
      slot: "₹3000/-",
      location: "D/N 5-2, Food Street, Indore",
      description: "Fully furnished house with handmade furniture. Built-up area: 1600 sq.ft.",
      image: "https://www.gbdarchitects.com/wp-content/uploads/2013/09/Kiln-Apartments-1-2500x1406.jpg",
    },
    "Elite Homes": {
      video: "https://www.youtube.com/embed/L0PSxBh31NI",
      price: "₹90,00,000/-",
      slot: "₹4000/-",
      location: "D/N 6-2, Food Street, Indore",
      description: "Minimalist house for modern families. Built-up area: 1200 sq.ft.",
      image: "https://media.bizj.us/view/img/4641221/memorial-green-rendering*1200xx1509-849-246-0.jpg",
    },
    "Glass House": {
      video: "https://www.youtube.com/embed/DHSLvSU7HjU",
      price: "₹1,00,00,000/-",
      slot: "₹5000/-",
      location: "D/N 5-2, Food Street, Indore",
      description: "Contemporary home with vibrant interiors. Built-up area: 3600 sq.ft.",
      image: "https://zumpermedia.s3.amazonaws.com/blog/wp-content/uploads/2022/02/10162607/mixed-use-apartments-1.jpg",
    },
    "Sunrise Villas": {
      video: "https://www.youtube.com/embed/bpd9kmECZ3w?si=67DbHM0tpYj1yoJ_",
      price: "₹1,20,00,000/-",
      slot: "₹6000/-",
      location: "Plot 12, Green Valley, Indore",
      description: "Luxury villas with private garden and pool. Built-up area: 2500 sq.ft.",
      image: "https://cdn.fantasiavillas.com/media/2021/03/51_VillaSunrise-min.jpg",
    },
    "Lakeview Residency": {
      video: "https://www.youtube.com/embed/Imq3rWsPlAE?si=xDz5rPDF2H8n5Goe",
      price: "₹75,00,000/-",
      slot: "₹2500/-",
      location: "Near Lake Road, Indore",
      description: "Apartments with scenic lake view and modern amenities. Built-up area: 1400 sq.ft.",
      image: "https://housing-images.n7net.in/4f2250e8/9a3000e8da9837317e91e4ced9d6e5ad/v0/medium/sri_fortune_one-banjara_hills-hyderabad-sri_sreenivasa_infra.jpeg",
    },
    "Royal Heights": {
      video: "https://www.youtube.com/embed/Ry_cszRPquY?si=ZC4OyNUZRLMj1JSs",
      price: "₹1,50,00,000/-",
      slot: "₹7000/-",
      location: "Main City Center, Indore",
      description: "Premium apartments with rooftop lounge and gym. Built-up area: 3000 sq.ft.",
      image: "https://img.poehalisnami.ua/static/hotels/greciya/iraklion-o-krit/h10416/orig/booking10416_110416_637378704809747158.jpg",
    },
  };

  if (flat && flatsData[flat]) {
    const data = flatsData[flat];
    if (videoFrame) videoFrame.src = data.video;
    if (flatPrice) flatPrice.textContent = `Flat Price: ${data.price}`;
    if (slotPrice) slotPrice.textContent = `Slot Booking Price: ${data.slot}`;
    if (locationText) locationText.textContent = data.location;
    if (description) description.textContent = data.description;
  }

  // --- Form Handling ---
  const form = document.querySelector("form");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const downloadBtn = document.getElementById("downloadReceipt");
  let bookingData = {};

  if (form) {
    const bookingBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input');

    // Real-time Validation UI
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const date = document.getElementById("date").value;

      if (!name || !email || !phone || !date) {
        alert("Please fill out all fields.");
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits.");
        return;
      }

      // Premium Loading State
      const originalBtnText = bookingBtn.innerHTML;
      bookingBtn.disabled = true;
      bookingBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Processing...`;

      setTimeout(() => {
        bookingData = {
          name,
          email,
          phone,
          date,
          flat,
          image: flatsData[flat]?.image || "",
          price: flatsData[flat]?.price || "N/A",
          slot: flatsData[flat]?.slot || "N/A",
        };

        // Save to Local Storage
        let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
        history.push(bookingData);
        localStorage.setItem("bookingHistory", JSON.stringify(history));

        bookingBtn.disabled = false;
        bookingBtn.innerHTML = originalBtnText;

        if (confirmationMessage) {
          confirmationMessage.textContent = `Thank you, ${name}! Your booking for ${flat} on ${date} has been received. Our team will contact you soon.`;
        }
        $("#confirmationModal").modal("show");

        form.reset();
        inputs.forEach(i => i.classList.remove('is-valid'));
      }, 1500);
    });
  }

// --- Enhanced Download Receipt Logic ---
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    // 1. Check if we have data to print
    if (!bookingData || !bookingData.flat) {
      console.error("No booking data found for PDF generation.");
      alert("Please complete the booking form first!");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 2. Header Styling (Onyx & Orange Theme)
    doc.setFillColor(24, 24, 24); 
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(241, 145, 22); 
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SUNRISE AVENUE", 20, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Premium Living. Redefined.", 20, 32);

    // 3. Receipt Metadata
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text(`Receipt ID: #SR-${Math.floor(Math.random() * 100000)}`, 140, 55);
    doc.text(`Issued: ${new Date().toLocaleDateString()}`, 140, 62);

    doc.setDrawColor(241, 145, 22);
    doc.line(20, 70, 190, 70); 

    doc.setFont("helvetica", "bold");
    doc.text("BOOKING DETAILS", 20, 80);
    doc.setFont("helvetica", "normal");

    const displayPrice = bookingData.price.replace(/[^\x00-\x7F]/g, "Rs. "); 
    const displaySlot = bookingData.slot.replace(/[^\x00-\x7F]/g, "Rs. ");
    
    const details = [
      ["Property Name:", bookingData.flat],
      ["Price:", displayPrice],
      ["Booking Slot:", displaySlot],
      ["Customer Name:", bookingData.name],
      ["Email:", bookingData.email],
      ["Phone:", bookingData.phone],
      ["Visit Date:", bookingData.date]
    ];

    // let yPos = 90;
    // details.forEach(detail => {
    //   doc.text(detail[0], 25, yPos);
    //   doc.text(detail[1], 80, yPos);
    //   yPos += 10;
    // });

    let yPos = 90;
    details.forEach(detail => {
      doc.setFont("helvetica", "bold");
      doc.text(detail[0], 25, yPos);
      
      doc.setFont("helvetica", "normal");
      doc.text(detail[1], 80, yPos);
      yPos += 10;
    });

    // 4. Image Loading with Error Handling
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = bookingData.image;

    img.onload = function () {
      try {
        doc.setDrawColor(200, 200, 200);
        doc.rect(19, 164, 82, 62); 
        doc.addImage(img, "JPEG", 20, 165, 80, 60);

        // QR Code Generation
        const qrContainer = document.createElement("div");
        new QRCode(qrContainer, {
          text: `VERIFIED: ${bookingData.name} - ${bookingData.flat}`,
          width: 128,
          height: 128,
        });

        // Small timeout to ensure QR canvas is rendered
        setTimeout(() => {
          const qrCanvas = qrContainer.querySelector("canvas");
          if (qrCanvas) {
            const qrDataUrl = qrCanvas.toDataURL("image/png");
            doc.text("SCAN TO VERIFY", 130, 160);
            doc.addImage(qrDataUrl, "PNG", 125, 165, 50, 50);
          }
          
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text("This is a computer-generated receipt.", 105, 250, { align: "center" });
          doc.save(`Receipt_Sunrise_${bookingData.flat.replace(/\s+/g, '_')}.pdf`);
        }, 200);
      } catch (err) {
        console.error("PDF Image processing failed:", err);
        // Save PDF anyway even if image fails
        doc.save(`Receipt_Sunrise_${bookingData.flat.replace(/\s+/g, '_')}.pdf`);
      }
    };

    img.onerror = function() {
      console.warn("Could not load property image for PDF. Generating without image.");
      doc.save(`Receipt_Sunrise_${bookingData.flat.replace(/\s+/g, '_')}.pdf`);
    };
  });
}

  // --- Apartment Filters & Scroll Animations ---
  const searchBar = document.getElementById("searchBar");
  const filterSize = document.getElementById("filterSize");
  const filterPrice = document.getElementById("filterPrice");
  const apartmentsList = document.getElementById("apartmentsList");

  if (searchBar && apartmentsList) {
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

        let matchesSearch = !searchText || name.includes(searchText) || location.includes(searchText);
        let matchesSize = !size || cardSize === size;
        let matchesPrice = !price || cardPrice <= parseInt(price);

        card.style.display = (matchesSearch && matchesSize && matchesPrice) ? "block" : "none";
      });
    }

    searchBar.addEventListener("input", applyFilters);
    if (filterSize) filterSize.addEventListener("change", applyFilters);
    if (filterPrice) filterPrice.addEventListener("change", applyFilters);
  }

  // Intersection Observer for Smooth Scroll Reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.apartment-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
  });
});

// Helper for Social Sharing
function shareProperty(name, price) {
  const text = `Check out this amazing property at Sunrise Avenue: ${name} for ${price}!`;
  const url = window.location.href;
  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
}