// utils.js holds a bunch of utility functions that are used throughout the frontend
// to stop circular references between files :)

function getUsername (user) {
    if(!user?.result) {
        return "anonymous user";
    } 
    return user?.result.username? user?.result.username: user?.result.email.split("@")[0];
}

export default getUsername;