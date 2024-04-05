import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './thumbs.css';
//import Button, {redirectToURL} from '../Button';

function MyThumbs({onClickMethod}) {
  return (
    <div className='thumbs-icons'>
        <div className="thumb-button-up" onClick={() => onClickMethod('Like')}>
          <FaThumbsUp />
        </div>
        <span className='my-span'><b>Like</b></span>

        <div className="thumb-button-down" onClick={() => onClickMethod('Dislike')}>
          <FaThumbsDown />
          <span className='my-span'></span>
        </div>
        <span className='my-span'><b>Dislike</b></span>

    
    </div>
  );
}

export default MyThumbs;

function handleButtonClick(button, onClick) {

    onClick(button);// Send the response back to the server
    console.log(button)
  
}

