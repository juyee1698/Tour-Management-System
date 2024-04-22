const BASE_URL = process.env.REACT_APP_BACKEND_URL ; 

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    // const userId = localStorage.getItem('userId');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    // if (userId) {
    //     headers['userid'] = userId;
    // }
    return headers;
}


async function loginUser(credentials) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
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
        const response = await fetch(`${BASE_URL}/auth/signup`, {
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

async function logoutUser() {
    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('activity')
        localStorage.removeItem('name')
        return data;
    } catch (error) {
        console.error('Error Logout:', error);
        throw error;
    }
}


async function searchFlight(searchData) {
    try {
        const response = await fetch(`${BASE_URL}/flightSearch`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(searchData),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
}

async function getFlightDetails(flightId) {
    try {
        console.log(flightId)
        const response = await fetch(`${BASE_URL}/flightSearch/selectFlight?flightId=${flightId}`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error getting Flight Details:', error);
        throw error;
    }
}

async function bookFlight(journeyContinuation) {
    try {
        const response = await fetch(`${BASE_URL}/flightBooking`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({journeyContinuationId: journeyContinuation}),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error Booking:', error);
        throw error;
    }
}

async function bookCheckout(payload) {
    try {
        console.log(JSON.stringify(payload))
        const response = await fetch(`${BASE_URL}/flightBooking/checkout`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error Booking Checkout:', error);
        throw error;
    }
}

async function bookSuccess(data) {
    try {

        const journeyContinuationId = localStorage.getItem('journeyContId')
        const userBookingId = localStorage.getItem('bookingUserId')

        const reqData = {
            journeyContinuationId,
            userBookingId
        }
        
        const response = await fetch(`${BASE_URL}/flightBooking/checkout/success`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(reqData),
        });

        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error Booking Checkout:', error);
        throw error;
    }
}


async function bookCancel() {
    try {
        const journeyContinuationId = localStorage.getItem('journeyContId');

        const reqData = {
            journeyContinuationId,
        };
        
        const response = await fetch(`${BASE_URL}/flightBooking/checkout/cancel`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(reqData),
        });

        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error Booking Cancel:', error);
        throw error;
    }
}

async function fetchAirportMetadata() {
    try {

        const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw { authError: true }
            }

        const response = await fetch(`${BASE_URL}/airportMetadata`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }

        return data;
    } catch (error) {
        console.error('Error fetching airport metadata:', error);
        throw error;
    }
}

async function userBookingHistory() {
    try {

        const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw { authError: true };
            }

        const response = await fetch(`${BASE_URL}/flightBookingHistory`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }

        return data;
    } catch (error) {
        console.error('Error fetching airport metadata:', error);
        throw error;
    }
}

async function fetchCityMetadata() {
    try {

        const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw { authError: true }
            }

        const response = await fetch(`${BASE_URL}/cityMetadata`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }

        return data;
    } catch (error) {
        console.error('Error fetching city metadata:', error);
        throw error;
    }
}

async function searchSightseeing(searchData) {
    try {
        const response = await fetch(`${BASE_URL}/sightSearch`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(searchData),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
}

async function selectSight(searchData) {
    try {
        const response = await fetch(`${BASE_URL}/sightSearch/selectSight`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(searchData),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
}

async function addReview(reviewData) {
    try {
        const response = await fetch(`${BASE_URL}/sightSearch/selectSight/addReview`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(reviewData),
        });
        const data = await response.json();
        if (data.errorCode === "auth_err" || data.message === "Not authenticated.") {
            throw { authError: true, message: data.message };
        }
        return data;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
}



export { loginUser, registerUser, searchFlight, getFlightDetails, logoutUser, bookFlight, bookCheckout, bookSuccess, bookCancel, fetchAirportMetadata, fetchCityMetadata, userBookingHistory, searchSightseeing, selectSight, addReview};
