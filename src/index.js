import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function initializeCode() {
  await createWikiElement(
    "Akita",
    "akita",
    "https://en.wikipedia.org/api/rest_v1/page/summary/Akita%20%28dog%29"
  );
  await createWikiElement(
    "Basset Hound",
    "hound-basset",
    "https://en.wikipedia.org/api/rest_v1/page/summary/Basset%20Hound"
  );
  await createWikiElement(
    "Pyrenees",
    "pyrenees",
    "https://en.wikipedia.org/api/rest_v1/page/summary/Pyrenean%20Mountain%20Dog"
  );
  await createWikiElement(
    "Golden Retriever",
    "retriever-golden",
    "https://en.wikipedia.org/api/rest_v1/page/summary/Golden%20Retriever"
  );
  await createWikiElement(
    "Cardigan Corgi",
    "corgi-cardigan",
    "https://en.wikipedia.org/api/rest_v1/page/summary/Cardigan%20Welsh%20Corgi"
  );
}

async function loadImgJson(breedJson) {
  if (breedJson === "akita" || breedJson === "pyrenees") {
    let url = "https://dog.ceo/api/breed/" + breedJson + "/images/random";
    let response = await fetch(url);
    let img = await response.json();
    console.log(img.message);
    return img.message;
  } else {
    const breeds = breedJson.split("-");
    let url =
      "https://dog.ceo/api/breed/" +
      breeds[0] +
      "/" +
      breeds[1] +
      "/images/random";
    let response = await fetch(url);
    let img = await response.json();
    console.log(img.message);
    return img.message;
  }
}

async function loadWikiJson(url) {
  let response = await fetch(url);
  let text = await response.json();
  return text.extract;
}

async function createWikiElement(breed, breedJson, breedWikiUrl) {
  const container = document.getElementsByClassName("container");
  let newWikiItem = document.createElement("div");
  newWikiItem.classList.add("wiki-item");
  container[0].appendChild(newWikiItem);

  let wikiHeader = document.createElement("h1");
  wikiHeader.classList.add("wiki-header");
  newWikiItem.appendChild(wikiHeader);
  let newWikiContent = document.createElement("div");
  newWikiContent.classList.add("wiki-content");
  newWikiItem.appendChild(newWikiContent);

  let newImgContainer = document.createElement("div");
  newImgContainer.classList.add("img-container");
  newWikiContent.appendChild(newImgContainer);
  let wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");
  newWikiContent.appendChild(wikiText);

  let newImg = document.createElement("img");
  newImg.classList.add("wiki-img");

  newImgContainer.appendChild(newImg);

  wikiHeader.innerHTML = breed;
  /*wikiText.innerHTML =
    "Some text about this breed. Some text about this breed. Some text about this breed. Some text about this breed.Some text about this breed. Some text about this breed.Some text about this breed. Some text about this breed.Some text about this breed. Some text about this breed.Some text about this breed. Some text about this breed.Some text about this breed. Some text about this breed.";
  */
  let src = await loadImgJson(breedJson);
  let text = await loadWikiJson(breedWikiUrl);
  newImg.setAttribute("src", src);
  wikiText.innerHTML = text;
}
