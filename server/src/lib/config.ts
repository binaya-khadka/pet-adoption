import "dotenv/config";

function loadFromEnv(key: string): string {
    if (typeof process.env[key] !== "undefined") {
        return process.env[key] as string;
    }

    throw new Error(`Environment variable ${key} is not defined`);
}

const config = {
    mongoDBUrl: loadFromEnv("MONGO_URI"),
    totalValidationDays: parseInt(loadFromEnv('TOTAL_VALIDATION_DAYS')) || 250,
    port: parseInt(loadFromEnv('PORT')) || 3000,
    jwtSecret: loadFromEnv("JWT_SECRET"),
};

export { config as serverConfig };