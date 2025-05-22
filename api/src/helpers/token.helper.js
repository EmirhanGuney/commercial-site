import jwt from 'jsonwebtoken';
import CONFIGS from '../config/config.js';
import crypto from "crypto";

const accessSecret = CONFIGS.ACCESS_SECRET;
const urlSecret = CONFIGS.URL_SECRET;

export const generateAccessToken = (payload, expiresIn = '60m') => {
    return jwt.sign(payload, accessSecret, { expiresIn });
}

export const generateRefreshToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const verifyAccessToken = (token) => jwt.verify(token, accessSecret);

export const verifySecureUrlToken = (token) => jwt.verify(token, urlSecret);

//TODO: file yapisi tekrar kurulacak
export const generateSecureUrlToken = (fileUrl) => {
    const payload = {
        fileUrl: fileUrl,
        exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }
    return jwt.sign(payload, urlSecret);
}