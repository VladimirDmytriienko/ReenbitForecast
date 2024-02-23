import { GoogleLogin } from '@react-oauth/google';
import image from  '../../assets/WeatherAuth.jpg'
import './authScreen.css'

export default function AuthScreen({ setAuthToken }) {
    const handleLoginSuccess = (credentialResponse) => {
        setAuthToken(credentialResponse.credential);
        localStorage.setItem('authToken', credentialResponse.credential); 
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };
    return (
        <div className='authScreen'>
            <div className='googlelogin'>
                <h1>Front-End Trainee Camp at Reenbit</h1>
                <span>Weather-Forecast App for Reenbit</span>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                />
            </div>
            <aside>
                <img src={image}/>
            </aside>
        </div>

  )
}
