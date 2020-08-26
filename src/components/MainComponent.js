import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Menu_functionalComponent';
import DishDetail from './Dishdetail_functionalComponent';
import Contact from './ContactUsComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }

  render() {

    const HomePage = () => {
      return(
          <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                leader={this.state.leaders.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((dish) => dish.featured)[0]} 
          />
      );
    }

    const MenuPage = () => {
      return (
        <div>
        <Menu dishes={this.state.dishes} /> 
        </div>
      );
    }

    const DishDetailPage = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header />
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={MenuPage} />
              <Route path='/menu/:dishId' component={DishDetailPage} />
              <Route exact path='/contactUs' component={Contact} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;