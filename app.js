const button = document.querySelector("button");
const selectOption = document.querySelector("select");

const acquireToken = async () => {
  const response = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    {
      client_id: "FDvDxiTI6v1rqkWlAFXn66a8nfjuL8ZG2p6zR5P1taFQekDQx5",
      client_secret: "UbxasC5FB43nK1aMPmsXrpxwITLNljBZfqXcyQoz",
      grant_type: "client_credentials",
    }
  );
  return response.data.access_token;
};

// const getAnimals = async () => {
//   const token = await acquireToken();
//   // console.log(token)
//   const animals = await axios.get(
//     "https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   console.log(animals.data.animals);
const getAnimalsByType = async () => {
  const token = await acquireToken();
  console.log(token);
  const animals = await axios.get(
    `https://api.petfinder.com/v2/animals?type=${selectOption.value}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(animals.data.animals);
  console.log(animals.data.animals);
  renderPets(animals.data.animals);
};

const renderPets = (pets) => {
  // let filteredPets = pets.filter((pet) => {
  // return selectOption.value === pet.type
  // })

  const petSection = document.querySelector(".pet-section");
  petSection.innerHTML = "";

  // console.log(filteredPets)

  pets.forEach((pet) => {
    let petInfo = document.createElement("div");
    petInfo.className = "pet-info";

    const petName = document.createElement("div");
    petName.innerHTML = `<div>${pet.name}</div>`;
    petName.className = "pet-name";
    petInfo.append(petName);

    if (pet.photos.length > 0) {
      const img = document.createElement("img");
      img.src = pet.photos[0].small;
      img.className = "pet-pic";
      petInfo.append(img);
    } else {
      const img = document.createElement("img");
      img.src = "./photo-unavailable.png";
      img.className = "pet-pic";
      petInfo.append(img);
    }

    const age = document.createElement("div");
    age.innerHTML = `${pet.age}`;
    age.className = "age";
    petInfo.append(age);

    const contactLink = document.createElement("a");
    contactLink.innerHTML = `${pet.contact.email}`;
    contactLink.target = "_blank";
    contactLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${pet.contact.email}`;
    contactLink.className = "contact";
    petInfo.append(contactLink);

    const contact = document.createElement("div");
    contact.innerHTML = `${pet.contact.phone}`;
    contact.className = "phone";
    petInfo.append(contact);

    const petBreeds = document.createElement("div");
    petBreeds.innerHTML = `${pet.breeds.primary}`;
    petBreeds.className = "pet-breeds";
    petInfo.append(petBreeds);

    petSection.append(petInfo);

    petInfo.addEventListener("click", () => {
      getChosenAnimal(pet.id)
      
    });
  });
};
    
const getChosenAnimal = async (id) => { 
  const token = await acquireToken();
  const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    renderAnimal(response.data.animal)
};
 
const renderAnimal = (animalData) => {
  const petSection = document.querySelector(".pet-section");
  petSection.innerHTML = "";
  petSection.append(animalData.name)
  if (animalData.photos.length > 0) {
    const img = document.createElement("img");
    img.src = animalData.photos[0].small;
    img.className = "pet-pic";
    petSection.append(img);
  } else {
    const img = document.createElement("img");
    img.src = "./photo-unavailable.png";
    img.className = "pet-pic";
    petSection.append(img);
  }
  petSection.append(animalData.age)
  petSection.append(animalData.gender)
  petSection.append(animalData.id)
  petSection.append(animalData.breeds)
  petSection.append(animalData.description)
  petSection.append(animalData.contact.phone)
  petSection.append(animalData.size)
  petSection.append(animalData.status)
  console.log(animalData)
  

}


const getTypes = async () => {
  const token = await acquireToken();
  const response = await axios.get("https://api.petfinder.com/v2/types", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.types);
  renderOptions(response.data.types);
};
getTypes();

const renderOptions = (types) => {
  const select = document.querySelector("select");
  types.forEach((type) => {
    let option = document.createElement("option");
    option.innerHTML = `<p>${type.name}</p>`;
    option.value = type.name;
    select.append(option);
  });
};

button.addEventListener("click", getAnimalsByType);

// let i = 0;
// function move() {
//   if (i == 0) {
//     i = 1;
//     let elem = document.getElementById("myBar");
//     let width = 10;
//     let id = setInterval(frame, 10);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         i = 0;
//       } else {
//         width++;
//         elem.style.width = width + "%";
//         elem.innerHTML = width + "%";
//       }
//     }
//   }
// }

// const getOptions = async () => {
//   const url = `https://api.petfinder.com/v2/types`;
//   try {
//     const response = await axios.get(url);
//     // console.log(response.data.message)
//     const list = Object.keys(response.data.message);
//     // console.log(list)
//     optionValue(list);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getOptions();

// function optionValue(list) {
//   // console.log("Dog List", list)
//   const select = document.querySelector("#select-breed");
//   // console.log(select)
//   return list.forEach((dog) => {
//     const option = document.createElement("option");
//     option.value = `${dog}`;
//     option.textContent = `${dog}`;
//     select.append(option);
//   });
// }
// function getValue(e) {
//   e.preventDefault();
//   const optionValue = document.querySelector("#select-breed").value;
//   // console.log(optionValue)
//   removePic();
//   getBreed(optionValue);
// }

// const form = document.querySelector("form");
// form.addEventListener("submit", getValue);

// async function getBreed(breed) {
//   const breedUrl = `https://api.petfinder/api/breed/${breed}/images/random`;
//   try {
//     const response = await axios.get(breedUrl);
//     console.log(response.data.message);
//     dogPic(response.data.message);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // Create img element, set src, and append to DOM

// function dogPic(breed) {
//   let img = document.createElement("img");
//   img.src = breed;
//   document.querySelector("#append-dog").append(img);
//   // let dogImage = `
//   //   <img src="${breed}"/>
//   // `
//   // const imgContainer = document.querySelector('#append-dog')
//   // imgContainer.insertAdjacentHTML("beforeend", dogImage)
// }

// // Remove previous image

// function removePic() {
//   const removeImg = document.querySelector("#append-dog");
//   // console.log(removeImg)
//   while (removeImg.lastChild) {
//     removeImg.removeChild(removeImg.lastChild);
//   }
// }
