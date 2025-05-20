import axios from "axios";


export async function createData(
  link: string,
  data: any
) {
  try {
    const payload = { link, data };

    const response = await axios.post(
      "/api/proxy/post",
      payload
    );

    return response.data;
  } catch (error: any) {
    return {
      status: 500,
      error: error.message,
    };
  }
}

export const getData = async (link: string) => {
  
  console.log("Requesting from:", link);

  const response = await axios.post(`${process.env.FRONTEND_BASE_URL}/api/proxy/get`, { link });

  if (!response.data.success) {
    throw new Error(response.data.error || "Failed to fetch data");
  }

  return response.data.data;
};
