import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}) { 
        return(
            <div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
  
    }

    function whichMonth(str) {
        let month = parseInt(str.substring(5,7));

        if(month==1) {
            return "Jan";
        } else if(month==2) {
            return "Feb";
        } else if(month==3) {
            return "Mar";
        } else if(month==4) {
            return "Apr";
        } else if(month==5) {
            return "May";
        } else if(month==6) {
            return "Jun";
        } else if(month==7) {
            return "Jul";
        } else if(month==8) {
            return "Aug";
        } else if(month==9) {
            return "Sep";
        } else if(month==10) {
            return "Oct";
        } else if(month==11) {
            return "Nov";
        } else if(month==12) {
            return "Dec";
        }
    }
    
    function RenderComments({comments}) {
        const replies =  comments.map( (comet) => {
            return (
                    <div className="list-unstyled" tag="li" key={comet.id}>
                        <div>{comet.comment}</div><br></br>
                        <div>-- {comet.author} , {whichMonth(comet.date)} {comet.date.substring(8,10)},{comet.date.substring(0,4)}</div><br></br>
                    </div>
            );
        });

        return (
            <div>
                <h1>Comments</h1>
                <div tag="ul">{replies}</div>
            </div>

        );
    }
  
    const  DishDetail = (props) => {
        if (props.dish != null) {

            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );

        } else {
            return(
                <div></div>
            );
        }
    }
  
  export default DishDetail;