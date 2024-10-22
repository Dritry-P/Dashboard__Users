import usersStore from "../store/userStore";

export const API_URL = 'https://demo2-uk.prod.itua.in.ua/core_api';

export const getToken = async ({login, password}) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "login": login,
                "password": password,
            }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            const { token, refresh_token } = data;
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', refresh_token);
            usersStore.setAuth(true);
            console.log('Tokens saved to localStorage');
            return { token, refresh_token };
        } else {
            throw new Error(data.message || 'Failed to get token');
        }
    } catch (e) {
        console.log(e.message);
    }
    
};
  

export const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');

      if (!refresh_token) {
        throw new Error('No refresh token found');
      }

      const response = await fetch(`${API_URL}/auth/refresh_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, refresh_token: newRefreshToken } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', newRefreshToken);
        console.log('Tokens refreshed and saved to localStorage');
      } else {
        throw new Error(data.message || 'Failed to refresh token');
      }
    } catch (error) {
      console.error(error.message);
    }
};

export const logOut = () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        console.log('Remove finished')
    } catch (e) {
        console.log(e)
    }
}

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('token');
    
        const response = await fetch(`${API_URL}/company/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        return users;
    } catch (e) {
        console.log(e.message)
    }
}

export const getDepartments = async () => {
    try {
        const token = localStorage.getItem('token');
    
        const response = await fetch(`${API_URL}/company/departments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error('Failed to fetch users');
        }

        const departments = await response.json();
        console.log(departments)
        return departments;
    } catch (e) {
        console.log(e.message)
    }
}