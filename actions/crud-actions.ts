"use server";
import axios from "axios";

export const createData = async (link: string, data: any) => {
    try {
        const response = await axios.post(`${process.env.BACKEND_BASE_URL}/${link}`, data);
        return { status: response.status, data: response.data };
    } catch (error)
    {
        console.log(error);
    }
}

export const getData = async (link: string) => {
    try {
        const response = await axios.get(`${process.env.BACKEND_BASE_URL}/${link}`);
        return { status: response.status, data: response.data };
    }catch (error)
    {
        console.log(error);
    }
}

export const updateData = async (link: string, data:any) => {
  try {
    const response = await axios.put(`${process.env.BACKEND_BASE_URL}/${link}`,data);
    return {status:response.status, data:response.data};
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (link: string) => {
  try {
    const response = await axios.put(
      `${process.env.BACKEND_BASE_URL}/${link}`   
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};