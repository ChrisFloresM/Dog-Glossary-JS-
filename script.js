const contentElement = document.getElementById("content");
const inputElement = document.getElementById("input-breed");

/* Adding event listeners to buttons */
document.getElementById("button-random-dog").addEventListener("click", async function() {
    setImageSrc(await getAPIResponse("https://dog.ceo/api/breeds/image/random"));
});

document.getElementById("button-show-breed").addEventListener("click", async function() {
    let breedName = inputElement.value;

    if(!breedName) {
        showErrorMessage("Breed not found!");
        return;
    }

    setImageSrc(await getAPIResponse(`https://dog.ceo/api/breed/${breedName.toLowerCase()}/images/random`));
});

document.getElementById("button-show-sub-breed").addEventListener("click", async function() {
    let breedName = inputElement.value;
    let subBreedList = await getAPIResponse(`https://dog.ceo/api/breed/${breedName.toLowerCase()}/list`);

    showSubBreedList(subBreedList);
});

document.getElementById("button-show-all").addEventListener("click", async function() {
    let breedList = await getAPIResponse("https://dog.ceo/api/breeds/list/all");
    showAllBreeds(breedList);
})

/* Defining async functions for fetch operations */
async function getAPIResponse(endPoint) {
    try {
        const response = await fetch(endPoint);

        if (!response.ok) {
            showErrorMessage("Breed not found!");
            return;
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.log("An error occured: " + error);
    }
}

/* Auxiliar function to set the src attribute of the img */
function setImageSrc(src) {
    if (!src) {
        return;
    }

    clearContent();

    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", src);
    imgElement.classList.add("content__img-dog");
    contentElement.append(imgElement);
}

/* Set the error message inside a p element when a breed is not found */
function showErrorMessage(errorMessage) {
    clearContent();

    let pElement = document.createElement('p');
    pElement.classList.add('content__text');
    pElement.classList.add('content__text--error-message');
    pElement.textContent = errorMessage;
    contentElement.append(pElement);
}

function showSubBreedList(list) {
    if (!list) {
        return;
    }

    if (list.length === 0){
        showErrorMessage("No sub-breeds found!");
        return;
    }

    clearContent();
    createList(true, list, contentElement);
}

function showAllBreeds(breeds) {
    if (!breeds) {
        return;
    }

    clearContent();

    let olElement = document.createElement("ol");
    olElement.classList.add('content__text');
    Object.keys(breeds).forEach((key) => {
        let liElement = document.createElement("li");
        liElement.textContent = key;

        if (breeds[key].length > 0) {
            createList(false, breeds[key], liElement);
        }

        olElement.append(liElement);
    });

    contentElement.append(olElement);
}

/* Auxiliar functions */
function clearContent() {
    contentElement.innerHTML = '';
}

function createList(isOrdered, elements, parentElement) {
    let listType = isOrdered ? "ol" : "ul";
    let list = document.createElement(listType);
    list.classList.add('content__text');
    createLiElements(elements, list);
    parentElement.append(list);
}

function createLiElements(elements, parentElement) {
    elements.forEach((element) => {
        let liElement = document.createElement("li");
        liElement.classList.add('content__text');
        liElement.textContent = element;
        parentElement.append(liElement);
    });
}


