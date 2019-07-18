import jwt from "jsonwebtoken";

const creteJWT = (id: number): string => {
    const token = jwt.sign({ id }, process.env.JWT_TOKEN || "");
    return token;
};

export default creteJWT;
