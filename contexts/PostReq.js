import * as SecureStore from 'expo-secure-store';

// Skeleton code for post requests to server
// body in the form {param:data, ...}
// callbackFunction is called when POST request is successful
// ^ usually used to update current state visually and store async
// setIsLoading is setState function for loading spinner
// reportError is function to relay error info to user
export default function (url, body, setIsLoading, reportError, callbackFunc) {
    setIsLoading(true);

    SecureStore.getItemAsync('user').then((user) => {
        let token = JSON.parse(user).token;

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(body)
        }).then((response) => {
            setIsLoading(false);
            if (response.status === 200) {
                callbackFunc(response);
            } else if (response.status === 401 || response.status === 409) {
                response.json().then(json => {
                    reportError(json.msg);
                })
            } else {
                reportError('Server error');
            }
        }).catch((error) => {
            // Fetch Error
            setIsLoading(false);
            reportError(''+ error);
        });
    });
}