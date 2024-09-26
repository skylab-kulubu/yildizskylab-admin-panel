import api from '../api/api'; // Assuming you have an Axios instance configured

// Create News
export const createNews = async (formData) => {
  try {
    const response = await api.post('/news', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create news: ' + error.message);
  }
};

// Upload Image
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Assuming the API returns the image URL in response.data.url
    return response.data.data.url;
  } catch (error) {
    throw new Error('Failed to upload image: ' + error.message);
  }
};

// Upload PDF
export const uploadPdf = async (file) => {
  try {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await api.post('/pdfs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Assuming the API returns the PDF URL in response.data.url
    return response.data.url;
  } catch (error) {
    throw new Error('Failed to upload PDF: ' + error.message);
  }
};
