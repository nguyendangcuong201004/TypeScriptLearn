export const generateRandomString = (length: number): string => {
    const character = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let result = '';
    for (let i = 0; i < length; i++){
        result += character.charAt(Math.floor(Math.random() * character.length))
    }
    return result;
}


export const generateRandomNumber = (length: number): string => {
    const character = "0123456789";
    let result = '';
    for (let i = 0; i < length; i++){
        result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
}