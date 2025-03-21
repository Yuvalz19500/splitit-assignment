import { User } from '@/app/dashboard/users/columns';

export class UsersService {
  private readonly STORAGE_KEY = 'users';
  private readonly DELAY_MS = 250;

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.DELAY_MS));
  }

  async getAllUsers(): Promise<User[]> {
    await this.delay();
    if (typeof window === 'undefined') return [];

    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  async getUserById(id: string): Promise<User | undefined> {
    await this.delay();
    const users = await this.getAllUsers();
    return users.find((user) => user.id === id);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    await this.delay();
    const users = await this.getAllUsers();
    const newUser = {
      ...user,
      id: crypto.randomUUID(),
    };

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    await this.delay();
    const users = await this.getAllUsers();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return null;

    const updatedUser = {
      ...users[userIndex],
      ...userData,
    };

    users[userIndex] = updatedUser;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.delay();
    const users = await this.getAllUsers();
    const filteredUsers = users.filter((user) => user.id !== id);

    if (filteredUsers.length === users.length) return false;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers));
    return true;
  }
}
