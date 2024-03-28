import '../css/FeaturedRecipes.css'

function FeaturedRecipes() {
    return (
      <div className="featured-recipes">
        <div className='inner'>
          <h2 className='heading'>Whats For Dinner?</h2>
          <hr className='rule'></hr>
          <p>Search a Recipe Or Choose One of Our Featured Recipes Below!</p>
          {/* Carousel or slides go here. You can use a library like SwiperJS for easy implementation. */}
        </div>
      </div>
    );
  }
  
  export default FeaturedRecipes;