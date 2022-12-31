import 'source-map-support/register';

import {
  createPassportHandler,
  getPassportsHandler,
  getPassportHandler,
  updatePassportHandler,
  deletePassportHandler,
  passportWorkerHandler,
  dispatchPassportHandler,
  dispatchTopicHandler
} from './passport.controller';

export const createPassport = createPassportHandler;
export const getPassport = getPassportHandler;
export const getPassports = getPassportsHandler;
export const updatePassport = updatePassportHandler;
export const deletePassport = deletePassportHandler;
export const passportWorker = passportWorkerHandler;
export const dispatchPassport = dispatchPassportHandler;
export const dispatchTopic = dispatchTopicHandler;
