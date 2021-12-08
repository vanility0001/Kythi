import {File} from '../Models/File';
import {S3, AWSError} from 'aws-sdk';

export const s3 = new S3({
  ...JSON.parse(process.env.S3_INFO),
  signatureVersion: 'v4',
});

/**
 * Uploads the file to the s3 bucket
 * @param {File} file The File Model
 * @param {Buffer} buffer The file buffer
 * @return {Promise<AWSError | S3.PutObjectOutput>} Returned data
 */
export async function uploadFile(
    file: File,
    buffer: Buffer,
): Promise<AWSError | S3.PutObjectOutput> {
  return new Promise((resolve, reject) => {
    s3.putObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: `${file.uploader._id}/${file.cdnName}`,
          Body: buffer,
          ACL: 'public-read',
          ContentType: file.mimeType,
        },
        (err, data) => {
        err ? reject(err) : resolve(data);
        },
    );
  });
}
