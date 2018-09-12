import fs from 'fs-extra';
import morgan from 'morgan';
import winston from 'winston';
import { env } from '../../config/app';

const logFile = (type) => {
  const logPath = `./logs/${ new Date().toISOString().split('T')[0].split('-').join('/') }_${ type }.log`;
  fs.ensureFileSync(logPath);
  return logPath;
};

const getTime = () => new Date().toLocaleString();

winston.loggers.add('development');
winston.loggers.add('staging', { file: { filename: logFile('application') } });
winston.loggers.add('production', {
  file: {
    filename: logFile('application'),
    timestamp: getTime,
  },
});

const envLog = winston.loggers.get(env);

morgan.token('date', getTime);

let envMorgan = '';
if (['staging', 'production'].includes(env)) {
  envMorgan = morgan('combined', { stream: fs.createWriteStream(logFile('access'), { flags: 'a' }) });
} else {
  envMorgan = morgan('dev');
}

exports.logger = envLog;
exports.morgan = envMorgan;
