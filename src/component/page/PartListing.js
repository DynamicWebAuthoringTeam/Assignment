
import React, { useState} from 'react';
import {Row, Col, Card, Button } from 'react-bootstrap'
import { allPartsData } from '../../data/single-part-data';
import '../component-css/CarCards.css';
import Media from 'react-media';

// const [filter, setFilter] = useState('All');
// const [filterdParts, setFilterParts] = useState(allPartsData);
const a = 1;

function PartListing() {

    return (
        <>
            {/* <div>
                {
                    filterdParts.map(part => (
                        <li>
                            {part.id}
                        </li>
                    ))
                }
            </div> */}


            <Media query="(max-width: 1540px)">
                      { matches =>
                                  matches ? (
                                    // Render Empty div
                                    <Row className="row-wrapper">
                                    {
                                        // loop through all the cars in singleCarsData, creating a card for each Car.
                                        allPartsData.map((part, key) => {
                                            return (
                                                <Col lg="2">
                                                    <Card key={key} className="mb-3" style={{ color: "#000" }}>
                                                        <Card.Img src={part.primaryImage}></Card.Img>
                                                        <Card.Body>
                                                            <Card.Title>{part.name}</Card.Title>
                                                            <Card.Text>
                                                                Model Number: {part.modelNumber} 
                                                            </Card.Text>
                                                            <Card.Text>
                                                                Description: {part.description} 
                                                            </Card.Text>
                                                            {
                                                                //Button will navigation the user to the singleCar page for this car.
                                                                <Button variant="primary" onClick={ event => window.location.href = "/singlepart?id=" + part.id}>
                                                                    Read More
                                                                </Button>
                                                            }
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                                    ) : (
                                    // Render Search Form
                                    <Row className="row-wrapper">
                                        {
                                            // loop through all the cars in singleCarsData, creating a card for each Car.
                                            allPartsData.map((part, key) => {
                                                return (
                                                    <Col lg="2">
                                                        <Card key={key} className="mb-3" style={{ color: "#000" }}>
                                                            <Card.Img src={part.primaryImage}></Card.Img>
                                                            <Card.Body>
                                                                <Card.Title>{part.name}</Card.Title>
                                                                <Card.Text>
                                                                    Model Number: {part.modelNumber} 
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    Description: {part.description} 
                                                                </Card.Text>
                                                                {
                                                                    //Button will navigation the user to the singleCar page for this car.
                                                                    <Button variant="primary" onClick={ event => window.location.href = "/singlepart?id=" + part.id}>
                                                                        Read More
                                                                    </Button>
                                                                }
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            })
                                        }
                                    </Row>
                                    )
                      }
            </Media>
        </>
    )
}

export default PartListing
