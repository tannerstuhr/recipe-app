function Header() {
    return (
      <header className="header">
        <h1>SCRUMptious!</h1>
        {/* Icons can be added with <img> tags or icon libraries like FontAwesome */}
        <div className="icons">
          <span>🔍</span> {/* Placeholder for search icon */}
          <span>☰</span> {/* Placeholder for menu icon */}
        </div>
      </header>
    );
  }
  
  export default Header;