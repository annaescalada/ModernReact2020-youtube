import React from 'react'
import SearchBar from './SearchBar'
import VideoDetail from './VideoDetail'
import youtube from '../apis/youtube'
import VideoList from './VideoList'
const KEY = 'AIzaSyBcWsmQXi9o1DzRbF_7-UXFWLOODR_zT8k'

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    onVideoSelect = video => {
        this.setState({ selectedVideo: video })
    }

    onTermSubmit = async term => {
        const response = await youtube.get("/search", {
            params: {
                q: term,
                part: "snippet",
                type: 'video',
                maxResults: 5,
                key: KEY
            }
        })

        this.setState({ 
            videos: response.data.items, 
            selectedVideo: response.data.items[0]
        })
    }

    componentDidMount() {
        this.onTermSubmit('react')
    }
    render() {
        return (
            <div className="ui container">
                <SearchBar onTermSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App