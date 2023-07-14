const naverLoginRequestHandler = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_CALLBACK_URL;
  const STATE = 'false';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_CALLBACK_URL}`;

  return window.location.assign(NAVER_AUTH_URL);
};

// const naverAuthCode = new URL(window.location.href).searchParams.get('code');

export default naverLoginRequestHandler;
