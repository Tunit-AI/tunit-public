import { Stack, HStack, VStack } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';
import '../Pages/Profile/Profile.css';

function AddSong() {
    return (
        <>
            <Navbar />
            <VStack>
                <br></br>
                <h1>Paste Song Below</h1>
                <br></br>
                <input className='input-addSong' placeholder='music.apple.com/songLink' />
                <button className='button-submit' type='submit'>
                    Submit
                </button>
            </VStack>
        </>
    )
}

export default AddSong;