
// import axios from "axios";
// import { API } from "../constants/api";

// type LoginPayload = { email: string; password: string };
// type RegisterPayload = { username: string; email: string; password: string };
// type RecommendVideosPayload = { user_id: string };
// type ApiPayloads = LoginPayload | RegisterPayload | RecommendVideosPayload;


// interface Props<T extends ApiPayloads = ApiPayloads> {
//   apiname: keyof typeof API;
//   userData?: T;
// }
// const axiosInstance = axios.create({
//   withCredentials: true
// });
// const ApiCall = <T extends ApiPayloads = ApiPayloads>({ apiname, userData }: Props<T>) => {
//   switch (apiname) {
//     case "LOGIN":
//       return axiosInstance.post(API.LOGIN, userData as LoginPayload);

//     case "REGISTER":
//       return axiosInstance.post(API.REGISTER, userData as RegisterPayload);

//     case "REFRESH":
//       return ""
    
//     case "RECOMMEND_VIDEOS":
//       return axiosInstance.post(API.RECOMMEND_VIDEOS, userData as RecommendVideosPayload );

//     case "CUSTOMER_DETAILS_GET":
//       return axiosInstance.get(`${API.CUSTOMER_DETAILS_GET}`, {params: { user_id: (userData as RecommendVideosPayload).user_id }});
//     case "CUSTOMER_DETAILS_POST":
//       return axiosInstance.post(`${API.CUSTOMER_DETAILS_POST}`, userData );

//     default:
//       throw new Error(`Unknown API name: ${apiname}`);
//   }
// };

// export default ApiCall;
import axios from "axios";
import { API } from "../constants/api";

type LoginPayload = { email: string; password: string };
type RegisterPayload = { username: string; email: string; password: string };
type RecommendVideosPayload = { user_id: string };
type NextStoryPayload = { user_id: string; story_text: string }; // Chat ke liye naya type

// Union type for all possible payloads
type ApiPayloads = 
  | LoginPayload 
  | RegisterPayload 
  | RecommendVideosPayload 
  | NextStoryPayload 
  | any; 

interface Props<T extends ApiPayloads = ApiPayloads> {
  apiname: keyof typeof API;
  userData?: T;
}

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const ApiCall = <T extends ApiPayloads = ApiPayloads>({ apiname, userData }: Props<T>) => {
  switch (apiname) {
    case "LOGIN":
      return axiosInstance.post(API.LOGIN, userData as LoginPayload);

    case "REGISTER":
      return axiosInstance.post(API.REGISTER, userData as RegisterPayload);

    case "REFRESH":
      return axiosInstance.post(API.REFRESH);
    
    case "RECOMMEND_VIDEOS":
      return axiosInstance.post(API.RECOMMEND_VIDEOS, userData as RecommendVideosPayload);

    case "RECOMMEND_AUDIO": // Audio story fetch karne ke liye
      return axiosInstance.post(API.RECOMMEND_AUDIO, userData as RecommendVideosPayload);

    case "NEXT_STORY": // Character chat/speak ke liye
      return axiosInstance.post(API.NEXT_STORY, userData as NextStoryPayload);

    case "CUSTOMER_DETAILS_GET":
      return axiosInstance.get(`${API.CUSTOMER_DETAILS_GET}`, {
        params: { user_id: (userData as RecommendVideosPayload).user_id }
      });

    case "CUSTOMER_DETAILS_POST":
      return axiosInstance.post(`${API.CUSTOMER_DETAILS_POST}`, userData);

    default:
      throw new Error(`Unknown API name: ${apiname}`);
  }
};

export default ApiCall;