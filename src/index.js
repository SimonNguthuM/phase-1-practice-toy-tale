let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.querySelector('#toy-collection')

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(toy => printData(toy)))

  function printData(obj) {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `${obj}`
    toyCollection.appendChild(div)

    const h2 = document.createElement('h2')
    h2.textContent = `${obj.name}`
    div.appendChild(h2)

    const img = document.createElement('img')
    img.classList.add('toy-avatar')
    img.setAttribute(`src`, `${obj.image}`)
    div.appendChild(img)

    const p = document.createElement('p')
    p.textContent = `${obj.likes}`
    div.appendChild(p)

    const btn = document.createElement('button')
    btn.setAttribute(`id`, `${obj.id}`)
    btn.classList.add('like-btn')
    btn.textContent = 'Like ❤️'
    div.appendChild(btn)

    btn.addEventListener('click', () => increaseLikes(obj.id, obj.likes + 1))
  }

  const form = document.querySelector('.add-toy-form')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = form.querySelector('input[name="name"]').value
    const image = form.querySelector('input[name="image"]').value
    
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(data => data.forEach(toy => printData(toy)))
    form.reset()
  })

  function increaseLikes (id, newLikes){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: newLikes 
      })
    })
    .then(res => res.json())
    .then(obj => {
      p.textContent = `${obj.newLikes}`
  })
}

})
