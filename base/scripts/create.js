window.addEventListener("load", async () => {
  const token = localStorage.getItem("token");

  if (token === null) {
    window.location = "login.html";
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", onCreate);
});

async function onCreate(event) {
  const url = "http://localhost:3030/data/recipes";
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const name = formData.get("name").trim();
  const img = formData.get("img").trim();
  const ingredients = formData.get("ingredients").trim().split("\n");
  const steps = formData.get("steps").trim();

  const recipe = {
    name,
    img,
    ingredients,
    steps,
  };

  const token = localStorage.getItem("token");
  if (token === null) {
    window.location = "login.html";
    return;
  }

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(recipe),
    });

    if (response.ok === false) {
      console.log(response.ok);
      const error = await response.json();
      throw new Error(error.message);
    }

    // const result =  await response.json();
    await response.json();
    window.location = "index.html";
  } catch (error) {
    alert(error.message);
  }
}