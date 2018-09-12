const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    host: 'localhost',
    user: 'postgres',
    password: 'data01',
    database: 'smartdrive',
    port: 5432,
  },
  staging: {
    host: '192.168.6.11',
    user: 'postgres',
    password: 'data01',
    database: 'smartdrive',
    port: 5432,
  },
  production: {
    host: '192.168.5.11',
    user: 'postgres',
    database: 'smartdrive',
    password: 'data01',
    port: 5432,
  }
};

// module.exports = function(env) {
//   var c = config[env];
//   return `${ c.engine }://${ c.username }:${ c.password }@${ c.hostname }:${ c.port }/${ c.name }`;
// };

module.exports = config[env];
