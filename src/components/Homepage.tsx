import React, { Component } from 'react';
import { Card, Button, FormControl } from 'react-bootstrap'


export interface HomepageProps {

}

export interface HomepageState {
    songs: [];
    searchValue: string;
}
class Homepage extends Component<HomepageProps, HomepageState> {

    state: HomepageState = {
        songs: [],
        searchValue: ""
    }

    searchSongs = async () => {

        const response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + this.state.searchValue, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "d32a5fb763msh4f620fd71788343p11643cjsn19b7b9ebe9d1"
            }
        })

        if (response.ok) {
            const songs = await response.json()
            this.setState({ songs: songs.data })
        }

    }
    render() {
        return (
            <>
                <FormControl placeholder="search" value={this.state.searchValue} onChange={(event) => this.setState({ searchValue: event.currentTarget.value })} />
                <Button onClick={this.searchSongs} />
                {this.state.songs && this.state.songs.map((song) => {
                    return (<Card key={song.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{song.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                    </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>)
                })}
            </>
        );
    }
}

export default Homepage;