document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const carouselId = carousel.id;
    const scrollEl = document.getElementById(`${carouselId}-scroll`);
    const mainImg = document.getElementById(`${carouselId}-main`);

    function updateSelected(newIdx) {
      const thumbs = scrollEl.querySelectorAll("img[data-idx]");
      if (newIdx < 0 || newIdx >= thumbs.length) return;

      carousel.dataset.selected = newIdx;

      // Toggle overlay state via data-selected
      thumbs.forEach((img, i) => {
        if (i === newIdx) {
          img.parentElement.setAttribute("data-selected", "true");
        } else {
          img.parentElement.removeAttribute("data-selected");
        }
      });

      // Update main image
      mainImg.src = thumbs[newIdx].src;
      mainImg.alt = thumbs[newIdx].alt;

      thumbs[newIdx].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }

    // Click on thumbnail
    scrollEl.addEventListener("click", e => {
      const target = e.target.closest("img[data-idx]");
      if (!target) return;
      updateSelected(parseInt(target.dataset.idx));
    });

    // Click on arrows
    carousel.addEventListener("click", e => {
      const arrow = e.target.closest("[data-arrow]");
      if (!arrow) return;

      const currentIdx = parseInt(carousel.dataset.selected || "0");
      const dir = arrow.dataset.arrow === "left" ? -1 : 1;
      updateSelected(currentIdx + dir);
    });

    // Drag scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    const startDrag = e => {
      isDown = true;
      scrollEl.classList.add("cursor-grabbing");
      startX = (e.pageX || e.touches[0].pageX) - scrollEl.offsetLeft;
      scrollLeft = scrollEl.scrollLeft;
      e.preventDefault();
    };

    const endDrag = () => {
      isDown = false;
      scrollEl.classList.remove("cursor-grabbing");
    };

    const moveDrag = e => {
      if (!isDown) return;
      const x = (e.pageX || e.touches[0].pageX) - scrollEl.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollEl.scrollLeft = scrollLeft - walk;
    };

    scrollEl.addEventListener("mousedown", startDrag);
    scrollEl.addEventListener("touchstart", startDrag);
    scrollEl.addEventListener("mouseleave", endDrag);
    scrollEl.addEventListener("mouseup", endDrag);
    scrollEl.addEventListener("touchend", endDrag);
    scrollEl.addEventListener("mousemove", moveDrag);
    scrollEl.addEventListener("touchmove", moveDrag);

    // Init
    updateSelected(parseInt(carousel.dataset.selected || "0"));
  });
});
