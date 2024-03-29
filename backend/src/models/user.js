import { db } from '../data/connection';

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
    const insertResult = await db.query('INSERT INTO user (name, email, password) VALUES (?,?,?)', [name, email, password]);
    const result = await db.query('SELECT email, isAdmin, isVerified FROM user WHERE id = ?', [insertResult.results.insertId]);
    return result;
  }
};
