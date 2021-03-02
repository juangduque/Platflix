import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import Header from '../components/Header.jsx';
import useTvShowsApi from '../hooks/useTvShowsApi';
import '../assets/styles/App.scss';

const Home = ({ myList, trends, originals }) => {
  return(
    <React.Fragment>  
      <Header />
      <Search isHome/>
      {myList.length > 0 && (
        <Categories title="Mi lista">
          <Carousel>
            {myList.map(item =>
              <CarouselItem 
                key={item.id} 
                {...item} 
                isList
              />
            )}
          </Carousel>
        </Categories>
      )}
      <Categories title="Tendencias">
        <Carousel>
          {trends.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
      <Categories title="Originales de Platfix">
        <Carousel>
          {originals.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
    </React.Fragment>    
  );
}

const mapStateToProps = state => {
  return{
    myList: state.myList,
    trends: state.trends,
    originals: state.originals
  };
};

export default connect(mapStateToProps, null)(Home);