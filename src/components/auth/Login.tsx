'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { mockAccounts } from '../mockData/MockData';
import Header from '../header/Header';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userAccount = mockAccounts.find(account => account.holder.username === username);
    if (!userAccount) {
      setError('User not found');
      return;
    }
    if (userAccount.holder.password !== password) {
      setError('Invalid password');
      return;
    }
    // Store user data in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userAccount));
    router.push('/dashboard');
  };

  const date = new Date();
  const hour = date.getHours();

  return (
    <div className="">
      <Header />
      <div className="h-screen px-6 p-4">
        <div className="bg-[#ffffff] mx-auto rounded-xl w-full py-7">
          <div className="flex flex-col items-center justify-center">
            <div className="mt-3">{error && <p className="text-[20px] text-center mx-auto max-w-[200px] rounded-md flex items-center justify-center text-red-600">{error}</p>}</div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-[30px] p-5 py-8 border rounded-2xl">
              <div className="flex relative flex-col gap-3">
                <label htmlFor="Username" className="text-[#1E1F20] absolute ml-3 -top-[19px] bg-[#ffffff] py-2 text-[16px]">
                  Username
                </label>
                <input type="text" value={username} className="p-4 rounded-[10px] text-[#1E1F20] bg-transparent border border-gray-300 outline-none" onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="flex relative flex-col gap-3">
                <label htmlFor="Username" className="text-[#1E1F20] absolute ml-3 -top-[10px] bg-[#ffffff] text-[16px]">
                  Password
                </label>
                <input type="password" value={password} className="p-4 rounded-[10px] text-[#1E1F20] bg-transparent border border-gray-300 outline-none" onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="flex flex-col w-full items-center justify-between gap-2 mt-3">
                <button type="submit" className="p-4 py-3 bg-[#417514] w-full text-white font-semibold rounded-full">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full min-h-[70px] text-sm text-[#1E1F20] text-center flex flex-col gap-3 items-center absolute bottom-0 z-50 bg-[#ffffff] px-6 p-[20px]">
        <p>©2025 Regions Bank. All Rights Reserved.</p>
        <p>Regions, the Regions logo and the LifeGreen bike are registered trademarks of Regions Bank. The LifeGreen color is a trademark of Regions Bank.</p>
        <Image src="https://i.imgur.com/pty7j0s.png" width={230} height={28} className="w-[50px] h-[20px]" alt="logo" />
      </div>
    </div>
  );
}
