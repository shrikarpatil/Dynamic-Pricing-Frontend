"use server";
import { EMAIL_API, USER_AUTH_API } from "@/config/api-endpoints";
import { v4 as uuidv4 } from "uuid";
import { createData, getData, updateData } from "./crud-actions";
import { NEW_PASSWORD_PAGE } from "@/config/constants";

export const setPasswordResetToken = async(email:string) => {     
    const userExists = await verifyUser(email);
    if (userExists)
    {       
        const token = uuidv4();       
        const response = await updateData(`${USER_AUTH_API}?email=${email}`, { password_reset_token: token }); 
        if (response?.status === 200)
        {
            const response = await sendPasswordResetEmail(email, token);
            return {status:response.status,data:response.data}
        }
    }
    else
        return{status:404,message:"User Not Found"}
 
}

const verifyUser = async (email: string) => {    
    const response = await getData(`${USER_AUTH_API}?email=${email}`);    
    if (response?.status == 200)
        return true;
    else
        return false;
}

const sendPasswordResetEmail = async (email: string, token: string) => {
    const data = {
      type: "password_reset",
      to: email,
      link: `${process.env.FRONTEND_BASE_URL}/${NEW_PASSWORD_PAGE}?token=${token}`,
      sent_by: "Dynamic Pricing Engine Support",
    };
    const response = await createData(EMAIL_API,data );
    return { status: response?.status, data: response?.data };
}
