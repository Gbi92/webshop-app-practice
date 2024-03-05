import { registrationService } from "../registrationService";
import { userModel } from '../../models/user';

jest.mock("../../models/user.js");

describe('Registration process', () => {
  test('should throw validation error when user input is empty', async () => {
    expect.assertions(2);
    
    const userData = {}
  
    try {
      await registrationService.register(userData);
    } catch (e) {
      expect(e.message).toEqual('Name, email and password are required');
      expect(e.statusCode).toEqual(400);
    } 
  });

  test('should throw validation error when no password is given', async () => {
    expect.assertions(2);
    
    const userData = {
      email: 'test@test.com',
      name: 'test',
    }
  
    try {
      await registrationService.register(userData);
    } catch (e) {
      expect(e.message).toEqual('Password is required');
      expect(e.statusCode).toEqual(400);
    } 
  });

  test('should throw validation error when no email is given', async () => {
    expect.assertions(2);
    
    const userData = {
      name: 'test',
      password: 'testpassword'
    }
  
    try {
      await registrationService.register(userData);
    } catch (e) {
      expect(e.message).toEqual('Email is required');
      expect(e.statusCode).toEqual(400);
    } 
  });

  test('should throw validation error when no name is given', async () => {
    expect.assertions(2);
    
    const userData = {
      email: 'test@test.com',
      password: 'testpassword'
    }
  
    try {
      await registrationService.register(userData);
    } catch (e) {
      expect(e.message).toEqual('Name is required');
      expect(e.statusCode).toEqual(400);
    } 
  });

  test('should throw validation error when password is less than 8 characters', async () => {
    expect.assertions(2);
    
    const userData = {
      email: 'test@test.com',
      password: 'short',
      name: 'test'
    }
  
    try {
      await registrationService.register(userData);
    } catch (e) {
      expect(e.message).toEqual('Password must be at least 8 characters');
      expect(e.statusCode).toEqual(400);
    } 
  });
  
  test('should throw validation error when email is already taken', async () => {
    expect.assertions(3);
  
    const validUserData = {
      email: 'test@test.com',
      name: 'test',
      password: 'testpassword'
    }

    const response = {
      results: [validUserData.email]
    }

    userModel.selectEmailData.mockResolvedValue(response)
  
    try{
      await registrationService.register(validUserData);
    } catch (e) {
      expect(e.message).toEqual('Email is already taken');
      expect(e.statusCode).toEqual(400);
      expect(userModel.selectEmailData).toHaveBeenCalledWith(validUserData.email)
    }
  });

  test('should save user data when email is not taken and input is valid', async () => {
    const validUserData = {
      email: 'test@test.com',
      name: 'test',
      password: 'testpassword'
    }
    
    const response = {
      results: []
    }

    userModel.selectEmailData.mockResolvedValue(response);
  
    await registrationService.register(validUserData);

    expect(userModel.insertUserData).toHaveBeenCalledWith(validUserData.name, validUserData.email, expect.anything());
  });
})
