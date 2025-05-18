import { toast } from "react-toastify";

export const handleApiError = (error, fallbackMessage = "Bir hata oluştu") => {
  if (error.response) {
      const { status, data } = error.response;
  
      if (status === 401) {
        return null;
      }
  
      if (status >= 400 && status < 500) {
        const message = data?.message || fallbackMessage;
        toast.error(message);
      } else {
        toast.error("Sunucu hatası oluştu");
      }
    } else {
      toast.error("Ağ bağlantısı sağlanamadı");
    }
  
    return null;
  };