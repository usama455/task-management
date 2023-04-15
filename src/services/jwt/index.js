import jwt from 'jsonwebtoken';
import { jwtSecret, expiresIn } from '../../config';

export const sign = (email, id)=>{
    const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + expiresIn);

	return jwt.sign(
		{
			email,
			id,
			exp: parseInt(expirationDate.getTime() / 1000, 10)
		},
		jwtSecret
	);
}
