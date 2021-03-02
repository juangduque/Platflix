import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.webp';


const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isList } = props;
  
  const handleSetFavorite = () => {
    props.setFavorite({
        id, cover, title, year, contentRating, duration 
      })
  }
  const handleDeleteFavorite = (itemId) => {
    props.deleteFavorite(itemId)
  }
  return(
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${id}`}>
            <img 
              className="carousel-item__details--img" 
              src={playIcon} 
              alt="Play Icon"            
            />
          </Link>
          
          {/* En el siguiente if ternario, se evalua si alguna pelicula fue
          añadida a favoritos oprimiendo el botón de agregar a favoritos
          y si ya esta en favoritos solo permitir eliminar dicha pelicula. */}
          {isList ?
            <img 
            className="carousel-item__details--img" 
            src={removeIcon} 
            alt="Remove Icon" 
            onClick={() => handleDeleteFavorite(id)}
          />:
            <img 
              className="carousel-item__details--img" 
              src={plusIcon} 
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          }
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">{`${year} ${contentRating} ${duration}`}</p>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  cover: PropTypes.string,
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite,
}

export default connect(null, mapDispatchToProps)(CarouselItem);