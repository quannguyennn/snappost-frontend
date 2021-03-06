const initialState = {
    posts: [],
    isMore: true
}

const newFeedReducer = (state = initialState, action) => {
    let tempPost = [...state.posts];
    let postIndex, commentIndex;

    switch (action.type) {
        case 'SET_POST':
            if (action.data.newPost) {
                return { ...state, posts: [...action.data.data, ...tempPost] }
            } else {
                return { ...state, posts: [...tempPost, ...action.data.data], isMore: action.data.isMore }
            }
        case 'SET_POST_COMMENT':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                if (action.data.newComment) {
                    tempPost[postIndex]['totalComment']++;
                    action.data.data.map(comment => {
                        tempPost[postIndex]['comments'].push(comment)
                    })
                } else {
                    action.data.data.map(comment => {
                        tempPost[postIndex]['comments'].unshift(comment)
                    })
                }
            }
            return { ...state, posts: tempPost }
        case "SET_COMMENT_REPLY":
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                let commentIndex = tempPost[postIndex]['comments'].findIndex(comment => comment.id == action.data.parent);
                if (commentIndex !== -1) {
                    if (action.data.newComment) {
                        tempPost[postIndex]['comments'][commentIndex]['totalReply']++;
                        tempPost[postIndex]['totalComment']++;
                        tempPost[postIndex]['totalReplyComment']++;
                        action.data.data.map(reply => {
                            tempPost[postIndex]['comments'][commentIndex]['reply'].push(reply)
                        })
                    } else {
                        action.data.data.map(reply => {
                            tempPost[postIndex]['comments'][commentIndex]['reply'].unshift(reply)
                        })
                    }
                }
            }
            return { ...state, posts: tempPost }

        case 'SET_POST_TOTAL_SHARE':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                tempPost[postIndex]['totalShare']++;
            }
            return { ...state, posts: tempPost }
        case 'TOGGLE_LIKE_POST':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                if (action.data.like) {
                    tempPost[postIndex]['totalLike']++;
                } else {
                    tempPost[postIndex]['totalLike']--;
                }
            }
            return { ...state, posts: tempPost }
        case 'TOGGLE_LIKE_COMMENT':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                commentIndex = tempPost[postIndex]['comments'].findIndex(comment => comment.id == action.data.commentId)
                if (commentIndex !== -1) {
                    if (action.data.like) {
                        tempPost[postIndex]['comments'][commentIndex]['totalLike']++;
                    } else {
                        tempPost[postIndex]['comments'][commentIndex]['totalLike']--;
                    }
                }
            }
            return { ...state, posts: tempPost }
        case 'TOGGLE_LIKE_REPLY':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                let commentIndex = tempPost[postIndex]['comments'].findIndex(comment => comment.id == action.data.parent);
                if (commentIndex !== -1) {
                    let replyIndex = tempPost[postIndex]['comments'][commentIndex].reply.findIndex(r => r.id == action.data.replyId)
                    if (replyIndex !== -1) {
                        if (action.data.like) {
                            tempPost[postIndex]['comments'][commentIndex].reply[replyIndex]['totalLike']++;
                        } else {
                            tempPost[postIndex]['comments'][commentIndex].reply[replyIndex]['totalLike']--;
                        }
                    }
                }
            }
            return { ...state, posts: tempPost }
        case "UPDATE_POST":
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                tempPost[postIndex] = action.data.data
            }
            return { ...state, posts: tempPost }
        case "DELETE_POST":
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                tempPost = [...tempPost.slice(0, postIndex), ...tempPost.slice(postIndex + 1)]
            }
            return { ...state, posts: tempPost }
        case 'DELETE_COMMENT':
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                let commentIndex = tempPost[postIndex]['comments'].findIndex(comment => comment.id == action.data.commentId);
                tempPost[postIndex]['totalComment']--;
                tempPost[postIndex]['totalComment'] -= tempPost[postIndex]['comments'][commentIndex]['totalReply'];
                tempPost[postIndex]['comments'] = [...tempPost[postIndex]['comments'].slice(0, commentIndex), ...tempPost[postIndex]['comments'].slice(commentIndex + 1)]
                return { ...state, posts: tempPost }
            }
        case "DELETE_COMMENT_CHILD":
            postIndex = tempPost.findIndex(post => post.id == action.data.postId);
            if (postIndex !== -1) {
                let commentIndex = tempPost[postIndex]['comments'].findIndex(comment => comment.id == action.data.parent);
                let replyIndex = tempPost[postIndex]['comments'][commentIndex].reply.findIndex(r => r.id == action.data.commentId)
                tempPost[postIndex]['totalComment']--;
                tempPost[postIndex]['totalReplyComment']--;
                tempPost[postIndex]['comments'][commentIndex]['totalReply']--;
                tempPost[postIndex]['comments'][commentIndex]['reply'] = [...tempPost[postIndex]['comments'][commentIndex]['reply'].slice(0, replyIndex), ...tempPost[postIndex]['comments'][commentIndex]['reply'].slice(replyIndex + 1)]
            }
            return { ...state, posts: tempPost }

        default:
            return state;
    }
}

export default newFeedReducer;