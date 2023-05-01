import React from 'react';
// import css styles for album (implement from fuzz.css classes)
// import './ChartView.css';

const AddSongChartView = () => {
    const localStorageItems = localStorage.getItem("recItem");
    const itemsArray = JSON.parse(localStorageItems);
    
    return (
      <div>
        {itemsArray.map((item) => (
          <div key={item.name}>
            <h2>{item.name}</h2>
            <p>{item.year}</p>
            <p>{item.artists}</p>
          </div>
        ))}
      </div>
    );
}

export default AddSongChartView;