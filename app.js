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
  
  console.log(animals.data.animals);
  renderPets(animals.data.animals);
};

const renderPets = (pets) => {
  

  const petSection = document.querySelector(".pet-section");
  petSection.innerHTML = "";

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

  let petSrc = animalData.photos.length > 0 ? animalData.photos[0].small : "./photo-unavailable.png"

  petSection.innerHTML = `
  <div>
    <h2>${animalData.name}</h2>
    <img src=${petSrc} class="pet-pic" alt=${animalData.name}/>
    <p>Age: ${animalData.age}</p>
    <p>Gender: ${animalData.gender}</p>
    <p>Id: ${animalData.id}</p>
    <p>Breed: ${animalData.breeds.primary}</p>
    <p>Description: ${animalData.description}</p>
    <p>Phone: ${animalData.contact.phone}</p>
    <p>Size: ${animalData.size}</p>
    <p>Coat: ${animalData.coat}</p>
    <p>Status: ${animalData.status}</p>
  </div>
  `

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
    if (
      type.name !== "Scales, Fins & Other" &&
      type.name !== "Small & Furry"
    ) {
      // option.value = data[i].name;
      // option.innerText = data[i].name;
      // selectMenu.appendChild(option);
      option.innerHTML = `<p>${type.name}</p>`;
      option.value = type.name;
      select.append(option);
    }
  
    // option.innerHTML = `<p>${type.name}</p>`;
    // option.value = type.name;
    // select.append(option);
  });


  button.addEventListener("click", getAnimalsByType);

}