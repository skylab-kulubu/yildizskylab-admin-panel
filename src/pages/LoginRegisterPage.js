import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-[#eadaff] text-5xl font-bold mb-10 text-center">SKY LAB Panel</h1>
      <div className="w-full max-w-md">
        {/* Glow efektini daha hafif ve opak hale getirdik */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-[0_0_15px_10px_rgba(234,218,255,0.5)]">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 w-1/2 ${isLogin ? 'bg-[#eadaff] text-[#1a1a1a]' : 'bg-[#3f3e3f] text-[#eadaff]'} rounded-l-lg`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 w-1/2 ${!isLogin ? 'bg-[#eadaff] text-[#1a1a1a]' : 'bg-[#3f3e3f] text-[#eadaff]'} rounded-r-lg`}
            >
              Signup
            </button>
          </div>

          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
