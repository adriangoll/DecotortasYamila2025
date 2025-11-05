import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaGoogle } from 'react-icons/fa';

function LoginPage() {
  const { loginWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await loginWithGoogle();
      navigate('/'); // Redirigir al home después del login
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Decotortas Yamila
          </h1>
          <p className="text-gray-600">Iniciá sesión para continuar</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <FaGoogle />
          {loading ? 'Iniciando sesión...' : 'Continuar con Google'}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Al iniciar sesión, aceptás nuestros</p>
          <p>Términos de Servicio y Política de Privacidad</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;