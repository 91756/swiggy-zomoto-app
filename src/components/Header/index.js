import './index.css'

const Header = () => (
  <nav className="nav-container">
    <div className="nav-header">
      <div className="logo-name-container">
        <img
          src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660412417/swiggy_logo_to9j9a.jpg "
          alt="website logo"
          className="website-logo-img"
        />
        <h1 className="heading-name">Tasty Kitchen</h1>
      </div>
      <ul className="header-container">
        <li className="nav-item">Home</li>
        <li className="nav-item">Cart</li>
        <li className="nav-item">
          <button type="button" className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
