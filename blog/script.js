const featuredContainer = document.getElementById('featured-container');
const postsContainer = document.getElementById('posts-container');

if (featuredContainer && postsContainer) {
  fetch('posts.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Falha ao carregar posts (${response.status})`);
      }
      return response.json();
    })
    .then((posts) => {
      if (!Array.isArray(posts) || posts.length === 0) {
        throw new Error('Nenhum post encontrado');
      }

      const [featured, ...others] = posts;

      featuredContainer.innerHTML = `
        <article class="post post-featured">
          <img src="${featured.image}" alt="Imagem do artigo ${featured.title}">
          <div class="post-featured-content">
            <span class="featured-label">Post principal</span>
            <h3>${featured.title}</h3>
            <p>${featured.description}</p>
            <span class="date">${featured.date}</span>
            <a href="${featured.link}" class="read-more">Ler artigo</a>
          </div>
        </article>
      `;

      postsContainer.innerHTML = '';

      others.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'post';

        article.innerHTML = `
          <img src="${post.image}" alt="Imagem do artigo ${post.title}">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <span class="date">${post.date}</span>
          <a href="${post.link}" class="read-more">Ler artigo</a>
        `;

        postsContainer.appendChild(article);
      });
    })
    .catch((error) => {
      featuredContainer.innerHTML = '';
      postsContainer.innerHTML = `<p>Não foi possível carregar os posts agora. (${error.message})</p>`;
    });
}
