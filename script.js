document.addEventListener("DOMContentLoaded", function () {
    // Gestion des cartes d'événements (navigation)
    const eventCards = document.querySelectorAll(".event-card");
    eventCards.forEach(card => {
        card.addEventListener("click", function (event) {
            event.preventDefault();
            const targetUrl = this.getAttribute("href");
            window.location.href = targetUrl;
        });
    });

    console.log("Galerie Photo - Yearbook script chargé avec succès");

    // Sélection de toutes les images de la galerie
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            openLightbox(this.src, index);
        });
    });

    // Gestion du menu burger (mobile)
    const menuToggle = document.querySelector(".menu-toggle");
    const header = document.querySelector("header");
    
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            header.classList.toggle("menu-open");
        });
    }

    // Swipe pour changer d'image sur mobile
    const lightbox = document.getElementById("lightbox");
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].screenX;
        });

        lightbox.addEventListener("touchend", function (event) {
            touchEndX = event.changedTouches[0].screenX;
            if (touchEndX < touchStartX) {
                changeImage(1); // Swipe gauche → Image suivante
            } else if (touchEndX > touchStartX) {
                changeImage(-1); // Swipe droite → Image précédente
            }
        });
    }
});

// Variables pour la gestion des images dans la Lightbox
let currentImageIndex = 0;
let images = [];

// Ouvrir la Lightbox avec la première image sélectionnée
function openLightbox(imgSrc, index) {
    images = Array.from(document.querySelectorAll(".gallery-item"));
    currentImageIndex = index;

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "flex";
    lightboxImg.src = imgSrc;
}

// Fermer la Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Changer d'image avec les flèches gauche/droite
function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Aller à la dernière image
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Revenir à la première image
    }

    document.getElementById("lightbox-img").src = images[currentImageIndex].src;
}
