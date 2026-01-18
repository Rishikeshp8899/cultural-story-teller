// const BASE_URL = "http://localhost:8000/api";

// export const API = {
//   LOGIN: `${BASE_URL}/users/login`,
//   REGISTER: `${BASE_URL}/users/register`,
//   REFRESH: `${BASE_URL}/users/refresh`,

//   // Recommendation
//   RECOMMEND_VIDEOS: `${BASE_URL}/recommend/videos`,

//   // Parent preferences
//   CUSTOMER_DETAILS_GET: `${BASE_URL}/parent/customer-details`,
//   CUSTOMER_DETAILS_POST: `${BASE_URL}/parent/customer-details`,
// };
const BASE_URL = "http://localhost:8000/api";

export const API = {
  LOGIN: `${BASE_URL}/users/login`,
  REGISTER: `${BASE_URL}/users/register`,
  REFRESH: `${BASE_URL}/users/refresh`,

  // Recommendation
  RECOMMEND_VIDEOS: `${BASE_URL}/recommend/videos`,
  RECOMMEND_AUDIO: `${BASE_URL}/recommend/audio`, // Naya Endpoint

  // Story & Character Chat
  NEXT_STORY: `${BASE_URL}/next/story/`, // Naya Endpoint

  // Parent preferences
  CUSTOMER_DETAILS_GET: `${BASE_URL}/parent/customer-details`,
  CUSTOMER_DETAILS_POST: `${BASE_URL}/parent/customer-details`,
};