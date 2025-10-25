import { useState } from 'react'
import Nav from './components/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Vite + React + Tailwind
          </h1>
          <div className="bg-white rounded-lg shadow p-8 max-w-md mx-auto">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              count is {count}
            </button>
            <p className="mt-4 text-gray-600">
              Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
