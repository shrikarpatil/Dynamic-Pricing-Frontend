"use server";
import axios from "axios";

export const createData = async (link: string, data: any) => {
  try {
    console.log(process.env.BACKEND_BASE_URL);
    const response = await axios.post(`${process.env.BACKEND_BASE_URL}/${link}`, data);
    return response;
  }
  catch (error) {
    return error;
  }
};

export const getData = async (link: string) => {
  const response = await axios.get(`${process.env.BACKEND_BASE_URL}/${link}`);  
  return response.data;
};

export const updateData = async (link: string,data:any) => {
    const response = await axios.put(
        `${process.env.BACKEND_BASE_URL}/${link}`,
        data
    );
  return response;
};

export const deleteData = async (link: string, data: any) => {
  const response = await axios.delete(
    `${process.env.BACKEND_BASE_URL}/${link}`,
    data
  );
  return response;
};