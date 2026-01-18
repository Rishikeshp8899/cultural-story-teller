interface CheckRespProps {
  response: any;
}

export const CheckResp = ({ response }: CheckRespProps): boolean => {
  if (!response) return false;
  const { message }: { message?: string } = response;
  console.log("Response message:", message);

  if (message === "Invalid token") {
    localStorage.removeItem("token");
    return false;
  } else {
    console.log("Response:", response);
    return true;
  }
}