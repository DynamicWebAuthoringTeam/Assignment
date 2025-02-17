import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Container } from 'react-bootstrap'
import { allPartsData } from '../../data/single-part-data';
import '../component-css/CarCards.css';
import './page-css/PartListing.css';
import { useHistory } from "react-router"

function PartListing() {

    let history = useHistory()

    //State of variable that holds all the card parts to render
    const [filterdParts, setFilterParts] = useState(allPartsData);

    //State of user chosen filters
    const [nameFilter, setNameFilter] = useState('');
    const [makeFilter, setMakeFilter] = useState('');
    const [modelFilter, setModelFilter] = useState('');
    const [lowerPrice, setLowerPrice] = useState(0);
    const [upperPrice, setUpperPrice] = useState(9999);

    //Filter display toggle
    const [filterDisplay, setFilterDisplay] = useState(false);

    //Function to filter the variable used to populate all the show cards.
    function applyFilter() {
        setFilterParts(
            allPartsData.filter(part =>
                !part.name.toLowerCase().indexOf(nameFilter.toLowerCase()) &&
                !part.model.toLowerCase().indexOf(modelFilter.toLowerCase()) &&
                !part.make.toLowerCase().indexOf(makeFilter.toLowerCase()) &&
                ((Number(upperPrice) >= Number(part.price)) && (Number(part.price) >= Number(lowerPrice)))
            )
        )
    }

    //A Function used to Reset the state of the filter value provided by the user.
    function resetFilters() {
        setNameFilter('')
        setMakeFilter('')
        setModelFilter('')
        setLowerPrice(0)
        setUpperPrice(9999)
        setFilterParts(allPartsData)
    }

    return (
        <div>

            {/* Renders the filter controls via the push of a button */}
            <Container className="partlisting-toggler-filters-container">

                {/* If toggle is off display a button that on click will render the Filter Controls*/}
                <Button onClick={() => setFilterDisplay(!filterDisplay)}>{`Toggle Filters >`}</Button>
            </Container>

            {/* If the filterDisplay toggle is true render the filter controls below. */}
            { filterDisplay
                ?
                <Container className="partlisting-filters-container">
                    <Form>

                        {/* A Part Name filter control */}
                        <Row className="part-listing-row-wrapper">
                            <Col lg="2"><Form.Label>Filter Name: {nameFilter}</Form.Label></Col>
                            <Col lg="4">
                                <Form.Control
                                    placeholder="add a name filter.."
                                    onChange={item => { setNameFilter(item.target.value); applyFilter() }}
                                />
                            </Col>
                        </Row>

                        {/* A Part Make filter control */}
                        <Row className="part-listing-row-wrapper">
                            <Col lg="2"><Form.Label>Filter Make: {makeFilter} </Form.Label></Col>
                            <Col lg="4">
                                <Form.Control
                                    placeholder="add a make filter.."
                                    onChange={item => { setMakeFilter(item.target.value); applyFilter() }}
                                />
                            </Col>
                        </Row>

                        {/* A Part Model filter control */}
                        <Row className="part-listing-row-wrapper">
                            <Col lg="2"><Form.Label>Filter Model: {modelFilter} </Form.Label></Col>
                            <Col lg="4">
                                <Form.Control
                                    placeholder="add a model filter.."
                                    onChange={item => { setModelFilter(item.target.value); applyFilter() }}
                                />
                            </Col>
                        </Row>
                    </Form>

                    {/* A Form holding the Range Filters or slider controled filters */}
                    <Form>
                        <Form.Group controlId="rangefilter" as={Row}>
                            <Container>
                                <Col>
                                    {/* Lower Price Range Slider Filter */}
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
                                                min={0} max={9999} />
                                        </Col>
                                    </Row>

                                    {/* Upper Price Range Slider Filter */}
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
                                                min={0} max={9999} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Container>
                        </Form.Group>
                    </Form>

                    {/* Render a button that the user can click to reset all there chosen filters */}
                    <Button onClick={
                        () => { resetFilters() }}>Reset Filters</Button>

                </Container>
                : null
            }

            {/* The Row that will dynamically display all the select Parts, as an outcome of the users filters */}
            <Row className="row-wrapper">
                {
                    // loop through all the part in filterdParts, creating a card for each Part.
                    filterdParts.map((part, key) => {
                        return (
                            <Col lg="3">
                                <Card key={key} className="mb-3" style={{ color: "#000" }}>
                                    <Card.Img alt={part.name} src={part.primaryImage}></Card.Img>
                                    <Card.Body>
                                        <Card.Title>{part.name}</Card.Title>
                                        <Card.Text>Make: {part.make}</Card.Text>
                                        <Card.Text>Model: {part.model}</Card.Text>
                                        <Card.Text>Price £: {part.price}</Card.Text>
                                        {
                                            //Button will navigation the user to the singlePart page for this part.
                                            <Button variant="primary" onClick={event => history.push("/singlepart?id=" + part.id)}>
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
        </div>
    );
}


export default PartListing
