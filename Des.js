window.onload = function() {
    // Configuração dos Sliders
    document.querySelectorAll('.category-section').forEach(section => {
        const slides = section.querySelectorAll('.slide');
        const prevBtn = section.querySelector('.prev');
        const nextBtn = section.querySelector('.next');
        const counter = section.querySelector('.counter');
        const dateText = section.querySelector('.image-date');
        const descText = section.querySelector('.image-desc');
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider(index) {
            slides.forEach(slide => slide.style.display = 'none');
            currentIndex = (index + totalSlides) % totalSlides;
            const currentSlide = slides[currentIndex];
            currentSlide.style.display = 'block';
            
            counter.innerText = `${currentIndex + 1} / ${totalSlides}`;
            
            if (dateText && descText) {
                dateText.innerText = "Data: " + (currentSlide.getAttribute('data-date') || "---");
                descText.innerText = currentSlide.getAttribute('data-desc') || "Sem descrição.";
            }
        }

        if (totalSlides > 0) updateSlider(0);

        nextBtn.onclick = () => updateSlider(currentIndex + 1);
        prevBtn.onclick = () => updateSlider(currentIndex - 1);
    });
};

// Funções do Modal (Zoom)
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgFull");

function openModal(imgElement) {
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

// Fechar modal ao clicar no X ou fora da imagem
document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (modal.style.display === "block") {
        if (e.key === "Escape") modal.style.display = "none";
        return;
    }

    const sections = document.querySelectorAll('.category-section');
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top >= -200 && rect.top <= 200) {
            if (e.key === "ArrowRight") sec.querySelector('.next').click();
            if (e.key === "ArrowLeft") sec.querySelector('.prev').click();
        }
    });
});