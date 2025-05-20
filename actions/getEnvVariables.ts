"use server";

export async function getBackendAPI()
{
    return process.env.BACKEND_BASE_URL;
}