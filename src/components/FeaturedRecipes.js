import '../css/FeaturedRecipes.css'

const focusSearch = () => {
  // Check if the navbar is collapsed by checking the display style of the collapsible div
  const navbarToggler = document.querySelector('.navbar-toggler');
  const isCollapsed = getComputedStyle(document.getElementById('navbarSupportedContent')).display === 'none';

  // If the navbar is collapsed (meaning the 'display' property of the collapsible div is 'none'), click the toggler
  if (navbarToggler && isCollapsed) {
      navbarToggler.click();
      // Wait a bit for the collapse animation to complete before focusing
      setTimeout(() => {
          document.getElementById("search_form").focus();
      }, 350); // Adjust the timeout if needed
  } else {
      // If not collapsed, just focus
      document.getElementById("search_form").focus();
  }
};


function FeaturedRecipes() {
    return (
      <div className="featured-recipes">
        <div className='inner'>
          <h2 className='heading'>Whats For Dinner?</h2>
          <hr className='rule'></hr>
          <p>
            <a 
            onClick={focusSearch}
            style={{ cursor: 'pointer' }}
            className='search_focus_button'
            >
              Search 
            </a> a Recipe Or Choose One of Our Featured Recipes Below!</p>
          {/* Carousel or slides go here. You can use a library like SwiperJS for easy implementation. */}
        </div>
      </div>
    );
  }
  
  export default FeaturedRecipes;