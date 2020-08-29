import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
     Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors, Row, Col } from 'react-redux-form';
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

        if(month===1) {
            return "Jan";
        } else if(month===2) {
            return "Feb";
        } else if(month===3) {
            return "Mar";
        } else if(month===4) {
            return "Apr";
        } else if(month===5) {
            return "May";
        } else if(month===6) {
            return "Jun";
        } else if(month===7) {
            return "Jul";
        } else if(month===8) {
            return "Aug";
        } else if(month===9) {
            return "Sep";
        } else if(month===10) {
            return "Oct";
        } else if(month===11) {
            return "Nov";
        } else if(month===12) {
            return "Dec";
        }
    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    
    class CommentForm extends Component {

        constructor(props) {
            super(props);

            this.state = {
                isSubmitCommentOpen : false
            }

            this.toggleSubmitCommentModal = this.toggleSubmitCommentModal.bind(this);
            this.handleComment = this.handleComment.bind(this);
        }

        toggleSubmitCommentModal() {
            this.setState({
              isSubmitCommentOpen: !this.state.isSubmitCommentOpen
            });
        }

        handleComment(values) {

            this.toggleSubmitCommentModal();

            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));

            this.toggleSubmitCommentModal();
        }

        render() {
            return ( 
                <div> 
                    <Button outline onClick={this.toggleSubmitCommentModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isSubmitCommentOpen} toggle={this.toggleSubmitCommentModal}>
                        <ModalHeader toggle={this.toggleSubmitCommentModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => (this.handleComment)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control" placeholder="chose Rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname" placeholder="Your Name"className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger" model=".firstname" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" name="comment" id="comment" placeholder="Write your Comment here..." rows="6" className="form-control"/>
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }   //end-render
    }   //end-CommentForm */
    
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
                <CommentForm />
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