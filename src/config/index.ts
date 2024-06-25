import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const variable = {
	nodeENV: process.env.NODE_ENV,
	port: process.env.PORT,
	dataBaseUrl: process.env.DATABASE_URL,
	bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN,
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
	jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
};

export default variable;
