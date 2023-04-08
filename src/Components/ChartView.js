import React from 'react';
// import css styles for album (implement from fuzz.css classes)
import { BillboardData } from './BillboardData';
import '../css/ChartView.css';

const ChartView = () => {
    return (
        <>
            <div className="container">
                <h1 className="titleBB">Billboard Top 100</h1>
                <ul className="cards">
                    {BillboardData.map((item, index) => {
                        return (
                            <li key={index} className='card'>
                                <div className='card-item'>

                                    <h3 className='card-item'>{item.title}</h3>    
                                    <h4 className='card-item-subtitle'>{item.artist}</h4>
                                    <div className='card-content'>
                                        <img className='card-image' src={item.image}/>
                                    </div>
                                    <div className='card-rate-functions'>
                                        <i className="fa-solid fa-circle-play">
                                            {/* {Play} */}
                                        </i> 
                                        <i className="fa-solid fa-circle-plus">
                                            {/* {Add} */}
                                        </i> 
                                        <i className="fa-solid fa-heart">
                                            {/* {Add} */}
                                        </i> 

                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>

    )
}

export default ChartView;