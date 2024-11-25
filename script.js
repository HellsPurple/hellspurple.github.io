// Interactive hover effects and simple animations
const blogPosts = document.querySelectorAll('.blog-post');
        
blogPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
        post.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)';
    });

    post.addEventListener('mouseleave', () => {
        post.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    });
});

// Simple responsive menu toggle for smaller screens
const navLinks = document.querySelector('nav');
const menuToggle = document.createElement('button');
menuToggle.textContent = '☰';
menuToggle.style.display = 'none';

if (window.innerWidth <= 768) {
    menuToggle.style.display = 'block';
    navLinks.style.display = 'none';
    
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'none' ? 'block' : 'none';
    });
}
// Fetch the JSON file
fetch('./data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch blog data');
    }
    return response.json();
  })
  .then(data => {
    // Call the function to render blog posts
    renderBlogPosts(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Function to render blog posts
function renderBlogPosts(posts) {
  const container = document.getElementById('blog-container'); // Get the container element

  // Loop through each post in the data
  posts.forEach(post => {
    // Create a blog post div
    const blogPost = document.createElement('div');
    blogPost.className = 'blog-post';

    // Create and append the title as a link
    const titleLink = document.createElement('a');
    titleLink.href = post.filename; // Set the href to the filename
    titleLink.textContent = post.title; // Set the text content to the title
    titleLink.style.textDecoration = 'none'; // Optional: Add some style to remove the underline
    titleLink.style.color = 'inherit'; // Optional: Make the link inherit text color

    const title = document.createElement('h2');
    title.appendChild(titleLink); // Append the link to the title
    blogPost.appendChild(title);

    // Create and append the description
    const description = document.createElement('p');
    description.textContent = post.description;
    blogPost.appendChild(description);

    // Append the blog post to the container
    container.appendChild(blogPost);
  });
}
