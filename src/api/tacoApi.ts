// src/api/tacoApi.ts
import apiClient from "./apiClient";
import axios from "axios";

export async function analyzeImage(file: File, userId: string): Promise<{ isRecyclable: boolean }> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    const response = await apiClient.post("api/ai/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data);
      }
      throw new Error(error.message);
    }
    throw error;
  }
}