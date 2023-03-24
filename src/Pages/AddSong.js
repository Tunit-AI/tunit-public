import { Stack, HStack, VStack } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';

function AddSong() {
    return (
        <>
            <Navbar />
            <VStack>
                <br></br>
                <h1>Paste Song Below</h1>
                <br></br>
                <input placeholder='music.apple.com/songLink' />
                <button type='submit'>
                    Submit
                </button>
            </VStack>
        </>
    )
}

export default AddSong;