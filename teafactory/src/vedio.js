import React from 'react';
import './styles/vedio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faHeart } from '@fortawesome/free-solid-svg-icons';

const Video = () => {
    const handleReaction = (reaction) => {
        console.log(`${reaction} reaction clicked!`);
        // You can add your reaction handling logic here
    };

    return (
        <div className='backgroundImage'>
        <div className="videoContainer">
            <h2 className="videoTitle">Our Tea Factory Overview</h2>
           
            <video className="videoPlayer" controls>
                <source src="./image/vedio.mp4" type="video/mp4" />
                
            </video>
            <div className="reactionButtons">
                <button onClick={() => handleReaction('Like')} className="reactionButton">
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
                <button onClick={() => handleReaction('Dislike')} className="reactionButton">
                    <FontAwesomeIcon icon={faThumbsDown} /> Dislike
                </button>
                <button onClick={() => handleReaction('Favorite')} className="reactionButton">
                    <FontAwesomeIcon icon={faHeart} /> Favorite
                </button>
            </div>
        </div>
        </div>
    );
}

export default Video;
