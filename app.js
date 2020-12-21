const acquireToken = async () => {
  const response = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    {
      client_id: "FDvDxiTI6v1rqkWlAFXn66a8nfjuL8ZG2p6zR5P1taFQekDQx5",
      client_secret: "UbxasC5FB43nK1aMPmsXrpxwITLNljBZfqXcyQoz",
      grant_type: "client_credentials",
    }
  );
  return response.data.access_token
};
const getAnimals = async () => {
  const token = await acquireToken();
  console.log(token)
  const animals = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(animals.data.animals);
};
// If loading on page open, then this is fine. If you want to call API after a click event, then add event listener
getAnimals();
// function renderList(animals) {
//   animals.forEach
// }
//Complete