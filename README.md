## ✅ README.md

```markdown
# 🏠 Sunrise Avenue - Flat Booking Portal

A modern web application for browsing and booking apartments at **Sunrise Avenue**.  
This project showcases a professional frontend with booking forms, PDF receipts, QR codes, and localStorage booking history.

---

## ✨ Features

- **Apartments Page (`apartments.html`)**
  - Browse multiple flats (Happy Homes, Elite Homes, Glass House, Sunrise Villas, Lakeview Residency, Royal Heights).
  - Search and filter by name, size (2BHK/3BHK/4BHK), and price.
  - Responsive card layout with images, descriptions, and "Book Now" buttons.

- **Booking Page (`booking.html`)**
  - User form with validation (name, email, phone, date).
  - Confirmation modal with success message.
  - PDF receipt generation with:
    - Branded header bar
    - Flat image thumbnail
    - Slot fee and flat price
    - Embedded QR code with booking details

- **Local Storage Booking History**
  - Each booking is saved in browser localStorage.
  - Future `history.html` page can display all past bookings with receipts.

- **Professional Branding**
  - Clean Bootstrap layout
  - Custom CSS (`flat.css`) for styling
  - Navbar + footer for navigation

---

## 📂 Project Structure

```
flat-booking/
├── index.html          # Homepage
├── apartments.html     # Browse apartments
├── booking.html        # Booking form
├── about.html          # About page
├── contact.html        # Contact page
├── flat.js             # Core JS logic (booking, receipts, QR code, localStorage)
├── flat.css            # Custom styles
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/flat-booking.git
   cd flat-booking
   ```

2. Open `index.html` in your browser.

3. Browse apartments, book a flat, and download your branded PDF receipt.

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / Bootstrap 4**
- **JavaScript (ES6)**
- **jsPDF** for PDF generation
- **QRCode.js** for QR code embedding
- **LocalStorage** for booking history

---

## 📸 Screenshots (Optional)

_Add screenshots of apartments page, booking form, and PDF receipt here._

---

## 📌 Future Improvements

- Booking History page (`history.html`) with past bookings.
- Add to Calendar (.ics file) support.
- Share booking via WhatsApp/email.
- Dynamic card generation from `flatsData`.

---

## 📜 License

This project is for learning/demo purposes.  
Feel free to fork and customize for your own real estate booking portal.
```

---

👉 Drop this file as `README.md` in your repo root, commit, and push:

```bash
git add README.md
git commit -m "Added README.md with project overview"
git push origin main
```

That’ll make your repo look 🔥 on GitHub.  
