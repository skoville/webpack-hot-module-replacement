import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const existsAsync = promisify(fs.exists);
const readdirAsync = promisify(fs.readdir);
const rmdirAsync = promisify(fs.rmdir);
const statAsync = promisify(fs.stat);
const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

// TODO: handle case where someone adds file into folder before complete removal.
//       Also handle case where someone puts a lock on one of the files (should probably fail immediately).
// TODO: handle symlinks
async function comprehensiveDeleteAsync(deletionPath: string) {
    const exists = await existsAsync(deletionPath);
    if(exists) {
        const stats = await statAsync(deletionPath);
        if(stats.isDirectory()) {
            const children = await readdirAsync(deletionPath);
            await Promise.all(children
                .map(child => path.join(deletionPath, child))
                .map(comprehensiveDeleteAsync));
            await rmdirAsync(deletionPath);
        } else { // it is a file. You delete a file by unlinking it.
            await unlinkAsync(deletionPath);
        }
    }
}

export const fsAsync = {
    comprehensiveDeleteAsync,
    existsAsync,
    mkdirAsync,
    readdirAsync,
    statAsync,
    unlinkAsync
};