import api from '../api/api';

// Kullanıcıları listeleme servisi
export const fetchUsers = async (pageId = 1, pageSize = 10) => {
  try {
    const response = await api.get(`/users?page_id=${pageId}&page_size=${pageSize}`);
    return response.data; // API'den dönen veriyi geri döndürüyoruz
  } catch (error) {
    throw new Error('Kullanıcılar getirilemedi: ' + error.message);
  }
};

// Kullanıcı oluşturma servisi
export const createUser = async (user) => {
  try {
    const response = await api.post('/users', user);
    return response.data;
  } catch (error) {
    throw new Error('Kullanıcı oluşturulamadı: ' + error.message);
  }
};

// Kullanıcı güncelleme servisi
export const updateUser = async (user) => {
  try {
    const response = await api.put(`/users/${user.id}`, user); // Güncellemede kullanıcı ID gerekli
    return response.data;
  } catch (error) {
    throw new Error('Kullanıcı güncellenemedi: ' + error.message);
  }
};

// Kullanıcı silme servisi
export const deleteUser = async (userId) => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    throw new Error('Kullanıcı silinemedi: ' + error.message);
  }
};

// Kullanıcı kayıt servisi
export const registerUser = async (user) => {
  try {
    const response = await api.post('/users/signup', user);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server dönen hatayı konsola yazdırın
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // İstek yapıldı ama cevap alınamadı
      console.error('No response received:', error.request);
    } else {
      // Başka bir hata oluştu
      console.error('Error:', error.message);
    }
    throw new Error('Kullanıcı kaydedilemedi: ' + error.message);
  }
};

// Kullanıcı giriş servisi
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials, {
      withCredentials: true, // Çerez bilgilerini gönder
    });

    // Eğer giriş başarılıysa token'ı al ve localStorage'a kaydet
    if (response.data.isSuccess) {
      const token = response.data.data; // Gelen token (JWT)
      localStorage.setItem('authToken', token); // Token'ı localStorage'a kaydet

      // Authorization headerını Bearer token ile ayarlayın
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Giriş başarılı olduktan sonra /users sayfasına yönlendir
      window.location.href = '/users'; // Saf JavaScript ile yönlendirme
    }

    return response.data;
  } catch (error) {
    throw new Error('Giriş yapılamadı: ' + error.message);
  }
};



// Kullanıcı detaylarını getirme servisi
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data; // Kullanıcı bilgilerini döndürüyoruz
  } catch (error) {
    throw new Error('Kullanıcı bilgisi getirilemedi: ' + error.message);
  }
};
