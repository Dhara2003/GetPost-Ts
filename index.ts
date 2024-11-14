let currentPostIndex = 0;
let posts: any[] = [];
let removedPosts: any[] = []; // Array to store removed posts

// Fetch the posts from the API
async function fetchPosts(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        posts = await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Display the next post and append it to the container
function displayNextPost(): void {
    if (posts.length > 0 && currentPostIndex < posts.length) {
        const post = posts[currentPostIndex];

        // Create a post element
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;

        const postBody = document.createElement('p');
        postBody.textContent = post.body;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'removeBtn';

        // Attach event listener to the remove button
        removeButton.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to remove this post?');
            if (confirmed) {
                // Store the removed post in the array
                removedPosts.push(post);

                // Remove the post element from the DOM
                postElement.remove();
            }
        });

        // Append title, body, and remove button to the post element
        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        postElement.appendChild(removeButton);

        // Append the post element to the container
        const postContainer = document.getElementById('postContainer') as HTMLElement;
        postContainer.appendChild(postElement);

        // Scroll the newly added post into view
        postElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

        currentPostIndex++; // Move to the next post for the next click
    } else {
        alert('No more posts to display.');
    }
}

// Display the removed posts
function displayRemovedPosts(): void {
    const removedPostsContainer = document.getElementById('removedPostsContainer') as HTMLElement;
    removedPostsContainer.innerHTML = ''; // Clear previous entries

    if (removedPosts.length > 0) {
        removedPosts.forEach(post => {
            const removedPostElement = document.createElement('div');
            removedPostElement.className = 'removedPost';

            const removedPostTitle = document.createElement('h3');
            removedPostTitle.textContent = post.title;

            const removedPostBody = document.createElement('p');
            removedPostBody.textContent = post.body;

            // Append title and body to the removed post element
            removedPostElement.appendChild(removedPostTitle);
            removedPostElement.appendChild(removedPostBody);

            // Append the removed post to the container
            removedPostsContainer.appendChild(removedPostElement);
        });
    } else {
        removedPostsContainer.textContent = 'No posts have been removed yet.';
    }
}

// Setup button click events
function setupButtons(): void {
    const loadPostBtn = document.getElementById('loadPostBtn') as HTMLButtonElement;
    loadPostBtn.addEventListener('click', displayNextPost);

    const viewRemovedBtn = document.getElementById('viewRemovedBtn') as HTMLButtonElement;
    viewRemovedBtn.addEventListener('click', displayRemovedPosts);
}

// Initialize the app
async function init(): Promise<void> {
    await fetchPosts();
    setupButtons();
}

// Run the app
init();
