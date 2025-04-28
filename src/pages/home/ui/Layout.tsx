import { useState } from 'react';

import viteLogo from '/vite.svg';
import reactLogo from '@/assets/react.svg';

function Layout() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="flex flex-row items-center justify-center gap-12">
        <a
          className="size-40 max-w-[40%]"
          href="https://vite.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={viteLogo}
            alt="Vite logo"
            className="size-full hover:drop-shadow-[0_0_2em_#646cffaa]"
          />
        </a>
        <a
          className="size-40 max-w-[40%]"
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={reactLogo}
            className="size-full animate-[spin_5s_linear_infinite] hover:drop-shadow-[0_0_2em_#61dafbaa]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="mt-6 text-5xl text-gray-800">Vite + React</h1>
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <button
          type="button"
          onClick={() => setCount(count => count + 1)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
      <form>
        <label className="mt-4 block">
          <span className="text-gray-700">이름 (@tailwindcss/forms 예시)</span>
          <input type="text" className="mt-1 block w-full" />
        </label>
      </form>
    </div>
  );
}

export default Layout;
