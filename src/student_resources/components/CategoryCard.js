import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './styling/CategoryCard.css';

const CategoryCard = ({ name, description, children }) => {
    
    return (
       <div className="category-card">
            <h2 className="category-title">{name}</h2>
            <p className="category-description">{description}</p>
            <div className="category-content">
                {children}
            </div>
         </div>
    );
}

export default CategoryCard;

