import mysql from 'mysql';

import config from '../config';

const pool = mysql.createPool({
  connectionLimit: 2,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const db = {
  query(query, values) {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results) => {
        if (err) {
          reject(err);

          return;
        }

        resolve({ results });
      });
    });
  },

  connection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);

          return;
        }

        const query = (sql, values) => {
          return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, results) => {
              if (err) {
                reject(err);
      
                return;
              }
              resolve({ results });
              });
            });
        };
        
        const release = () => {
          return new Promise((resolve, reject) => {
            if (err) {
              reject(err);
    
              return;
            }
            resolve(connection.release());
          });
        };

        resolve({ query, release });
      })
    })
  }
};
