document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const carouselId = carousel.id;
    const thumbnailContainer = document.querySelector(`#${carouselId}-scroll`);
    const selectedThumbnail = document.querySelector(`#${carouselId}-main`);

    function updateSelected(newIdx) {
      if (!thumbnailContainer) return;
      const thumbs = thumbnailContainer.querySelectorAll("[data-idx]");
      if (newIdx < 0 || newIdx >= thumbs.length) return;

      carousel.dataset.selected = newIdx;

      // Toggle overlay state via data-selected
      thumbs.forEach((img, i) => {
        // Check if image has overlay
        const overlay = img.parentElement.querySelector("[data-overlay]");
        if (!overlay) return;

        if (i === newIdx) {
          overlay.setAttribute("data-selected", "true");
        } else {
          overlay.removeAttribute("data-selected");
        }
      });

      const mainImg = thumbs[newIdx].querySelector("img:not([data-overlay])");
      if (!mainImg) {
        console.error("No img found inside thumbnail", thumbs[newIdx]);
        return;
      }
      selectedThumbnail.src = mainImg.src;
      selectedThumbnail.alt = mainImg.alt;

      thumbs[newIdx].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // Click on thumbnail
    if (thumbnailContainer) {
      thumbnailContainer.addEventListener("click", (e) => {
        let target = e.target.closest("[data-idx]");
        if (!target) return;
        updateSelected(parseInt(target.dataset.idx));
      });
    }

    // Click on arrows
    carousel.addEventListener("click", (e) => {
      const arrow = e.target.closest("[data-arrow]");
      if (!arrow) return;

      const currentIdx = parseInt(carousel.dataset.selected || "0");
      const dir = arrow.dataset.arrow === "left" ? -1 : 1;
      updateSelected(currentIdx + dir);
    });

    enableDragScroll(thumbnailContainer);

    // Init
    updateSelected(parseInt(carousel.dataset.selected || "0"));
  });
});

function enableDragScroll(el) {
  if (!el) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = false;

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    moved = false;
    startX = e.clientX;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const walk = (e.clientX - startX) * 1.2;
    if (!moved && Math.abs(walk) > 5) moved = true;
    if (moved) el.scrollLeft = scrollLeft - walk;
  });

  const stop = () => {
    isDown = false;
  };

  el.addEventListener("mouseup", stop);
  el.addEventListener("mouseleave", stop);

  el.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        moved = false;
      }
    },
    true
  );
}
