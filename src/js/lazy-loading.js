// Check if user prefers reduced motion
const isReduced =
  window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

// Get all lazy loaded elements on page
const elements = document.querySelectorAll(".lazy-load");
// Get specifically just images to be lazy loaded
const images = document.querySelectorAll("[data-src]");

// FALLBACK FOR WHEN INTERSECTION OBSERVER NOT SUPPORTED
if (
  !("IntersectionObserver" in window) ||
  !("IntersectionObserverEntry" in window) ||
  !("intersectionRatio" in window.IntersectionObserverEntry.prototype) ||
  !("isIntersecting" in window.IntersectionObserverEntry.prototype) ||
  isReduced
) {
  // Load real images and apply loaded styles
  images.forEach((image) => {
    preloadImage(image);
  });

  elements.forEach((element) => {
    element.classList.add("lazy-load--show");
  });
} else {
  // Set new intersection observer - entries are the things that intersect/uninstersect
  // Observer for animation ** NOTE: Animations require elements to have the lazy load class I built
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Toggles the class only when condition of entry intersecting is true
        entry.target.classList.toggle("lazy-load--show", entry.isIntersecting);
        // Stop observing (and therefore animating) the entry once it has been loaded
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // IntersectionObserver options
      // threshold - what fraction of entry should be intersecting to initiate animation
      threshold: 0.3,
      // rootMargin - shrink/grow the container of when the intersections occur (i.e. changes the viewport size)
      // rootMargin: "100px",
      // rootMargin: "0px 0px 300px 0px",
      // root - the container you want to use as the intersecting viewport
      // root: "new-root-class"
    }
  );

  // Observer for lazy loading images - only requires images to have the data-src attribute to work
  const imgObserver = new IntersectionObserver(
    (entries, imgObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          if (entry.target.tagName === "VIDEO") {
            // Load in video when entry is intersecting
            entry.target.firstElementChild.setAttribute(
              "data-src",
              entry.target.getAttribute("data-src")
            );
            preloadImage(entry.target.firstElementChild);
            // Stop observing image once it has been loaded
            imgObserver.unobserve(entry.target);
          } else {
            // Load in image when entry is intersecting
            preloadImage(entry.target);
            // Stop observing image once it has been loaded
            imgObserver.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px 500px 0px",
    }
  );

  // Observe when each element changes intersects for animation
  elements.forEach((element) => {
    observer.observe(element);
  });

  // Observe for when each image intersects for lazy image loading
  images.forEach((image) => {
    imgObserver.observe(image);
  });
}

// FUNCTIONS
// Set image source using it's data attribute
function preloadImage(img) {
  // Get the filepath/link for the image to be loaded using the data attribute
  const src = img.getAttribute("data-src");
  // Return out of function if not data-src found
  if (!src) {
    return;
  }
  // Assign image source
  if (img.tagName === "SOURCE") {
    img.parentElement.src = src;
    img.src = src;
  } else {
    img.src = src;
  }
}
