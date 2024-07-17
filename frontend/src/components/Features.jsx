import React from 'react';
import Grid from '@mui/material/Grid';
// import img1 from './img/58c377b3c70745be4a6c8391011ea77a-v2.svg'
// import img2 from './img/b23570d4e6681f42b143b822fccbb1a6-v2.svg'
// import img3 from './img/ffcab9cbf04c825a3df3db993aefbb77-v2.svg'
import Button from '@mui/material/Button';
const Features = () => {
    return (
        <div className='features-holder'>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <div className="features-details">
                    
                        <div className="features-img">
                            <img src="./img/1.svg"/>
                        </div>
                        <div className="features-dsx">
                            <h3>
                            Get the perfect size with No More Calculation 
                            </h3>
                        </div>
                        <button href="/"  className='FeaturesHome FeaturesHomeSize'>Know Your Size</button>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                <div className="features-details">
                    
                    <div className="features-img">
                        <img src="./img/2.svg"/>
                    </div>
                    <div className="features-dsx">
                        <h3>
                        View the item as a 3D model and check every angle
                        </h3>
                    </div>
                    <button href="/" className='FeaturesHome FeaturesHomeItem'>View 3D Items</button>
                </div>
                </Grid>
                <Grid item xs={12} md={4}>
                <div className="features-details">
                    
                    <div className="features-img">
                        <img src="./img/3.svg"/>
                    </div>
                    <div className="features-dsx">
                        <h3>
                        Fit and check the item on your body ,feel the MazBoot
                        </h3>
                    </div>
                    <button href="/" className='FeaturesHome FeaturesHomeProve'>Feel The Prove</button>
                </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Features;
