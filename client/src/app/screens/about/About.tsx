import Layout from '@/app/screens/Layout/Layout';

export default function About() {
  return (
    <Layout>
      <div className="section hero" style={{ height: '92dvh' }}>
        <div className="section-inner">
          <div className="section-content">
            <div className="hero-content">
              <h1 className="hero-title">About Us</h1>
              <div className="hero-subtitle">
                This is the website I've created using MERN Stack which contains
                Mongodb as the database, Express as framework of Node.js, React
                as the frontend library and Node.js as the backend server.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{background: '#dadada', height: '92dvh'}}>
        <h1 className="hero-title" style={{
        }}>About Us</h1>
      </div> */}
    </Layout>
  );
}
