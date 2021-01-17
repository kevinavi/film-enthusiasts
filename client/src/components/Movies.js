import React, { useState, useEffect } from 'react';

import { Card, Button, CardColumns } from 'react-bootstrap';
import './Movies.css';

function Movies() {
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:5001/top-10-movies/")
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(jsonRes => setMovies(jsonRes))
            .catch(error => console.log(error));
    }, []);

    const renderCard = (card, index) => {
        return (
            <div className="child">
                <Card style={{ width: '18rem' }} key={index} className="box">
                <Card.Img variant="top" src={card.title.image.url} />
                <Card.Body>
                    <Card.Title>{card.title.title}</Card.Title>
                    <Card.Text>
                    {card.plotOutline.text}
                    </Card.Text>
                    <Button variant="primary">Book</Button>
                </Card.Body>
                </Card>
            </div>
            
        );
    };

    return (
        <CardColumns>
            {movies.map(
                renderCard
            )}
        </CardColumns>
    );
  }

export default Movies;