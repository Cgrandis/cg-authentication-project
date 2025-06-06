import { POST } from '../../app/api/auth/register/registerUser/route';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

jest.mock('../../lib/prisma', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('POST /api/auth/register/registerUser', () => {
  const mockPrismaUserCreate = prisma.user.create as jest.Mock;
  const mockPrismaUserFindUnique = prisma.user.findUnique as jest.Mock;
  const mockBcryptHash = bcrypt.hash as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    const mockUserData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const mockHashedPassword = 'hashedPassword123';
    const mockCreatedUser = { ...mockUserData, id: '1', password: mockHashedPassword, role: 'USER' };

    mockBcryptHash.mockResolvedValue(mockHashedPassword);
    mockPrismaUserFindUnique.mockResolvedValue(null);
    mockPrismaUserCreate.mockResolvedValue(mockCreatedUser);

    const req = {
      json: async () => mockUserData,
    } as Request;

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.user).toEqual(expect.objectContaining({
      email: 'test@example.com',
      role: 'USER',
    }));
    expect(mockBcryptHash).toHaveBeenCalledWith('password123', 10);
    expect(mockPrismaUserCreate).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: mockHashedPassword,
        role: 'USER',
      },
    });
  });

  it('should return 500 if registration fails', async () => {
    mockBcryptHash.mockRejectedValue(new Error('Hashing failed'));

    const req = {
      json: async () => ({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }),
    } as Request;

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('User registration failed');
  });
});