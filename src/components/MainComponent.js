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
        leaders: LEADERS,
        selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
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
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        </div>
      );
    }

    return (
      <div>
        <Header />
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={MenuPage} />
              <Route exact path='/contactUs' component={Contact} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;