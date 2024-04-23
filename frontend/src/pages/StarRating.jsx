import React, { useState } from 'react';

const StarRating = ({ count, rating, onRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div>
            {[...Array(count)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            style={{ display: 'none' }}
                            value={ratingValue}
                            onClick={() => onRating(ratingValue)}
                        />
                        <i
                            className={`ri-star-${ratingValue <= (hover || rating) ? 'fill' : 'line'}`}
                            style={{ color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9', cursor: 'pointer', fontSize: '24px' }}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        ></i>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
