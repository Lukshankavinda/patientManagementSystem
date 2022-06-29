import { Router } from "express";

import Auth from '../Middleware/authMiddleware';
const doctorControllers = require('../Controllers/doctorControllers')
const patientController = require('../Controllers/pationControllers');


const router = Router();

router.post('/register', doctorControllers.register ); // http://localhost:5000/register
router.post('/login', doctorControllers.login ); // http://localhost:5000/login

router.get('/getName',Auth, doctorControllers.getName ); // http://localhost:5000/getName

router.post('/patientdetails', patientController.patient);
router.post('/update_patient/:patientId', patientController.addrecord);
router.get('/get_patient/:patientId', patientController.getPatient);
router.get('/get_record/:_id', patientController.getRecord);

router.get('/getall', patientController.readAllMedicals);

export default router;