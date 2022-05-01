import React from 'react';
import './About.css';
import { Typography, Avatar } from '@material-ui/core';

const About = () => {
    return (
        <div className="aboutSection">
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/depo3pciu/image/upload/v1651364481/mypic/asif2_eypenl.jpg"
                            alt="Founder"
                        />
                        <Typography>Md Asif Raza</Typography>
                        <span>
                            This is a sample wesbite made by @asif. Only with the
                            purpose to learn MERN Stack.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Full Stack Developer</Typography>
                        <Typography component="h3">Thnaks for exploring my project</Typography>
                        <Typography component="h3">All kind of suggestions are welcome to improve this site</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
