import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Field from '../widgets/Field';
import Hero from '../widgets/Hero';
import '../css/Card.css';

const Card = () => {
    return (
        <Row className="card">
            <Col xs={12} sm={3} first="xs" last="sm">
                <Hero />
            </Col>
            <Col xs={12} sm={9}>
                <Row between="lg">
                    <Col xs={12} sm={4} lg={3}>
                        <Field />
                    </Col>
                    <Col xs={12} sm={4} lg={3}>
                        <Field />
                    </Col>
                    <Col xs={12} sm={4} lg={3}>
                        <Field />
                    </Col>
                    <Col xs={12} sm={4} lg={3}>
                        <Field />
                    </Col>
                    <Col xs={12} sm={4} lg={3}>
                        <Field />
                    </Col>
                    <Col xs={12} sm={4} lg={3}>
                        <Field />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Card;

