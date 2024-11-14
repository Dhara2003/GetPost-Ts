var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var currentPostIndex = 0;
var posts = [];
var removedPosts = []; // Array to keep track of removed posts
// Fetch the posts from the API
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/posts')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    posts = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching posts:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Display the next post and append it to the container, scroll it into view
function displayNextPost() {
    if (posts.length > 0 && currentPostIndex < posts.length) {
        var post_1 = posts[currentPostIndex];
        // Create new elements for the post
        var postElement_1 = document.createElement('div');
        postElement_1.className = 'post';
        var postTitle = document.createElement('h2');
        postTitle.textContent = post_1.title;
        var postBody = document.createElement('p');
        postBody.textContent = post_1.body;
        // Create a remove button
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'removeBtn';
        // Attach event listener to the remove button
        removeButton.addEventListener('click', function () {
            // Show confirmation dialog
            var confirmed = confirm('Are you sure you want to remove this post?');
            if (confirmed) {
                // Store the removed post details
                removedPosts.push(post_1);
                postElement_1.remove(); // Remove the post element from the DOM
                displayRemovedPosts(); // Update the display of removed posts
            }
        });
        // Append title, body, and button to the post element
        postElement_1.appendChild(postTitle);
        postElement_1.appendChild(postBody);
        postElement_1.appendChild(removeButton);
        // Append the post element to the container
        var postContainer = document.getElementById('postContainer');
        postContainer.appendChild(postElement_1);
        // Scroll the newly added post into view
        postElement_1.scrollIntoView({ behavior: 'smooth', block: 'end' });
        currentPostIndex++; // Move to the next post for the next click
    }
    else {
        alert('No more posts to display.');
    }
}
function displayRemovedPosts() {
    var removedContainer = document.getElementById('removedPostsContainer');
    removedContainer.innerHTML = '';
    if (removedPosts.length > 0) {
        removedPosts.forEach(function (post) {
            var removedPostElement = document.createElement('div');
            removedPostElement.className = 'removedPost';
            var removedPostTitle = document.createElement('h3');
            removedPostTitle.textContent = post.title;
            var removedPostBody = document.createElement('p');
            removedPostBody.textContent = post.body;
            removedPostElement.appendChild(removedPostTitle);
            removedPostElement.appendChild(removedPostBody);
            removedContainer.appendChild(removedPostElement);
        });
    }
    else {
        removedContainer.textContent = 'No posts removed yet.';
    }
}
function setupButton() {
    var loadPostBtn = document.getElementById('loadPostBtn');
    loadPostBtn.addEventListener('click', displayNextPost);
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchPosts()];
                case 1:
                    _a.sent();
                    setupButton();
                    return [2 /*return*/];
            }
        });
    });
}
init();
