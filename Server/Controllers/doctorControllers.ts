import {Request, Response, NextFunction} from "express";
import DoctorServices from '../Services/doctorServices';
import { DoctorCreateRequestDto } from '../Dto/doctor.Dto'
import { DoctorRepository } from '../Repositories/doctorRepositories';
import doctorModels from "../Models/doctorModels";

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import console from "console";

const doctorService: DoctorServices = new DoctorServices(new DoctorRepository());

// exports.register = async (req: Request, res: Response, next: NextFunction) => {
//     let { email,name,phone_no, password } = req.body;

//     bcryptjs.hash(password, 10, (hashError, hash) => {
//         if (hashError) {
//             return res.status(401).json({
//                 message: hashError.message,
//                 error: hashError
//             });
//         }

//         let doctor = new doctorModels({
//             _id: new mongoose.Types.ObjectId(),
//             email,
//             name,
//             phone_no,
//             password: hash
//         });

//         return doctor
//             .save()
//             .then((doctor) => res.status(201).json({ doctor }))
//             .catch((error) => res.status(500).json({ error }));
//     });

// };

exports.register = async (req: Request, res: Response) => {
    const { email, name, phone_no, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }

        const doc = new doctorModels({
            _id: new mongoose.Types.ObjectId(),
            email,
            name,
            phone_no,
            password: hash
        });
        
    let doctorCreateRequestDto: DoctorCreateRequestDto = new DoctorCreateRequestDto(doc.email, doc.name, doc.phone_no, doc.password );

    const doctor = doctorService.registerDoctorSave(doctorCreateRequestDto);

    return doctor
        .then((user) => {return res.status(201).json({
            user
        });
    })
    
    })

};

exports.login = async (req: Request, res: Response, next: NextFunction) => {

    let { email, password } = req.body;
    
    doctorModels.find({ email })
        .exec()
        .then((doctors) => {
            if (doctors.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
    
            bcryptjs.compare(password, doctors[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                  const generateJWT = () => {
                      return jwt.sign(
                          {
                              email: email
                          },
                          'SECRET',
                          { expiresIn: '1h' }
                      );
                  };
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: generateJWT()
                    });
                }
            });
        })
        .catch((error) => res.status(500).json({ error }));
    }
    
exports.getName = async (req: Request, res: Response, next: NextFunction) =>{

    let tName = res.locals.jwt.email
    return res.status(200).json({
        name:tName
    });
}