export default {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://herokuapp.myapi.com"
      : "localhost:4000"
};
