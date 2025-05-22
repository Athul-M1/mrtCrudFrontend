import { User, UserFormData } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/get-users`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Ensure we always return an array
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.users)) {
      return data.users;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    }
    
    console.warn('Unexpected API response format:', data);
    return [];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/get-users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch user with id ${id}:`, error);
    throw error;
  }
}

export async function createUser(userData: UserFormData): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

export async function updateUser(id: string, userData: UserFormData): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/update-user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update user with id ${id}:`, error);
    throw error;
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/delete-user/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete user with id ${id}:`, error);
    throw error;
  }
}