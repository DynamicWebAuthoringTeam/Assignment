import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Container } from 'react-bootstrap'
import { singleCarsData } from '../../data/single-cars-data';
import './page-css/CarListing.css';
import '../component-css/CarCards.css';
import { useHistory } from "react-router"

function CarListing() {
    let history = useHistory()

    //State of variable that holds all the card parts to render on the page.
    const [filteredCars, setFilteredCars] = useState(singleCarsData);

    //Boolean to toggle the display of the filtering options.
    const [filterDisplay, setFilterDisplay] = useState(false);

    //State of user chosen Make and Model filters
    const [makeFilter, setMakeFilter] = useState('');
    const [modelFilter, setModelFilter] = useState('');

    //State of Car Price Bounds
    const [lowerPrice, setLowerPrice] = useState(0);
    const [upperPrice, setUpperPrice] = useState(999999);

    //State of Car Milage Bounds
    const [lowerMiles, setLowerMiles] = useState(0);
    const [upperMiles, setUpperMiles] = useState(999999);

    //State of Car Year Bounds
    const [lowerYear, setLowerYear] = useState(1900);
    const [upperYear, setUpperYear] = useState(2030);

    //Function to apply the filters to the singleCarsData variable used to populate all the show cards.
    function applyFilter() {
        setFilteredCars(
            singleCarsData.filter(car =>
                !car.model.toLowerCase().indexOf(modelFilter.toLowerCase()) &&
                !car.make.toLowerCase().indexOf(makeFilter.toLowerCase()) &&
                ((Number(upperPrice) >= Number(car.price)) && (Number(car.price) >= Number(lowerPrice))) &&
                ((Number(upperMiles) >= Number(car.miles)) && (Number(car.miles) >= Number(lowerMiles))) &&
                ((Number(upperYear) >= Number(car.year)) && (Number(car.year) >= Number(lowerYear)))
            )
        )
    }

    //A function to reset all filters back to there defaulted values.
    function resetFilters() {
        setMakeFilter('')
        setModelFilter('')
        setLowerYear(1900)
        setUpperYear(2030)
        setLowerPrice(0)
        setUpperPrice(999999)
        setLowerMiles(0)
        setUpperMiles(999999)
        setFilteredCars(singleCarsData)
    }

    return (
        <>
            <Container className="carlisting-toggler-filters-container">
                <Button onClick={() => setFilterDisplay(!filterDisplay)}>{`Toggle Filters >`}</Button>
            </Container>
            { filterDisplay
                ?
                <Container className="carlisting-filters-container">
                    <Form>
                        <Row className="car-listing-row-wrapper">
                            <Col lg="2"><Form.Label>Filter Make: {makeFilter} </Form.Label></Col>
                            <Col>
                                <Form.Control
                                    placeholder="add a make filter.."
                                    onChange={item => { setMakeFilter(item.target.value); applyFilter() }}
                                />
                            </Col>
                        </Row>
                        <Row className="car-listing-row-wrapper">
                            <Col lg="2"><Form.Label>Filter Model: {modelFilter} </Form.Label></Col>
                            <Col>
                                <Form.Control
                                    placeholder="add a model filter.."
                                    onChange={item => { setModelFilter(item.target.value); applyFilter() }}
                                />
                            </Col>
                        </Row>
                    </Form>

                    {/* Form Below holds all the Range controls(rangefilter), that are slider based */}
                    <Form>
                        <Form.Group controlId="rangefilter" as={Row}>
                            <Container>
                                <Col>
                                    {/* Lower Year Bound Slider Filter */}
                                    <Row>
                                        <Col lg="2">
                                            <Form.Label>Lower Year</Form.Label>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Control value={lowerYear} />
                                        </Col>
                                        <Col lg>
                                            <Form.Control
                                                type="range"
                                                value={lowerYear}
                                                onChange={e => { setLowerYear(e.target.value); applyFilter() }}
                                                min={1900} max={2030} />
                                        </Col>
                                    </Row>

                                    {/* Upper Year Bound Slider Filter */}
                                    <Row>
                                        <Col lg="2">
                                            <Form.Label>Upper Year</Form.Label>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Control value={upperYear} />
                                        </Col>
                                        <Col lg>
                                            <Form.Control
                                                type="range"
                                                value={upperYear}
                                                onChange={e => { setUpperYear(e.target.value); applyFilter() }}
                                                min={1900} max={2030} />
                                        </Col>
                                    </Row>

                                    {/* Lower $ Bound Slider Filter */}
                                    <Row>
                                        <Col lg="2">
                                            <Form.Label>Lower £</Form.Label>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Control value={lowerPrice} />
                                        </Col>
                                        <Col lg>
                                            <Form.Control
                                                type="range"
                                                value={lowerPrice}
                                                onChange={e => { setLowerPrice(e.target.value); applyFilter() }}
                                                min={0} max={999999} />
                                        </Col>
                                    </Row>

                                    {/* Upper $ Bound Slider Filter */}
                                    <Row>
                                        <Col lg="2">
                                            <Form.Label>Upper £</Form.Label>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Control value={upperPrice} />
                                        </Col>
                                        <Col lg>
                                            <Form.Control
                                                type="range"
                                                value={upperPrice}
                                                onChange={e => { setUpperPrice(e.target.value); applyFilter() }}
                                                min={0} max={999999} />
                                        </Col>
                                    </Row>

                                    {/* Lower Milage Bound Slider Filter */}
                                    <Row>
                                        <Col lg="2">
                                            <Form.Label>Lower Miles</Form.Label>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Control value={lowerMiles} />
                                        </Col>
                                        <Col lg>
                                            <Form.Control
                                                type="range"
                                                value={lowerMiles}
                                                onChange={e => { setLowerMiles(e.target.value); applyFilter() }}
                                                min={0} max={999999} />
                                        </Col>
                                    </Row>

                                    {/* Upper Milage Bound Slider Filter */}
                                    <Row>
                                        <Col lg="2">
                                            <Form.Label>Upper Miles</Form.Label>
                                        </Col>
                                        <Col lg="2">
                                            <Form.Control value={upperMiles} />
                                        </Col>
                                        <Col lg>
                                            <Form.Control
                                                type="range"
                                                value={upperMiles}
                                                onChange={e => { setUpperMiles(e.target.value); applyFilter() }}
                                                min={0} max={999999} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Container>
                        </Form.Group>
                    </Form>

                    {/* A Button to reset the state of all filters. */}
                    <Button onClick={() => { resetFilters() }}>Reset Filters</Button>
                </Container>
                : null
            }

            {/*
                 A Row that loops through all the cars in filteredCars, creating a card for each Car.
                If the car was filtered out by one of the user selected filter it will not be render on the page.
            */}
            <Row className="row-wrapper">
                {
                    filteredCars.map((car, key) => {
                        return (
                            <Col lg="4">

                                {/* An Individual Card holding all the Cars Important information */}
                                <Card key={key} className="mb-3" style={{ color: "#000" }}>
                                    <Card.Img src={car.primaryImage} alt={car.model}></Card.Img>
                                    <Card.Body>
                                        <Card.Title>{car.make} - {car.model}</Card.Title>
                                        <Card.Text>
                                            <div className="carlisting-details">
                                                Price: £{car.price}
                                            </div>
                                            <div className="carlisting-details">
                                                Milage: {car.wasPrice} Miles <br></br>
                                            </div>
                                            <div className="carlisting-details">
                                                Model Year: {car.year}<br></br>
                                            </div>
                                        </Card.Text>
                                        {
                                            //Button will navigation the user to the singleCar page for this car. history.push("/singlecar?id=" + car.id)
                                            <Button variant="primary" onClick={event => history.push("/singlecar?id=" + car.id)}>
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
        </>
    )
}

export default CarListing
