import * as crypto from 'crypto';

const HASH_ALGORITHM = "md5";
const OUTPUT_ENCODING = "hex";

export function generateHash(input: string) {
    return crypto.createHash(HASH_ALGORITHM).update(input).digest(OUTPUT_ENCODING);
}