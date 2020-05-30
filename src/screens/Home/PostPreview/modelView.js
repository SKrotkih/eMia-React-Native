// Post preview Model View

export class ModelView {
    constructor(postItem) {
        this.item = postItem;
    }

    get title() {
        return this.item.post.title;
    }

    get body() {
        return this.item.post.body;
    }

    get avatarUrl() {
        let avatarUrl = this.item.avatarUrl;
        if (avatarUrl === null) {
            return {uri: 'Icon-Profile'};
        } else {
            return {uri: avatarUrl};
        }
    }

    get imageUrl() {
        let imageUrl = this.item.imageUrl;
        if (imageUrl === null) {
            return {uri: 'Icon-Profile'};
        } else {
            return {uri: imageUrl};
        }
    }

    get publishedAt() {
        return new Date(1000 * this.item.post.created);
    }

    get userName() {
        return this.item.author.username == null ? '' : this.item.author.username;
    }

    // Redundant, but...
    createState() {
        const state = {
            post: this.item.post,
            author: this.item.author,
            avatarUrl: this.item.avatarUrl,
            imageUrl: this.item.imageUrl,
        };
        return state;
    }
}
