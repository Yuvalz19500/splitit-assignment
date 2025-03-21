import { UsersService } from './users.service';
import { User } from '@/app/dashboard/users/columns';

describe('UsersService', () => {
  let service: UsersService;
  let mockUser: Omit<User, 'id'>;

  beforeEach(() => {
    service = new UsersService();
    mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      age: 30,
    };
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', async () => {
      const users = await service.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return users from localStorage', async () => {
      const mockUsers = [
        { ...mockUser, id: '1' },
        { ...mockUser, id: '2' },
      ];
      localStorage.setItem('users', JSON.stringify(mockUsers));

      const users = await service.getAllUsers();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should return undefined when user does not exist', async () => {
      const user = await service.getUserById('non-existent-id');
      expect(user).toBeUndefined();
    });

    it('should return user when it exists', async () => {
      const mockUsers = [{ ...mockUser, id: '1' }];
      localStorage.setItem('users', JSON.stringify(mockUsers));

      const user = await service.getUserById('1');
      expect(user).toEqual(mockUsers[0]);
    });
  });

  describe('createUser', () => {
    it('should create a new user with generated id', async () => {
      const newUser = await service.createUser(mockUser);

      expect(newUser).toMatchObject(mockUser);
      expect(newUser.id).toBeDefined();
      expect(typeof newUser.id).toBe('string');
      expect(newUser.id.length).toBeGreaterThan(0);

      const users = await service.getAllUsers();
      expect(users).toHaveLength(1);
      expect(users[0]).toEqual(newUser);
    });
  });

  describe('updateUser', () => {
    it('should return null when user does not exist', async () => {
      const result = await service.updateUser('non-existent-id', {
        name: 'New Name',
      });
      expect(result).toBeNull();
    });

    it('should update existing user', async () => {
      const mockUsers = [{ ...mockUser, id: '1' }];
      localStorage.setItem('users', JSON.stringify(mockUsers));

      const updatedUser = await service.updateUser('1', { name: 'New Name' });

      expect(updatedUser).toEqual({
        ...mockUsers[0],
        name: 'New Name',
      });

      const users = await service.getAllUsers();
      expect(users[0].name).toBe('New Name');
    });
  });

  describe('deleteUser', () => {
    it('should return false when user does not exist', async () => {
      const result = await service.deleteUser('non-existent-id');
      expect(result).toBe(false);
    });

    it('should delete existing user', async () => {
      const mockUsers = [{ ...mockUser, id: '1' }];
      localStorage.setItem('users', JSON.stringify(mockUsers));

      const result = await service.deleteUser('1');

      expect(result).toBe(true);

      const users = await service.getAllUsers();
      expect(users).toHaveLength(0);
    });
  });
});
