import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            어썸커뮤니케이션즈
          </h1>
          <p className="text-gray-600 mb-8">
            셀러 전용 드롭쉬핑 플랫폼
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
            셀러 포털 접속
          </button>
          <div className="mt-6 text-sm text-green-600 font-medium">
            배포 성공
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
