import { db } from '../data/connection';
import { v4 as uuid } from 'uuid';

export const userModel = {
  async selectEmailData(email) {
    const result = await db.query('SELECT email FROM user WHERE email = ?', [email]);
    return result;
  },

  async selectUserData(email) {
    const result = await db.query('SELECT * FROM user WHERE email = ?;', [email]);
    return result;
  },

  async selectUserBy(userId) {
    const result = await db.query('SELECT name, email FROM user WHERE id = ?;', [userId]);
    return result.results[0];
  },

  async insertUserData(name, email, password) {
    const userId = uuid();
    const userToken = uuid();
    await db.query('INSERT INTO user (id, name, email, password, verification_token) VALUES (?,?,?,?,?)', [userId, name, email, password, userToken]);
    const result = await db.query('SELECT id, email, is_admin, is_verified, verification_token AS token FROM user WHERE id = ?', [userId]);
    return result.results[0];
  },

  async verifyUserById(userId, userToken) {
    await db.query('UPDATE user SET is_verified=true WHERE id=? AND verification_token=?;', [userId, userToken]);
    const result = await db.query('SELECT is_verified FROM user WHERE id=?;', [userId]);
    return result.results[0].is_verified === 1;
  }
};
