/**
 * Potrzebne handlerki do działania skryptu.
 */
const lightboxElement = document.body.querySelector("#lightbox");
const galleryElement = document.body.querySelector("#gallery");
const leftArrow = document.body.querySelector("#left-arrow");
const rightArrow = document.body.querySelector("#right-arrow");
const lightboxShowcaseImgElement = document.body.querySelector("#lightbox-showcase");

/**
 * To nasz stan skryptu przechowujący informację o aktualnie wyświetlonym obrazie w lightboxie.
 */
let lightboxState = 0;

/**
 * Pobieramy wszystkie obrazy które znajdują się w galerii
 */
const avalibleImages = Array.from(galleryElement.children).filter((el) => el.nodeName === "IMG");

/**
 * Tworzymy listę dostępnych dla lightboxa linków do obrazków wg konwencji
 * (miniatury mają słowo mini w nazwie pełne obrazy taką samą nazwę tylko bez 'mini')
 */
const avalibleImagesSrc = avalibleImages.map((image) =>
  image.currentSrc.replace("mini", "")
);

/**
 * Funkcja która startuje plugina (odpalam ją na końcu skryptu)
 */
function startLightboxPlugin() {
  avalibleImages
    .forEach((element, index) =>
      element.addEventListener("click", () => showImage(index))
    );
  leftArrow.addEventListener("click", showPreviousImage);
  rightArrow.addEventListener("click", showNextImage);
  lightboxElement.addEventListener("click", hideLightbox);
}

/**
 * Pokazuje konkretny obrazek o kolejności x. (Pierwszy w galeri ma index 0!)
 */
function showImage(index) {
  showLightbox();
  lightboxState = index;
  lightboxShowcaseImgElement.src = avalibleImagesSrc[index];
}

/**
 * Pokazuje następny obraz (pamiętając o maksmalnej ilości obrazów)
 */
function showNextImage() {
  const nextImageNumber = (lightboxState + 1) % avalibleImagesSrc.length;
  showImage(nextImageNumber);
}

/**
 * Pokazujemy poprzeni obraz jeżeli jesteśmy na pierwszym obrazie to pokazujemy ostatni
 */
function showPreviousImage() {
  const previousImageNumber = (lightboxState - 1) % avalibleImagesSrc.length;
  showImage(previousImageNumber < 0 ? avalibleImagesSrc.length - 1 : previousImageNumber);
}

/**
 * Funkcja ukrywająca lightboxa (wszystko prócz strzałek zamyka lightbox)
 */
function hideLightbox(element) {
  if (
    !element.target.isSameNode(rightArrow) &&
    !element.target.isSameNode(leftArrow)
  ) {
    lightboxShowcaseImgElement.src = '';
    document.body.style.overflow = "auto";
    lightboxElement.classList.remove("visible");
  }
}

/**
 * Pokazujemy lightbox i ukrywamy scrollbar w wersji 2 tego pluginu można było by pomyśleć o usunięciu skoku który to powoduje.
 */
function showLightbox() {
  document.body.style.overflow = "hidden";
  lightboxElement.classList.add("visible");
}

/**
 * Startujemy plugin.
 */
startLightboxPlugin();
