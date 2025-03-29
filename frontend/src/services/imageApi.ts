// frontend/src/services/imageApi.ts
import apiClient from './api';
import { ImageRecord } from '../types'; // Import shared types

// Define the expected structure of the successful upload response
export interface UploadResponse {
    message: string;
    image: ImageRecord;
}

// Function to upload an image for analysis
export const uploadImageForAnalysis = async (
    file: File,
    detectionMethod: 'basic' | 'advanced'
): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file); // Key must match backend (multer field name)
    formData.append('detectionMethod', detectionMethod);

    // Make the POST request with FormData
    const response = await apiClient.post<UploadResponse>(
        '/images/upload', // Endpoint URL
        formData,         // Request body (FormData)
        {                 // Axios config
            headers: {
                // Let Axios set Content-Type automatically for FormData
                // 'Content-Type': 'multipart/form-data', // Not needed usually
            },
        }
    );
    return response.data; // Return the data part of the response
};

// Function to fetch images belonging to the authenticated user
export const getUserImages = async (): Promise<ImageRecord[]> => {
    const response = await apiClient.get<ImageRecord[]>('/images'); // GET request
    return response.data; // Return the array of image records
};