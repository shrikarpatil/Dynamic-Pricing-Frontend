"use server";
import { getData } from "@/app/api/lib/proxy-fetcher";
import { USER_API, USER_AUTH_API } from "@/config/api-endpoints";
import { RegistrationValues } from "@/app/api/lib/types";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { createData } from "./crud-actions";

export async function RegisterNewUser(data: RegistrationValues) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const apiKey = uuidv4();
    const apiSecret = randomBytes(32).toString("hex");
    console.log("API SECRET : ", apiSecret);
    const hashedApiSecret = await bcrypt.hash(apiSecret, 10);
    const userAuthData = {
      email: data.email,
      password: hashedPassword,
      api_key: apiKey,
      api_secret: hashedApiSecret,
    };
    const response1 = await createData(USER_API, data);
    if (response1?.status === 409) {
      return { status: 409, message: "" };
    }

    const response2 = await createData(USER_AUTH_API, userAuthData);

    if (response1?.status === 200 && response2?.status === 200)
      return { status: 200, message: "Ok" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "An error occured" };
  }
}

async function verifyUser(link: string) {
  console.log(link);
  const data = await getData(link);
  console.log(data);
  if (data.length < 1) return true;
  else return false;
}
