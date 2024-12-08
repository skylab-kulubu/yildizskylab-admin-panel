import { useRef, useState } from "react";
import { loginUser } from "../services/usersService";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş alan kontrolü
    if (!emailRef.current.value || !passwordRef.current.value) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setLoading(
        true
      ); /* API Çalışırken tekrar butona basılmasını engellemek için loading state ini devreye sokuyoruz */
      const response = await loginUser(credentials);
      if (response.isSuccess) {
        setSuccess("Giriş başarılı! Hoş geldiniz.");
        setError("");
      } else {
        setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (err) {
      setError("Giriş başarısız. Lütfen tekrar deneyin.");
      setSuccess("");
    } finally {
      setLoading(false); /* Register olunca engelleme işlemini bitiriyoruz */
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-[#eadaff] text-3xl font-bold mb-6 text-center">
          Giriş Yap
        </h2>

        {/* Form yapısına onSubmit ekleniyor */}
        <form
          onSubmit={handleSubmit}
          className="h-96 overflow-y-auto content-center"
        >
          {/* Email Kısmı */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Şifre Kısmı */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Şifre"
              ref={passwordRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          {/* Hata ve başarı mesajları */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Login butonu */}
          <button
            type="submit"
            disabled={
              loading
            } /* API Çalışırken bir sürü kez basılınca register işlemini önlemek için loading state'i kuruyoruz.  */
            className="w-full bg-[#eadaff] text-[#1a1a1a] py-3 rounded-lg hover:bg-[#e0c9ff] transition duration-300 active:scale-95"
          >
            Giriş Yap!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
