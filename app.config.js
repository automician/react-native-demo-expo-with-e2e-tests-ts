import dotenv from 'dotenv'

const env = dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
}).parsed

export const config = {
  android: {
    package: env.BUNDLE_ID,
  },
  ios: {
    bundleId: env.BUNDLE_ID,
  },
}
