fetch("posts.json")

.then(response => response.json())

.then(posts => {

const container = document.getElementById("posts-container")

posts.reverse().forEach(post => {

container.innerHTML += `

<article class="post">

<img src="${post.image}">

<h3>${post.title}</h3>

<p>${post.description}</p>

<span class="date">${post.date}</span>

<a href="${post.link}" class="read-more">
Ler artigo
</a>

</article>

`

})

})