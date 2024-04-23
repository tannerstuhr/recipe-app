import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/HeaderComponent.css';

function HeaderComponent() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className='main'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">SCRUMptious</NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/saved-recipes">Saved Recipes</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/create-recipe">Create Recipe</NavLink>
                            </li>
                            <li class="nav-item">
                                <form className="d-flex" role="search" onSubmit={handleSearch}>
                                    <input
                                        className="form-control me-2"
                                        id='search_form'
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
}

export default HeaderComponent;
