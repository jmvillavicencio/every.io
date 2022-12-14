const { PORT, BASE_URL} = process.env;

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: `${BASE_URL}:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};