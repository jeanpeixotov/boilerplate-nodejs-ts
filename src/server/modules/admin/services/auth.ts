import * as mailService from './mail';
import * as tokenService from 'services/token';
import * as userRepository from '../repositories/user';

import { IResetPasswordToken } from 'interfaces/tokens/resetPassword';
import { IUserToken } from 'interfaces/tokens/user';
import { User } from 'models/user';
import { enTokenType } from 'services/token';
import { ServiceError } from 'errors/service';
import { isDevelopment } from 'settings';

export async function login(email: string, password: string): Promise<string> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new ServiceError('user-not-found');

  const isValid = await user.checkPassword(password);
  if (!isValid) throw new ServiceError('invalid-password');

  return await tokenService.userToken(user);
}

export async function changePassword(userToken: IUserToken, oldPassword: string, newPassword: string): Promise<User> {
  const user = await userRepository.findById(userToken.id);

  const isValid = await user.checkPassword(oldPassword);
  if (!isValid) throw new ServiceError('invalid-password');

  user.setPassword(newPassword);
  return await userRepository.update(user);
}

export async function sendResetPassword(email: string): Promise<void> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new ServiceError('user-not-found');

  const token = await tokenService.resetPassword(user);
  await mailService.sendResetPassword(user, token);

  if (isDevelopment) {
    console.log(`*******\nRESET TOKEN: ${token}\n*******`);
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<User> {
  const info = await tokenService.verify<IResetPasswordToken>(token, enTokenType.resetPassword);
  const user = await userRepository.findById(info.id);

  if (!user) throw new ServiceError('user-not-found');
  user.setPassword(newPassword);

  return await userRepository.update(user);
}