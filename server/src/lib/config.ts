import "dotenv/config";

function loadFromEnv(key: string): string {
    if (typeof process.env[key] !== "undefined") {
        return process.env[key] as string;
    }

    throw new Error(`Environment variable ${key} is not defined`);
}

const config = {
    mongoDBUrl: loadFromEnv("MONGO_URI"),
};

export { config as serverConfig };