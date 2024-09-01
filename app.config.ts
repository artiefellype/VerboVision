import 'dotenv/config';

export default {
  expo: {
    name: "VerboVision",
    slug: "VerboVision-slug",
    version: "1.0.0",
    extra: {
      googleApiKey: process.env.GOOGLE_API_KEY,
    },
  },
};
