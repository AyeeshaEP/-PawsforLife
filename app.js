const button = document.querySelector("button")
const selectOption = document.querySelector("select")





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

const getAnimals = async () => {
  const token = await acquireToken();
  // console.log(token)
  const animals = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(animals.data.animals);

  renderPets(animals.data.animals)
};

const renderPets = (pets) => {

  let filteredPets = pets.filter((pet) => {
  return selectOption.value === pet.type
  })

  const petSection = document.querySelector(".pet-section")
  petSection.innerHTML = ""

  console.log(filteredPets)

  filteredPets.forEach((pet) => {
    const petDiv = document.createElement("div")
    petDiv.innerHTML = `
    <h2> ${pet.name} </h2>
    <p> ${pet.age} </p>
    <img src=${pet.photos[0].full === undefined ? pet.photos[0].full : "https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/06/02/Photos/Processed/pets1-kYdB--621x414@LiveMint.jpg"} alt=${pet.name}/>
    ` 
    petSection.append(petDiv)
  })

  console.log(selectOption.value)
  
}
// If loading on page open, then this is fine. If you want to call API after a click event, then add event listener
// getAnimals();
// function renderList(animals) {
//   animals.forEach




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
  const select = document.querySelector("select")
  types.forEach(type => {
    let option = document.createElement("option") 
    option.innerHTML = `<p>${type.name}</p>`
    option.value = type.name
    select.append(option)
  });
}

button.addEventListener("click", getAnimals)








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
