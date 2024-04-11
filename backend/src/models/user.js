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

  async insertUserData(name, email, password) {
    const userId = uuid();
    // TODO: transaction?
    await db.query('INSERT INTO user (id, name, email, password) VALUES (?,?,?,?)', [userId, name, email, password]);
    const result = await db.query('SELECT email, is_admin, is_verified FROM user WHERE id = ?', [userId]);
    return result.results[0];
  }
};
