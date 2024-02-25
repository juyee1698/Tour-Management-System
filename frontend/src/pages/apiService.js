const BASE_URL = 'http://localhost:8080'; 

async function loginUser(credentials) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

async function registerUser(userData) {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}

export { loginUser, registerUser };
