import { Router, Request, Response } from 'express';
import * as controller from './controller';

// Create instance of Express router.
const router: Router = Router();

// Bind API path to router for each API version
router.get('/',  (req:Request, res:Response) => {
  console.log('test');
  res.status(200).json({'asdf':'1234'});
});

// User story 1
router.post('/api/register', controller.register);

// User story 2
router.get('/api/commonstudents', controller.getCommonStudent)

// User story 3
router.post('/api/suspend',controller.suspend)

// User story 4
router.post('/api/retrievefornotifications',controller.retrieveForNotifications)

// Export the router.
export const Routes: Router = router;
